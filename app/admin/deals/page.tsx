'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  Package,
  Calendar,
  Tag,
  X,
  AlertTriangle,
  Sun,
  Battery
} from 'lucide-react'

interface Deal {
  id: string
  title: string
  description: string
  price: string
  category: string
  isActive: boolean
  validUntil: string
}

// Mock deals data
const initialDeals: Deal[] = [
  {
    id: '1',
    title: 'PV-Module Sonderaktion',
    description: 'Hochwertige monokristalline Module zu Sonderkonditionen',
    price: 'ab 0,18 €/Wp',
    category: 'module',
    isActive: true,
    validUntil: '2024-12-15',
  },
  {
    id: '2',
    title: 'Wechselrichter Bundle',
    description: 'Sungrow String-Wechselrichter im Paket',
    price: 'Preis auf Anfrage',
    category: 'inverter',
    isActive: false,
    validUntil: '2024-12-01',
  },
]

const categoryConfig: Record<string, { icon: typeof Sun; color: string; label: string }> = {
  module: { icon: Sun, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', label: 'Module' },
  inverter: { icon: Zap, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'Wechselrichter' },
  battery: { icon: Battery, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Batteriespeicher' },
  other: { icon: Package, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', label: 'Sonstiges' },
}

export default function AdminDealsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'module',
    validUntil: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/deals')
      if (res.ok) {
        const data = await res.json()
        setDeals(data)
      }
    } catch (error) {
      console.error('Error fetching deals:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auth wird vom AdminLayoutWrapper gehandhabt
  if (status === 'loading' || !session) {
    return null
  }

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal)
    setFormData({
      title: deal.title,
      description: deal.description,
      price: deal.price || '',
      category: deal.category,
      validUntil: deal.validUntil ? new Date(deal.validUntil).toISOString().split('T')[0] : '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingDeal ? `/api/deals/${editingDeal.id}` : '/api/deals'
      const method = editingDeal ? 'PATCH' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchDeals()
        setShowForm(false)
        setEditingDeal(null)
        setFormData({ title: '', description: '', price: '', category: 'module', validUntil: '' })
      }
    } catch (error) {
      console.error('Error saving deal:', error)
    }
  }

  const toggleActive = async (deal: Deal) => {
    try {
      const res = await fetch(`/api/deals/${deal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !deal.isActive }),
      })
      if (res.ok) {
        setDeals(deals.map(d => d.id === deal.id ? { ...d, isActive: !d.isActive } : d))
      }
    } catch (error) {
      console.error('Error toggling deal:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/deals/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setDeals(deals.filter(d => d.id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('Error deleting deal:', error)
    }
  }

  const activeCount = deals.filter(d => d.isActive).length

  return (
    <>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Deal der Woche</h1>
                <p className="text-foreground-secondary mt-1">
                  Verwalten Sie aktuelle Sonderangebote
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                  {activeCount} aktiv
                </span>
                <Button
                  variant="primary"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => {
                    setShowForm(true)
                    setEditingDeal(null)
                    setFormData({ title: '', description: '', price: '', category: 'module', validUntil: '' })
                  }}
                >
                  Neuer Deal
                </Button>
              </div>
            </motion.div>

            {/* Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8"
                >
                  <div className="bg-background-secondary border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-foreground">
                        {editingDeal ? 'Deal bearbeiten' : 'Neuen Deal erstellen'}
                      </h2>
                      <button
                        onClick={() => {
                          setShowForm(false)
                          setEditingDeal(null)
                        }}
                        className="p-2 rounded-xl hover:bg-card text-foreground-secondary hover:text-foreground transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2">Titel</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                          placeholder="z.B. PV-Module Sonderaktion"
                          className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-2">Beschreibung</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                          placeholder="Beschreiben Sie das Angebot..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Preis / Konditionen</label>
                          <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="z.B. ab 0,18 €/Wp"
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Kategorie</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                          >
                            <option value="module">Module</option>
                            <option value="inverter">Wechselrichter</option>
                            <option value="battery">Batteriespeicher</option>
                            <option value="other">Sonstiges</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground-secondary mb-2">Gültig bis</label>
                          <input
                            type="date"
                            value={formData.validUntil}
                            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                            className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button type="submit" variant="primary">
                          {editingDeal ? 'Speichern' : 'Deal erstellen'}
                        </Button>
                        <button 
                          type="button" 
                          className="px-6 py-2.5 rounded-xl border border-border bg-card text-foreground-secondary hover:bg-background-secondary hover:text-foreground transition-all font-medium"
                          onClick={() => {
                            setShowForm(false)
                            setEditingDeal(null)
                          }}
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Deals List */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : deals.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-background-secondary border border-border rounded-2xl text-center py-16"
                >
                  <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-foreground-muted" />
                  </div>
                  <p className="text-foreground-secondary mb-4">Noch keine Deals erstellt</p>
                  <Button
                    variant="primary"
                    onClick={() => setShowForm(true)}
                  >
                    Ersten Deal erstellen
                  </Button>
                </motion.div>
              ) : (
                deals.map((deal, index) => {
                  const config = categoryConfig[deal.category] || categoryConfig.other
                  const CategoryIcon = config.icon
                  
                  return (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className={`
                        bg-background-secondary border border-border rounded-2xl overflow-hidden
                        hover:border-border-light transition-all
                        ${!deal.isActive ? 'opacity-60' : ''}
                      `}>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-6">
                          {/* Deal Icon */}
                          <div className={`
                            w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border
                            ${config.color}
                          `}>
                            <CategoryIcon className="w-7 h-7" />
                          </div>

                          {/* Deal Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="font-semibold text-foreground text-lg">
                                {deal.title}
                              </h3>
                              <span className={`
                                px-2.5 py-1 rounded-lg text-xs font-medium border
                                ${deal.isActive 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                  : 'bg-card text-foreground-secondary border-border'
                                }
                              `}>
                                {deal.isActive ? 'Aktiv' : 'Inaktiv'}
                              </span>
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
                                {config.label}
                              </span>
                            </div>
                            <p className="text-foreground-secondary text-sm mb-3">
                              {deal.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                <Tag className="w-4 h-4" />
                                {deal.price}
                              </span>
                              <span className="flex items-center gap-1.5 text-foreground-muted">
                                <Calendar className="w-4 h-4" />
                                Bis {new Date(deal.validUntil).toLocaleDateString('de-DE')}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleActive(deal)}
                              className={`
                                flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all
                                ${deal.isActive 
                                  ? 'border border-border bg-card text-foreground-secondary hover:bg-background-secondary hover:text-foreground' 
                                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                }
                              `}
                            >
                              {deal.isActive ? (
                                <><EyeOff className="w-4 h-4" /> Deaktivieren</>
                              ) : (
                                <><Eye className="w-4 h-4" /> Aktivieren</>
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(deal)}
                              className="p-2.5 rounded-xl bg-card text-foreground-secondary hover:text-foreground border border-border hover:border-border-light transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteId(deal.id)}
                              className="p-2.5 rounded-xl bg-card text-foreground-secondary hover:bg-red-500/10 hover:text-red-400 border border-border hover:border-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background-secondary border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-center mb-2">
                Deal löschen?
              </h3>
              <p className="text-foreground-secondary text-center mb-6">
                Möchten Sie diesen Deal wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
              <div className="flex gap-3">
                <button
                  className="flex-1 h-12 rounded-xl border border-border bg-card text-foreground-secondary hover:bg-background-secondary hover:text-foreground transition-colors font-medium"
                  onClick={() => setDeleteId(null)}
                >
                  Abbrechen
                </button>
                <button
                  className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors font-medium"
                  onClick={() => handleDelete(deleteId)}
                >
                  Löschen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

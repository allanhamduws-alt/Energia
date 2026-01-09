'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  Calendar,
  Tag
} from 'lucide-react'

// Mock deals data
const initialDeals = [
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

export default function AdminDealsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [deals, setDeals] = useState(initialDeals)
  const [showForm, setShowForm] = useState(false)
  const [editingDeal, setEditingDeal] = useState<typeof deals[0] | null>(null)
  
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

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-energia-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const handleEdit = (deal: typeof deals[0]) => {
    setEditingDeal(deal)
    setFormData({
      title: deal.title,
      description: deal.description,
      price: deal.price,
      category: deal.category,
      validUntil: deal.validUntil,
    })
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API call
    if (editingDeal) {
      setDeals(deals.map(d => d.id === editingDeal.id ? { ...d, ...formData } : d))
    } else {
      setDeals([...deals, { id: Date.now().toString(), ...formData, isActive: true }])
    }
    setShowForm(false)
    setEditingDeal(null)
    setFormData({ title: '', description: '', price: '', category: 'module', validUntil: '' })
  }

  const toggleActive = (id: string) => {
    setDeals(deals.map(d => d.id === id ? { ...d, isActive: !d.isActive } : d))
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Deal der Woche</h1>
              <p className="text-foreground-muted mt-1">
                Verwalten Sie aktuelle Sonderangebote
              </p>
            </div>
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

          {/* Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card variant="default" padding="lg">
                <h2 className="text-xl font-semibold mb-6">
                  {editingDeal ? 'Deal bearbeiten' : 'Neuen Deal erstellen'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Titel"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="z.B. PV-Module Sonderaktion"
                  />
                  <Textarea
                    label="Beschreibung"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Beschreiben Sie das Angebot..."
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="Preis / Konditionen"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="z.B. ab 0,18 €/Wp"
                    />
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Kategorie
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                      >
                        <option value="module">Module</option>
                        <option value="inverter">Wechselrichter</option>
                        <option value="battery">Batteriespeicher</option>
                        <option value="other">Sonstiges</option>
                      </select>
                    </div>
                    <Input
                      label="Gültig bis"
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" variant="primary">
                      {editingDeal ? 'Speichern' : 'Deal erstellen'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowForm(false)
                        setEditingDeal(null)
                      }}
                    >
                      Abbrechen
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Deals List */}
          <div className="grid gap-4">
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card variant="default" className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-6">
                    {/* Deal Icon */}
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                      ${deal.isActive ? 'bg-energia-bg text-energia-primary' : 'bg-gray-100 text-gray-400'}
                    `}>
                      <Package className="w-7 h-7" />
                    </div>

                    {/* Deal Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground text-lg">
                          {deal.title}
                        </h3>
                        <Badge 
                          variant={deal.isActive ? 'energia' : 'default'}
                          size="sm"
                        >
                          {deal.isActive ? 'Aktiv' : 'Inaktiv'}
                        </Badge>
                      </div>
                      <p className="text-foreground-secondary text-sm mb-2">
                        {deal.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-energia-primary font-medium">
                          <Tag className="w-4 h-4" />
                          {deal.price}
                        </span>
                        <span className="flex items-center gap-1 text-foreground-muted">
                          <Calendar className="w-4 h-4" />
                          Bis {new Date(deal.validUntil).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant={deal.isActive ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => toggleActive(deal.id)}
                      >
                        {deal.isActive ? 'Deaktivieren' : 'Aktivieren'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(deal)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {deals.length === 0 && (
            <Card variant="bordered" className="text-center py-12">
              <Zap className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">Noch keine Deals erstellt</p>
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => setShowForm(true)}
              >
                Ersten Deal erstellen
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}


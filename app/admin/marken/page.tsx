'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Zap,
  Search,
  ExternalLink,
  Eye,
  EyeOff,
  Package,
  Sun,
  Battery,
  AlertTriangle
} from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  description: string | null
  website: string | null
  categories: string[]
  highlights: string[]
  sortOrder: number
  isActive: boolean
  createdAt: string
  _count?: {
    products: number
  }
}

const categoryLabels: Record<string, { label: string; icon: typeof Sun; color: string }> = {
  module: { label: 'Module', icon: Sun, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  wechselrichter: { label: 'Wechselrichter', icon: Zap, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  speicher: { label: 'Speicher', icon: Battery, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
}

export default function AdminMarkenPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/brands?active=all&withProducts=true')
      if (res.ok) {
        const data = await res.json()
        setBrands(data)
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/brands/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setBrands(brands.filter(b => b.id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('Error deleting brand:', error)
    }
  }

  const toggleActive = async (brand: Brand) => {
    try {
      const res = await fetch(`/api/brands/${brand.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !brand.isActive }),
      })
      if (res.ok) {
        setBrands(brands.map(b => 
          b.id === brand.id ? { ...b, isActive: !b.isActive } : b
        ))
      }
    } catch (error) {
      console.error('Error toggling brand:', error)
    }
  }

  // Filter brands
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = 
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.slug.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Marken</h1>
          <p className="text-foreground-secondary mt-1">
            {brands.length} Marken in der Datenbank
          </p>
        </div>
        <Link href="/admin/marken/neu">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Neue Marke
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background-secondary border border-border rounded-2xl p-6 mb-6"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            type="text"
            placeholder="Marken durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
          />
        </div>
      </motion.div>

      {/* Brands List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredBrands.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-background-secondary border border-border rounded-2xl text-center py-16"
        >
          <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-foreground-muted" />
          </div>
          <p className="text-foreground-secondary mb-4">
            {searchTerm ? 'Keine Marken gefunden' : 'Noch keine Marken erstellt'}
          </p>
          <Link href="/admin/marken/neu">
            <Button variant="primary">
              Erste Marke erstellen
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className={`
                bg-background-secondary border border-border rounded-xl overflow-hidden
                hover:border-border-light transition-all
                ${!brand.isActive ? 'opacity-60' : ''}
              `}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-5">
                  {/* Brand Logo */}
                  <div className="w-20 h-20 rounded-xl bg-card flex items-center justify-center shrink-0 overflow-hidden p-2 border border-border">
                    {brand.logoUrl ? (
                      <Image 
                        src={brand.logoUrl} 
                        alt={brand.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Zap className="w-10 h-10 text-foreground-muted" />
                    )}
                  </div>

                  {/* Brand Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground text-lg truncate">
                        {brand.name}
                      </h3>
                      {!brand.isActive && (
                        <span className="px-2 py-0.5 rounded text-xs bg-card text-foreground-secondary border border-border">
                          Inaktiv
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground-muted mb-3">
                      /{brand.slug}
                    </p>
                    
                    {/* Categories */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {brand.categories.map(cat => {
                        const info = categoryLabels[cat]
                        if (!info) return null
                        const Icon = info.icon
                        return (
                          <span 
                            key={cat} 
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${info.color}`}
                          >
                            <Icon className="w-3 h-3" />
                            {info.label}
                          </span>
                        )
                      })}
                    </div>

                    {/* Product count & website */}
                    <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                      <span className="flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-foreground-muted" />
                        {brand._count?.products || 0} Produkte
                      </span>
                      {brand.website && (
                        <a 
                          href={brand.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Website
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleActive(brand)}
                      className={`p-2.5 rounded-xl transition-colors ${
                        brand.isActive 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-card text-foreground-muted border border-border'
                      }`}
                      title={brand.isActive ? 'Deaktivieren' : 'Aktivieren'}
                    >
                      {brand.isActive ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <Link href={`/admin/marken/${brand.id}`}>
                      <button className="p-2.5 rounded-xl bg-card text-foreground-secondary hover:text-foreground border border-border hover:border-border-light transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      className="p-2.5 rounded-xl bg-card text-foreground-secondary hover:bg-red-500/10 hover:text-red-400 border border-border hover:border-red-500/20 transition-colors"
                      onClick={() => setDeleteId(brand.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
                Marke löschen?
              </h3>
              <p className="text-foreground-secondary text-center mb-6">
                Möchten Sie diese Marke wirklich löschen? Marken mit zugeordneten Produkten können nicht gelöscht werden.
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

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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
  Battery
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

const categoryLabels: Record<string, { label: string; icon: typeof Sun }> = {
  module: { label: 'Module', icon: Sun },
  wechselrichter: { label: 'Wechselrichter', icon: Zap },
  speicher: { label: 'Speicher', icon: Battery },
}

export default function AdminMarkenPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

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

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-energia-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <AdminSidebar />
      
      <main className="pt-20 xl:pt-6 xl:ml-64 px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Marken</h1>
              <p className="text-foreground-muted mt-1">
                {brands.length} Marken in der Datenbank
              </p>
            </div>
            <Link href="/admin/marken/neu">
              <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                Neue Marke
              </Button>
            </Link>
          </div>

          {/* Search */}
          <Card variant="default" padding="md" className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <input
                type="text"
                placeholder="Marken durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-energia-primary"
              />
            </div>
          </Card>

          {/* Brands List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-energia-primary border-t-transparent rounded-full" />
            </div>
          ) : filteredBrands.length === 0 ? (
            <Card variant="bordered" className="text-center py-12">
              <Zap className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">
                {searchTerm ? 'Keine Marken gefunden' : 'Noch keine Marken erstellt'}
              </p>
              <Link href="/admin/marken/neu">
                <Button variant="primary" className="mt-4">
                  Erste Marke erstellen
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card variant="default" className={`overflow-hidden ${!brand.isActive ? 'opacity-60' : ''}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                      {/* Brand Logo */}
                      <div className="w-20 h-20 rounded-xl bg-background-secondary flex items-center justify-center shrink-0 overflow-hidden p-2">
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
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-lg truncate">
                            {brand.name}
                          </h3>
                          {!brand.isActive && (
                            <Badge variant="default" size="sm">Inaktiv</Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground-muted mb-2">
                          /{brand.slug}
                        </p>
                        
                        {/* Categories */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {brand.categories.map(cat => {
                            const info = categoryLabels[cat]
                            if (!info) return null
                            const Icon = info.icon
                            return (
                              <Badge key={cat} variant="energia" size="sm">
                                <Icon className="w-3 h-3 mr-1" />
                                {info.label}
                              </Badge>
                            )
                          })}
                        </div>

                        {/* Product count & website */}
                        <div className="flex items-center gap-4 text-sm text-foreground-muted">
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {brand.products?.length || 0} Produkte
                          </span>
                          {brand.website && (
                            <a 
                              href={brand.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-energia-primary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Website
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(brand)}
                          title={brand.isActive ? 'Deaktivieren' : 'Aktivieren'}
                        >
                          {brand.isActive ? (
                            <Eye className="w-4 h-4 text-energia-primary" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-foreground-muted" />
                          )}
                        </Button>
                        <Link href={`/admin/marken/${brand.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => setDeleteId(brand.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Marke löschen?
            </h3>
            <p className="text-foreground-secondary mb-6">
              Möchten Sie diese Marke wirklich löschen? Marken mit zugeordneten Produkten können nicht gelöscht werden. Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteId(null)}
              >
                Abbrechen
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={() => handleDelete(deleteId)}
              >
                Löschen
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}


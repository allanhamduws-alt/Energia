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
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  Search,
  Filter,
  ChevronDown,
  Sun,
  Battery,
  Zap,
  Star,
  Eye,
  EyeOff
} from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
  logoUrl: string | null
}

interface Product {
  id: string
  name: string
  subtitle: string
  category: string
  brandId: string
  brand: Brand
  imageUrl: string | null
  specs: string[]
  detailedSpecs: Record<string, string>
  unit: string
  featured: boolean
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const categoryLabels: Record<string, { label: string; icon: typeof Sun; color: string }> = {
  module: { label: 'Solarmodule', icon: Sun, color: 'bg-amber-100 text-amber-700' },
  wechselrichter: { label: 'Wechselrichter', icon: Zap, color: 'bg-blue-100 text-blue-700' },
  speicher: { label: 'Speicher', icon: Battery, color: 'bg-green-100 text-green-700' },
}

export default function AdminProduktePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [brandFilter, setBrandFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchProducts()
    fetchBrands()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?active=all')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/brands?active=all')
      if (res.ok) {
        const data = await res.json()
        setBrands(data)
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id))
        setDeleteId(null)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const toggleActive = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !product.isActive }),
      })
      if (res.ok) {
        setProducts(products.map(p => 
          p.id === product.id ? { ...p, isActive: !p.isActive } : p
        ))
      }
    } catch (error) {
      console.error('Error toggling product:', error)
    }
  }

  const toggleFeatured = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !product.featured }),
      })
      if (res.ok) {
        setProducts(products.map(p => 
          p.id === product.id ? { ...p, featured: !p.featured } : p
        ))
      }
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || product.category === categoryFilter
    const matchesBrand = !brandFilter || product.brandId === brandFilter
    return matchesSearch && matchesCategory && matchesBrand
  })

  // Group by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

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
              <h1 className="text-3xl font-bold text-foreground">Produkte</h1>
              <p className="text-foreground-muted mt-1">
                {products.length} Produkte in der Datenbank
              </p>
            </div>
            <Link href="/admin/produkte/neu">
              <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                Neues Produkt
              </Button>
            </Link>
          </div>

          {/* Search & Filters */}
          <Card variant="default" padding="md" className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type="text"
                  placeholder="Produkte durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-energia-primary"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="w-4 h-4" />}
                rightIcon={<ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />}
              >
                Filter
              </Button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kategorie
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                    >
                      <option value="">Alle Kategorien</option>
                      <option value="module">Solarmodule</option>
                      <option value="wechselrichter">Wechselrichter</option>
                      <option value="speicher">Speicher</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Marke
                    </label>
                    <select
                      value={brandFilter}
                      onChange={(e) => setBrandFilter(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                    >
                      <option value="">Alle Marken</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>

          {/* Products List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-energia-primary border-t-transparent rounded-full" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <Card variant="bordered" className="text-center py-12">
              <Package className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">
                {searchTerm || categoryFilter || brandFilter 
                  ? 'Keine Produkte gefunden' 
                  : 'Noch keine Produkte erstellt'}
              </p>
              <Link href="/admin/produkte/neu">
                <Button variant="primary" className="mt-4">
                  Erstes Produkt erstellen
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedProducts).map(([category, categoryProducts]) => {
                const categoryInfo = categoryLabels[category] || { label: category, icon: Package, color: 'bg-gray-100 text-gray-700' }
                const CategoryIcon = categoryInfo.icon
                
                return (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${categoryInfo.color}`}>
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {categoryInfo.label}
                      </h2>
                      <Badge variant="default" size="sm">{categoryProducts.length}</Badge>
                    </div>

                    <div className="grid gap-4">
                      {categoryProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card variant="default" className={`overflow-hidden ${!product.isActive ? 'opacity-60' : ''}`}>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                              {/* Product Image */}
                              <div className="w-16 h-16 rounded-xl bg-background-secondary flex items-center justify-center shrink-0 overflow-hidden">
                                {product.imageUrl ? (
                                  <img 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <Package className="w-8 h-8 text-foreground-muted" />
                                )}
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-foreground truncate">
                                    {product.name}
                                  </h3>
                                  {product.featured && (
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                                  )}
                                  {!product.isActive && (
                                    <Badge variant="default" size="sm">Inaktiv</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-foreground-secondary truncate">
                                  {product.subtitle}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                  <Badge variant="energia" size="sm">{product.brand.name}</Badge>
                                  {product.specs.slice(0, 3).map((spec, i) => (
                                    <span key={i} className="text-xs text-foreground-muted">
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFeatured(product)}
                                  title={product.featured ? 'Von Startseite entfernen' : 'Auf Startseite anzeigen'}
                                >
                                  <Star className={`w-4 h-4 ${product.featured ? 'text-amber-500 fill-amber-500' : 'text-foreground-muted'}`} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleActive(product)}
                                  title={product.isActive ? 'Deaktivieren' : 'Aktivieren'}
                                >
                                  {product.isActive ? (
                                    <Eye className="w-4 h-4 text-energia-primary" />
                                  ) : (
                                    <EyeOff className="w-4 h-4 text-foreground-muted" />
                                  )}
                                </Button>
                                <Link href={`/admin/produkte/${product.id}`}>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </Link>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:bg-red-50"
                                  onClick={() => setDeleteId(product.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
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
              Produkt löschen?
            </h3>
            <p className="text-foreground-secondary mb-6">
              Möchten Sie dieses Produkt wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
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


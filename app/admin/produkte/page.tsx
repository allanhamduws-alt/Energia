'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
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
  EyeOff,
  AlertTriangle
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

const categoryLabels: Record<string, { label: string; icon: typeof Sun; color: string; bgColor: string }> = {
  module: { label: 'Solarmodule', icon: Sun, color: 'text-amber-400', bgColor: 'bg-amber-500/10 border-amber-500/20' },
  wechselrichter: { label: 'Wechselrichter', icon: Zap, color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/20' },
  speicher: { label: 'Speicher', icon: Battery, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/20' },
}

export default function AdminProduktePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [brandFilter, setBrandFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

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

  return (
    <>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Produkte</h1>
          <p className="text-foreground-secondary mt-1">
            {products.length} Produkte in der Datenbank
          </p>
        </div>
        <Link href="/admin/produkte/neu">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Neues Produkt
          </Button>
        </Link>
      </motion.div>

      {/* Search & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
            <input
              type="text"
              placeholder="Produkte durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-border bg-card text-foreground-secondary hover:bg-background-secondary hover:text-foreground transition-all"
          >
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Kategorie
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="">Alle Kategorien</option>
                    <option value="module">Solarmodule</option>
                    <option value="wechselrichter">Wechselrichter</option>
                    <option value="speicher">Speicher</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Marke
                  </label>
                  <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
        </AnimatePresence>
      </motion.div>

      {/* Products List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-background-secondary border border-border rounded-2xl text-center py-16"
        >
          <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-foreground-muted" />
          </div>
          <p className="text-foreground-secondary mb-4">
            {searchTerm || categoryFilter || brandFilter 
              ? 'Keine Produkte gefunden' 
              : 'Noch keine Produkte erstellt'}
          </p>
          <Link href="/admin/produkte/neu">
            <Button variant="primary">
              Erstes Produkt erstellen
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedProducts).map(([category, categoryProducts], categoryIndex) => {
            const categoryInfo = categoryLabels[category] || { 
              label: category, 
              icon: Package, 
              color: 'text-slate-400',
              bgColor: 'bg-slate-500/10 border-slate-500/20'
            }
            const CategoryIcon = categoryInfo.icon
            
            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${categoryInfo.bgColor}`}>
                    <CategoryIcon className={`w-5 h-5 ${categoryInfo.color}`} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {categoryInfo.label}
                  </h2>
                  <span className="px-2.5 py-1 rounded-lg bg-card text-foreground-secondary text-sm font-medium">
                    {categoryProducts.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {categoryProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      <div className={`
                        bg-background-secondary border border-border rounded-xl overflow-hidden
                        hover:border-border-light transition-all group
                        ${!product.isActive ? 'opacity-60' : ''}
                      `}>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                          {/* Product Image */}
                          <div className="w-16 h-16 rounded-xl bg-card flex items-center justify-center shrink-0 overflow-hidden border border-border">
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
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                              )}
                              {!product.isActive && (
                                <span className="px-2 py-0.5 rounded text-xs bg-card text-foreground-secondary border border-border">
                                  Inaktiv
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-foreground-secondary truncate">
                              {product.subtitle}
                            </p>
                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                {product.brand.name}
                              </span>
                              {product.specs.slice(0, 3).map((spec, i) => (
                                <span key={i} className="text-xs text-foreground-secondary">
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => toggleFeatured(product)}
                              className={`p-2.5 rounded-xl transition-colors ${
                                product.featured 
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                  : 'bg-card text-foreground-muted hover:text-amber-400 border border-border'
                              }`}
                              title={product.featured ? 'Von Startseite entfernen' : 'Auf Startseite anzeigen'}
                            >
                              <Star className={`w-4 h-4 ${product.featured ? 'fill-amber-400' : ''}`} />
                            </button>
                            <button
                              onClick={() => toggleActive(product)}
                              className={`p-2.5 rounded-xl transition-colors ${
                                product.isActive 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-card text-foreground-muted border border-border'
                              }`}
                              title={product.isActive ? 'Deaktivieren' : 'Aktivieren'}
                            >
                              {product.isActive ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                            <Link href={`/admin/produkte/${product.id}`}>
                              <button className="p-2.5 rounded-xl bg-card text-foreground-secondary hover:text-foreground border border-border hover:border-border-light transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                            </Link>
                            <button
                              className="p-2.5 rounded-xl bg-card text-foreground-secondary hover:bg-red-500/10 hover:text-red-400 border border-border hover:border-red-500/20 transition-colors"
                              onClick={() => setDeleteId(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
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
                Produkt löschen?
              </h3>
              <p className="text-foreground-secondary text-center mb-6">
                Möchten Sie dieses Produkt wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
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

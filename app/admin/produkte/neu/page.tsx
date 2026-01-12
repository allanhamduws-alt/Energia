'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { 
  ArrowLeft, 
  Save,
  Plus,
  X,
  Package
} from 'lucide-react'
import Link from 'next/link'

interface Brand {
  id: string
  name: string
  slug: string
  categories: string[]
}

export default function AdminProduktNeuPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    category: 'module',
    brandId: '',
    imageUrl: '',
    specs: [''],
    detailedSpecs: {} as Record<string, string>,
    unit: 'Stück',
    featured: false,
    sortOrder: 0,
    isActive: true,
  })

  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')

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
      const res = await fetch('/api/brands?active=all')
      if (res.ok) {
        const data = await res.json()
        setBrands(data)
        // Set first brand as default if available
        if (data.length > 0 && !formData.brandId) {
          setFormData(prev => ({ ...prev, brandId: data[0].id }))
        }
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Filter out empty specs
      const specs = formData.specs.filter(s => s.trim())
      
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          specs,
        }),
      })

      if (res.ok) {
        router.push('/admin/produkte')
      } else {
        const data = await res.json()
        setError(data.error || 'Fehler beim Erstellen')
      }
    } catch (error) {
      setError('Netzwerkfehler')
    } finally {
      setLoading(false)
    }
  }

  const addSpec = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, ''],
    }))
  }

  const removeSpec = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }))
  }

  const updateSpec = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.map((s, i) => i === index ? value : s),
    }))
  }

  const addDetailedSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        detailedSpecs: {
          ...prev.detailedSpecs,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }))
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const removeDetailedSpec = (key: string) => {
    setFormData(prev => {
      const { [key]: _, ...rest } = prev.detailedSpecs
      return { ...prev, detailedSpecs: rest }
    })
  }

  // Auth wird vom AdminLayoutWrapper gehandhabt
  if (status === 'loading' || !session) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/admin/produkte"
          className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Neues Produkt</h1>
        <p className="text-foreground-secondary mt-1">
          Fügen Sie ein neues Produkt zum Katalog hinzu
        </p>
      </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <Card variant="default" padding="lg" className="mb-16">
              <h2 className="text-xl font-semibold text-foreground mb-10">
                Grundinformationen
              </h2>
              
              <div className="space-y-8">
                <Input
                  label="Produktname *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="z.B. AIKO Neostar 2S"
                  required
                />
                
                <Input
                  label="Untertitel *"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="z.B. 475W N-Type Fullblack Modul"
                  required
                />

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">
                      Kategorie *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                      required
                    >
                      <option value="module">Solarmodul</option>
                      <option value="wechselrichter">Wechselrichter</option>
                      <option value="speicher">Speicher</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">
                      Marke *
                    </label>
                    <select
                      value={formData.brandId}
                      onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground"
                      required
                    >
                      {brands.length === 0 ? (
                        <option value="">Keine Marken verfügbar</option>
                      ) : (
                        brands.map(brand => (
                          <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <Input
                  label="Bild-URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://... oder /images/products/..."
                />
              </div>
            </Card>

            {/* Quick Specs (Tags) */}
            <Card variant="default" padding="lg" className="mb-16">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Kurzspezifikationen
              </h2>
              <p className="text-sm text-foreground-muted mb-8">
                Kurze Tags wie &quot;475W&quot;, &quot;Fullblack&quot;, &quot;N-Type&quot; die auf der Übersicht angezeigt werden
              </p>
              
              <div className="space-y-6">
                {formData.specs.map((spec, index) => (
                  <div key={index} className="flex gap-4">
                    <Input
                      value={spec}
                      onChange={(e) => updateSpec(index, e.target.value)}
                      placeholder="z.B. 475W"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeSpec(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpec}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Tag hinzufügen
                </Button>
              </div>
            </Card>

            {/* Detailed Specs */}
            <Card variant="default" padding="lg" className="mb-16">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Detaillierte Spezifikationen
              </h2>
              <p className="text-sm text-foreground-muted mb-8">
                Technische Daten die im ausgeklappten Bereich angezeigt werden
              </p>
              
              {/* Existing specs */}
              {Object.entries(formData.detailedSpecs).length > 0 && (
                <div className="space-y-2 mb-4">
                  {Object.entries(formData.detailedSpecs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 p-3 bg-background-secondary rounded-xl">
                      <span className="font-medium text-foreground">{key}:</span>
                      <span className="text-foreground-secondary flex-1">{value}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDetailedSpec(key)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new spec */}
              <div className="flex gap-5">
                <Input
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  placeholder="Bezeichnung (z.B. Nennleistung)"
                  className="flex-1"
                />
                <Input
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Wert (z.B. 475 Wp)"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addDetailedSpec}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Settings */}
            <Card variant="default" padding="lg" className="mb-16">
              <h2 className="text-xl font-semibold text-foreground mb-10">
                Einstellungen
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Input
                  label="Einheit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="z.B. Stück, kWh, kW"
                />
                
                <Input
                  label="Sortierung"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              <div className="flex flex-wrap gap-8 mt-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-energia-primary focus:ring-energia-primary"
                  />
                  <span className="text-foreground">Auf Startseite hervorheben</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-energia-primary focus:ring-energia-primary"
                  />
                  <span className="text-foreground">Aktiv (auf Website sichtbar)</span>
                </label>
              </div>
            </Card>

            {/* Submit */}
            <div className="flex gap-6">
              <Button
                type="submit"
                variant="primary"
                disabled={loading || brands.length === 0}
                leftIcon={loading ? undefined : <Save className="w-4 h-4" />}
              >
                {loading ? 'Speichern...' : 'Produkt erstellen'}
              </Button>
              <Link href="/admin/produkte">
                <Button type="button" variant="outline">
                  Abbrechen
                </Button>
              </Link>
            </div>

          {brands.length === 0 && (
            <p className="mt-4 text-sm text-amber-600">
              ⚠️ Bitte erstellen Sie zuerst eine Marke, bevor Sie Produkte hinzufügen.{' '}
              <Link href="/admin/marken/neu" className="underline">Marke erstellen →</Link>
            </p>
          )}
        </form>
    </div>
  )
}


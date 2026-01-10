'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { 
  ArrowLeft, 
  Save,
  Plus,
  X
} from 'lucide-react'
import Link from 'next/link'

export default function AdminMarkeNeuPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logoUrl: '',
    description: '',
    website: '',
    categories: [] as string[],
    highlights: [''],
    sortOrder: 0,
    isActive: true,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[äöü]/g, (match) => {
        const map: Record<string, string> = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' }
        return map[match] || match
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Filter out empty highlights
      const highlights = formData.highlights.filter(h => h.trim())
      
      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          highlights,
        }),
      })

      if (res.ok) {
        router.push('/admin/marken')
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

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }))
  }

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }))
  }

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }))
  }

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h),
    }))
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/admin/marken"
              className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Übersicht
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Neue Marke</h1>
            <p className="text-foreground-muted mt-1">
              Fügen Sie eine neue Marke zum System hinzu
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
            <Card variant="default" padding="lg" className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Grundinformationen
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Markenname *"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="z.B. AIKO"
                  required
                />
                
                <Input
                  label="URL-Slug *"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="z.B. aiko"
                  required
                  hint="Wird automatisch generiert. Nur Kleinbuchstaben, Zahlen und Bindestriche."
                />

                <Input
                  label="Logo-URL"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://... oder /images/brands/..."
                />

                <Textarea
                  label="Beschreibung"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kurze Beschreibung der Marke..."
                  rows={3}
                />

                <Input
                  label="Website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.marke.de"
                />
              </div>
            </Card>

            {/* Categories */}
            <Card variant="default" padding="lg" className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Produktkategorien
              </h2>
              <p className="text-sm text-foreground-muted mb-4">
                In welchen Kategorien bietet diese Marke Produkte an?
              </p>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'module', label: 'Solarmodule' },
                  { id: 'wechselrichter', label: 'Wechselrichter' },
                  { id: 'speicher', label: 'Speicher' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`
                      px-4 py-2 rounded-xl border-2 transition-all font-medium
                      ${formData.categories.includes(cat.id)
                        ? 'border-energia-primary bg-energia-bg text-energia-primary'
                        : 'border-border bg-card text-foreground-secondary hover:border-foreground-muted'
                      }
                    `}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Highlights */}
            <Card variant="default" padding="lg" className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Highlights
              </h2>
              <p className="text-sm text-foreground-muted mb-4">
                Besondere Merkmale wie &quot;Made in Germany&quot;, &quot;Premium&quot;, etc.
              </p>
              
              <div className="space-y-3">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder="z.B. Made in Germany"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeHighlight(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addHighlight}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Highlight hinzufügen
                </Button>
              </div>
            </Card>

            {/* Settings */}
            <Card variant="default" padding="lg" className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Einstellungen
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Sortierung"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  hint="Niedrigere Werte werden zuerst angezeigt"
                />
              </div>

              <div className="mt-4">
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
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                leftIcon={loading ? undefined : <Save className="w-4 h-4" />}
              >
                {loading ? 'Speichern...' : 'Marke erstellen'}
              </Button>
              <Link href="/admin/marken">
                <Button type="button" variant="outline">
                  Abbrechen
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { 
  Settings,
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Search as SearchIcon,
  FileText,
  Bell,
  BellOff,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react'

interface SettingsData {
  companyName: string
  companyEmail: string
  companyPhone: string
  companyAddress: string
  openingHours: string
  facebookUrl: string | null
  instagramUrl: string | null
  linkedinUrl: string | null
  youtubeUrl: string | null
  metaTitle: string
  metaDescription: string
  metaKeywords: string | null
  notifications: {
    newAppointment: boolean
    newContact: boolean
    newChat: boolean
  }
}

export default function AdminEinstellungenPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'company' | 'social' | 'seo' | 'notifications' | 'password'>('company')
  
  const [settings, setSettings] = useState<SettingsData>({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    openingHours: '',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    notifications: {
      newAppointment: true,
      newContact: true,
      newChat: true
    }
  })

  // Passwort-Felder
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        setSettings({
          companyName: data.companyName || '',
          companyEmail: data.companyEmail || '',
          companyPhone: data.companyPhone || '',
          companyAddress: data.companyAddress || '',
          openingHours: data.openingHours || '',
          facebookUrl: data.facebookUrl || '',
          instagramUrl: data.instagramUrl || '',
          linkedinUrl: data.linkedinUrl || '',
          youtubeUrl: data.youtubeUrl || '',
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          metaKeywords: data.metaKeywords || '',
          notifications: data.notifications || {
            newAppointment: true,
            newContact: true,
            newChat: true
          }
        })
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
      setError('Fehler beim Laden der Einstellungen')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSaveSuccess(false)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (res.ok) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Fehler beim Speichern')
      }
    } catch (err) {
      console.error('Error saving settings:', err)
      setError('Fehler beim Speichern der Einstellungen')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    setPasswordError(null)
    setPasswordSuccess(false)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwörter stimmen nicht überein')
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Passwort muss mindestens 8 Zeichen lang sein')
      return
    }

    setSaving(true)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          changePassword: {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
          }
        })
      })

      if (res.ok) {
        setPasswordSuccess(true)
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setTimeout(() => setPasswordSuccess(false), 3000)
      } else {
        const data = await res.json()
        setPasswordError(data.error || 'Fehler beim Ändern des Passworts')
      }
    } catch (err) {
      console.error('Error changing password:', err)
      setPasswordError('Fehler beim Ändern des Passworts')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'company', label: 'Firmendaten', icon: Building2 },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'seo', label: 'SEO', icon: SearchIcon },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'password', label: 'Passwort', icon: Lock }
  ] as const

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Einstellungen</h1>
          <p className="text-foreground-secondary mt-1">
            Verwalten Sie Ihre Website-Einstellungen
          </p>
        </div>
        {activeTab !== 'password' && (
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
            leftIcon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          >
            {saving ? 'Speichern...' : 'Speichern'}
          </Button>
        )}
      </motion.div>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Einstellungen erfolgreich gespeichert</span>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Navigation - Separate Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background-secondary border border-border rounded-2xl p-3 mb-6"
      >
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-card border border-transparent hover:border-border'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-background-secondary border border-border rounded-2xl"
      >

        <div className="p-6">
          {/* Firmendaten */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Firmenname
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    E-Mail Adresse
                  </label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Öffnungszeiten
                  </label>
                  <input
                    type="text"
                    value={settings.openingHours}
                    onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                    placeholder="z.B. Mo-Fr: 8:00-17:00 Uhr"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Adresse
                </label>
                <textarea
                  value={settings.companyAddress}
                  onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <p className="text-foreground-secondary text-sm mb-6">
                Geben Sie die URLs zu Ihren Social-Media-Profilen ein. Leere Felder werden nicht angezeigt.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Facebook className="w-4 h-4 inline mr-2" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.facebookUrl || ''}
                    onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Instagram className="w-4 h-4 inline mr-2" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={settings.instagramUrl || ''}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/..."
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Linkedin className="w-4 h-4 inline mr-2" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={settings.linkedinUrl || ''}
                    onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    <Youtube className="w-4 h-4 inline mr-2" />
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={settings.youtubeUrl || ''}
                    onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/@..."
                    className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <p className="text-foreground-secondary text-sm mb-6">
                Optimieren Sie Ihre Website für Suchmaschinen. Diese Einstellungen werden als Standard verwendet.
              </p>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Meta-Titel
                </label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                  placeholder="Ihr Website-Titel"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                />
                <p className="text-xs text-foreground-muted mt-2">{settings.metaTitle.length}/60 Zeichen empfohlen</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Meta-Beschreibung
                </label>
                <textarea
                  value={settings.metaDescription}
                  onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                  rows={3}
                  placeholder="Beschreiben Sie Ihre Website in 1-2 Sätzen"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                />
                <p className="text-xs text-foreground-muted mt-2">{settings.metaDescription.length}/160 Zeichen empfohlen</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Keywords (optional)
                </label>
                <input
                  type="text"
                  value={settings.metaKeywords || ''}
                  onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
                  placeholder="Photovoltaik, Solar, Wechselrichter, Speicher"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                />
                <p className="text-xs text-foreground-muted mt-2">Kommagetrennte Liste von Schlüsselwörtern</p>
              </div>
            </div>
          )}

          {/* Benachrichtigungen */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <p className="text-foreground-secondary text-sm mb-6">
                Wählen Sie, welche E-Mail-Benachrichtigungen Sie erhalten möchten.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Neue Terminanfrage</h4>
                      <p className="text-sm text-foreground-secondary">Benachrichtigung bei neuen Telefontermin-Anfragen</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newAppointment: !settings.notifications.newAppointment }
                    })}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      settings.notifications.newAppointment ? 'bg-emerald-500' : 'bg-card border border-border'
                    }`}
                  >
                    <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${
                      settings.notifications.newAppointment ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Neue Kontaktanfrage</h4>
                      <p className="text-sm text-foreground-secondary">Benachrichtigung bei neuen Kontaktformular-Anfragen</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newContact: !settings.notifications.newContact }
                    })}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      settings.notifications.newContact ? 'bg-emerald-500' : 'bg-card border border-border'
                    }`}
                  >
                    <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${
                      settings.notifications.newContact ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Neuer Chat</h4>
                      <p className="text-sm text-foreground-secondary">Benachrichtigung bei neuen Chat-Konversationen</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newChat: !settings.notifications.newChat }
                    })}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      settings.notifications.newChat ? 'bg-emerald-500' : 'bg-card border border-border'
                    }`}
                  >
                    <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${
                      settings.notifications.newChat ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Passwort ändern */}
          {activeTab === 'password' && (
            <div className="max-w-md">
              <p className="text-foreground-secondary text-sm mb-6">
                Ändern Sie Ihr Admin-Passwort. Das neue Passwort muss mindestens 8 Zeichen lang sein.
              </p>
              
              <AnimatePresence>
                {passwordSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Passwort erfolgreich geändert</span>
                  </motion.div>
                )}
                {passwordError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium">{passwordError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Aktuelles Passwort
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full h-12 px-4 pr-12 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Neues Passwort
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full h-12 px-4 pr-12 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Neues Passwort bestätigen
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full h-12 px-4 pr-12 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    onClick={handlePasswordChange}
                    disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    leftIcon={saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  >
                    {saving ? 'Ändern...' : 'Passwort ändern'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}


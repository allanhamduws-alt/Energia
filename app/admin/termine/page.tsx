'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Building2,
  CheckCircle,
  X,
  Eye,
  Search,
  Filter,
  ChevronDown,
  User,
  MessageSquare,
  CalendarCheck,
  CalendarX
} from 'lucide-react'

interface Appointment {
  id: string
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message: string
  status: 'pending' | 'confirmed' | 'declined'
  createdAt: string
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: '1',
    firstName: 'Max',
    lastName: 'Mustermann',
    company: 'Solar GmbH',
    email: 'max@solar-gmbh.de',
    phone: '+49 123 456789',
    preferredDate: '2024-12-05',
    preferredTime: '10:00',
    message: 'Interesse an Modulen für ein 100 kWp Projekt',
    status: 'pending',
    createdAt: '2024-12-01T10:30:00',
  },
  {
    id: '2',
    firstName: 'Anna',
    lastName: 'Schmidt',
    company: 'PV Installer AG',
    email: 'anna@pv-installer.de',
    phone: '+49 987 654321',
    preferredDate: '2024-12-06',
    preferredTime: '14:30',
    message: 'Fragen zu Wechselrichter-Preisen',
    status: 'confirmed',
    createdAt: '2024-11-30T15:45:00',
  },
  {
    id: '3',
    firstName: 'Peter',
    lastName: 'Weber',
    company: 'Energie Handel',
    email: 'weber@energie-handel.de',
    phone: '+49 555 123456',
    preferredDate: '2024-12-07',
    preferredTime: '09:00',
    message: 'Großhandelspartnerschaft besprechen',
    status: 'pending',
    createdAt: '2024-11-29T09:00:00',
  },
]

export default function AdminTerminePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments')
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auth wird vom AdminLayoutWrapper gehandhabt
  if (status === 'loading' || !session) {
    return null
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (id: string, newStatus: Appointment['status']) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === id ? { ...apt, status: newStatus } : apt
          )
        )
      }
    } catch (error) {
      console.error('Error updating appointment:', error)
    }
  }

  const pendingCount = appointments.filter(a => a.status === 'pending').length
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length

  return (
    <>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Terminanfragen</h1>
                <p className="text-foreground-secondary mt-1">
                  Verwalten Sie eingehende Telefontermin-Anfragen
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 text-sm font-medium border border-amber-500/20">
                  {pendingCount} ausstehend
                </span>
                <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                  {confirmedCount} bestätigt
                </span>
              </div>
            </motion.div>

            {/* Search & Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-background-secondary border border-border rounded-2xl p-8 mb-6"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                  <input
                    type="text"
                    placeholder="Nach Name, Firma oder E-Mail suchen..."
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
                    <div className="max-w-xs">
                      <label className="block text-sm font-medium text-foreground-secondary mb-2">
                        Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      >
                        <option value="">Alle Status</option>
                        <option value="pending">Ausstehend</option>
                        <option value="confirmed">Bestätigt</option>
                        <option value="declined">Abgelehnt</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Appointments List */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredAppointments.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-background-secondary border border-border rounded-2xl text-center py-16"
                >
                  <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-foreground-muted" />
                  </div>
                  <p className="text-foreground-secondary">Keine Terminanfragen gefunden</p>
                </motion.div>
              ) : (
                filteredAppointments.map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="bg-background-secondary border border-border rounded-2xl overflow-hidden hover:border-border-light transition-all">
                      <div className="flex flex-col xl:flex-row xl:items-center gap-4 p-7">
                        {/* Avatar & Contact Info */}
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shrink-0 border border-border">
                            <User className="w-6 h-6 text-foreground-secondary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="font-semibold text-foreground text-lg">
                                {apt.firstName} {apt.lastName}
                              </h3>
                              <span className={`
                                px-2.5 py-1 rounded-lg text-xs font-medium
                                ${apt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                                ${apt.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : ''}
                                ${apt.status === 'declined' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''}
                              `}>
                                {apt.status === 'confirmed' && 'Bestätigt'}
                                {apt.status === 'pending' && 'Ausstehend'}
                                {apt.status === 'declined' && 'Abgelehnt'}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground-secondary">
                              <span className="flex items-center gap-1.5">
                                <Building2 className="w-4 h-4 text-foreground-muted" />
                                {apt.company}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Mail className="w-4 h-4 text-foreground-muted" />
                                {apt.email}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Phone className="w-4 h-4 text-foreground-muted" />
                                {apt.phone}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Date/Time */}
                        <div className="flex items-center gap-4 xl:border-l xl:border-border xl:pl-6">
                          <div className="bg-card rounded-xl p-4 border border-border">
                            <div className="flex items-center gap-2 text-emerald-400 font-medium mb-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(apt.preferredDate).toLocaleDateString('de-DE', { 
                                weekday: 'short',
                                day: 'numeric', 
                                month: 'short' 
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-foreground-secondary text-sm">
                              <Clock className="w-4 h-4" />
                              {apt.preferredTime} Uhr
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 xl:border-l xl:border-border xl:pl-6">
                          <button
                            onClick={() => setSelectedAppointment(apt)}
                            className="p-3 rounded-xl bg-card text-foreground-secondary hover:text-foreground border border-border hover:border-border-light transition-colors"
                            title="Details anzeigen"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {apt.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors font-medium text-sm"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Bestätigen
                              </button>
                              <button
                                onClick={() => handleStatusChange(apt.id, 'declined')}
                                className="p-3 rounded-xl bg-card text-foreground-secondary hover:bg-red-500/10 hover:text-red-400 border border-border hover:border-red-500/20 transition-colors"
                                title="Ablehnen"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {apt.status === 'confirmed' && (
                            <span className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                              <CalendarCheck className="w-4 h-4" />
                              Termin steht
                            </span>
                          )}
                          {apt.status === 'declined' && (
                            <span className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium">
                              <CalendarX className="w-4 h-4" />
                              Abgelehnt
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Message Preview */}
                      {apt.message && (
                        <div className="px-7 py-5 bg-card/30 border-t border-border">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-4 h-4 text-foreground-muted mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground-secondary">
                              <span className="font-medium text-foreground">Anliegen:</span> {apt.message}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAppointment(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background-secondary border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Termindetails
                </h3>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 rounded-xl hover:bg-card text-foreground-secondary hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Contact Info */}
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h4 className="text-sm font-medium text-foreground-secondary mb-3">Kontaktdaten</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-foreground-muted" />
                      <span className="text-foreground">{selectedAppointment.firstName} {selectedAppointment.lastName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-foreground-muted" />
                      <span className="text-foreground-secondary">{selectedAppointment.company}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-foreground-muted" />
                      <a href={`mailto:${selectedAppointment.email}`} className="text-emerald-400 hover:underline">
                        {selectedAppointment.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-foreground-muted" />
                      <a href={`tel:${selectedAppointment.phone}`} className="text-emerald-400 hover:underline">
                        {selectedAppointment.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Date/Time */}
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h4 className="text-sm font-medium text-foreground-secondary mb-3">Gewünschter Termin</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      {new Date(selectedAppointment.preferredDate).toLocaleDateString('de-DE', { 
                        weekday: 'long',
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-foreground-secondary">
                      <Clock className="w-4 h-4 text-foreground-muted" />
                      {selectedAppointment.preferredTime} Uhr
                    </div>
                  </div>
                </div>

                {/* Message */}
                {selectedAppointment.message && (
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h4 className="text-sm font-medium text-foreground-secondary mb-3">Anliegen</h4>
                    <p className="text-foreground-secondary">{selectedAppointment.message}</p>
                  </div>
                )}

                {/* Status */}
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h4 className="text-sm font-medium text-foreground-secondary mb-3">Status</h4>
                  <span className={`
                    inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                    ${selectedAppointment.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                    ${selectedAppointment.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : ''}
                    ${selectedAppointment.status === 'declined' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''}
                  `}>
                    {selectedAppointment.status === 'confirmed' && <><CheckCircle className="w-4 h-4" /> Bestätigt</>}
                    {selectedAppointment.status === 'pending' && <><Clock className="w-4 h-4" /> Ausstehend</>}
                    {selectedAppointment.status === 'declined' && <><X className="w-4 h-4" /> Abgelehnt</>}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {selectedAppointment.status === 'pending' && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors font-medium"
                    onClick={() => {
                      handleStatusChange(selectedAppointment.id, 'confirmed')
                      setSelectedAppointment(null)
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Bestätigen
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors font-medium"
                    onClick={() => {
                      handleStatusChange(selectedAppointment.id, 'declined')
                      setSelectedAppointment(null)
                    }}
                  >
                    <X className="w-4 h-4" />
                    Ablehnen
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

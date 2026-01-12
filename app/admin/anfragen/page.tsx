'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Building2,
  Clock,
  Search,
  CheckCircle,
  Reply,
  Filter,
  ChevronDown,
  User,
  Inbox,
  Send
} from 'lucide-react'

interface Inquiry {
  id: string
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

// Mock contact inquiries
const mockInquiries: Inquiry[] = [
  {
    id: '1',
    firstName: 'Thomas',
    lastName: 'Müller',
    company: 'Solartech GmbH',
    email: 'mueller@solartech.de',
    phone: '+49 111 222333',
    subject: 'Anfrage zu Modulpreisen',
    message: 'Sehr geehrte Damen und Herren, wir interessieren uns für aktuelle Modulpreise für ein Projekt mit ca. 500 kWp. Könnten Sie uns ein Angebot zusenden?',
    status: 'new',
    createdAt: '2024-12-01T08:30:00',
  },
  {
    id: '2',
    firstName: 'Lisa',
    lastName: 'Braun',
    company: 'Energie Plus AG',
    email: 'braun@energieplus.de',
    phone: '+49 444 555666',
    subject: 'Partnerschaft anfragen',
    message: 'Wir sind ein mittelständischer PV-Installateur und suchen einen zuverlässigen Großhandelspartner. Ist eine langfristige Zusammenarbeit möglich?',
    status: 'read',
    createdAt: '2024-11-30T14:15:00',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Hoffmann',
    company: 'Green Power Solutions',
    email: 'm.hoffmann@greenpower.de',
    phone: '+49 777 888999',
    subject: 'Speichersysteme Verfügbarkeit',
    message: 'Haben Sie aktuell BYD HVM Speicher auf Lager? Wir benötigen 10 Systeme für ein Projekt.',
    status: 'replied',
    createdAt: '2024-11-29T11:00:00',
  },
]

export default function AdminAnfragenPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/contact')
      if (res.ok) {
        const data = await res.json()
        setInquiries(data)
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || inq.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const markAsReplied = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'replied' }),
      })
      if (res.ok) {
        setInquiries(prev => 
          prev.map(inq => 
            inq.id === id ? { ...inq, status: 'replied' as const } : inq
          )
        )
      }
    } catch (error) {
      console.error('Error updating inquiry:', error)
    }
  }

  const newCount = inquiries.filter(i => i.status === 'new').length
  const repliedCount = inquiries.filter(i => i.status === 'replied').length

  return (
    <>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Kontaktanfragen</h1>
          <p className="text-foreground-secondary mt-1">
            Eingehende Nachrichten über das Kontaktformular
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
            {newCount} neue
          </span>
          <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
            {repliedCount} beantwortet
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
              placeholder="Nach Name, Firma oder Betreff suchen..."
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
                  <option value="new">Neu</option>
                  <option value="read">Gelesen</option>
                  <option value="replied">Beantwortet</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-background-secondary border border-border rounded-2xl text-center py-16"
          >
            <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-foreground-muted" />
            </div>
            <p className="text-foreground-secondary">Keine Anfragen gefunden</p>
          </motion.div>
        ) : (
          filteredInquiries.map((inq, index) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className={`
                bg-background-secondary border rounded-2xl overflow-hidden hover:border-border-light transition-all
                ${inq.status === 'new' ? 'border-l-4 border-l-blue-500 border-border' : 'border-border'}
              `}>
                <div className="p-7">
                  {/* Header */}
                  <div className="flex flex-col xl:flex-row xl:items-start gap-4 mb-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                        ${inq.status === 'new' ? 'bg-blue-500/10 border border-blue-500/20' : ''}
                        ${inq.status === 'read' ? 'bg-amber-500/10 border border-amber-500/20' : ''}
                        ${inq.status === 'replied' ? 'bg-emerald-500/10 border border-emerald-500/20' : ''}
                      `}>
                        {inq.status === 'new' && <Inbox className="w-5 h-5 text-blue-400" />}
                        {inq.status === 'read' && <Mail className="w-5 h-5 text-amber-400" />}
                        {inq.status === 'replied' && <Send className="w-5 h-5 text-emerald-400" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-foreground text-lg">
                            {inq.subject}
                          </h3>
                          <span className={`
                            px-2.5 py-1 rounded-lg text-xs font-medium
                            ${inq.status === 'new' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : ''}
                            ${inq.status === 'read' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : ''}
                            ${inq.status === 'replied' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                          `}>
                            {inq.status === 'new' && 'Neu'}
                            {inq.status === 'read' && 'Gelesen'}
                            {inq.status === 'replied' && 'Beantwortet'}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground-secondary">
                          <span className="flex items-center gap-1.5 text-foreground">
                            <User className="w-4 h-4 text-foreground-muted" />
                            {inq.firstName} {inq.lastName}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-foreground-muted" />
                            {inq.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-foreground-muted" />
                            {new Date(inq.createdAt).toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a href={`mailto:${inq.email}?subject=Re: ${inq.subject}`}>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors font-medium text-sm">
                          <Reply className="w-4 h-4" />
                          Antworten
                        </button>
                      </a>
                      {inq.status !== 'replied' && (
                        <button 
                          onClick={() => markAsReplied(inq.id)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground-secondary hover:bg-background-secondary hover:text-foreground transition-all text-sm font-medium"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Erledigt
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-card rounded-xl p-5 mb-4 border border-border">
                    <p className="text-foreground-secondary text-sm leading-relaxed">{inq.message}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a 
                      href={`mailto:${inq.email}`}
                      className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {inq.email}
                    </a>
                    {inq.phone && (
                      <a 
                        href={`tel:${inq.phone}`}
                        className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {inq.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </>
  )
}

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
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Building2,
  Clock,
  Search,
  CheckCircle,
  Reply
} from 'lucide-react'

// Mock contact inquiries
const inquiries = [
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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredInquiries = inquiries.filter(inq =>
    inq.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="info" size="sm">Neu</Badge>
      case 'read':
        return <Badge variant="warning" size="sm">Gelesen</Badge>
      case 'replied':
        return <Badge variant="success" size="sm">Beantwortet</Badge>
      default:
        return <Badge variant="default" size="sm">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <AdminSidebar />
      
      <main className="pt-20 xl:pt-6 xl:ml-64 px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Kontaktanfragen</h1>
              <p className="text-foreground-muted mt-1">
                Eingehende Nachrichten über das Kontaktformular
              </p>
            </div>
            <Badge variant="info">
              {inquiries.filter(i => i.status === 'new').length} neue Anfragen
            </Badge>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <Input
                placeholder="Suchen nach Name, Firma, Betreff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
            </div>
          </div>

          {/* Inquiries List */}
          <div className="grid gap-4">
            {filteredInquiries.map((inq, index) => (
              <motion.div
                key={inq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card variant="default" className={`
                  overflow-hidden
                  ${inq.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}
                `}>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">
                            {inq.subject}
                          </h3>
                          {getStatusBadge(inq.status)}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-foreground-secondary">
                          <span className="font-medium text-foreground">
                            {inq.firstName} {inq.lastName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {inq.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
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

                      <div className="flex items-center gap-2">
                        <a href={`mailto:${inq.email}`}>
                          <Button variant="primary" size="sm" leftIcon={<Reply className="w-4 h-4" />}>
                            Antworten
                          </Button>
                        </a>
                        {inq.status !== 'replied' && (
                          <Button variant="outline" size="sm" leftIcon={<CheckCircle className="w-4 h-4" />}>
                            Als beantwortet markieren
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-background-secondary rounded-xl p-4 mb-4">
                      <p className="text-foreground-secondary">{inq.message}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <a 
                        href={`mailto:${inq.email}`}
                        className="flex items-center gap-1 text-energia-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <a 
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1 text-energia-primary hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {inq.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredInquiries.length === 0 && (
            <Card variant="bordered" className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">Keine Anfragen gefunden</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}


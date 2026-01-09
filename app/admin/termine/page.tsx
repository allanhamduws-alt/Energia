'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Building2,
  CheckCircle,
  X,
  Eye,
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/Input'

// Mock data for appointments
const appointments = [
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
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null)

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

  const filteredAppointments = appointments.filter(apt =>
    apt.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusChange = (id: string, newStatus: string) => {
    // TODO: API call to update status
    console.log('Update status:', id, newStatus)
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Terminanfragen</h1>
              <p className="text-foreground-muted mt-1">
                Verwalten Sie eingehende Telefontermin-Anfragen
              </p>
            </div>
            <Badge variant="energia">
              {appointments.filter(a => a.status === 'pending').length} ausstehend
            </Badge>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <Input
                placeholder="Suchen nach Name, Firma..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
            </div>
          </div>

          {/* Appointments List */}
          <div className="grid gap-4">
            {filteredAppointments.map((apt, index) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card variant="default" className="overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-6">
                    {/* Contact Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground text-lg">
                          {apt.firstName} {apt.lastName}
                        </h3>
                        <Badge 
                          variant={apt.status === 'confirmed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {apt.status === 'confirmed' ? 'Bestätigt' : 'Ausstehend'}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-foreground-secondary">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {apt.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {apt.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {apt.phone}
                        </span>
                      </div>
                    </div>

                    {/* Date/Time */}
                    <div className="flex items-center gap-6 lg:border-l lg:border-border lg:pl-6">
                      <div className="text-center">
                        <div className="flex items-center gap-2 text-energia-primary font-medium">
                          <Calendar className="w-4 h-4" />
                          {new Date(apt.preferredDate).toLocaleDateString('de-DE')}
                        </div>
                        <div className="flex items-center gap-2 text-foreground-muted text-sm mt-1">
                          <Clock className="w-4 h-4" />
                          {apt.preferredTime} Uhr
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 lg:border-l lg:border-border lg:pl-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAppointment(apt)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {apt.status === 'pending' && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleStatusChange(apt.id, 'confirmed')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Bestätigen
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(apt.id, 'declined')}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Message Preview */}
                  {apt.message && (
                    <div className="px-6 py-3 bg-background-secondary border-t border-border">
                      <p className="text-sm text-foreground-secondary">
                        <span className="font-medium">Anliegen:</span> {apt.message}
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <Card variant="bordered" className="text-center py-12">
              <Calendar className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">Keine Terminanfragen gefunden</p>
            </Card>
          )}
        </div>
      </main>

      {/* Detail Modal would go here */}
    </div>
  )
}


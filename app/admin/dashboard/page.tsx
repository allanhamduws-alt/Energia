'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  Calendar, 
  MessageSquare, 
  Package, 
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  MessagesSquare
} from 'lucide-react'
import Link from 'next/link'

// Mock data for dashboard stats
const stats = [
  { 
    title: 'Terminanfragen', 
    value: '12', 
    change: '+3 diese Woche',
    icon: Calendar,
    color: 'bg-blue-500',
    href: '/admin/termine'
  },
  { 
    title: 'Kontaktanfragen', 
    value: '8', 
    change: '+2 diese Woche',
    icon: MessageSquare,
    color: 'bg-energia-primary',
    href: '/admin/anfragen'
  },
  { 
    title: 'Deal-Anfragen', 
    value: '5', 
    change: '+1 diese Woche',
    icon: Package,
    color: 'bg-amber-500',
    href: '/admin/deals'
  },
  { 
    title: 'Chat-Gespräche', 
    value: '24', 
    change: '+8 diese Woche',
    icon: MessagesSquare,
    color: 'bg-purple-500',
    href: '/admin/chat'
  },
]

const recentActivities = [
  { type: 'termin', title: 'Neue Terminanfrage', time: 'vor 5 Min.', status: 'pending' },
  { type: 'kontakt', title: 'Kontaktformular ausgefüllt', time: 'vor 15 Min.', status: 'new' },
  { type: 'deal', title: 'Anfrage zum Deal der Woche', time: 'vor 1 Std.', status: 'pending' },
  { type: 'chat', title: 'Neues Chat-Gespräch', time: 'vor 2 Std.', status: 'active' },
  { type: 'termin', title: 'Termin bestätigt', time: 'vor 3 Std.', status: 'confirmed' },
]

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-energia-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <AdminSidebar />
      
      {/* Main Content - mit Padding für mobile Header und Sidebar-Margin für Desktop */}
      <main className="pt-20 xl:pt-6 xl:ml-64 px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-foreground-muted mt-1 text-sm sm:text-base">
              Willkommen zurück, {session.user?.name || 'Admin'}
            </p>
          </div>

          {/* Stats Grid - Responsive: 1 Spalte mobil, 2 Tablet, 4 Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={stat.href} className="block">
                  <Card variant="default" hover className="relative overflow-hidden h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-foreground-muted mb-1 truncate">{stat.title}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-energia-primary mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <ArrowUpRight className="absolute bottom-4 right-4 w-4 h-4 text-foreground-muted opacity-50" />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card variant="default" padding="lg" className="overflow-hidden">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Letzte Aktivitäten
                </h2>
                <Badge variant="energia">Live</Badge>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-background-secondary rounded-xl"
                  >
                    {/* Icon und Text */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0
                        ${activity.type === 'termin' ? 'bg-blue-100 text-blue-600' : ''}
                        ${activity.type === 'kontakt' ? 'bg-green-100 text-green-600' : ''}
                        ${activity.type === 'deal' ? 'bg-amber-100 text-amber-600' : ''}
                        ${activity.type === 'chat' ? 'bg-purple-100 text-purple-600' : ''}
                      `}>
                        {activity.type === 'termin' && <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
                        {activity.type === 'kontakt' && <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />}
                        {activity.type === 'deal' && <Package className="w-4 h-4 sm:w-5 sm:h-5" />}
                        {activity.type === 'chat' && <MessagesSquare className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm sm:text-base truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs sm:text-sm text-foreground-muted flex items-center gap-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{activity.time}</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <Badge 
                      variant={
                        activity.status === 'confirmed' ? 'success' :
                        activity.status === 'pending' ? 'warning' :
                        activity.status === 'new' ? 'info' : 'default'
                      }
                      size="sm"
                      className="flex-shrink-0 whitespace-nowrap"
                    >
                      <span className="hidden xs:inline-flex items-center">
                        {activity.status === 'confirmed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {activity.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                      </span>
                      <span className="capitalize">{activity.status}</span>
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

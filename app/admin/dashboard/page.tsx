'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MessageSquare, 
  Package, 
  ArrowUpRight,
  Clock,
  MessagesSquare,
  TrendingUp,
  Users,
  Zap,
  Activity,
  Eye
} from 'lucide-react'
import Link from 'next/link'

// Mock data for dashboard stats
const stats = [
  { 
    title: 'Terminanfragen', 
    value: '12', 
    change: '+3',
    trend: 'up',
    period: 'diese Woche',
    icon: Calendar,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500',
    href: '/admin/termine'
  },
  { 
    title: 'Kontaktanfragen', 
    value: '8', 
    change: '+2',
    trend: 'up',
    period: 'diese Woche',
    icon: MessageSquare,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-500',
    href: '/admin/anfragen'
  },
  { 
    title: 'Deal-Anfragen', 
    value: '5', 
    change: '+1',
    trend: 'up',
    period: 'diese Woche',
    icon: Package,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500',
    href: '/admin/deals'
  },
  { 
    title: 'Chat-Gespräche', 
    value: '24', 
    change: '+8',
    trend: 'up',
    period: 'diese Woche',
    icon: MessagesSquare,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500',
    href: '/admin/chat'
  },
]

const recentActivities = [
  { type: 'termin', title: 'Neue Terminanfrage von Solar GmbH', time: 'vor 5 Min.', status: 'pending' },
  { type: 'kontakt', title: 'Kontaktformular ausgefüllt', time: 'vor 15 Min.', status: 'new' },
  { type: 'deal', title: 'Anfrage zum Deal der Woche', time: 'vor 1 Std.', status: 'pending' },
  { type: 'chat', title: 'Neues Chat-Gespräch gestartet', time: 'vor 2 Std.', status: 'active' },
  { type: 'termin', title: 'Termin mit PV Installer AG bestätigt', time: 'vor 3 Std.', status: 'confirmed' },
]

const quickActions = [
  { name: 'Neues Produkt', href: '/admin/produkte/neu', icon: Package, color: 'bg-emerald-500' },
  { name: 'Neue Marke', href: '/admin/marken/neu', icon: Zap, color: 'bg-blue-500' },
  { name: 'Deal bearbeiten', href: '/admin/deals', icon: Activity, color: 'bg-amber-500' },
]

// Simple mini chart component
function MiniChart({ color }: { color: string }) {
  const data = [3, 5, 4, 7, 6, 8, 9]
  const max = Math.max(...data)
  
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((value, index) => (
        <div
          key={index}
          className={`w-1 rounded-full ${color} opacity-${30 + index * 10}`}
          style={{ 
            height: `${(value / max) * 100}%`,
            opacity: 0.3 + (index / data.length) * 0.7
          }}
        />
      ))}
    </div>
  )
}

export default function AdminDashboardPage() {
  const { data: session } = useSession()
  const [currentDate, setCurrentDate] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('de-DE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))

    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/dashboard-stats')
      if (res.ok) {
        const statsData = await res.json()
        setData(statsData)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = data ? [
    { 
      title: 'Terminanfragen', 
      value: data.stats.appointments.value.toString(), 
      change: `+${data.stats.appointments.change}`,
      trend: 'up',
      period: 'diese Woche',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      href: '/admin/termine'
    },
    { 
      title: 'Kontaktanfragen', 
      value: data.stats.contacts.value.toString(), 
      change: `+${data.stats.contacts.change}`,
      trend: 'up',
      period: 'diese Woche',
      icon: MessageSquare,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500',
      textColor: 'text-white',
      href: '/admin/anfragen'
    },
    { 
      title: 'Deal-Anfragen', 
      value: data.stats.dealInquiries.value.toString(), 
      change: `+${data.stats.dealInquiries.change}`,
      trend: 'up',
      period: 'diese Woche',
      icon: Package,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500',
      textColor: 'text-white',
      href: '/admin/deals'
    },
    { 
      title: 'Chat-Gespräche', 
      value: data.stats.chats.value.toString(), 
      change: `+${data.stats.chats.change}`,
      trend: 'up',
      period: 'diese Woche',
      icon: MessagesSquare,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500',
      textColor: 'text-white',
      href: '/admin/chat'
    },
  ] : []

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'gerade eben'
    if (diffInMinutes < 60) return `vor ${diffInMinutes} Min.`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `vor ${diffInHours} Std.`
    
    return date.toLocaleDateString('de-DE')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
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
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold !text-white">Dashboard</h1>
          <p className="text-sm !text-slate-400">{currentDate}</p>
        </div>
        <p className="text-slate-400">
          Willkommen zurück, {session?.user?.name?.split(' ')[0] || 'Admin'}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={stat.href} className="block group">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 shadow-lg shadow-black/40">
                {/* Header mit Icon und Change */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 leading-relaxed">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {stat.change}
                  </span>
                </div>
                
                {/* Value und Title */}
                <div className="mb-6 space-y-2">
                  <p className="text-4xl font-bold text-white leading-none">{stat.value}</p>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">{stat.title}</p>
                </div>
                
                {/* Footer mit Period und Mini Chart */}
                <div className="flex items-end justify-between pt-6 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.period}</p>
                  <div className="mr-1">
                    <MiniChart color={stat.bgColor} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity - Takes 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden min-h-[500px] flex flex-col shadow-lg shadow-black/40">
            <div className="p-8 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-white leading-relaxed">
                    Letzte Aktivitäten
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Echtzeit-Updates aus allen Bereichen
                  </p>
                </div>
                <Link 
                  href="/admin/anfragen"
                  className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 leading-relaxed"
                >
                  Alle anzeigen
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {(data?.activities && data.activities.length > 0) ? (
              <div className="divide-y divide-slate-700/50 flex-1">
                {data.activities.map((activity: any, index: number) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between gap-5 px-8 py-7 hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    {/* Icon und Text */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className={`
                        w-11 h-11 rounded-lg flex items-center justify-center shrink-0
                        ${activity.type === 'termin' ? 'bg-blue-500/15 text-blue-400' : ''}
                        ${activity.type === 'kontakt' ? 'bg-emerald-500/15 text-emerald-400' : ''}
                        ${activity.type === 'deal' ? 'bg-amber-500/15 text-amber-400' : ''}
                        ${activity.type === 'chat' ? 'bg-purple-500/15 text-purple-400' : ''}
                      `}>
                        {activity.type === 'termin' && <Calendar className="w-4 h-4" />}
                        {activity.type === 'kontakt' && <MessageSquare className="w-4 h-4" />}
                        {activity.type === 'deal' && <Package className="w-4 h-4" />}
                        {activity.type === 'chat' && <MessagesSquare className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="font-medium text-white text-sm truncate leading-relaxed">
                          {activity.title}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 leading-relaxed">
                          <Clock className="w-3 h-3" />
                          {formatRelativeTime(activity.time)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className={`
                        px-2 py-1 rounded-md text-xs font-medium shrink-0
                        ${activity.status === 'confirmed' || activity.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400' : ''}
                        ${activity.status === 'pending' ? 'bg-amber-500/15 text-amber-400' : ''}
                        ${activity.status === 'new' ? 'bg-blue-500/15 text-blue-400' : ''}
                        ${activity.status === 'active' ? 'bg-purple-500/15 text-purple-400' : ''}
                        ${activity.status === 'replied' ? 'bg-slate-500/15 text-slate-400' : ''}
                      `}>
                        {activity.status === 'confirmed' && 'Bestätigt'}
                        {activity.status === 'completed' && 'Abgeschlossen'}
                        {activity.status === 'pending' && 'Ausstehend'}
                        {activity.status === 'new' && 'Neu'}
                        {activity.status === 'active' && 'Aktiv'}
                        {activity.status === 'replied' && 'Beantwortet'}
                      </span>
                      <Eye className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center flex-1 h-full">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <Activity className="w-7 h-7 text-slate-500" />
                </div>
                <p className="text-slate-500 mt-4 text-center">
                  Aktuell keine Aktivitäten verzeichnet
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="space-y-8"
        >
          {/* Quick Actions */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-lg shadow-black/40">
            <h3 className="text-base font-semibold text-white mb-7 leading-relaxed">
              Schnellzugriff
            </h3>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center shadow-md shadow-black/20`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors leading-relaxed">
                    {action.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 ml-auto group-hover:text-slate-300 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-lg shadow-black/40">
            <h3 className="text-base font-semibold text-white mb-7 leading-relaxed">
              Übersicht
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-slate-400 leading-relaxed">Anfragen</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-400 leading-relaxed">+24%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-400 leading-relaxed">Besucher</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-400 leading-relaxed">+18%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-slate-400 leading-relaxed">Konversion</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-400 leading-relaxed">+12%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-2xl p-8 shadow-lg shadow-emerald-900/20">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <h3 className="text-sm font-semibold text-emerald-400 leading-relaxed">
                System Status
              </h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Alle Systeme laufen einwandfrei. Keine Probleme erkannt.
            </p>
            <div className="mt-4 pt-4 border-t border-emerald-500/20">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 leading-relaxed">Letzte Prüfung</span>
                <span className="text-slate-400 leading-relaxed">vor 2 Min.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

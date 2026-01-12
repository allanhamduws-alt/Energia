'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { useSidebar, SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from './SidebarProvider'
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Package, 
  Settings,
  LogOut,
  Zap,
  FileText,
  Menu,
  X,
  MessagesSquare,
  ChevronRight,
  User,
  Bell,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Produkte', href: '/admin/produkte', icon: Package },
  { name: 'Marken', href: '/admin/marken', icon: Zap },
  { name: 'Termine', href: '/admin/termine', icon: Calendar },
  { name: 'Kontaktanfragen', href: '/admin/anfragen', icon: MessageSquare },
  { name: 'Deal der Woche', href: '/admin/deals', icon: FileText },
  { name: 'Chat-Verlauf', href: '/admin/chat', icon: MessagesSquare },
]

const bottomNavigation = [
  { name: 'Einstellungen', href: '/admin/einstellungen', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { isCollapsed, toggleCollapsed } = useSidebar()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Aktuelle Zeit
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Schließe Menü bei Routenwechsel
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Verhindere Scrollen wenn Menü offen
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const NavItem = ({ item, collapsed = false }: { item: typeof navigation[0], collapsed?: boolean }) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
    const Icon = item.icon
    
    return (
      <Link
        href={item.href}
        onClick={() => setMobileMenuOpen(false)}
        className={cn(
          'group flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200',
          collapsed ? 'justify-center px-3 py-3' : 'px-4 py-3',
          isActive 
            ? 'bg-emerald-500/15' 
            : 'hover:bg-slate-800'
        )}
        style={{ color: isActive ? '#34d399' : '#f1f5f9' }}
        title={collapsed ? item.name : undefined}
      >
        <Icon 
          className="w-5 h-5 flex-shrink-0"
          style={{ color: isActive ? '#34d399' : '#f1f5f9' }}
        />
        {!collapsed && (
          <>
            <span className="flex-1">{item.name}</span>
            {isActive && (
              <ChevronRight className="w-4 h-4" style={{ color: '#34d399' }} />
            )}
          </>
        )}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 rounded-xl hover:bg-slate-800 transition-colors"
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">Energia</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-800 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
          </button>
          <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            Admin
          </span>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/70 z-[60]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          'lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-slate-900 z-[70] transform transition-transform duration-300 ease-out',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo Header */}
        <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white">Energia</span>
              <p className="text-[10px] text-slate-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
            Hauptmenü
          </p>
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
          
          <div className="pt-3 mt-3 border-t border-slate-800">
            <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
              System
            </p>
            {bottomNavigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-slate-800/50 rounded-xl">
            <div className="w-9 h-9 bg-slate-700 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {session?.user?.email || 'admin@energia.de'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
            style={{ color: '#cbd5e1' }}
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar - Kollabierbar */}
      <aside 
        className={cn(
          'hidden lg:flex fixed left-0 top-0 bottom-0 bg-slate-900 border-r border-slate-800 flex-col z-40 transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo Header */}
        <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
          <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center w-full')}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-bold text-white text-lg">Energia</span>
                <p className="text-[10px] text-slate-500">Supply Solution</p>
              </div>
            )}
          </div>
        </div>

        {/* System Status Bar */}
        {!isCollapsed && (
          <div className="px-5 py-3 border-b border-slate-800 bg-slate-800/30">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-slate-400">System Online</span>
              </div>
              <span className="text-slate-500 font-mono">{currentTime}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {!isCollapsed && (
            <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
              Hauptmenü
            </p>
          )}
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} collapsed={isCollapsed} />
          ))}
          
          <div className={cn('pt-3 mt-3 border-t border-slate-800', isCollapsed && 'pt-2 mt-2')}>
            {!isCollapsed && (
              <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
                System
              </p>
            )}
            {bottomNavigation.map((item) => (
              <NavItem key={item.name} item={item} collapsed={isCollapsed} />
            ))}
          </div>
        </nav>

        {/* Toggle Button */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={toggleCollapsed}
            className={cn(
              'flex items-center gap-3 w-full rounded-xl text-sm font-medium hover:bg-slate-800 transition-all',
              isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
            )}
            style={{ color: '#cbd5e1' }}
            title={isCollapsed ? 'Menü erweitern' : 'Menü einklappen'}
          >
            {isCollapsed ? (
              <PanelLeft className="w-5 h-5" />
            ) : (
              <>
                <PanelLeftClose className="w-5 h-5" />
                <span>Einklappen</span>
              </>
            )}
          </button>
        </div>

        {/* User Profile & Logout */}
        <div className="p-3 border-t border-slate-800">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-slate-800/50 rounded-xl">
                <div className="w-9 h-9 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session?.user?.name || 'Admin'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {session?.user?.email || 'admin@energia.de'}
                  </p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors">
                  <Bell className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
                style={{ color: '#cbd5e1' }}
              >
                <LogOut className="w-4 h-4" />
                Abmelden
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button 
                className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-600 transition-colors"
                title={session?.user?.name || 'Admin'}
              >
                <User className="w-4 h-4 text-slate-300" />
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
                title="Abmelden"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Spacer für den Hauptinhalt */}
      <div 
        className={cn(
          'hidden lg:block transition-all duration-300 flex-shrink-0',
          isCollapsed ? 'w-20' : 'w-64'
        )} 
      />
    </>
  )
}

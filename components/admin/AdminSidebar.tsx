'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Package, 
  Users,
  Settings,
  LogOut,
  Zap,
  FileText
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Termine', href: '/admin/termine', icon: Calendar },
  { name: 'Kontaktanfragen', href: '/admin/anfragen', icon: MessageSquare },
  { name: 'Deal der Woche', href: '/admin/deals', icon: Zap },
  { name: 'Deal-Anfragen', href: '/admin/deal-anfragen', icon: Package },
  { name: 'Chat-Verlauf', href: '/admin/chat', icon: Users },
  { name: 'Inhalte', href: '/admin/inhalte', icon: FileText },
  { name: 'Einstellungen', href: '/admin/einstellungen', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-40 px-4 flex items-center justify-between">
        <Logo size="sm" />
        <span className="text-sm text-foreground-muted">Admin</span>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border hidden lg:flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Logo size="md" showSubtitle />
          <span className="text-xs text-foreground-muted mt-2 block">Admin-Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive 
                    ? 'bg-energia-bg text-energia-primary' 
                    : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground-secondary hover:bg-red-50 hover:text-red-600 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Abmelden
          </button>
        </div>
      </aside>
    </>
  )
}


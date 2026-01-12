'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SidebarProvider, useSidebar } from './SidebarProvider'
import { AdminSidebar } from './AdminSidebar'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
  const [isDesktop, setIsDesktop] = useState(false)
  
  // Login-Seite braucht keinen Auth-Check
  const isLoginPage = pathname === '/admin/login'
  
  // Desktop-Check mit useEffect für SSR-Kompatibilität
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])
  
  useEffect(() => {
    if (!isLoginPage && status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router, isLoginPage])
  
  // Login-Seite ohne Sidebar rendern
  if (isLoginPage) {
    return <>{children}</>
  }
  
  // Loading-State
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Lade...</p>
        </div>
      </div>
    )
  }
  
  // Nicht eingeloggt - zeige nichts (Redirect läuft)
  if (!session) {
    return null
  }
  
  // Desktop: margin-left basierend auf Sidebar-Zustand
  const marginLeft = isDesktop ? (isCollapsed ? '80px' : '256px') : '0px'
  
  return (
    <div className="min-h-screen bg-slate-950">
      <AdminSidebar />
      
      {/* Main Content */}
      <main 
        className="min-h-screen transition-all duration-300"
        style={{ 
          marginLeft,
          paddingTop: '100px' // Immer 100px für Mobile Header (64px) + Abstand
        }}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  )
}


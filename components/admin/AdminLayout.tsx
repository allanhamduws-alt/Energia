'use client'

import { AdminSidebar } from './AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 pt-32 lg:pt-6 min-h-screen transition-all duration-300">
        <div className="p-6 sm:p-8 lg:px-12 lg:py-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}


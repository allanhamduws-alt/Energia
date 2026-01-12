'use client'

import { createContext, useContext, useCallback, useSyncExternalStore } from 'react'

// LocalStorage Key
const STORAGE_KEY = 'admin-sidebar-collapsed'

// Store für den Sidebar-State
const sidebarStore = {
  // Subscriber-Liste
  listeners: new Set<() => void>(),
  
  // Aktuellen Wert holen
  getSnapshot: (): boolean => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(STORAGE_KEY) === 'true'
  },
  
  // Server-Snapshot (immer false für SSR)
  getServerSnapshot: (): boolean => false,
  
  // Wert setzen und Listener benachrichtigen
  setCollapsed: (value: boolean) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, String(value))
    sidebarStore.listeners.forEach(listener => listener())
    // Custom Event für Legacy-Komponenten
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { isCollapsed: value } }))
  },
  
  // Subscribe-Funktion für useSyncExternalStore
  subscribe: (listener: () => void) => {
    sidebarStore.listeners.add(listener)
    
    // Storage-Event für Tab-Synchronisation
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) listener()
    }
    window.addEventListener('storage', handleStorage)
    
    return () => {
      sidebarStore.listeners.delete(listener)
      window.removeEventListener('storage', handleStorage)
    }
  },
}

// Context-Interface
interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  toggleCollapsed: () => void
}

// Context erstellen
const SidebarContext = createContext<SidebarContextType | null>(null)

// Provider-Komponente
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore für flackerfreies Rendering
  const isCollapsed = useSyncExternalStore(
    sidebarStore.subscribe,
    sidebarStore.getSnapshot,
    sidebarStore.getServerSnapshot
  )
  
  const setIsCollapsed = useCallback((value: boolean) => {
    sidebarStore.setCollapsed(value)
  }, [])
  
  const toggleCollapsed = useCallback(() => {
    sidebarStore.setCollapsed(!sidebarStore.getSnapshot())
  }, [])
  
  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Hook zum Konsumieren des Contexts
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

// Konstanten für Sidebar-Breiten
export const SIDEBAR_WIDTH = 256 // w-64 = 16rem = 256px
export const SIDEBAR_WIDTH_COLLAPSED = 80 // w-20 = 5rem = 80px


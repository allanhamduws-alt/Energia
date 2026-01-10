'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface InquiryItem {
  id: string
  name: string
  subtitle: string
  category: string
  categoryName: string
  quantity: number
  unit: string // 'Stück', 'kWp', etc.
  specs: string[]
}

interface InquiryCartContextType {
  items: InquiryItem[]
  addItem: (item: Omit<InquiryItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  totalItems: number
}

const InquiryCartContext = createContext<InquiryCartContextType | undefined>(undefined)

export function InquiryCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('energia-inquiry-cart')
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('energia-inquiry-cart', JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = useCallback((item: Omit<InquiryItem, 'id'>) => {
    const id = `${item.category}-${item.name.toLowerCase().replace(/\s+/g, '-')}`
    
    setItems(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) {
        // Update quantity if item exists
        return prev.map(i => 
          i.id === id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      // Add new item
      return [...prev, { ...item, id }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <InquiryCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        totalItems,
      }}
    >
      {children}
    </InquiryCartContext.Provider>
  )
}

export function useInquiryCart() {
  const context = useContext(InquiryCartContext)
  if (context === undefined) {
    throw new Error('useInquiryCart must be used within an InquiryCartProvider')
  }
  return context
}


'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('energia-cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('energia-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('energia-cookie-consent', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-border p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-energia-bg flex items-center justify-center shrink-0">
                <Cookie className="w-6 h-6 text-energia-primary" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  Cookie-Einstellungen
                </h3>
                <p className="text-sm text-foreground-secondary">
                  Wir verwenden Cookies, um Ihnen ein optimales Website-Erlebnis zu bieten. 
                  Dazu gehören technisch notwendige Cookies sowie Cookies für die Chat-Funktion.{' '}
                  <Link href="/datenschutz" className="text-energia-primary hover:underline">
                    Mehr erfahren
                  </Link>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  className="flex-1 md:flex-none"
                >
                  Ablehnen
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAccept}
                  className="flex-1 md:flex-none"
                >
                  Akzeptieren
                </Button>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDecline}
                className="absolute top-4 right-4 md:static p-2 hover:bg-background-secondary rounded-lg transition-colors"
                aria-label="Schließen"
              >
                <X className="w-5 h-5 text-foreground-muted" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


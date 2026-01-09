'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2,
  Phone,
  Mail,
  Package,
  Zap
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickActions = [
  { label: 'Anfrage zu Modulen', icon: Package, message: 'Ich interessiere mich für PV-Module. Welche Hersteller führen Sie?' },
  { label: 'Wechselrichter-Info', icon: Zap, message: 'Können Sie mir etwas über Ihre Wechselrichter erzählen?' },
  { label: 'Telefontermin', icon: Phone, message: 'Wie kann ich einen Telefontermin vereinbaren?' },
  { label: 'Kontaktdaten', icon: Mail, message: 'Wie kann ich Sie direkt kontaktieren?' },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visitorId, setVisitorId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize visitor ID from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('energia-visitor-id')
    if (stored) {
      setVisitorId(stored)
    } else {
      const newId = 'visitor_' + Math.random().toString(36).substring(2, 15)
      localStorage.setItem('energia-visitor-id', newId)
      setVisitorId(newId)
    }

    // Load stored messages
    const storedMessages = localStorage.getItem('energia-chat-messages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('energia-chat-messages', JSON.stringify(messages))
    }
  }, [messages])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          message: content.trim(),
        }),
      })

      const data = await response.json()

      if (data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter connect@energia-b2b.de.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickAction = (message: string) => {
    sendMessage(message)
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('energia-chat-messages')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-energia-primary text-white shadow-lg flex items-center justify-center',
          'hover:bg-energia-secondary transition-colors',
          isOpen && 'hidden'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {messages.filter(m => m.role === 'assistant').length}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-energia-primary to-energia-secondary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Energia Chat</h3>
                    <p className="text-xs text-white/80">Wir sind für Sie da</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-foreground-secondary mb-6">
                    Hallo! 👋 Wie kann ich Ihnen helfen?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleQuickAction(action.message)}
                        className="p-3 text-left bg-background-secondary rounded-xl hover:bg-energia-bg transition-colors"
                      >
                        <action.icon className="w-5 h-5 text-energia-primary mb-2" />
                        <p className="text-sm font-medium text-foreground">{action.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[85%] rounded-2xl px-4 py-3',
                          message.role === 'user'
                            ? 'bg-energia-primary text-white rounded-br-md'
                            : 'bg-background-secondary text-foreground rounded-bl-md'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-background-secondary rounded-2xl rounded-bl-md px-4 py-3">
                        <Loader2 className="w-5 h-5 animate-spin text-energia-primary" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ihre Nachricht..."
                  disabled={isLoading}
                  className="flex-1 h-11 px-4 rounded-xl border border-border bg-background-secondary text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-energia-primary focus:border-energia-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="h-11 w-11 rounded-xl bg-energia-primary text-white flex items-center justify-center hover:bg-energia-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="mt-2 text-xs text-foreground-muted hover:text-foreground transition-colors"
                >
                  Chat löschen
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


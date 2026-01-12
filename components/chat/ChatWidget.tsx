'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2,
  Phone,
  Mail,
  Sparkles,
  Zap,
  Sun,
  Battery,
  ArrowRight
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickActions = [
  { label: 'Solarmodule', icon: Sun, message: 'Ich interessiere mich für PV-Module. Welche Hersteller führen Sie?', color: '#f59e0b' },
  { label: 'Wechselrichter', icon: Zap, message: 'Können Sie mir etwas über Ihre Wechselrichter erzählen?', color: '#3b82f6' },
  { label: 'Speicher', icon: Battery, message: 'Welche Batteriespeicher bieten Sie an?', color: '#10b981' },
  { label: 'Beratung', icon: Phone, message: 'Wie kann ich einen Beratungstermin vereinbaren?', color: '#8b5cf6' },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visitorId, setVisitorId] = useState('')
  const [isHovered, setIsHovered] = useState(false)
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
        // Natural typing delay - simulate reading and thinking (1.5-3 seconds)
        const responseLength = data.response.length
        const baseDelay = 1500 // minimum 1.5 seconds
        const extraDelay = Math.min(responseLength * 8, 1500) // up to 1.5s more based on length
        const typingDelay = baseDelay + Math.random() * extraDelay
        
        await new Promise(resolve => setTimeout(resolve, typingDelay))
        
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
    // Clear messages
    setMessages([])
    localStorage.removeItem('energia-chat-messages')
    
    // Generate NEW visitor ID to start fresh conversation (old one stays in DB for analytics)
    const newId = 'visitor_' + Math.random().toString(36).substring(2, 15)
    localStorage.setItem('energia-visitor-id', newId)
    setVisitorId(newId)
  }

  return (
    <>
      {/* Chat Button - Glasmorphism Style */}
      <motion.button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center',
          'backdrop-blur-xl border transition-all duration-300',
          isOpen && 'hidden'
        )}
        style={{
          background: isHovered 
            ? 'rgba(22, 163, 74, 0.15)' 
            : 'rgba(255, 255, 255, 0.7)',
          borderColor: isHovered 
            ? 'rgba(22, 163, 74, 0.4)' 
            : 'rgba(0, 0, 0, 0.06)',
          boxShadow: isHovered
            ? '0 8px 32px rgba(22, 163, 74, 0.2), 0 0 0 1px rgba(22, 163, 74, 0.1)'
            : '0 4px 24px rgba(0, 0, 0, 0.06)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
      >
        <MessageCircle 
          className="w-6 h-6 transition-colors duration-300" 
          style={{ color: isHovered ? '#16a34a' : '#525252' }}
        />
        {messages.length > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full text-[10px] font-semibold text-white flex items-center justify-center shadow-lg"
          >
            {messages.filter(m => m.role === 'assistant').length}
          </motion.span>
        )}
      </motion.button>

      {/* Chat Window - Modern Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] flex flex-col overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.02)',
            }}
          >
            {/* Header - Clean & Minimal */}
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-[15px]">Energia Assistent</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-xs text-gray-500">Online & bereit zu helfen</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5" style={{ scrollbarWidth: 'thin' }}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col">
                  {/* Welcome Message */}
                  <div className="text-center pt-4 pb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Willkommen bei Energia
                      </h4>
                      <p className="text-sm text-gray-500">
                        Ihr Partner für Photovoltaik-Lösungen im B2B
                      </p>
                    </motion.div>
                  </div>

                  {/* Quick Actions Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        onClick={() => handleQuickAction(action.message)}
                        className="group relative p-4 text-left rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/50 transition-all duration-200"
                        style={{
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${action.color}15`,
                          }}
                        >
                          <action.icon 
                            className="w-[18px] h-[18px]" 
                            style={{ color: action.color }}
                          />
                        </div>
                        <p className="text-[13px] font-medium text-gray-800 group-hover:text-gray-900">
                          {action.label}
                        </p>
                        <ArrowRight 
                          className="absolute bottom-4 right-4 w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" 
                        />
                      </motion.button>
                    ))}
                  </div>

                  {/* Hint */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-xs text-gray-400 mt-auto pt-6"
                  >
                    Oder schreiben Sie mir direkt Ihre Frage
                  </motion.p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] px-4 py-3',
                          message.role === 'user'
                            ? 'rounded-2xl rounded-br-md text-white'
                            : 'rounded-2xl rounded-bl-md text-gray-800'
                        )}
                        style={{
                          background: message.role === 'user'
                            ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                            : '#f4f4f5',
                          boxShadow: message.role === 'user'
                            ? '0 2px 8px rgba(22, 163, 74, 0.25)'
                            : 'none',
                        }}
                      >
                        <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-gray-500 font-medium">schreibt</span>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input - Minimal & Clean */}
            <div className="px-6 py-5 border-t border-gray-100 bg-white/80">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Schreiben Sie eine Nachricht..."
                    disabled={isLoading}
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 transition-all text-[14px]"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: inputValue.trim() && !isLoading
                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                        : 'transparent',
                      color: inputValue.trim() && !isLoading ? 'white' : '#9ca3af',
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
              {messages.length > 0 && (
                <div className="flex justify-center mt-3">
                  <button
                    onClick={clearChat}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                  >
                    Gespräch beenden
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


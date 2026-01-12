'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessagesSquare, 
  Search,
  Filter,
  ChevronDown,
  Clock,
  User,
  Mail,
  Eye,
  EyeOff,
  Send,
  MessageCircle,
  ArrowLeft,
  Trash2,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Sparkles,
  Bot,
  UserCircle
} from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'admin'
  content: string
  createdAt: string
}

interface ChatConversation {
  id: string
  visitorId: string
  email: string | null
  name: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  messages: ChatMessage[]
}

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null)
  const [adminMessage, setAdminMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedConversation?.messages])

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/chat')
      if (res.ok) {
        const data = await res.json()
        setConversations(data)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleConversationStatus = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/chat/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })
      if (res.ok) {
        setConversations(prev =>
          prev.map(conv =>
            conv.id === id ? { ...conv, isActive: !isActive } : conv
          )
        )
        if (selectedConversation?.id === id) {
          setSelectedConversation(prev => prev ? { ...prev, isActive: !isActive } : null)
        }
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  const deleteConversation = async (id: string) => {
    if (!confirm('Möchten Sie diese Konversation wirklich löschen?')) return
    
    try {
      const res = await fetch(`/api/chat/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setConversations(prev => prev.filter(conv => conv.id !== id))
        if (selectedConversation?.id === id) {
          setSelectedConversation(null)
        }
      }
    } catch (error) {
      console.error('Error deleting conversation:', error)
    }
  }

  const sendAdminMessage = async () => {
    if (!adminMessage.trim() || !selectedConversation || sendingMessage) return

    setSendingMessage(true)
    try {
      const res = await fetch(`/api/chat/${selectedConversation.id}/admin-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: adminMessage.trim() }),
      })
      
      if (res.ok) {
        const newMessage = await res.json()
        // Update selected conversation with new message
        setSelectedConversation(prev => {
          if (!prev) return null
          return {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        })
        // Also update in conversations list
        setConversations(prev =>
          prev.map(conv =>
            conv.id === selectedConversation.id
              ? { ...conv, messages: [...conv.messages, newMessage], updatedAt: new Date().toISOString() }
              : conv
          )
        )
        setAdminMessage('')
      }
    } catch (error) {
      console.error('Error sending admin message:', error)
    } finally {
      setSendingMessage(false)
    }
  }

  const filteredConversations = conversations.filter(conv => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      conv.visitorId.toLowerCase().includes(searchLower) ||
      (conv.email?.toLowerCase().includes(searchLower)) ||
      (conv.name?.toLowerCase().includes(searchLower)) ||
      conv.messages.some(m => m.content.toLowerCase().includes(searchLower))
    
    const matchesStatus = !statusFilter || 
      (statusFilter === 'active' && conv.isActive) ||
      (statusFilter === 'inactive' && !conv.isActive)
    
    return matchesSearch && matchesStatus
  })

  const activeCount = conversations.filter(c => c.isActive).length
  const totalMessages = conversations.reduce((acc, c) => acc + c.messages.length, 0)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getLastMessage = (conv: ChatConversation) => {
    if (conv.messages.length === 0) return 'Keine Nachrichten'
    const lastMsg = conv.messages[conv.messages.length - 1]
    return lastMsg.content.length > 60 
      ? lastMsg.content.substring(0, 60) + '...' 
      : lastMsg.content
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Chat-Verlauf</h1>
          <p className="text-foreground-secondary mt-1">
            KI-Chat Konversationen mit Website-Besuchern
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
            {activeCount} aktiv
          </span>
          <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
            {totalMessages} Nachrichten
          </span>
          <button
            onClick={() => fetchConversations()}
            className="p-2.5 rounded-xl bg-card border border-border text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-all"
            title="Aktualisieren"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Conversations List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-background-secondary border border-border rounded-2xl flex flex-col ${selectedConversation ? 'hidden lg:flex lg:w-96' : 'w-full'}`}
        >
          {/* Search & Filters */}
          <div className="p-4 border-b border-border">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 h-10 px-4 rounded-xl border transition-all text-sm ${
                  showFilters 
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' 
                    : 'border-border bg-card text-foreground-secondary hover:bg-background-secondary'
                }`}
              >
                <Filter className="w-4 h-4" />
                <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-border overflow-hidden"
                >
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="">Alle Status</option>
                    <option value="active">Aktiv</option>
                    <option value="inactive">Beendet</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessagesSquare className="w-7 h-7 text-foreground-muted" />
                </div>
                <p className="text-foreground-secondary text-sm">Keine Konversationen gefunden</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredConversations.map((conv, index) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-4 text-left hover:bg-card/50 transition-all ${
                      selectedConversation?.id === conv.id ? 'bg-card/70' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        conv.isActive 
                          ? 'bg-emerald-500/10 border border-emerald-500/20' 
                          : 'bg-card border border-border'
                      }`}>
                        <MessageCircle className={`w-5 h-5 ${
                          conv.isActive ? 'text-emerald-400' : 'text-foreground-muted'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground text-sm truncate">
                            {conv.name || conv.email || `Besucher ${conv.visitorId.slice(-6)}`}
                          </span>
                          {conv.isActive && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-foreground-secondary text-xs truncate mb-1.5">
                          {getLastMessage(conv)}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-foreground-muted">
                          <span>{conv.messages.length} Nachrichten</span>
                          <span>·</span>
                          <span>{formatDate(conv.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Chat Detail View */}
        <AnimatePresence mode="wait">
          {selectedConversation ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 bg-background-secondary border border-border rounded-2xl flex flex-col min-h-0"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden p-2 rounded-xl hover:bg-card text-foreground-secondary hover:text-foreground transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedConversation.isActive 
                      ? 'bg-emerald-500/10 border border-emerald-500/20' 
                      : 'bg-card border border-border'
                  }`}>
                    <MessageCircle className={`w-5 h-5 ${
                      selectedConversation.isActive ? 'text-emerald-400' : 'text-foreground-muted'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {selectedConversation.name || selectedConversation.email || `Besucher ${selectedConversation.visitorId.slice(-6)}`}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-foreground-secondary">
                      {selectedConversation.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {selectedConversation.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Erstellt: {formatDate(selectedConversation.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleConversationStatus(selectedConversation.id, selectedConversation.isActive)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedConversation.isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-card text-foreground-secondary border border-border hover:bg-background-secondary'
                    }`}
                    title={selectedConversation.isActive ? 'Konversation beenden' : 'Konversation aktivieren'}
                  >
                    {selectedConversation.isActive ? (
                      <>
                        <ToggleRight className="w-4 h-4" />
                        <span className="hidden sm:inline">Aktiv</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Beendet</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => deleteConversation(selectedConversation.id)}
                    className="p-2 rounded-xl text-foreground-secondary hover:text-red-400 hover:bg-red-500/10 transition-all border border-border hover:border-red-500/20"
                    title="Löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-foreground-muted text-sm">Keine Nachrichten in dieser Konversation</p>
                  </div>
                ) : (
                  selectedConversation.messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[80%] ${
                        msg.role === 'user' ? 'flex-row-reverse' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user' 
                            ? 'bg-blue-500/10 border border-blue-500/20' 
                            : msg.role === 'admin'
                            ? 'bg-purple-500/10 border border-purple-500/20'
                            : 'bg-emerald-500/10 border border-emerald-500/20'
                        }`}>
                          {msg.role === 'user' ? (
                            <UserCircle className="w-4 h-4 text-blue-400" />
                          ) : msg.role === 'admin' ? (
                            <User className="w-4 h-4 text-purple-400" />
                          ) : (
                            <Bot className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                        <div>
                          <div className={`px-4 py-2.5 rounded-2xl ${
                            msg.role === 'user'
                              ? 'bg-blue-500/10 border border-blue-500/20 rounded-tr-md'
                              : msg.role === 'admin'
                              ? 'bg-purple-500/10 border border-purple-500/20 rounded-tl-md'
                              : 'bg-card border border-border rounded-tl-md'
                          }`}>
                            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                              {msg.content}
                            </p>
                          </div>
                          <div className={`mt-1 flex items-center gap-2 text-xs text-foreground-muted ${
                            msg.role === 'user' ? 'justify-end' : ''
                          }`}>
                            <span>
                              {msg.role === 'user' ? 'Besucher' : msg.role === 'admin' ? 'Admin' : 'KI-Assistent'}
                            </span>
                            <span>·</span>
                            <span>{formatDate(msg.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Admin Reply Input */}
              <div className="p-4 border-t border-border bg-background-secondary/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-foreground-secondary">Als Admin antworten</span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendAdminMessage()}
                    placeholder="Nachricht als Admin senden..."
                    disabled={sendingMessage}
                    className="flex-1 h-11 px-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm disabled:opacity-50"
                  />
                  <button
                    onClick={sendAdminMessage}
                    disabled={!adminMessage.trim() || sendingMessage}
                    className="h-11 px-5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {sendingMessage ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Senden
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden lg:flex flex-1 bg-background-secondary border border-border rounded-2xl items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessagesSquare className="w-8 h-8 text-foreground-muted" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Konversation auswählen</h3>
                <p className="text-foreground-secondary text-sm max-w-xs">
                  Wählen Sie eine Konversation aus der Liste, um den Chat-Verlauf anzuzeigen
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


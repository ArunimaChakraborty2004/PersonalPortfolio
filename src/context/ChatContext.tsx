import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { FilterCategory } from '../data/portfolio'
import { processChatInput } from '../utils/chatEngine'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatContextValue {
  messages: ChatMessage[]
  activeFilter: FilterCategory | null
  isTyping: boolean
  sendMessage: (input: string) => void
  setFilter: (filter: FilterCategory | null) => void
  clearFilter: () => void
  isBlockHighlighted: (categories: FilterCategory[]) => boolean
}

const ChatContext = createContext<ChatContextValue | null>(null)

let messageId = 0
function nextId() {
  return `msg-${++messageId}`
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextId(),
      role: 'assistant',
      content:
        "Hi! I'm Arunima's resume assistant. Ask me about her experience, projects, skills, or education — I'll guide you through her background and highlight the relevant sections.",
      timestamp: new Date(),
    },
  ])
  const [activeFilter, setActiveFilter] = useState<FilterCategory | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const setFilter = useCallback((filter: FilterCategory | null) => {
    setActiveFilter(filter)
  }, [])

  const clearFilter = useCallback(() => {
    setActiveFilter(null)
  }, [])

  const isBlockHighlighted = useCallback(
    (categories: FilterCategory[]) => {
      if (!activeFilter) return true
      return categories.includes(activeFilter)
    },
    [activeFilter],
  )

  const sendMessage = useCallback((input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: ChatMessage = {
      id: nextId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const response = processChatInput(trimmed)
      const assistantMessage: ChatMessage = {
        id: nextId(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setActiveFilter(response.filter)
      setIsTyping(false)
    }, 500 + Math.random() * 300)
  }, [])

  const value = useMemo(
    () => ({
      messages,
      activeFilter,
      isTyping,
      sendMessage,
      setFilter,
      clearFilter,
      isBlockHighlighted,
    }),
    [
      messages,
      activeFilter,
      isTyping,
      sendMessage,
      setFilter,
      clearFilter,
      isBlockHighlighted,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}

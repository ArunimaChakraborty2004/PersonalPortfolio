import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useChat } from '../context/ChatContext'

const SUGGESTIONS = [
  'Tell me about her cybersecurity experience',
  'What projects has she built?',
  "What's her tech stack?",
  'Show all sections',
]

function formatMessage(text: string) {
  return text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-text-light">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return (
        <em key={i} className="text-text-secondary">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const { messages, isTyping, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-deep-navy/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(560px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-deep-border bg-deep-card shadow-2xl shadow-pink/10 md:bottom-28 md:right-8"
          >
            <div className="flex items-center justify-between border-b border-deep-border bg-gradient-to-r from-deep-blue to-deep-elevated px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink to-pink-dark shadow-lg shadow-pink/30">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text-light">
                    Resume Assistant
                  </h2>
                  <p className="text-xs text-pink-light">
                    Ask about Arunima&apos;s background
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-text-muted transition-colors hover:bg-deep-elevated hover:text-text-light"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-deep-border px-3 py-2.5">
              <div className="flex gap-2 overflow-x-auto pb-0.5">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="shrink-0 rounded-full border border-deep-border bg-deep-elevated px-3 py-1 text-[11px] text-text-secondary transition-colors hover:border-pink/40 hover:text-pink-light"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink to-pink-dark">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={[
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-pink to-pink-dark text-white'
                        : 'border border-deep-border bg-deep-elevated text-text-secondary',
                    ].join(' ')}
                  >
                    {msg.role === 'assistant'
                      ? formatMessage(msg.content)
                      : msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink to-pink-dark">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl border border-deep-border bg-deep-elevated px-4 py-3">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-pink-light" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-pink-light" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-pink-light" />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-deep-border bg-deep-blue p-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-deep-border bg-deep-elevated px-4 py-2 focus-within:border-pink/50 focus-within:ring-2 focus-within:ring-pink/20">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, projects, skills..."
                  className="flex-1 bg-transparent text-sm text-text-light outline-none placeholder:text-text-muted"
                  autoComplete="off"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink to-pink-dark text-white disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import ChatPanel from './ChatPanel'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="chat-fab-pulse fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink via-pink-light to-pink-dark text-white shadow-xl shadow-pink/40 md:bottom-8 md:right-8 md:h-16 md:w-16"
        aria-label={isOpen ? 'Close resume assistant' : 'Open resume assistant'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <MessageCircle className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
        </motion.div>
      </motion.button>
    </>
  )
}

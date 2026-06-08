import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useChat } from '../context/ChatContext'
import type { FilterCategory } from '../data/portfolio'

interface BentoCardProps {
  id: string
  categories: FilterCategory[]
  children: ReactNode
  className?: string
}

export default function BentoCard({
  id,
  categories,
  children,
  className = '',
}: BentoCardProps) {
  const { activeFilter, isBlockHighlighted } = useChat()
  const highlighted = isBlockHighlighted(categories)
  const dimmed = activeFilter !== null && !highlighted

  return (
    <motion.article
      id={id}
      layout
      layoutId={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: dimmed ? 0.4 : 1,
        scale: dimmed ? 0.98 : highlighted && activeFilter ? 1.01 : 1,
      }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      }}
      className={[
        'relative overflow-hidden rounded-2xl border bg-deep-card transition-shadow duration-300',
        highlighted && activeFilter
          ? 'border-pink/50 shadow-lg shadow-pink/15 ring-2 ring-pink/25'
          : 'border-deep-border hover:border-pink/25 hover:shadow-md hover:shadow-pink/5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </motion.article>
  )
}

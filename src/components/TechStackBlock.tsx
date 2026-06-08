import { motion } from 'framer-motion'
import { useState } from 'react'
import { Wrench } from 'lucide-react'
import { SKILL_CATEGORIES } from '../data/portfolio'
import BentoCard from './BentoCard'

export default function TechStackBlock() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <BentoCard
      id="tech-stack"
      categories={['tech-stack']}
      className="col-span-1 p-5 md:col-span-2 md:p-6 lg:col-span-1"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink/20">
          <Wrench className="h-4 w-4 text-pink-light" />
        </div>
        <h2 className="text-sm font-semibold text-text-light">Skills</h2>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {SKILL_CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.label}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(i)}
            className={[
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              activeCategory === i
                ? 'bg-gradient-to-r from-pink to-pink-dark text-white shadow-md shadow-pink/25'
                : 'border border-deep-border bg-deep-elevated text-text-secondary hover:border-pink/30 hover:text-pink-light',
            ].join(' ')}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-deep-border bg-deep-elevated px-3 py-1.5 text-xs font-medium text-text-secondary"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </BentoCard>
  )
}

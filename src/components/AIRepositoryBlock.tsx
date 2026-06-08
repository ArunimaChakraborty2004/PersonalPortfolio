import { motion } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'
import { AI_PROJECTS } from '../data/portfolio'
import BentoCard from './BentoCard'
import OrgLogo from './OrgLogo'

export default function AIRepositoryBlock() {
  return (
    <BentoCard
      id="ai-repository"
      categories={['fullstack', 'ai-robotics']}
      className="col-span-1 p-5 md:col-span-2 md:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink/20">
          <FolderGit2 className="h-4 w-4 text-pink-light" />
        </div>
        <h2 className="text-sm font-semibold text-text-light">Projects</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {AI_PROJECTS.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-deep-border bg-deep-elevated p-4 transition-colors hover:border-pink/30"
          >
            <div className="flex items-start gap-3">
              {project.image && (
                <OrgLogo
                  src={project.image}
                  alt={project.highlight ?? project.name}
                  className="h-10 w-10 shrink-0 rounded-lg bg-white p-1"
                />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-text-light">
                  {project.name}
                </h3>

                {project.highlight && (
                  <span className="mt-1.5 inline-block rounded-full bg-pink/15 px-2.5 py-0.5 text-xs font-medium text-pink-light">
                    {project.highlight}
                  </span>
                )}

                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-deep-border bg-deep-card px-2 py-0.5 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  )
}

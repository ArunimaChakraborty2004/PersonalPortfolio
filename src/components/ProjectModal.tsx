import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2, Database, Layout, Network, ShieldAlert, Cpu, Sparkles } from 'lucide-react'
import { createPortal } from 'react-dom'
import type { ProjectItem } from './ProjectsTab'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-deep-navy/80 backdrop-blur-md overflow-hidden"
        onClick={onClose}
      >
        {/* Premium Floating Background Elements for Modal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            animate={{ x: [0, 80, -50, 0], y: [0, -60, 80, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-pink/40 blur-3xl opacity-60"
          />
          <motion.div
            animate={{ x: [0, -80, 60, 0], y: [0, 70, -40, 0], scale: [1, 1.3, 0.8, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-indigo-500/40 blur-3xl opacity-60"
          />
        </div>

        {/* ... (rest remains the same) ... */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-pink/30 bg-deep-navy/95 shadow-2xl shadow-pink/20 scrollbar-hide"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-deep-card/50 text-text-muted hover:text-pink-light hover:bg-pink/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-8 space-y-8">
            {/* Header section */}
            <div className="space-y-4 pr-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-light bg-gradient-to-r from-text-light via-pink-light to-pink bg-clip-text text-transparent">
                {project.name}
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-pink/10 text-pink-light border border-pink/20">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={project.liveDemoUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    project.liveDemoUrl 
                      ? 'bg-gradient-to-r from-pink to-pink-dark text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:-translate-y-0.5' 
                      : 'bg-deep-card text-text-muted cursor-not-allowed border border-deep-border/50'
                  }`}
                  onClick={(e) => !project.liveDemoUrl && e.preventDefault()}
                >
                  <ExternalLink className="w-4 h-4" />
                  {project.liveDemoUrl ? 'Live Demo' : 'Live Demo (TODO)'}
                </a>
                
                <a
                  href={project.githubUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    project.githubUrl
                      ? 'bg-deep-card text-text-light hover:text-pink-light border border-deep-border hover:border-pink/50 hover:bg-pink/5 hover:-translate-y-0.5'
                      : 'bg-deep-card text-text-muted cursor-not-allowed border border-deep-border/50'
                  }`}
                  onClick={(e) => !project.githubUrl && e.preventDefault()}
                >
                  <Code2 className="w-4 h-4" />
                  {project.githubUrl ? 'GitHub Repository' : 'GitHub (TODO)'}
                </a>
              </div>
            </div>

            {/* Detailed Sections */}
            {project.details && (
              <div className="space-y-8 border-t border-deep-border/50 pt-8">
                
                {/* Overview & Problem Statement */}
                <div className="grid md:grid-cols-2 gap-6">
                  {project.details.overview && (
                    <div className="space-y-3 bg-deep-card/30 p-5 rounded-xl border border-deep-border/40">
                      <h3 className="text-sm font-bold text-pink-light uppercase tracking-wider flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Project Overview
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{project.details.overview}</p>
                    </div>
                  )}
                  {project.details.problemStatement && (
                    <div className="space-y-3 bg-deep-card/30 p-5 rounded-xl border border-deep-border/40">
                      <h3 className="text-sm font-bold text-pink-light uppercase tracking-wider flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Problem Statement
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{project.details.problemStatement}</p>
                    </div>
                  )}
                </div>

                {/* Features List */}
                {project.details.features && project.details.features.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-pink-light uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {project.details.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-text-secondary bg-deep-card/20 p-3 rounded-lg border border-deep-border/30 hover:border-pink/30 transition-colors">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architecture & Workflow */}
                {(project.details.architecture || project.details.workflow) && (
                  <div className="space-y-4 bg-deep-card/20 p-5 rounded-xl border border-deep-border/40">
                    <h3 className="text-sm font-bold text-pink-light uppercase tracking-wider flex items-center gap-2">
                      <Network className="w-4 h-4" /> Architecture & Workflow
                    </h3>
                    {project.details.architecture && (
                      <div className="space-y-2">
                        <strong className="text-sm text-text-light">Architecture:</strong>
                        <p className="text-sm text-text-secondary">{project.details.architecture}</p>
                      </div>
                    )}
                    {project.details.workflow && (
                      <div className="space-y-2 mt-4">
                        <strong className="text-sm text-text-light">Workflow:</strong>
                        <p className="text-sm text-text-secondary">{project.details.workflow}</p>
                      </div>
                    )}
                  </div>
                )}



                {/* Contributions & Challenges */}
                {(project.details.contributions || project.details.challenges) && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.details.contributions && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-pink-light uppercase tracking-wider flex items-center gap-2">
                          <Cpu className="w-4 h-4" /> My Contributions
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{project.details.contributions}</p>
                      </div>
                    )}
                    {project.details.challenges && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-pink-light uppercase tracking-wider flex items-center gap-2">
                          <Database className="w-4 h-4" /> Challenges Faced
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{project.details.challenges}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Future Enhancements */}
                {project.details.futureEnhancements && (
                  <div className="space-y-3 pt-4 border-t border-deep-border/30">
                    <h3 className="text-sm font-bold text-text-light">Future Enhancements</h3>
                    <p className="text-sm text-text-secondary">{project.details.futureEnhancements}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

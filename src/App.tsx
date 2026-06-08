import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ChatProvider } from './context/ChatContext'
import ProfileImage from './components/ProfileImage'
import FloatingChat from './components/FloatingChat'

// Import tabs
import OverviewTab from './components/OverviewTab'
import ExperienceTab from './components/ExperienceTab'
import ProjectsTab from './components/ProjectsTab'
import PlaygroundTab from './components/PlaygroundTab'
import SkillsContactTab from './components/SkillsContactTab'

type TabType = 'overview' | 'experience' | 'projects' | 'playground' | 'contact'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'AI Playground' },
    { id: 'contact', label: 'Skills & Contact' },
  ]

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigate={setActiveTab} />
      case 'experience':
        return <ExperienceTab />
      case 'projects':
        return <ProjectsTab />
      case 'playground':
        return <PlaygroundTab />
      case 'contact':
        return <SkillsContactTab />
      default:
        return <OverviewTab onNavigate={setActiveTab} />
    }
  }

  return (
    <ChatProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-deep-navy pb-16">
        {/* Background Gradients */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 20% 0%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 65% 45% at 90% 90%, rgba(99, 102, 241, 0.07) 0%, transparent 55%),
              radial-gradient(ellipse 50% 30% at 50% 50%, rgba(15, 33, 71, 0.6) 0%, transparent 70%)
            `,
          }}
        />

        {/* Sticky Header Glass Navbar */}
        <header className="sticky top-0 z-50 border-b border-deep-border/60 bg-deep-navy/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
            
            {/* Left brand logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
              <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-pink/40 shadow-sm shadow-pink/10">
                <ProfileImage className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-text-light">
                  Arunima Chakraborty
                </span>
                <span className="text-[10px] font-semibold text-pink-light tracking-wider">
                  PORTFOLIO & CO-PILOT
                </span>
              </div>
            </div>

            {/* Desktop Navbar menu items */}
            <nav className="hidden items-center gap-1.5 md:flex">
              {navItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={[
                      'relative rounded-xl px-4 py-2 text-xs font-bold transition-all duration-350 cursor-pointer',
                      isActive ? 'text-pink-light bg-pink/10 border border-pink/20' : 'text-text-secondary hover:text-pink-light border border-transparent'
                    ].join(' ')}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-3.25 left-4 right-4 h-0.5 rounded-full bg-pink shadow-md shadow-pink-glow"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Mobile menu button toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-xl border border-deep-border/80 bg-deep-card/50 p-2 text-text-light transition-colors hover:border-pink/30 hover:text-pink"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation panel dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-deep-border/50 bg-deep-navy/95 backdrop-blur-xl md:hidden"
              >
                <div className="flex flex-col gap-1 px-4 py-3">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as TabType)
                          setMobileMenuOpen(false)
                        }}
                        className={[
                          'w-full text-left rounded-xl px-4 py-3 text-xs font-bold transition-all',
                          isActive ? 'text-pink-light bg-pink/10 border border-pink/20' : 'text-text-secondary border border-transparent'
                        ].join(' ')}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Tab content space */}
        <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-deep-border/40 mt-12 py-6 text-center">
          <p className="text-xs text-text-muted">
            © 2026 Arunima Chakraborty · Bengaluru, India
          </p>
        </footer>

        {/* Floating AI assistant bubble - hidden when on AI Playground tab */}
        {activeTab !== 'playground' && <FloatingChat />}
      </div>
    </ChatProvider>
  )
}

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, Copy, Send, Wrench, MessageSquare } from 'lucide-react'
import { CONTACT, SKILL_CATEGORIES } from '../data/portfolio'

export default function SkillsContactTab() {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1200)
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Skill Stack Column */}
      <div className="space-y-6 lg:col-span-5">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-light flex items-center gap-2">
            <Wrench className="h-5 w-5 text-pink" /> Technical Skills
          </h2>
          <p className="text-xs text-text-muted">
            Specialized toolsets, architectures, and programming foundations.
          </p>
        </div>

        {/* Infinite Scrolling Tech Marquee (Dual Row) */}
        <div className="overflow-hidden relative w-full flex flex-col gap-3 py-4 bg-deep-card/20 border border-deep-border/50 rounded-2xl">
           <div className="flex w-max animate-marquee gap-3 pl-4 hover:[animation-play-state:paused]">
             {[...SKILL_CATEGORIES.flatMap(c => c.skills), ...SKILL_CATEGORIES.flatMap(c => c.skills)].map((skill, idx) => (
                <span key={`row1-${idx}`} className="rounded-lg border border-pink/30 bg-pink/10 px-3 py-1.5 text-xs font-semibold text-pink-light shadow-[0_0_10px_rgba(236,72,153,0.15)] whitespace-nowrap">
                  {skill}
                </span>
             ))}
           </div>
           <div className="flex w-max animate-marquee-reverse gap-3 pl-4 hover:[animation-play-state:paused]">
             {[...SKILL_CATEGORIES.flatMap(c => [...c.skills].reverse()), ...SKILL_CATEGORIES.flatMap(c => [...c.skills].reverse())].map((skill, idx) => (
                <span key={`row2-${idx}`} className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.15)] whitespace-nowrap">
                  {skill}
                </span>
             ))}
           </div>
           
           {/* Fade gradients */}
           <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-deep-navy to-transparent pointer-events-none" />
           <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-deep-navy to-transparent pointer-events-none" />
        </div>

        <div className="space-y-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="rounded-2xl border border-deep-border/50 bg-deep-card/20 p-5 space-y-3"
            >
              <h3 className="text-xs font-bold text-pink-light uppercase tracking-wider">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-deep-border/60 bg-deep-elevated/40 px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-pink/35 hover:text-pink-light transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Column */}
      <div className="space-y-6 lg:col-span-7">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-light flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-pink" /> Get in Touch
          </h2>
          <p className="text-xs text-text-muted">
            Send a direct message or copy her official details.
          </p>
        </div>

        <div className="rounded-2xl border border-deep-border/50 bg-deep-card/25 p-5 md:p-6 space-y-6">
          {/* Quick Contact Info */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-deep-border/40 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink/15">
                <Mail className="h-5 w-5 text-pink-light" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Official Email</p>
                <p className="text-sm font-semibold text-text-light">{CONTACT.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={handleCopy}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink to-pink-dark px-4 py-2 text-xs font-bold text-white shadow-md shadow-pink/15 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Email
                  </>
                )}
              </motion.button>
              
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-deep-border bg-deep-elevated/60 text-text-secondary transition-colors hover:border-pink/40 hover:text-pink-light"
                aria-label="LinkedIn"
              >
                <span className="text-[10px] font-bold">LN</span>
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-deep-border bg-deep-elevated/60 text-text-secondary transition-colors hover:border-pink/40 hover:text-pink-light"
                aria-label="GitHub"
              >
                <span className="text-[10px] font-bold">GH</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-text-secondary">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-deep-border bg-deep-navy/55 px-4 py-2.5 text-sm text-text-light placeholder:text-text-muted focus:border-pink/55 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-text-secondary">Your Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="johndoe@example.com"
                  className="w-full rounded-xl border border-deep-border bg-deep-navy/55 px-4 py-2.5 text-sm text-text-light placeholder:text-text-muted focus:border-pink/55 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-text-secondary">Your Message</label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Arunima, I'd love to connect..."
                className="w-full rounded-xl border border-deep-border bg-deep-navy/55 px-4 py-2.5 text-sm text-text-light placeholder:text-text-muted focus:border-pink/55 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <AnimatePresence>
                {submitSuccess && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-bold text-emerald-400"
                  >
                    ✓ Message sent successfully!
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-auto flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink to-pink-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink/20 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import { EDUCATION, PROFILE } from '../data/portfolio'
import BentoCard from './BentoCard'
import OrgLogo from './OrgLogo'
import ProfileImage from './ProfileImage'

export default function ProfileBlock() {
  return (
    <BentoCard
      id="profile"
      categories={['profile']}
      className="col-span-1 p-6 md:col-span-2 md:p-8 lg:col-span-3"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto shrink-0 lg:mx-0"
        >
          <div className="h-36 w-36 overflow-hidden rounded-2xl ring-4 ring-pink/40 shadow-xl shadow-pink/20 md:h-44 md:w-44">
            <ProfileImage className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-xl bg-white p-1 shadow-lg ring-2 ring-pink/30">
            <OrgLogo
              src={EDUCATION.logo}
              alt="Christ University"
              className="h-10 w-10 rounded-lg bg-white p-1"
            />
          </div>
        </motion.div>

        <div className="flex-1 space-y-4 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h1 className="bg-gradient-to-r from-text-light via-pink-light to-pink bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {PROFILE.name}
            </h1>
            <p className="mt-2 text-lg text-pink-light md:text-xl">
              {PROFILE.title}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-center gap-2 text-sm text-text-secondary lg:justify-start"
          >
            <MapPin className="h-4 w-4 text-pink" />
            <span>{PROFILE.location}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base lg:mx-0"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-pink/30 bg-pink/10 px-4 py-2 text-sm font-medium text-pink-light"
          >
            <Briefcase className="h-4 w-4" />
            <span>{PROFILE.status}</span>
          </motion.div>
        </div>
      </div>
    </BentoCard>
  )
}

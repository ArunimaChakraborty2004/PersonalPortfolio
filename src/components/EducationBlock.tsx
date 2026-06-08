import { GraduationCap } from 'lucide-react'
import { EDUCATION } from '../data/portfolio'
import BentoCard from './BentoCard'
import OrgLogo from './OrgLogo'

export default function EducationBlock() {
  return (
    <BentoCard
      id="education"
      categories={['profile']}
      className="col-span-1 p-5 md:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink/20">
          <GraduationCap className="h-4 w-4 text-pink-light" />
        </div>
        <h2 className="text-sm font-semibold text-text-light">Education</h2>
      </div>

      <div className="flex items-start gap-4">
        <OrgLogo
          src={EDUCATION.logo}
          alt={`${EDUCATION.school} logo`}
          className="h-16 w-16 shrink-0 rounded-xl bg-white p-2 shadow-md ring-2 ring-pink/30"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-text-light">
            {EDUCATION.school}
          </h3>
          <p className="mt-1 text-sm text-pink-light">{EDUCATION.degree}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-deep-elevated px-2.5 py-0.5 text-xs text-text-secondary">
              CGPA: {EDUCATION.cgpa}
            </span>
            <span className="rounded-full bg-deep-elevated px-2.5 py-0.5 text-xs text-text-secondary">
              {EDUCATION.period}
            </span>
          </div>
          <p className="mt-2 text-xs text-text-muted">{EDUCATION.location}</p>
        </div>
      </div>
    </BentoCard>
  )
}

import { FileText, Shield } from 'lucide-react'
import { CYBERSECURITY } from '../data/portfolio'
import BentoCard from './BentoCard'
import OrgLogo from './OrgLogo'

export default function CybersecurityBlock() {
  return (
    <BentoCard
      id="cybersecurity"
      categories={['cybersecurity']}
      className="col-span-1 p-5 md:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink/20">
            <Shield className="h-4 w-4 text-pink-light" />
          </div>
          <h2 className="text-sm font-semibold text-text-light">Cybersecurity</h2>
        </div>
        <OrgLogo
          src={CYBERSECURITY.logo}
          alt="Directorate of Information"
          className="h-10 w-10 rounded-lg bg-white p-1"
        />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-pink-light uppercase">
            Internship
          </p>
          <p className="mt-1 text-sm font-medium text-text-light">
            {CYBERSECURITY.role}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {CYBERSECURITY.roleDetails}
          </p>
        </div>

        <div className="rounded-xl border border-deep-border bg-deep-elevated p-3.5">
          <div className="mb-1.5 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-pink" />
            <span className="text-xs font-medium text-pink-light">
              Research Publication
            </span>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary italic">
            &ldquo;{CYBERSECURITY.publication}&rdquo;
          </p>
        </div>

        <div className="rounded-xl border border-pink/20 bg-gradient-to-br from-pink/10 to-transparent p-3.5">
          <p className="text-xs font-medium text-pink-light">Featured Project</p>
          <h3 className="mt-1 text-sm font-semibold text-text-light">
            {CYBERSECURITY.project.name}
          </h3>
          <p className="mt-1 text-xs text-text-muted">
            {CYBERSECURITY.project.stack}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {CYBERSECURITY.project.description}
          </p>
        </div>
      </div>
    </BentoCard>
  )
}

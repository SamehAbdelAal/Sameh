import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '../i18n'

const EXPERIENCE = [
  {
    company: 'Taqat Techno',
    note: 'Qatar',
    location: 'On-site, Maadi',
    type: 'Full-time',
    period: 'Jan 2024 – Jan 2025',
    role: 'Odoo Developer — Fullstack (v16–v17)',
    points: [
      { text: '8+ custom fullstack solutions from scratch — QWeb themes, OWL.js components, custom models, wizards.', bold: true },
      { text: '~30% faster delivery via reusable QWeb component library — adopted as standard across all projects.', bold: true },
      { text: '5+ responsive Figma-to-production Odoo theme implementations.', bold: false },
      { text: 'Managed v16 legacy maintenance while onboarding new v17 projects simultaneously.', bold: false },
    ],
  },
  {
    company: 'TechRise',
    note: 'UAE',
    location: 'Remote',
    type: 'Part-time',
    period: 'Jan 2025 – Present',
    role: 'Odoo Developer — Fullstack (v17–v19)',
    points: [
      { text: '5+ core modules in production: Sales, Inventory, CRM, Accounting, Manufacturing.', bold: true },
      { text: '3+ REST API integrations connecting Odoo with mobile apps and third-party platforms.', bold: true },
      { text: '25% PostgreSQL query optimization in high-load production environments.', bold: true },
      { text: 'Critical production bug resolution, root-cause analysis, and performance maintenance.', bold: false },
    ],
  },
  {
    company: 'Freelance',
    note: 'Self-Employed',
    location: 'Remote',
    type: 'Freelance',
    period: 'Aug 2024 – Present',
    role: 'Odoo Developer — Fullstack (v16–v19)',
    points: [
      { text: 'Full Odoo ERP for a tourism company in Georgia — CRM, Sales, WhatsApp integration, and full environment setup.', bold: true },
      { text: 'Built a custom WhatsApp module for Odoo Community from scratch — automated messaging within Odoo workflows.', bold: true },
      { text: 'Delivered tailored ERP for Steckers Egypt (manufacturing) — core operations and custom module development.', bold: false },
      { text: 'Custom OTP authentication system for Odoo website — secure session-based access control.', bold: false },
    ],
  },
]

function TimelineCard({ exp, index, inView }) {
  const isLast = index === EXPERIENCE.length - 1

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.05 + index * 0.06, duration: 0.3, ease: 'easeOut' }}
          className="relative z-10 w-4 h-4 rounded-full bg-primary border-4 border-surface mt-2"
        >
          {/* Pulse on first (current) */}
          {index === 0 && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
          )}
        </motion.div>

        {/* Line — static (animating height causes layout thrash on mobile) */}
        {!isLast && (
          <div className="w-0.5 bg-linear-to-b from-primary/40 to-primary/10 flex-1" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 + index * 0.06, duration: 0.4, ease: 'easeOut' }}
        className="flex-1 pb-10"
      >
        <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/20 transition-all group">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">{exp.company}</h3>
                <span className="text-on-surface-variant/50 text-sm">({exp.note})</span>
                <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-label uppercase tracking-wider">{exp.type}</span>
              </div>
              <p className="text-primary text-sm font-semibold mt-1">{exp.role}</p>
            </div>
            <div className="text-xs text-on-surface-variant/60 font-label tracking-wider sm:text-right shrink-0">
              <p>{exp.period}</p>
              <p>{exp.location}</p>
            </div>
          </div>

          {/* Points */}
          <ul className="space-y-2.5">
            {exp.points.map((p, j) => (
              <li key={j} className="flex gap-2.5 items-start text-sm">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${p.bold ? 'bg-primary' : 'bg-on-surface-variant/30'}`} />
                <span className={p.bold ? 'text-on-surface font-medium' : 'text-on-surface-variant'}>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 bg-surface overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-100 h-100 bg-primary/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="font-label text-primary tracking-widest uppercase mb-4 text-sm">{t('careerPath')}</p>
          <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface">
            {t('workExp')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-tertiary">{t('experience')}</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="ml-2 sm:ml-4">
          {EXPERIENCE.map((exp, i) => (
            <TimelineCard key={i} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

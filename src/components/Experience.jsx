import { useI18n } from '../i18n'

const EXPERIENCE = [
  {
    company: 'Taqat Techno', note: 'Qatari Company', location: 'Maadi, Egypt', type: 'Full-time',
    role: 'Frontend Odoo Developer',
    points: [
      'Design and develop custom Odoo website themes from scratch using QWeb, XML, and JavaScript.',
      'Implement responsive UI/UX designs to improve business visibility and user interaction.',
      'Customize front-end components to align with specific business requirements and branding.',
    ],
  },
  {
    company: 'TechRise', note: 'UAE Company', location: 'Remote', type: 'Part-time',
    role: 'Backend Odoo Developer',
    points: [
      'Develop and maintain complex backend logic across core Odoo modules (Sales, Inventory, Accounting, Manufacturing, CRM).',
      'Build and integrate custom APIs to connect Odoo with external platforms and mobile applications.',
      'Optimize database performance and backend processes for system stability and data integrity.',
    ],
  },
]

export default function Experience() {
  const { t } = useI18n()

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-12 sm:mb-20">
          <p className="font-label text-primary tracking-widest uppercase mb-4">{t('careerPath')}</p>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold">{t('workExp')} <span className="text-secondary">{t('experience')}</span>.</h2>
        </div>
        <div className="space-y-8 sm:space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className={`fade-up delay-${(i + 1) * 100} p-5 sm:p-8 bg-surface-container rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                  <h3 className="font-headline text-2xl font-bold">{exp.company} <span className="text-on-surface-variant font-normal text-base">({exp.note})</span></h3>
                  <p className="text-primary font-semibold">{exp.role}</p>
                </div>
                <div className="font-label text-sm text-on-surface-variant text-right">
                  <p>{exp.location}</p>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs uppercase tracking-wider">{exp.type}</span>
                </div>
              </div>
              <ul className="space-y-3 text-on-surface-variant">
                {exp.points.map((p, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">chevron_right</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

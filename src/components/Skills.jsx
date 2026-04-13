import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Database, Code2, Cloud, Bot } from 'lucide-react'
import { useI18n } from '../i18n'

const SKILLS = [
  {
    title: 'Odoo Backend',
    Icon: Database,
    items: [
      { name: 'Python & ORM', level: 90 },
      { name: 'Custom Modules', level: 95 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'REST API', level: 80 },
    ],
  },
  {
    title: 'Web Frontend',
    Icon: Code2,
    items: [
      { name: 'OWL JS & QWeb', level: 92 },
      { name: 'Themes & Snippets', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'React', level: 70 },
    ],
  },
  {
    title: 'DevOps',
    Icon: Cloud,
    items: [
      { name: 'Docker & Nginx', level: 85 },
      { name: 'Odoo.sh', level: 90 },
      { name: 'Data Migration', level: 80 },
      { name: 'Odoo Upgrade', level: 75 },
    ],
  },
  {
    title: 'AI & Automation',
    Icon: Bot,
    items: [
      { name: 'Claude AI', level: 85 },
      { name: 'n8n', level: 80 },
      { name: 'API Integration', level: 88 },
      { name: 'MCP', level: 78 },
    ],
  },
]

function SkillCard({ skill, index, inView, isLast }) {
  const isTertiary = index % 2 !== 0
  const Icon = skill.Icon

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.05 + index * 0.06, duration: 0.3, ease: 'easeOut' }}
          className={`relative z-10 w-4 h-4 rounded-full ${isTertiary ? 'bg-tertiary' : 'bg-primary'} border-4 border-surface-container-low mt-2`}
        />
        {!isLast && (
          <div className={`w-0.5 flex-1 ${isTertiary ? 'bg-linear-to-b from-tertiary/40 to-tertiary/10' : 'bg-linear-to-b from-primary/40 to-primary/10'}`} />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 + index * 0.06, duration: 0.4, ease: 'easeOut' }}
        className="flex-1 pb-8"
      >
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container border border-outline-variant/10">
          {/* Title */}
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-9 h-9 rounded-lg ${isTertiary ? 'bg-tertiary/10' : 'bg-primary/10'} flex items-center justify-center`}>
              <Icon className={`w-4.5 h-4.5 ${isTertiary ? 'text-tertiary' : 'text-primary'}`} strokeWidth={2} />
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface">{skill.title}</h3>
          </div>

          {/* Bars */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
            {skill.items.map((item, j) => (
              <div key={j}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-on-surface-variant">{item.name}</span>
                  <span className="text-xs text-on-surface-variant/40">{item.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-outline-variant/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.level}%` } : {}}
                    transition={{ delay: 0.15 + index * 0.05, duration: 0.5, ease: 'easeOut' }}
                    className={`h-full rounded-full ${isTertiary ? 'bg-tertiary/60' : 'bg-primary/60'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 bg-surface-container-low">
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="font-label text-primary tracking-widest uppercase mb-4 text-sm">{t('capabilities')}</p>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface">
            {t('technicalArsenal')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-tertiary">{t('arsenal')}</span>.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="ml-2 sm:ml-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} inView={inView} isLast={i === SKILLS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

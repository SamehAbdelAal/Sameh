import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '../i18n'
import { Database, Monitor, Cloud, Code2 } from 'lucide-react'

export default function Skills() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  const SKILLS = [
    {
      icon: Database,
      title: 'Odoo Backend',
      desc: 'Custom module development, backend logic that scales — Sales, Inventory, Accounting, Manufacturing, CRM. I re-engineer Odoo for your business.',
      tags: ['Python', 'PostgreSQL', 'OWL JS', 'QWeb Template', 'XML', 'Custom Modules', 'Odoo v16–v18'],
    },
    {
      icon: Code2,
      title: 'Web Frontend',
      desc: 'High-performance Odoo websites and modern web apps — custom themes, reusable components, and pixel-perfect responsive interfaces.',
      tags: ['Odoo Snippets', 'OWL JS', 'jQuery', 'QWeb', 'React', 'React Native', 'SCSS', 'Tailwind', 'HTML', 'JavaScript'],
    },
    {
      icon: Cloud,
      title: 'DevOps & Server',
      desc: 'Full server setup, deployment, data migration, and Odoo upgrades. Production-ready infrastructure from day one.',
      tags: ['Docker', 'Odoo.sh', 'Nginx', 'PostgreSQL', 'Data Migration', 'Odoo Upgrade', 'Git', 'CI/CD', 'Linux'],
    },
    {
      icon: Monitor,
      title: 'AI & Automation',
      desc: 'Intelligent workflows and AI-powered automation. Smart business rules that make your Odoo ecosystem think for itself.',
      tags: ['Claude AI', 'n8n', 'API Integration', 'Workflow Automation', 'MCP'],
    },
  ]

  return (
    <section id="skills" className="relative py-20 sm:py-32 px-4 sm:px-6 bg-surface-container-low overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/3 blur-[150px] rounded-full" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 sm:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-label text-primary tracking-widest uppercase mb-4 text-sm">{t('capabilities')}</p>
            <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface">
              {t('technicalArsenal')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">{t('arsenal')}</span>.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-md text-on-surface-variant text-sm sm:text-base"
          >
            {t('skillsDesc')}
          </motion.p>
        </div>

        {/* Cards grid - 2x2 */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {SKILLS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/25 transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Icon + Title row */}
              <div className="flex items-center gap-4 mb-5 relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface tracking-tight">{s.title}</h3>
              </div>

              {/* Description */}
              <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-6 relative">{s.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 relative">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-lg bg-surface-container-highest/80 text-primary/80 border border-outline-variant/10 hover:border-primary/30 hover:text-primary transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Corner number */}
              <span className="absolute top-5 right-6 font-headline text-4xl font-black text-on-surface/3">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

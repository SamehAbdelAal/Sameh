import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '../i18n'
import samehImg from '../assets/sameh.webp'
import { Code2, Server, Cpu, Briefcase } from 'lucide-react'

export default function About() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  const stats = [
    { value: '2+', label: t('yearsExp') },
    { value: '18+', label: 'Projects' },
    { value: '7+', label: 'Clients' },
  ]

  const highlights = [
    { icon: Code2, text: 'Odoo Frontend — OWL, QWeb, Themes' },
    { icon: Server, text: 'Odoo Backend — Python, Custom Modules' },
    { icon: Cpu, text: 'AI & Automation — Claude, n8n, Docker' },
    { icon: Briefcase, text: 'Full ERP Implementation & Training' },
  ]

  return (
    <section id="about" className="relative py-20 sm:py-32 px-4 sm:px-6 bg-surface overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-primary/3 blur-[120px] rounded-full" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-label text-primary tracking-widest uppercase mb-4 text-sm">About Me</p>
          <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface tracking-tight">
            {t('aboutTitle1')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">{t('aboutTitle2')}</span> {t('aboutTitle3')}
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Animated glow behind card - always on */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 0.6, scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 3, delay: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute -inset-4 rounded-3xl bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-2xl -z-10"
              />

              {/* Rotating border */}
              <div className="absolute -inset-0.75 rounded-3xl overflow-hidden -z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,var(--primary)_25%,transparent_50%,var(--primary)_75%,transparent_100%)] opacity-20"
                />
                <div className="absolute inset-px rounded-3xl bg-surface" />
              </div>

              {/* Image card */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-2xl overflow-hidden border border-primary/15 shadow-xl shadow-primary/5"
              >
                <img
                  src={samehImg}
                  alt="Sameh Abdel Aal"
                  className="w-full aspect-3/4 object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Animated shine sweep */}
                {/* Continuous shine sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '250%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                    className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/8 to-transparent rotate-[-15deg]"
                  />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* Name on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-1">{t('heroName')}</h3>
                    <p className="text-white/50 text-sm font-light">{t('heroSubtitle')}</p>
                  </motion.div>

                  {/* Animated line under name */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '3rem' } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="h-0.5 bg-primary rounded-full mt-3"
                  />
                </div>

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-white/70 font-label tracking-wider uppercase">Available 24/7</span>
                </motion.div>
              </motion.div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mt-5">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-center py-4 rounded-xl bg-surface-container border border-outline-variant/10"
                  >
                    <div className="font-headline text-xl sm:text-2xl font-bold text-primary">{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-on-surface-variant font-label tracking-wider uppercase mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Bio paragraphs */}
            <div className="space-y-5 text-on-surface-variant text-sm sm:text-base md:text-lg leading-relaxed">
              <p>
                {t('aboutP1')} <span className="text-primary font-semibold">{t('aboutGrad')}</span> {t('aboutP1b')} <span className="text-primary font-semibold">{t('aboutErp')}</span>{t('aboutP1c')}
              </p>
              <p>
                {t('aboutP2')} <span className="text-primary font-semibold">{t('aboutQweb')}</span> {t('aboutTo')} <span className="text-primary font-semibold">{t('aboutRn')}</span> {t('aboutP2b')}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-outline-variant/15" />

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container/60 border border-outline-variant/10 hover:border-primary/20 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <h.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-on-surface-variant text-xs sm:text-sm font-medium">{h.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-outline-variant/15" />

            {/* Current work */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 px-5 py-4 rounded-xl bg-surface-container border border-outline-variant/10">
                <div className="text-[10px] font-label text-on-surface-variant/50 tracking-widest uppercase mb-2">Full-time</div>
                <div className="font-headline text-sm sm:text-base font-bold text-on-surface">{t('aboutTaqat')}</div>
                <div className="text-xs text-on-surface-variant mt-1">Frontend Odoo Developer — Qatar</div>
              </div>
              <div className="flex-1 px-5 py-4 rounded-xl bg-surface-container border border-outline-variant/10">
                <div className="text-[10px] font-label text-on-surface-variant/50 tracking-widest uppercase mb-2">Part-time</div>
                <div className="font-headline text-sm sm:text-base font-bold text-on-surface">{t('aboutTechrise')}</div>
                <div className="text-xs text-on-surface-variant mt-1">Backend Odoo Developer — UAE</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

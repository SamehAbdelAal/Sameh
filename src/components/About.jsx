import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '../i18n'
import samehImg from '../assets/sameh.webp'

export default function About() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  const stats = [
    { value: '2+', label: t('yearsExp') },
    { value: '13+', label: 'Projects' },
    { value: '7+', label: 'Clients' },
  ]

  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 bg-surface">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="font-label text-primary tracking-widest uppercase mb-4 text-sm">About Me</p>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
            {t('aboutTitle1')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-tertiary">{t('aboutTitle2')}</span> {t('aboutTitle3')}
          </h2>
        </motion.div>

        {/* Two columns: image + text */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img src={samehImg} alt="Sameh Abdel Aal" className="w-full aspect-3/4 object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  <span className="text-[10px] text-white/60 font-label tracking-wider uppercase">Available 24/7</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center py-3 rounded-xl bg-surface-container border border-outline-variant/10"
                >
                  <div className="font-headline text-lg font-bold text-primary">{s.value}</div>
                  <div className="text-[10px] text-on-surface-variant font-label tracking-wider uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-3 space-y-5"
          >
            <div className="space-y-4 text-on-surface-variant text-sm sm:text-base leading-relaxed">
              <p>
                {t('aboutP1')} <span className="text-primary font-semibold">{t('aboutGrad')}</span> {t('aboutP1b')} <span className="text-primary font-semibold">{t('aboutErp')}</span>{t('aboutP1c')}
              </p>
              <p>
                {t('aboutP2')} <span className="text-primary font-semibold">{t('aboutQweb')}</span> {t('aboutTo')} <span className="text-primary font-semibold">{t('aboutRn')}</span> {t('aboutP2b')}
              </p>
            </div>

            <div className="h-px bg-outline-variant/15" />

            {/* Current work */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10">
                <div className="text-[10px] font-label text-on-surface-variant/50 tracking-widest uppercase mb-1">Full-time</div>
                <div className="font-headline text-sm font-bold text-on-surface">{t('aboutTaqat')}</div>
                <div className="text-xs text-on-surface-variant">Fullstack Odoo — Qatar</div>
              </div>
              <div className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10">
                <div className="text-[10px] font-label text-on-surface-variant/50 tracking-widest uppercase mb-1">Part-time</div>
                <div className="font-headline text-sm font-bold text-on-surface">{t('aboutTechrise')}</div>
                <div className="text-xs text-on-surface-variant">Fullstack Odoo — UAE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

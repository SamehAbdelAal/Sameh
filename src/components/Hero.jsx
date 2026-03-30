import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'

const SOCIALS = [
  { icon: 'code', href: 'https://github.com', label: 'GitHub' },
  { icon: 'person_add', href: 'https://www.linkedin.com/in/sameh-abdel-aal-25509628b', label: 'LinkedIn' },
  { icon: 'group', href: 'https://www.facebook.com/sameh.abdel.aal.761559', label: 'Facebook' },
  { icon: 'mail', href: 'mailto:samehashraf9472@gmail.com', label: 'Email' },
  { icon: 'chat', href: 'https://wa.me/201017729427', label: 'WhatsApp' },
]

export default function Hero() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 150 })
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 150 })

  const offset1X = useTransform(smoothMouseX, [-500, 500], [40, -40])
  const offset1Y = useTransform(smoothMouseY, [-500, 500], [40, -40])
  const offset2X = useTransform(smoothMouseX, [-500, 500], [-30, 30])
  const offset2Y = useTransform(smoothMouseY, [-500, 500], [-30, 30])
  const tiltX = useTransform(smoothMouseY, [-500, 500], [4, -4])
  const tiltY = useTransform(smoothMouseX, [-500, 500], [-4, 4])

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - window.innerWidth / 2)
    mouseY.set(e.clientY - window.innerHeight / 2)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section ref={ref} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-surface px-4 pt-20" id="hero">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div style={{ x: offset1X, y: offset1Y }} className="absolute -top-1/4 -left-1/4 w-full h-full bg-primary/8 blur-[60px] rounded-full will-change-transform" />
        <motion.div style={{ x: offset2X, y: offset2Y }} className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-secondary/8 blur-[60px] rounded-full will-change-transform" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[80px] rounded-full" />
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path d="M -100 800 Q 400 700 1100 200" stroke="var(--primary)" strokeWidth="1.5" fill="none"
            initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 3, ease: 'easeInOut' }} style={{ filter: 'blur(4px)', x: offset1X, y: offset1Y }} />
          <motion.path d="M -100 900 Q 500 850 1100 400" stroke="var(--secondary)" strokeWidth="2" fill="none"
            initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 4, ease: 'easeInOut', delay: 0.5 }} style={{ filter: 'blur(6px)', x: offset2X, y: offset2Y }} />
        </svg>
      </div>

      <motion.div style={{ perspective: 1000 }} className="relative z-10 w-full max-w-full flex flex-col items-center overflow-hidden">
        <motion.div style={window.innerWidth > 768 ? { rotateX: tiltX, rotateY: tiltY } : {}} variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col items-center text-center w-full px-2">
          <motion.p variants={itemVariants} className="font-label text-tertiary tracking-[0.3em] uppercase mb-6 text-sm">{t('heroSubtitle')}</motion.p>

          <motion.h1 variants={itemVariants} className="font-headline text-4xl sm:text-5xl md:text-[7.5rem] font-extrabold tracking-tighter leading-[0.85] text-on-surface mb-8 will-change-transform">
            {t('heroLine1')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{t('heroHighlight')}</span>,{' '}
            <br className="hidden md:block" />
            {t('heroLine2')}
            <motion.span className="relative inline-flex items-center justify-center mt-4 md:mt-6 group ml-2 md:ml-4">
              <motion.span
                initial={{ color: '#fff' }}
                animate={inView ? { color: '#000' } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="relative z-10 px-4 md:px-6 py-1 md:py-2 italic font-light block whitespace-nowrap tracking-tight text-2xl sm:text-3xl md:text-[5rem]"
              >
                {t('heroName')}.
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-white rounded-xl md:rounded-2xl origin-center"
                style={{ boxShadow: '0 4px 30px rgba(255,255,255,0.1)' }}
              />
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-on-surface-variant text-sm sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-12 px-2 font-light leading-relaxed">{t('heroDesc')}</motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <motion.a href="#projects" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-linear-to-br from-primary to-primary-container text-on-primary font-bold text-base sm:text-lg rounded-xl flex items-center gap-3 cyber-glow transition-all overflow-hidden shadow-2xl">
              <span className="relative z-10">{t('viewWork')}</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.a>
            <motion.a href="/sameh-cv.pdf" download whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 sm:px-10 sm:py-5 border border-outline-variant/30 hover:bg-surface-container-high/40 transition-all font-bold text-base sm:text-lg rounded-xl text-primary flex items-center gap-3">
              <span className="material-symbols-outlined">download</span>
              {t('downloadCv')}
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4 mt-8 sm:mt-12">
            {SOCIALS.map((s, i) => (
              <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -8, scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border border-outline-variant/10 bg-surface-container/50 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all shadow-xl"
                aria-label={s.label}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
      </div>
    </section>
  )
}

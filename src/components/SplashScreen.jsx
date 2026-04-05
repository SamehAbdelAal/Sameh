import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import logo from '../assets/logo.webp'

export default function SplashScreen({ onFinish }) {
  const { t } = useI18n()

  useEffect(() => {
    if (document.readyState === 'complete') {
      setTimeout(onFinish, 800)
    } else {
      const done = () => setTimeout(onFinish, 500)
      window.addEventListener('load', done, { once: true })
      // Fallback: max 2s
      const fallback = setTimeout(onFinish, 2000)
      return () => { clearTimeout(fallback); window.removeEventListener('load', done) }
    }
  }, [onFinish])

  const lines = [
    { text: t('splashName'), delay: 0.3 },
    { text: t('splashRole'), delay: 0.8 },
    { text: t('splashDetail'), delay: 1.3 },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-99999 bg-[#0e0e10] flex flex-col items-center justify-center px-6"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.img src={logo} alt="Sameh Logo" className="h-20 md:h-28 w-auto mb-10"
        style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(190deg) brightness(1.2)' }}

transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} />

      <div className="text-center space-y-3">
        {lines.map((line, i) => (
          <motion.p key={i}
            className={`font-headline tracking-tight ${
              i === 0 ? 'text-2xl md:text-4xl font-bold text-white' :
              'text-sm md:text-lg text-white/50 font-light'
            }`}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: line.delay, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}>
            {line.text}
          </motion.p>
        ))}
      </div>

      <motion.div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mt-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <motion.div className="h-full bg-linear-to-r from-primary to-tertiary rounded-full"
          initial={{ width: '0%' }} animate={{ width: '100%' }}
          transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }} />
      </motion.div>
    </motion.div>
  )
}

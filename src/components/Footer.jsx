import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-surface-container-lowest w-full py-8 sm:py-12 px-4 sm:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="font-label text-[0.75rem] text-emerald-400 uppercase tracking-widest">{t('availableHire')}</span>
        </div>

        <div className="font-label text-[0.65rem] sm:text-[0.75rem] text-on-surface-variant tracking-wider sm:tracking-widest uppercase text-center">
          &copy; {new Date().getFullYear()} Sameh AbdelAal. {t('allRights')}
        </div>

        <div className="flex items-center gap-4 sm:gap-8 font-label text-[0.65rem] sm:text-[0.75rem] uppercase tracking-wider sm:tracking-widest flex-wrap justify-center">
          <a className="text-on-surface-variant hover:text-tertiary transition-colors duration-200" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-on-surface-variant hover:text-tertiary transition-colors duration-200" href="https://www.linkedin.com/in/sameh-abdel-aal-25509628b" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-on-surface-variant hover:text-tertiary transition-colors duration-200" href="https://wa.me/201017729427" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a className="text-tertiary duration-200" href="#hero">{t('backToTop')}</a>
        </div>
      </div>
    </footer>
  )
}

import { useI18n } from '../i18n'
import samehImg from '../assets/sameh.webp'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="py-16 sm:py-32 px-4 sm:px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-24 items-center">
        <div className="fade-left relative group">
          <div className="absolute -inset-4 bg-linear-to-br from-primary/20 to-tertiary/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <img alt="Sameh AbdelAal" className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-outline-variant/20 shadow-2xl w-full object-cover aspect-[3/4]" src={samehImg} />
          <div className="absolute -bottom-8 -right-8 p-8 bg-surface-container-highest border border-outline-variant/30 rounded-2xl hidden lg:block pulse-glow">
            <p className="font-headline text-4xl font-bold text-tertiary">2+</p>
            <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest">{t('yearsExp')}</p>
          </div>
        </div>
        <div className="fade-right space-y-8">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{t('aboutTitle1')} <span className="text-secondary">{t('aboutTitle2')}</span> {t('aboutTitle3')}</h2>
          <div className="space-y-6 text-on-surface-variant text-base sm:text-lg leading-relaxed">
            <p>
              {t('aboutP1')} <span className="text-tertiary font-bold italic">{t('aboutGrad')}</span> {t('aboutP1b')} <span className="text-primary font-bold italic">{t('aboutErp')}</span>{t('aboutP1c')}
            </p>
            <p>
              {t('aboutP2')} <span className="text-tertiary font-bold italic">{t('aboutQweb')}</span> {t('aboutTo')} <span className="text-secondary font-bold italic">{t('aboutRn')}</span> {t('aboutP2b')}
            </p>
            <p>
              {t('aboutP3')} <span className="text-primary font-semibold">{t('aboutTaqat')}</span> {t('aboutTaqatNote')} <span className="text-secondary font-semibold">{t('aboutTechrise')}</span> {t('aboutTechriseNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

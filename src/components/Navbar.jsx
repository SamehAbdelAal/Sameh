import { useState, useEffect } from 'react'
import { useI18n } from '../i18n'
import logo from '../assets/logo.webp'

export default function Navbar({ dark, toggleTheme }) {
  const { lang, toggleLang, t } = useI18n()
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    if (mobileNav) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileNav])

  const NAV_LINKS = [
    { label: t('home'), href: '#hero' },
    { label: t('about'), href: '#about' },
    { label: t('skills'), href: '#skills' },
    { label: t('projects'), href: '#projects' },
  ]

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4">
        <a href="#hero" className="flex items-center">
          <img src={logo} alt="Sameh Logo" className="h-8 sm:h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8 font-label text-[0.75rem] uppercase tracking-widest">
          {NAV_LINKS.map((l) => (
            <a key={l.href} className="text-on-surface-variant hover:text-primary transition-colors duration-300" href={l.href}>{l.label}</a>
          ))}

          {/* Available indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-[0.65rem]">{t('available')}</span>
          </div>

          {/* Language toggle */}
          <button onClick={toggleLang} className="px-3 py-1 rounded-lg border border-outline-variant/30 hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors text-xs font-bold">
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-surface-container-high transition-colors" aria-label="Toggle theme">
            <span className="material-symbols-outlined text-primary text-xl">{dark ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <a className="px-6 py-2 bg-linear-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl transition-all hover:scale-105" href="#contact">{t('contact')}</a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <button onClick={toggleLang} className="px-2 py-1 text-[0.65rem] font-bold text-on-surface-variant border border-outline-variant/30 rounded">
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="p-2" aria-label="Toggle theme">
            <span className="material-symbols-outlined text-primary">{dark ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button onClick={() => setMobileNav(!mobileNav)} aria-label="Menu">
            <span className="material-symbols-outlined text-primary">{mobileNav ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileNav && (
        <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((l) => (
            <a key={l.href} onClick={() => setMobileNav(false)} className="text-2xl font-headline font-bold text-on-surface hover:text-primary transition-colors" href={l.href}>{l.label}</a>
          ))}
          <a onClick={() => setMobileNav(false)} className="px-8 py-3 bg-linear-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl" href="#contact">{t('contact')}</a>
        </div>
      )}
    </>
  )
}

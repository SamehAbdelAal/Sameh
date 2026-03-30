import { useRef, useState } from 'react'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t } = useI18n()
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    const formData = new FormData(formRef.current)
    const name = formData.get('from_name') || ''
    const email = formData.get('from_email') || ''
    const message = formData.get('message') || ''

    const subject = `Portfolio Contact from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

    // Open email client directly
    window.location.href = `mailto:samehashraf9472@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setSending(false)
    setSent(true)
    formRef.current.reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="py-16 sm:py-32 px-4 sm:px-6 bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        <div className="fade-up text-center mb-10 sm:mb-16">
          <h2 className="font-headline text-3xl sm:text-5xl font-bold mb-4">{t('letsCollaborate')} <span className="text-primary">{t('collaborate')}</span>.</h2>
          <p className="text-on-surface-variant text-base sm:text-lg">{t('contactDesc')}</p>
        </div>
        <div className="fade-up delay-200 bg-surface-container rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-outline-variant/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <form ref={formRef} className="space-y-8 relative z-10" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">{t('nameLabel')}</label>
                <input name="from_name" required className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-primary focus:outline-none text-on-surface px-0 py-3 transition-all" placeholder={t('namePlaceholder')} type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">{t('emailLabel')}</label>
                <input name="from_email" required className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-primary focus:outline-none text-on-surface px-0 py-3 transition-all" placeholder={t('emailPlaceholder')} type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant ml-1">{t('messageLabel')}</label>
              <textarea name="message" required className="w-full bg-transparent border-0 border-b border-outline-variant/50 focus:border-primary focus:outline-none text-on-surface px-0 py-3 transition-all resize-none" placeholder={t('messagePlaceholder')} rows="4"></textarea>
            </div>
            <button disabled={sending}
              className={`w-full py-4 sm:py-5 font-black text-base sm:text-xl rounded-xl cyber-glow hover:scale-[1.02] transition-all uppercase tracking-wider sm:tracking-widest ${sent ? 'bg-emerald-500 text-white' : 'bg-linear-to-r from-primary to-primary-container text-on-primary'}`}
              type="submit">
              {sending ? t('sending') : sent ? t('sentSuccess') : t('sendMessage')}
            </button>
          </form>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-8 md:gap-12 mt-16 flex-wrap">
          {[
            { icon: 'code', href: 'https://github.com', label: 'GitHub', hoverColor: 'primary' },
            { icon: 'person_add', href: 'https://www.linkedin.com/in/sameh-abdel-aal-25509628b', label: 'LinkedIn', hoverColor: 'secondary' },
            { icon: 'group', href: 'https://www.facebook.com/sameh.abdel.aal.761559', label: 'Facebook', hoverColor: 'tertiary' },
            { icon: 'chat', href: 'https://wa.me/201017729427', label: 'WhatsApp', hoverColor: 'tertiary' },
            { icon: 'mail', href: 'mailto:samehashraf9472@gmail.com', label: 'Email', hoverColor: 'primary' },
          ].map((s) => (
            <a key={s.label} className="flex flex-col items-center gap-2 group" href={s.href} target="_blank" rel="noopener noreferrer">
              <div className={`w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center group-hover:border-${s.hoverColor} group-hover:bg-${s.hoverColor}/5 transition-all`}>
                <span className={`material-symbols-outlined text-on-surface-variant group-hover:text-${s.hoverColor} transition-colors`}>{s.icon}</span>
              </div>
              <span className={`font-label text-[0.6rem] uppercase tracking-widest text-on-surface-variant group-hover:text-${s.hoverColor}`}>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

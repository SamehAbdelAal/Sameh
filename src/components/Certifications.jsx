import { useI18n } from '../i18n'

const CERTS = [
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'March 27, 2026',
    certNo: 'au35thvtgzut',
    verifyUrl: 'https://verify.skilljar.com/c/au35thvtgzut',
    color: 'from-[#7c8c6c] to-[#5a6b4a]',
  },
  {
    title: 'Introduction to Agent Skills',
    issuer: 'Anthropic',
    date: '2026',
    certNo: 'isqjyopz5qr4',
    verifyUrl: 'https://verify.skilljar.com/c/isqjyopz5qr4',
    color: 'from-[#7a9abb] to-[#5a7a9b]',
  },
  {
    title: 'Building with the Claude API',
    issuer: 'Anthropic',
    date: '2026',
    certNo: 'psaeo8w5ijpu',
    verifyUrl: 'https://verify.skilljar.com/c/psaeo8w5ijpu',
    color: 'from-[#b08968] to-[#8a6748]',
  },
  {
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    date: '2026',
    certNo: 'qoakc3yu3r7u',
    verifyUrl: 'https://verify.skilljar.com/c/qoakc3yu3r7u',
    color: 'from-[#9b8bb4] to-[#7b6b94]',
  },
]

export default function Certifications() {
  const { lang } = useI18n()

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-12 sm:mb-20">
          <p className="font-label text-primary tracking-widest uppercase mb-4">
            {lang === 'ar' ? 'الاعتمادات' : 'Credentials'}
          </p>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold">
            {lang === 'ar' ? '' : ''}<span className="text-secondary">{lang === 'ar' ? 'الشهادات' : 'Certifications'}</span>.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {CERTS.map((cert, i) => (
            <div key={i} className={`scale-in delay-${(i + 1) * 100} group relative overflow-hidden rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all`}>
              {/* Card gradient header */}
              <div className={`bg-linear-to-br ${cert.color} p-6 sm:p-8 relative`}>
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 border-2 border-black/20 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-black/70 text-xl sm:text-2xl">verified</span>
                </div>
                <p className="text-black/50 text-xs uppercase tracking-widest font-label mb-3">Certificate of Completion</p>
                <h3 className="font-headline text-xl sm:text-2xl font-bold text-black/90 leading-tight">{cert.title}</h3>
              </div>

              {/* Card body */}
              <div className="bg-surface-container p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{lang === 'ar' ? 'الجهة' : 'Issued by'}</span>
                  <span className="font-headline font-bold text-on-surface text-sm tracking-wider">ANTHROPIC</span>
                </div>

                {cert.date && (
                  <div className="flex items-center gap-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{lang === 'ar' ? 'التاريخ' : 'Date'}</span>
                    <span className="text-on-surface text-sm">{cert.date}</span>
                  </div>
                )}

                {cert.certNo && (
                  <div className="flex items-center gap-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">ID</span>
                    <span className="text-on-surface-variant text-xs font-mono">{cert.certNo}</span>
                  </div>
                )}

                {cert.verifyUrl && (
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors text-sm font-label uppercase tracking-wider mt-2">
                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                    {lang === 'ar' ? 'تحقق' : 'Verify'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

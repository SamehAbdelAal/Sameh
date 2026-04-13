import { GraduationCap } from 'lucide-react'
import { useI18n } from '../i18n'

/* ─── Brand Logos (inline SVG — crisp, no network cost) ─── */
const ClaudeLogo = ({ className = 'w-full h-full' }) => (
  // Anthropic "Claude" starburst mark
  <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
    <path
      fill="#D97757"
      d="M128 16c3 40 22 72 56 88-34 16-53 48-56 88-3-40-22-72-56-88 34-16 53-48 56-88Zm-80 48c2 22 12 40 30 48-18 8-28 26-30 48-2-22-12-40-30-48 18-8 28-26 30-48Zm160 0c2 22 12 40 30 48-18 8-28 26-30 48-2-22-12-40-30-48 18-8 28-26 30-48ZM80 176c2 14 8 26 20 32-12 6-18 18-20 32-2-14-8-26-20-32 12-6 18-18 20-32Zm96 0c2 14 8 26 20 32-12 6-18 18-20 32-2-14-8-26-20-32 12-6 18-18 20-32Z"
    />
  </svg>
)

const AngularLogo = ({ className = 'w-full h-full' }) => (
  // Angular shield — red gradient
  <svg viewBox="0 0 250 250" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="ng-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E40035" />
        <stop offset="50%" stopColor="#C3002F" />
        <stop offset="100%" stopColor="#A6001E" />
      </linearGradient>
    </defs>
    <path fill="url(#ng-grad)" d="M125 30 30 63l15 125 80 42 80-42 15-125z" />
    <path fill="#fff" d="M125 52 66 181h22l12-29h50l12 29h22zm0 41 19 46h-38z" />
  </svg>
)

const BrandMark = ({ brand, className }) => {
  if (brand === 'claude') return <ClaudeLogo className={className} />
  if (brand === 'angular') return <AngularLogo className={className} />
  if (brand === 'degree') return <GraduationCap className={className} strokeWidth={1.6} />
  return null
}

const CERTS = [
  {
    title: 'Al-Obour University',
    issuer: 'Bachelor of Information Systems',
    brand: 'degree',
    date: '2024',
    grade: 'Good',
    major: 'Information Systems',
    color: 'from-[#c9a961] to-[#7a5a2a]',
  },
  {
    title: 'Angular Diploma — From Basics to Advanced',
    issuer: 'Angular Academy',
    brand: 'angular',
    instructor: 'Eng. Abanoub Nabil — Teaching Assistant at ITI & Technical Team Lead',
    color: 'from-[#d4af5c] to-[#1a2a6c]',
    image: '/angular-cert.jpg',
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    brand: 'claude',
    date: 'March 27, 2026',
    certNo: 'au35thvtgzut',
    verifyUrl: 'https://verify.skilljar.com/c/au35thvtgzut',
    color: 'from-[#7c8c6c] to-[#5a6b4a]',
  },
  {
    title: 'Introduction to Agent Skills',
    issuer: 'Anthropic',
    brand: 'claude',
    date: '2026',
    certNo: 'isqjyopz5qr4',
    verifyUrl: 'https://verify.skilljar.com/c/isqjyopz5qr4',
    color: 'from-[#7a9abb] to-[#5a7a9b]',
  },
  {
    title: 'Building with the Claude API',
    issuer: 'Anthropic',
    brand: 'claude',
    date: '2026',
    certNo: 'psaeo8w5ijpu',
    verifyUrl: 'https://verify.skilljar.com/c/psaeo8w5ijpu',
    color: 'from-[#b08968] to-[#8a6748]',
  },
  {
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    brand: 'claude',
    date: '2026',
    certNo: 'qoakc3yu3r7u',
    verifyUrl: 'https://verify.skilljar.com/c/qoakc3yu3r7u',
    color: 'from-[#9b8bb4] to-[#7b6b94]',
  },
]

export default function Certifications() {
  const { lang } = useI18n()

  return (
    <section id="certifications" className="py-16 sm:py-32 px-4 sm:px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="fade-up text-center mb-12 sm:mb-20">
          <p className="font-label text-primary tracking-widest uppercase mb-4">
            {lang === 'ar' ? 'الاعتمادات' : 'Credentials'}
          </p>
          <h2 className="font-headline text-3xl sm:text-5xl font-bold">
            {lang === 'ar' ? '' : ''}<span className="text-secondary">{lang === 'ar' ? 'الشهادات' : 'Certifications'}</span>.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {CERTS.map((cert, i) => (
            <div key={i} className={`scale-in delay-${(i + 1) * 100} group relative overflow-hidden rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col h-full`}>
              {/* Card header — uniform height across all cards */}
              {cert.image ? (
                <div className="relative h-48 sm:h-56 bg-linear-to-br from-[#1a2a6c] to-[#0d1640] overflow-hidden shrink-0">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10" />
                  {/* Brand logo — clean, no background, soft glow */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-300"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 12px rgba(255,255,255,0.15))' }}>
                    <BrandMark brand={cert.brand} className="w-full h-full" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <p className="text-white/70 text-[10px] uppercase tracking-widest font-label mb-2">Certificate of Completion</p>
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2">{cert.title}</h3>
                  </div>
                </div>
              ) : (
                <div className={`bg-linear-to-br ${cert.color} p-6 sm:p-8 relative overflow-hidden h-48 sm:h-56 shrink-0 flex flex-col justify-end`}>
                  {/* Big watermark logo — subtle, blends with card */}
                  <div className="absolute -right-8 -bottom-10 w-44 h-44 opacity-[0.12] pointer-events-none group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                    <BrandMark brand={cert.brand} className="w-full h-full" />
                  </div>
                  {/* Foreground logo — clean, no white bg, soft drop-shadow */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-300"
                    style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25)) drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>
                    <BrandMark brand={cert.brand} className="w-full h-full" />
                  </div>
                  <p className="relative text-black/60 text-[10px] uppercase tracking-widest font-label mb-3">Certificate of Completion</p>
                  <h3 className="relative font-headline text-xl sm:text-2xl font-bold text-black/90 leading-tight pr-14 sm:pr-16 line-clamp-2">{cert.title}</h3>
                </div>
              )}

              {/* Card body */}
              <div className="bg-surface-container p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{lang === 'ar' ? 'الجهة' : 'Issued by'}</span>
                  <span className="font-headline font-bold text-on-surface text-sm tracking-wider uppercase">{cert.issuer}</span>
                </div>

                {cert.date && (
                  <div className="flex items-center gap-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{lang === 'ar' ? 'التاريخ' : 'Date'}</span>
                    <span className="text-on-surface text-sm">{cert.date}</span>
                  </div>
                )}

                {cert.major && (
                  <div className="flex items-center gap-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{lang === 'ar' ? 'التخصص' : 'Major'}</span>
                    <span className="text-on-surface text-sm">{cert.major}</span>
                  </div>
                )}

                {cert.grade && (
                  <div className="flex items-center gap-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{lang === 'ar' ? 'التقدير' : 'Grade'}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {cert.grade}
                    </span>
                  </div>
                )}

                {cert.certNo && (
                  <div className="flex items-center gap-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">ID</span>
                    <span className="text-on-surface-variant text-xs font-mono">{cert.certNo}</span>
                  </div>
                )}

                {cert.instructor && (
                  <div className="flex items-start gap-3">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant shrink-0 mt-0.5">{lang === 'ar' ? 'المدرب' : 'Instructor'}</span>
                    <span className="text-on-surface-variant text-xs leading-relaxed">{cert.instructor}</span>
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

import { useI18n } from '../i18n'

export default function Skills() {
  const { t } = useI18n()

  const SKILLS = [
    { icon: 'database', title: t('erpTitle'), color: 'primary', desc: t('erpDesc'), tags: ['Python', 'OWL JS', 'QWeb Template', 'XML', 'PostgreSQL', 'Odoo Backend', 'Odoo.sh'] },
    { icon: 'devices', title: t('webTitle'), color: 'primary', desc: t('webDesc'), tags: ['Theme Snippets', 'jQuery', 'JavaScript', 'HTML', 'SCSS', 'Tailwind'] },
    { icon: 'settings_input_component', title: t('devopsTitle'), color: 'primary', desc: t('devopsDesc'), tags: ['Docker', 'Git', 'n8n', 'Claude AI', 'CI/CD', 'Server Deploy'] },
  ]

  return (
    <section id="skills" className="py-16 sm:py-32 px-4 sm:px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="fade-up flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-6 sm:gap-8">
          <div>
            <p className="font-label text-primary tracking-widest uppercase mb-4">{t('capabilities')}</p>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold">{t('technicalArsenal')} <span className="text-primary">{t('arsenal')}</span>.</h2>
          </div>
          <p className="max-w-md text-on-surface-variant font-body text-sm sm:text-base">{t('skillsDesc')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {SKILLS.map((s, i) => (
            <div key={i} className={`scale-in delay-${(i + 1) * 100} p-6 sm:p-8 bg-surface-container rounded-2xl border border-outline-variant/10 hover:border-${s.color}/50 transition-all group`}>
              <div className={`w-14 h-14 bg-${s.color}/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <span className={`material-symbols-outlined text-${s.color} text-3xl`}>{s.icon}</span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-on-surface-variant mb-8 text-sm leading-relaxed">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className={`px-3 py-1 bg-surface-container-highest rounded text-[0.7rem] font-label text-${s.color} uppercase tracking-wider`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

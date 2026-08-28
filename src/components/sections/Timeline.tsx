import { motion } from 'motion/react';
import { timelineEntries } from '@/data/timeline';
import { Briefcase, GraduationCap, Award, Users } from 'lucide-react';

/**
 * Timeline — Visual Story Layout
 * Removes "Save Data" game aesthetic
 * Creates editorial timeline with visual polish
 */
export function Timeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return GraduationCap;
      case 'experience': return Briefcase;
      case 'achievement': return Award;
      case 'organization': return Users;
      default: return Briefcase;
    }
  };

  const getAccentColor = (type: string) => {
    switch (type) {
      case 'education': return 'var(--accent-secondary)';
      case 'experience': return 'var(--accent-primary)';
      case 'achievement': return 'var(--accent-acid)';
      case 'organization': return 'var(--accent-violet)';
      default: return 'var(--accent-secondary)';
    }
  };

  return (
    <section id="experience" className="section-spacing relative overflow-hidden">
      {/* Violet atmosphere — semantic color for Experience */}
      <div aria-hidden="true" className="absolute top-1/3 right-0 w-64 h-64 bg-[var(--accent-violet)] opacity-5 blur-3xl rounded-full pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-violet)] opacity-5 blur-3xl rounded-full pointer-events-none" />

      <div className="container-observatory relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 pixel-decoration bg-[var(--accent-violet)]" />
            <span className="font-mono text-xs md:text-sm text-[var(--accent-violet)] uppercase tracking-widest">
              Journey
            </span>
            <div className="w-3 h-3 pixel-decoration bg-[var(--accent-violet)]" />
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] mb-6">
            Experience
            <span className="block bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            My journey through education, organizations, and professional experiences
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent-violet)] via-[var(--accent-secondary)] to-transparent opacity-20" />

          <div className="space-y-12">
            {timelineEntries.map((entry, index) => {
              const Icon = getIcon(entry.type);
              const accentColor = getAccentColor(entry.type);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative flex items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon — pixel square, not circle */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-12 h-12 flex items-center justify-center
                                 border-2 border-[var(--bg-base)] relative"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Icon size={20} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-20 md:ml-0 w-full md:w-[calc(50%-4rem)] ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-6 bg-[var(--bg-elevated)] border border-white/5
                                 px-frame hover:border-white/10 transition-all group"
                    >
                      {/* Date */}
                      <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : ''}`}>
                        <div className="w-2 h-2 pixel-decoration"
                             style={{ backgroundColor: accentColor }} />
                        <span className="font-pixel text-[9px] uppercase tracking-widest"
                              style={{ color: accentColor }}>
                          {entry.date}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="font-display text-xl md:text-2xl font-bold
                                     text-[var(--text-primary)] mb-2
                                     group-hover:text-[var(--accent-violet)] transition-colors">
                        {entry.title}
                      </h3>
                      <p className="text-[var(--text-tertiary)] font-medium mb-3">
                        {entry.subtitle}
                      </p>

                      {entry.description && (
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                          {entry.description}
                        </p>
                      )}

                      {/* Type badge — no rounded-full */}
                      <div className={`mt-4 inline-flex items-center gap-2
                                       px-2.5 py-1 bg-[var(--bg-base)]
                                       border border-white/5
                                       ${isEven ? 'md:float-right' : ''}`}>
                        <Icon size={10} style={{ color: accentColor }} />
                        <span className="font-pixel text-[8px] capitalize"
                              style={{ color: accentColor }}>
                          {entry.type}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

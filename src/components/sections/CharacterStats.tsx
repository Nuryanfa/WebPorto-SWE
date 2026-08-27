import { motion } from 'motion/react';
import { skillCategories } from '@/data/skills';

/**
 * Skills Section — Visual Skill Ecosystem
 * Removes RPG stat bars and fake percentages
 * Uses modern interactive presentation with categories
 */
export function CharacterStats() {
  return (
    <section id="skills" className="section-spacing bg-[var(--bg-elevated)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-violet)] opacity-5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-primary)] opacity-5 blur-3xl rounded-full" />

      <div className="container-observatory relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 pixel-decoration bg-[var(--accent-secondary)]" />
            <span className="font-mono text-xs md:text-sm text-[var(--accent-secondary)] uppercase tracking-widest">
              Skills & Technologies
            </span>
            <div className="w-3 h-3 pixel-decoration bg-[var(--accent-secondary)]" />
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] mb-6">
            Technical
            <span className="block bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-violet)] bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            A curated selection of technologies and tools I work with regularly
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="group"
            >
              {/* Category Card */}
              <div className="relative p-8 bg-[var(--bg-base)] border border-white/5 rounded-xl hover:border-white/10 transition-all h-full">
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl blur-xl"
                  style={{ backgroundColor: category.color }}
                />

                {/* Category Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 
                      className="font-display text-2xl font-bold transition-colors"
                      style={{ color: category.color }}
                    >
                      {category.label}
                    </h3>
                    <motion.div
                      className="w-3 h-3 pixel-decoration"
                      style={{ backgroundColor: category.color }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: categoryIndex * 0.3 }}
                    />
                  </div>
                  <div 
                    className="h-1 w-12 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>

                {/* Skills List */}
                <div className="relative z-10 space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 group/skill"
                    >
                      <div 
                        className="w-2 h-2 pixel-decoration opacity-50 group-hover/skill:opacity-100 transition-opacity"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-[var(--text-secondary)] group-hover/skill:text-[var(--text-primary)] transition-colors font-body text-sm md:text-base">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative corner pixel */}
                <div 
                  className="absolute bottom-4 right-4 w-2 h-2 pixel-decoration opacity-30"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--text-tertiary)] text-sm font-mono">
            Always learning • Always building • Always improving
          </p>
        </motion.div>
      </div>
    </section>
  );
}

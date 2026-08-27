import { motion } from 'motion/react';
import { Code2, Database, Shield, Sparkles } from 'lucide-react';

/**
 * About Section — Modern Editorial Design
 * Removes RPG/Character Select aesthetic
 * Focuses on real professional information
 */
export function AboutPreview() {
  const interests = [
    { icon: Code2, label: 'Full-Stack Development', color: 'var(--accent-primary)' },
    { icon: Database, label: 'Backend Architecture', color: 'var(--accent-secondary)' },
    { icon: Shield, label: 'Security Engineering', color: 'var(--accent-violet)' },
    { icon: Sparkles, label: 'Creative Frontend', color: 'var(--accent-acid)' },
  ];

  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[var(--accent-primary)] opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[var(--accent-secondary)] opacity-10 blur-3xl rounded-full" />

      <div className="container-observatory relative z-10">
        
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-3 h-3 pixel-decoration bg-[var(--accent-primary)]" />
          <span className="font-mono text-xs md:text-sm text-[var(--accent-primary)] uppercase tracking-widest">
            About Me
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight">
              Building Digital
              <span className="block bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              <p>
                I'm <strong className="text-[var(--text-primary)] font-semibold">Muhamad Nur Yanfa</strong>, 
                a Software Engineer passionate about creating robust, scalable systems and 
                delightful user experiences.
              </p>
              <p>
                My journey spans <strong className="text-[var(--accent-primary)]">full-stack development</strong>, 
                <strong className="text-[var(--accent-secondary)]"> backend architecture</strong>, and 
                <strong className="text-[var(--accent-violet)]"> security engineering</strong>. 
                I believe great software is built at the intersection of solid engineering principles 
                and thoughtful design.
              </p>
              <p>
                Currently exploring <strong className="text-[var(--accent-acid)]">modern web technologies</strong>, 
                system design patterns, and security best practices while building projects that solve 
                real-world problems.
              </p>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-[var(--accent-primary)] font-display font-semibold hover:gap-4 transition-all group"
              >
                Learn more about me
                <motion.span
                  className="text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Visual/Interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Interest cards */}
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative group p-6 bg-[var(--bg-elevated)] border border-white/5 rounded-lg hover:border-white/10 transition-all overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"
                    style={{ backgroundColor: interest.color }}
                  />
                  
                  <div className="relative z-10">
                    <interest.icon 
                      size={32} 
                      className="mb-4 transition-colors"
                      style={{ color: interest.color }}
                    />
                    <h3 className="font-display text-sm font-semibold text-[var(--text-primary)] leading-tight">
                      {interest.label}
                    </h3>
                  </div>

                  {/* Pixel decoration */}
                  <div 
                    className="absolute bottom-2 right-2 w-2 h-2 pixel-decoration opacity-50"
                    style={{ backgroundColor: interest.color }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating pixel decorations */}
            <motion.div
              className="absolute -top-4 -right-4 w-4 h-4 pixel-decoration bg-[var(--accent-primary)]"
              animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-3 h-3 pixel-decoration bg-[var(--accent-secondary)]"
              animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

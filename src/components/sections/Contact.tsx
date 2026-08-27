import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Send, GitBranch, Link2, Mail, MessageSquare } from 'lucide-react';

/**
 * Contact — Modern Creative Composition
 * Removes terminal aesthetic
 * Creates visually engaging contact section with pixel decorations
 */
export function Contact() {
  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-[var(--accent-primary)] opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-[var(--accent-secondary)] opacity-10 blur-3xl rounded-full" />

      {/* Floating pixel decorations */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-4 h-4 pixel-decoration bg-[var(--accent-primary)]"
        animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-3 h-3 pixel-decoration bg-[var(--accent-secondary)]"
        animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />

      <div className="container-observatory relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 pixel-decoration bg-[var(--accent-primary)]" />
            <span className="font-mono text-xs md:text-sm text-[var(--accent-primary)] uppercase tracking-widest">
              Get In Touch
            </span>
            <div className="w-3 h-3 pixel-decoration bg-[var(--accent-primary)]" />
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl text-[var(--text-primary)] mb-6 leading-tight">
            Let's Build
            <span className="block bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-violet)] bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat about tech? 
            I'm always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-8">
              Connect With Me
            </h3>

            {[
              { icon: Mail, label: 'Email', value: 'muhamadnuryanfa@example.com', href: 'mailto:muhamadnuryanfa@example.com', color: 'var(--accent-primary)' },
              { icon: GitBranch, label: 'GitHub', value: 'github.com/nuryanfa', href: 'https://github.com/nuryanfa', color: 'var(--text-primary)' },
              { icon: Link2, label: 'LinkedIn', value: 'linkedin.com/in/muhamad-nur-yanfa', href: 'https://linkedin.com/in/muhamad-nur-yanfa', color: 'var(--accent-secondary)' },
              { icon: MessageSquare, label: 'Discord', value: 'nuryanfa#0000', href: '#', color: 'var(--accent-violet)' },
            ].map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="group flex items-center gap-4 p-4 bg-[var(--bg-elevated)] border border-white/5 rounded-lg hover:border-white/10 transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center relative"
                  style={{ backgroundColor: `${contact.color}20` }}
                >
                  <contact.icon size={24} style={{ color: contact.color }} />
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 blur-md transition-opacity"
                    style={{ backgroundColor: contact.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-widest">
                    {contact.label}
                  </div>
                  <div className="text-sm text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition-colors">
                    {contact.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Quick Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="p-8 bg-[var(--bg-elevated)] border border-white/5 rounded-xl">
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
                Send a Message
              </h3>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 bg-[var(--bg-base)] border border-white/10 rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors placeholder:text-[var(--text-faint)]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-[var(--bg-base)] border border-white/10 rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors placeholder:text-[var(--text-faint)]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 bg-[var(--bg-base)] border border-white/10 rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors placeholder:text-[var(--text-faint)]"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--bg-base)] border border-white/10 rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none placeholder:text-[var(--text-faint)]"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-display font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(255,0,110,0.3)] transition-all group"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    Send Message
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

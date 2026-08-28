import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Send, GitBranch, Link2, Mail, MessageSquare } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="section-spacing relative overflow-hidden">

      {/* Magenta atmosphere — semantic color for Contact */}
      <div aria-hidden="true"
           className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[600px] pointer-events-none
                      rounded-full blur-[120px] opacity-[0.07]
                      bg-[var(--accent-primary)]" />
      <div aria-hidden="true"
           className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[400px] pointer-events-none
                      rounded-full blur-[100px] opacity-[0.05]
                      bg-[var(--accent-primary)]" />

      <div className="container-observatory relative z-10">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-label text-[var(--accent-primary)] mb-6 block justify-center">
            Get In Touch
          </span>

          <h2
            className="font-display font-extrabold leading-[1.0] tracking-tight
                       text-[var(--text-primary)] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw + 1rem, 5rem)' }}
          >
            Let's Build
            <span className="block text-[var(--accent-primary)]">
              Something Great
            </span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss an opportunity?
            I'm always open to interesting conversations.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* ── Contact links ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 space-y-4"
          >
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-6">
              Connect
            </h3>

            {([
              { icon: Mail,         label: 'Email',    value: 'muhamadnuryanfa@example.com', href: 'mailto:muhamadnuryanfa@example.com', color: 'var(--accent-primary)'   },
              { icon: GitBranch,    label: 'GitHub',   value: 'github.com/nuryanfa',          href: 'https://github.com/nuryanfa',        color: 'var(--text-primary)'    },
              { icon: Link2,        label: 'LinkedIn', value: 'muhamad-nur-yanfa',             href: 'https://linkedin.com/in/muhamad-nur-yanfa', color: 'var(--accent-secondary)' },
              { icon: MessageSquare,label: 'Discord',  value: 'nuryanfa#0000',                 href: '#',                                  color: 'var(--accent-violet)'   },
            ] as const).map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-4 p-4
                           bg-[var(--bg-elevated)]
                           border border-white/5 hover:border-white/10
                           px-frame transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {/* Icon box — pixel corner via px-frame on inner div */}
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0
                             bg-[var(--bg-panel)] border border-white/8 px-frame"
                  style={{ color: c.color }}
                >
                  <c.icon size={18} />
                </div>

                <div className="min-w-0">
                  <div className="font-pixel text-[9px] tracking-widest uppercase mb-0.5"
                       style={{ color: c.color }}>
                    {c.label}
                  </div>
                  <div className="text-sm font-mono text-[var(--text-secondary)]
                                  truncate group-hover:text-[var(--text-primary)] transition-colors">
                    {c.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Message form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            {/* Card — stepped corner via px-frame, no rounded-lg */}
            <div className="p-8 bg-[var(--bg-elevated)] border border-white/5 px-frame">
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-6">
                Send a Message
              </h3>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField id="name"  label="Name"  type="text"  placeholder="Your name" />
                  <FormField id="email" label="Email" type="email" placeholder="your@email.com" />
                </div>

                <FormField id="subject" label="Subject" type="text" placeholder="Project inquiry" />

                {/* Textarea */}
                <div>
                  <label htmlFor="message"
                         className="block font-pixel text-[9px] tracking-widest uppercase
                                    text-[var(--text-tertiary)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="px-input w-full resize-none"
                    style={{ minHeight: '7.5rem' }}
                  />
                </div>

                <Button variant="primary" arrow={false}>
                  <Send size={14} />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── Reusable pixel-styled form field ── */
function FormField({
  id, label, type, placeholder,
}: { id: string; label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id}
             className="block font-pixel text-[9px] tracking-widest uppercase
                        text-[var(--text-tertiary)] mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="px-input w-full"
      />
    </div>
  );
}

import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';
import { Code2, Globe, Mail, ExternalLink } from 'lucide-react';

/**
 * Contact — "Transmission" (PRD §6.6)
 * 
 * Panel with "send a signal" framing.
 * One solid CTA, contact channels in mono coordinate style.
 */
export function Contact() {
  const channels = [
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'contact@example.com',
      href: 'mailto:contact@example.com',
    },
    {
      icon: Code2,
      label: 'GITHUB',
      value: 'github.com/nuryanfa',
      href: 'https://github.com',
    },
    {
      icon: Globe,
      label: 'LINKEDIN',
      value: 'linkedin.com/in/nuryanfa',
      href: 'https://linkedin.com',
    },
  ];

  return (
    <section id="contact" className="section-spacing">
      <div className="container-observatory max-w-2xl">
        <FocusPullReveal>
          <SectionEyebrow index="05" label="TRANSMISSION" />
        </FocusPullReveal>

        <FocusPullReveal delay={0.1}>
          <Panel angular className="p-8 md:p-12">
            {/* Transmission header */}
            <div className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-[var(--text-faint)] mb-6 uppercase">
              <span className="text-[var(--accent-nebula)]">◇</span>{' '}
              OUTBOUND SIGNAL · OPEN CHANNEL
            </div>

            <h2
              className="text-[var(--text-star)] mb-4"
              style={{ fontSize: 'var(--text-xl)' }}
            >
              Send a Transmission
            </h2>

            <p className="text-[var(--text-dim)] mb-8 normal-case">
              Open to opportunities, collaborations, and conversations about
              security, networking, and software engineering. Signal received
              and responded within 24-48 hours.
            </p>

            {/* CTA */}
            <div className="mb-10">
              <Button variant="solid" href="mailto:contact@example.com">
                Send Transmission
              </Button>
            </div>

            {/* Contact channels */}
            <div className="border-t border-[var(--line-hairline)] pt-6 space-y-4">
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-faint)] uppercase mb-4">
                AVAILABLE FREQUENCIES
              </div>

              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.label !== 'EMAIL' ? '_blank' : undefined}
                  rel={ch.label !== 'EMAIL' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group no-underline py-2"
                >
                  <ch.icon
                    size={16}
                    className="text-[var(--text-faint)] group-hover:text-[var(--accent-nebula)] transition-colors flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-faint)] uppercase">
                      {ch.label}
                    </div>
                    <div className="text-sm text-[var(--text-dim)] group-hover:text-[var(--text-star)] transition-colors truncate">
                      {ch.value}
                    </div>
                  </div>
                  <ExternalLink
                    size={12}
                    className="text-[var(--text-faint)] group-hover:text-[var(--accent-nebula)] transition-colors flex-shrink-0"
                  />
                </a>
              ))}
            </div>
          </Panel>
        </FocusPullReveal>
      </div>
    </section>
  );
}

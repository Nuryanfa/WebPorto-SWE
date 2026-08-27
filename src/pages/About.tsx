import { AboutPreview } from '@/components/sections/AboutPreview';
import { CharacterStats } from '@/components/sections/CharacterStats';
import { Timeline } from '@/components/sections/Timeline';

/**
 * About page — deep dive into background, skills, and timeline.
 */
export default function About() {
  return (
    <div className="pt-[var(--nav-height)]">
      <section className="section-spacing">
        <div className="container-observatory">
          
          <div className="font-mono text-sm tracking-widest text-[var(--text-faint)] mb-4">
            [ MENU: SYSTEM OVERVIEW ]
          </div>

          <div>
            <h1
              className="text-[var(--accent-cyan)] mb-3 font-display glitch uppercase"
              style={{ fontSize: 'var(--text-2xl)' }}
              data-text="System Overview"
            >
              System Overview
            </h1>
            <p className="text-[var(--text-secondary)] mb-4 normal-case font-mono tracking-wider max-w-3xl">
              Initialization sequence complete. Displaying core operational parameters, 
              hardware specifications, and active subroutine history.
            </p>
          </div>
        </div>
      </section>

      {/* Main Stats (Bio) */}
      <AboutPreview />
      
      {/* Detailed Capabilities */}
      <CharacterStats />

      {/* Origin Data */}
      <section className="section-spacing bg-[var(--bg-void)] border-y-4 border-[var(--pixel-border-dark)]">
        <div className="container-observatory">
          <div className="mb-10">
            <h2 className="text-[var(--accent-pink)] mb-3 font-display glitch uppercase" data-text="Origin Data">
              Origin Data
            </h2>
          </div>
          
          <div className="max-w-3xl text-[var(--text-secondary)] font-mono leading-relaxed space-y-6 border-l-4 border-[var(--accent-purple)] pl-6">
            <p>
              I am a Software Engineer and Cybersecurity Specialist with a strong 
              foundation in modern web technologies and secure system architecture. 
              My expertise lies in building resilient applications that not only perform 
              optimally but are hardened against contemporary threats.
            </p>
            <p>
              With experience spanning from offensive security frameworks (Purple Team) 
              to robust full-stack development, I approach engineering with a "security-first" 
              mindset. I believe that elegant code and bulletproof infrastructure are not 
              mutually exclusive.
            </p>
            <p>
              Currently expanding my capabilities in Zero-Trust architecture and automated 
              threat intelligence pipelines, always seeking to bridge the gap between 
              innovative development and rigorous security practices.
            </p>
          </div>
        </div>
      </section>

      {/* Full Timeline */}
      <Timeline />
    </div>
  );
}

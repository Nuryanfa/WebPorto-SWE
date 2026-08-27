import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { motion } from 'motion/react';
import { ArrowRight, GitBranch, Link2, Mail } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ─────────────────────────────────────────────
   Hero — Art-Directed Anime × Pixel × Editorial
   Two-zone asymmetric composition:
     LEFT  → editorial text stack
     RIGHT → character focal point with pixel frame
   ───────────────────────────────────────────── */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  /* ── Anime.js entrance refs ── */
  const accentLineRef  = useRef<HTMLDivElement>(null);
  const greetingRef    = useRef<HTMLDivElement>(null);
  const nameLine1Ref   = useRef<HTMLDivElement>(null);
  const nameLine2Ref   = useRef<HTMLDivElement>(null);
  const roleRef        = useRef<HTMLDivElement>(null);
  const descRef        = useRef<HTMLDivElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);
  const socialsRef     = useRef<HTMLDivElement>(null);
  const characterRef   = useRef<HTMLDivElement>(null);
  const pixelDecoRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Make everything visible immediately for reduced-motion users */
    if (prefersReducedMotion) {
      [
        accentLineRef, greetingRef, nameLine1Ref, nameLine2Ref,
        roleRef, descRef, ctaRef, socialsRef, characterRef, pixelDecoRef,
      ].forEach(r => {
        if (r.current) {
          r.current.style.opacity   = '1';
          r.current.style.transform = 'none';
          r.current.style.clipPath  = 'none';
        }
      });
      return;
    }

    /* ── Cinematic entrance timeline ── */
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    /* 1. Pixel decorations scatter in */
    tl.add({
      targets:    pixelDecoRef.current?.querySelectorAll('.px-deco'),
      opacity:    [0, 1],
      scale:      [0, 1],
      delay:      anime.stagger(60, { from: 'center' }),
      duration:   500,
    }, 0)

    /* 2. Accent line sweeps in */
    .add({
      targets:    accentLineRef.current,
      scaleX:     [0, 1],
      opacity:    [0, 1],
      duration:   600,
    }, 100)

    /* 3. Greeting fades up */
    .add({
      targets:    greetingRef.current,
      opacity:    [0, 1],
      translateY: [24, 0],
      duration:   700,
    }, 300)

    /* 4. Name lines sweep from the left with clip-path reveal */
    .add({
      targets:    nameLine1Ref.current,
      opacity:    [0, 1],
      translateX: [-40, 0],
      duration:   800,
    }, 500)
    .add({
      targets:    nameLine2Ref.current,
      opacity:    [0, 1],
      translateX: [-60, 0],
      duration:   800,
    }, 600)

    /* 5. Role badge slides in */
    .add({
      targets:    roleRef.current,
      opacity:    [0, 1],
      translateY: [20, 0],
      duration:   700,
    }, 800)

    /* 6. Character enters from right with fade + slight scale */
    .add({
      targets:    characterRef.current,
      opacity:    [0, 1],
      translateX: [60, 0],
      scale:      [0.96, 1],
      duration:   1000,
    }, 700)

    /* 7. Description + CTAs + socials stagger */
    .add({
      targets:    descRef.current,
      opacity:    [0, 1],
      translateY: [16, 0],
      duration:   600,
    }, 1100)
    .add({
      targets:    ctaRef.current,
      opacity:    [0, 1],
      translateY: [12, 0],
      duration:   500,
    }, 1250)
    .add({
      targets:    socialsRef.current,
      opacity:    [0, 1],
      translateY: [12, 0],
      duration:   500,
    }, 1380);

  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >
      {/* ── Background atmospheric glow specific to hero ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {/* Pink radial behind text */}
        <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]
                        rounded-full blur-[120px]
                        bg-[radial-gradient(circle,rgba(255,0,110,0.12)_0%,transparent_70%)]" />
        {/* Cyan radial behind character */}
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]
                        rounded-full blur-[100px]
                        bg-[radial-gradient(circle,rgba(0,245,255,0.08)_0%,transparent_70%)]" />
        {/* Violet bottom accent */}
        <div className="absolute bottom-0 left-1/3 w-[40vw] h-[30vw] max-w-[500px]
                        rounded-full blur-[90px]
                        bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
      </div>

      {/* ── Scattered pixel decorations layer ── */}
      <div
        ref={pixelDecoRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Large diamond accent — top-right quadrant */}
        <div className="px-deco opacity-0 absolute top-[14%] right-[28%] rotate-45
                        w-5 h-5 border-2 border-[var(--accent-primary)]" />
        {/* Solid squares — left field */}
        <div className="px-deco opacity-0 absolute top-[22%] left-[4%]
                        w-3 h-3 bg-[var(--accent-primary)] pixel-decoration" />
        <div className="px-deco opacity-0 absolute top-[42%] left-[7%]
                        w-2 h-2 bg-[var(--accent-secondary)] pixel-decoration" />
        <div className="px-deco opacity-0 absolute top-[60%] left-[3%]
                        w-1 h-1 bg-[var(--accent-violet)] pixel-decoration" />
        {/* Star cluster — top area */}
        <PixelStar className="px-deco opacity-0 absolute top-[8%]  left-[28%]" color="var(--accent-secondary)" size={10} />
        <PixelStar className="px-deco opacity-0 absolute top-[12%] left-[33%]" color="var(--accent-primary)"   size={6}  />
        <PixelStar className="px-deco opacity-0 absolute top-[9%]  left-[36%]" color="var(--accent-acid)"      size={8}  />
        {/* Right-side accents */}
        <div className="px-deco opacity-0 absolute bottom-[32%] right-[3%]
                        w-3 h-3 bg-[var(--accent-secondary)] pixel-decoration" />
        <div className="px-deco opacity-0 absolute bottom-[20%] right-[8%]
                        w-2 h-2 bg-[var(--accent-violet)] pixel-decoration" />
        <PixelStar className="px-deco opacity-0 absolute bottom-[40%] right-[18%]" color="var(--accent-primary)" size={8} />
        {/* Small dot cluster near name */}
        <div className="px-deco opacity-0 absolute top-[55%] left-[48%]
                        w-1 h-1 bg-[var(--accent-secondary)] pixel-decoration" />
        <div className="px-deco opacity-0 absolute top-[58%] left-[50%]
                        w-1 h-1 bg-[var(--accent-primary)] pixel-decoration" />
      </div>

      {/* ── Main two-zone layout ── */}
      <div className="container-observatory relative z-10 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0 lg:gap-12
                        pt-[calc(var(--nav-height)+2rem)] pb-24
                        lg:pt-[calc(var(--nav-height)+3rem)] lg:pb-16
                        items-center min-h-screen">

          {/* ════════════════════════════════
              LEFT — Editorial text content
              ════════════════════════════════ */}
          <div className="relative flex flex-col justify-center max-w-[680px]">

            {/* Accent horizontal rule — sweeps in */}
            <div
              ref={accentLineRef}
              style={{ opacity: 0, transformOrigin: 'left center' }}
              className="mb-7 flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
              <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--text-tertiary)] uppercase">
                Portfolio&ensp;/&ensp;2026
              </span>
            </div>

            {/* Greeting */}
            <div ref={greetingRef} style={{ opacity: 0 }} className="mb-3">
              <span className="inline-flex items-center gap-2.5
                               font-mono text-[12px] tracking-[0.2em]
                               text-[var(--accent-secondary)] uppercase">
                <motion.span
                  className="w-2 h-2 pixel-decoration bg-[var(--accent-secondary)]"
                  animate={prefersReducedMotion ? {} : { opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                Hello, I'm
              </span>
            </div>

            {/* Name — oversized display type, two lines */}
            <div className="mb-5 overflow-hidden" aria-label="Muhamad Nur Yanfa">
              <div
                ref={nameLine1Ref}
                className="font-display font-bold leading-[0.92] tracking-[-0.04em] text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(3.2rem, 9vw + 1rem, 7.5rem)', opacity: 0 }}
              >
                MUHAMAD
              </div>
              <div
                ref={nameLine2Ref}
                className="font-display font-bold leading-[0.92] tracking-[-0.04em] text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(3.2rem, 9vw + 1rem, 7.5rem)', opacity: 0 }}
              >
                {/* Second line has gradient on key word */}
                <span className="text-[var(--text-primary)]">NUR </span>
                <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]
                                 bg-clip-text text-transparent">
                  YANFA
                </span>
              </div>
            </div>

            {/* Role badge */}
            <div ref={roleRef} style={{ opacity: 0 }} className="mb-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-3 h-3 pixel-decoration bg-[var(--accent-primary)]" />
                <span className="font-display text-lg md:text-xl lg:text-2xl font-semibold
                                 text-[var(--text-secondary)] tracking-wide">
                  Software Engineer
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              style={{ opacity: 0 }}
              className="font-body text-[var(--text-secondary)] text-base md:text-lg
                         leading-relaxed max-w-[52ch] mb-10"
            >
              Building web experiences, software systems, and digital products
              with a focus on clean architecture, thoughtful interaction,
              and engineering that lasts.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-wrap items-center gap-4 mb-10">
              {/* Primary CTA */}
              <motion.a
                href="#projects"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2
                           px-7 py-3.5 rounded-lg overflow-hidden
                           font-display font-semibold text-sm
                           bg-[var(--accent-primary)] text-white
                           hover:shadow-[0_0_28px_rgba(255,0,110,0.45)]
                           transition-shadow duration-300"
              >
                {/* Shimmer overlay */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r
                             from-transparent via-white/10 to-transparent
                             -translate-x-full"
                  animate={prefersReducedMotion ? {} : { translateX: ['-100%', '200%'] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                />
                <span className="relative z-10">Explore My Work</span>
                <motion.span
                  className="relative z-10"
                  animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={17} />
                </motion.span>
              </motion.a>

              {/* Secondary CTA — outlined */}
              <motion.a
                href="/contact"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2
                           px-7 py-3.5 rounded-lg
                           font-display font-semibold text-sm
                           border border-[var(--accent-secondary)]
                           text-[var(--accent-secondary)]
                           hover:bg-[var(--accent-secondary)] hover:text-[var(--bg-base)]
                           transition-colors duration-200"
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Socials */}
            <div ref={socialsRef} style={{ opacity: 0 }} className="flex items-center gap-6">
              {[
                { href: 'https://github.com/nuryanfa',                Icon: GitBranch, label: 'GitHub',   hoverColor: 'hover:text-[var(--accent-primary)]'   },
                { href: 'https://linkedin.com/in/muhamad-nur-yanfa',  Icon: Link2,     label: 'LinkedIn',  hoverColor: 'hover:text-[var(--accent-secondary)]' },
                { href: 'mailto:muhamadnuryanfa@example.com',         Icon: Mail,      label: 'Email',     hoverColor: 'hover:text-[var(--accent-violet)]'    },
              ].map(({ href, Icon, label, hoverColor }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  whileHover={prefersReducedMotion ? {} : { y: -3 }}
                  className={`flex items-center gap-2 text-[var(--text-faint)] ${hoverColor}
                              transition-colors duration-200`}
                >
                  <Icon size={18} />
                  <span className="font-mono text-[11px] tracking-wider hidden sm:inline">{label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT — Character focal point
              ════════════════════════════════ */}
          <div
            ref={characterRef}
            style={{ opacity: 0 }}
            className="hidden lg:flex relative flex-col items-center justify-center
                       w-[420px] xl:w-[480px] self-stretch"
          >
            {/* Pixel frame corners */}
            <PixelCornerFrame />

            {/* Character silhouette / art zone */}
            <motion.div
              animate={prefersReducedMotion ? {} : {
                y: [0, -14, 0],
                rotate: [0, 0.6, -0.4, 0],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[300px] xl:w-[340px] aspect-[3/4] z-10"
            >
              {/* Glow backing */}
              <div className="absolute inset-0 rounded-2xl blur-3xl
                              bg-gradient-to-b from-[var(--accent-primary)]/20
                              via-[var(--accent-secondary)]/15 to-transparent" />

              {/* Abstract character — original SVG-based composition */}
              <CharacterIllustration />

              {/* Pixel scanline overlay on character */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden mix-blend-overlay opacity-[0.06]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
                }}
              />
            </motion.div>

            {/* Floating accent badge — overlaps character */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-[12%] -right-4 z-20
                         flex items-center gap-2
                         px-3 py-2 rounded-lg
                         bg-[var(--bg-elevated)]/90 backdrop-blur-sm
                         border border-[var(--accent-primary)]/40
                         shadow-[0_0_16px_rgba(255,0,110,0.2)]"
            >
              <div className="w-2 h-2 pixel-decoration bg-[var(--accent-primary)] animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-[var(--accent-primary)] uppercase">
                Available
              </span>
            </motion.div>

            {/* Tech badge — overlaps character */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute bottom-[18%] -left-6 z-20
                         px-3 py-2 rounded-lg
                         bg-[var(--bg-elevated)]/90 backdrop-blur-sm
                         border border-[var(--accent-secondary)]/30
                         shadow-[0_0_12px_rgba(0,245,255,0.15)]"
            >
              <span className="font-mono text-[10px] tracking-widest text-[var(--accent-secondary)] uppercase block">
                React&ensp;·&ensp;TypeScript
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[var(--text-faint)] uppercase block">
                Laravel&ensp;·&ensp;Go
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        aria-hidden="true"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] text-[var(--text-faint)] tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--accent-primary)]/60 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Sub-components (Hero-local, not exported)
   ───────────────────────────────────────────── */

/** Single pixel star: a cross made of pixel squares */
function PixelStar({ className, color, size }: { className?: string; color: string; size: number }) {
  const half = Math.round(size / 3);
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `${half}px ${half}px ${half}px`,
        gridTemplateRows:    `${half}px ${half}px ${half}px`,
        gap: '1px',
        imageRendering: 'pixelated',
      }}
    >
      {[false,true,false, true,true,true, false,true,false].map((lit, i) => (
        <span
          key={i}
          style={{ background: lit ? color : 'transparent', display: 'block' }}
        />
      ))}
    </span>
  );
}

/** Four pixel corner brackets around the character zone */
function PixelCornerFrame() {
  return (
    <div className="absolute inset-4 pointer-events-none">
      <div className="relative w-full h-full">
        <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-10">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M0 22 L0 0 L22 0" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </div>
        <div aria-hidden="true" className="absolute top-0 right-0 w-10 h-10">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M40 22 L40 0 L18 0" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-10 h-10">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M0 18 L0 40 L22 40" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </div>
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-10 h-10">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M40 18 L40 40 L18 40" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Original abstract "character" illustration — SVG-based silhouette.
 * An expressionistic figure in profile, soft gradient fills,
 * pixel-accented. Completely original geometry, no existing IP.
 */
function CharacterIllustration() {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Abstract character illustration"
      role="img"
    >
      <defs>
        {/* Body gradient — violet to pink */}
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#FF006E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0.7" />
        </linearGradient>

        {/* Hair / top accent gradient */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0A0A0F" />
          <stop offset="100%" stopColor="#1A1A24" />
        </linearGradient>

        {/* Glow filter on accents */}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip path to keep figure within bounds */}
        <clipPath id="figureClip">
          <rect width="300" height="400" rx="16" />
        </clipPath>
      </defs>

      <g clipPath="url(#figureClip)">
        {/* ── Dark background panel ── */}
        <rect width="300" height="400" fill="#0E0E18" rx="16" />

        {/* Subtle diagonal stripe pattern on bg */}
        <line x1="0"   y1="400" x2="400" y2="0"   stroke="rgba(139,92,246,0.05)" strokeWidth="40" />
        <line x1="-60" y1="400" x2="340" y2="0"   stroke="rgba(255,0,110,0.04)"  strokeWidth="40" />
        <line x1="60"  y1="400" x2="460" y2="0"   stroke="rgba(0,245,255,0.03)"  strokeWidth="40" />

        {/* ── Body — broad flowing shape ── */}
        {/* Torso + lower body silhouette */}
        <path
          d="M105 220
             C 90 250, 70 310, 80 390
             L 220 390
             C 230 310, 210 250, 195 220
             Z"
          fill="url(#bodyGrad)"
          opacity="0.85"
        />

        {/* Jacket / outer layer — slightly darker offset */}
        <path
          d="M100 240
             C 82 265, 66 330, 78 390
             L 120 390
             C 112 330, 114 268, 118 245
             Z"
          fill="rgba(10,10,15,0.6)"
        />
        <path
          d="M200 240
             C 218 265, 234 330, 222 390
             L 180 390
             C 188 330, 186 268, 182 245
             Z"
          fill="rgba(10,10,15,0.6)"
        />

        {/* Scarf / collar detail — cyan accent */}
        <path
          d="M118 218 C 130 235, 145 240, 150 242 C 155 240, 170 235, 182 218
             C 175 228, 165 236, 150 240 C 135 236, 125 228, 118 218 Z"
          fill="rgba(0,245,255,0.5)"
          filter="url(#glow)"
        />

        {/* ── Neck ── */}
        <rect x="136" y="168" width="28" height="56" rx="14" fill="url(#bodyGrad)" opacity="0.9" />

        {/* ── Head ── */}
        <ellipse cx="150" cy="140" rx="54" ry="60" fill="url(#bodyGrad)" />
        {/* Face surface — slightly lighter */}
        <ellipse cx="152" cy="142" rx="46" ry="52" fill="rgba(255,180,160,0.15)" />

        {/* ── Hair — dark mass, stylised ── */}
        {/* Main hair top */}
        <ellipse cx="150" cy="95" rx="56" ry="40" fill="url(#hairGrad)" />
        {/* Side flick left */}
        <path d="M100 110 C 80 90, 75 60, 88 40 C 96 60, 100 80, 104 100 Z"
              fill="#0A0A0F" />
        {/* Side flick right */}
        <path d="M200 110 C 220 90, 225 60, 212 40 C 204 60, 200 80, 196 100 Z"
              fill="#0A0A0F" />
        {/* Front hair strands */}
        <path d="M120 80 C 118 65, 124 50, 132 42" stroke="#1A1A24" strokeWidth="6" strokeLinecap="round"/>
        <path d="M135 76 C 132 60, 137 44, 144 36" stroke="#1A1A24" strokeWidth="5" strokeLinecap="round"/>

        {/* ── Eyes — glowing accents ── */}
        {/* Left eye */}
        <ellipse cx="132" cy="138" rx="9" ry="7" fill="#0A0A0F" />
        <ellipse cx="132" cy="138" rx="6" ry="5"
                 fill="var(--accent-secondary)"
                 filter="url(#glow)" opacity="0.9" />
        <ellipse cx="133" cy="137" rx="2.5" ry="2" fill="white" />
        {/* Right eye */}
        <ellipse cx="168" cy="138" rx="9" ry="7" fill="#0A0A0F" />
        <ellipse cx="168" cy="138" rx="6" ry="5"
                 fill="var(--accent-secondary)"
                 filter="url(#glow)" opacity="0.9" />
        <ellipse cx="169" cy="137" rx="2.5" ry="2" fill="white" />

        {/* ── Subtle mouth ── */}
        <path d="M142 158 Q 150 163 158 158" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

        {/* ── Arms ── */}
        {/* Left arm */}
        <path d="M100 225 C 75 250, 60 300, 68 350 L 88 348 C 82 298, 96 252, 118 230 Z"
              fill="url(#bodyGrad)" opacity="0.7" />
        {/* Right arm */}
        <path d="M200 225 C 225 250, 240 300, 232 350 L 212 348 C 218 298, 204 252, 182 230 Z"
              fill="url(#bodyGrad)" opacity="0.7" />

        {/* ── Jacket detail lines ── */}
        <line x1="145" y1="240" x2="140" y2="390" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <line x1="155" y1="240" x2="160" y2="390" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* ── Pixel accent stars on outfit ── */}
        {/* Star on left chest */}
        <rect x="117" y="255" width="3" height="3" fill="var(--accent-secondary)" opacity="0.9" />
        <rect x="114" y="258" width="9" height="3" fill="var(--accent-secondary)" opacity="0.7" />
        <rect x="117" y="261" width="3" height="3" fill="var(--accent-secondary)" opacity="0.9" />
        {/* Dot row — belt area */}
        {[0,1,2,3,4,5].map(i => (
          <rect key={i} x={120 + i * 10} y="268" width="4" height="4"
                fill={i % 2 === 0 ? "var(--accent-primary)" : "var(--accent-secondary)"}
                opacity="0.5" />
        ))}

        {/* ── Pink accent edge light on right side of figure ── */}
        <path d="M196 220 C 200 250, 210 310, 222 390"
              stroke="rgba(255,0,110,0.4)" strokeWidth="2" fill="none"
              filter="url(#glow)" />

        {/* ── Cyan rim light on left shoulder ── */}
        <path d="M100 220 C 88 230, 76 260, 70 300"
              stroke="rgba(0,245,255,0.35)" strokeWidth="2" fill="none"
              filter="url(#glow)" />

        {/* ── Name badge — pixel-style bottom band ── */}
        <rect x="0" y="360" width="300" height="40" fill="rgba(10,10,15,0.7)" />
        <text x="150" y="385"
              textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize="11"
              fontWeight="700"
              letterSpacing="3"
              fill="rgba(255,255,255,0.5)"
              style={{ textTransform: 'uppercase' }}>
          NUR YANFA
        </text>
      </g>
    </svg>
  );
}

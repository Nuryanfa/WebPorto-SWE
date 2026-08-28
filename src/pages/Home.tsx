import { Hero }               from '@/components/sections/Hero';
import { ProfileScene }       from '@/components/scenes/ProfileScene';
import { CapabilitiesScene }  from '@/components/scenes/CapabilitiesScene';
import { ArsenalScene }       from '@/components/scenes/ArsenalScene';
import { ProjectCatalog }     from '@/components/sections/ProjectCatalog';
import { Timeline }           from '@/components/sections/Timeline';
import { Contact }            from '@/components/sections/Contact';

/*
 * Home — V3 Scene Map (Blueprint §06)
 *
 * IDENTITY    → Hero           (magenta)
 * PROFILE     → ProfileScene   (lavender)
 * CAPABILITIES→ CapabilitiesScene (magenta/cyan)
 * ARSENAL     → ArsenalScene   (cyan)
 * WORK        → ProjectCatalog (cyan)
 * EXPERIENCE  → Timeline       (lavender)
 * CONTACT     → Contact        (acid green)
 */
export default function Home() {
  return (
    <>
      {/* 01 — IDENTITY */}
      <Hero />

      {/* 02 — PROFILE */}
      <ProfileScene />

      {/* 03 — CAPABILITIES */}
      <CapabilitiesScene />

      {/* 04 — ARSENAL */}
      <ArsenalScene />

      {/* 05 — SELECTED WORK */}
      <ProjectCatalog showViewAll />

      {/* 06 — EXPERIENCE */}
      <Timeline />

      {/* 07 — CONTACT / FINAL SCENE */}
      <Contact />
    </>
  );
}

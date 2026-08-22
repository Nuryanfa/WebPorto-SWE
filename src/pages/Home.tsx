import { Hero } from '@/components/sections/Hero';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { OrbitalSkills } from '@/components/sections/OrbitalSkills';
import { ProjectCatalog } from '@/components/sections/ProjectCatalog';
import { Timeline } from '@/components/sections/Timeline';
import { Contact } from '@/components/sections/Contact';

/**
 * Home / Landing Page
 * 
 * Single-page scroll composing all sections for the
 * "cinematic observatory journey" experience.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <OrbitalSkills />
      <ProjectCatalog showViewAll />
      <Timeline />
      <Contact />
    </>
  );
}

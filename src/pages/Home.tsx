import { Hero } from '@/components/sections/Hero';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { ProjectCatalog } from '@/components/sections/ProjectCatalog';
import { Timeline } from '@/components/sections/Timeline';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProjectCatalog showViewAll />
      <Timeline />
      <Contact />
    </>
  );
}

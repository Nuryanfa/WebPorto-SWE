import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ClassifiedStarfield, StarCluster } from './ClassifiedStarfield';
import { ScrollCameraRig } from './ScrollCameraRig';
import { ShootingStar } from './ShootingStar';
import { MilkyWayBand } from './MilkyWayBand';
import { Comet } from './Comet';
import { DebugStars } from './DebugStars';

export function StarfieldScene({ reduced }: { reduced: boolean }) {
  // Full starfield with Milky Way
  return (
    <>
      <ambientLight intensity={0.3} />
      <color attach="background" args={['#000000']} />
      
      <ClassifiedStarfield count={reduced ? 1200 : 3000} />
      <StarCluster center={[10, 5, -15]} />
      <MilkyWayBand />
      
      {!reduced && <ScrollCameraRig />}
      {!reduced && <ShootingStar />}
      {!reduced && <Comet />}
      
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.3} 
          luminanceSmoothing={0.8} 
          mipmapBlur 
        />
      </EffectComposer>
    </>
  );
}

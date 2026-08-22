import { Canvas } from '@react-three/fiber';
import { StarfieldScene } from './StarfieldScene';

export function SceneCanvas({ reduced }: { reduced: boolean }) {
  return (
    <div 
      className="fixed inset-0" 
      style={{ 
        zIndex: 0, // Base layer - behind content but visible
        pointerEvents: 'none'
      }} 
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <StarfieldScene reduced={reduced} />
      </Canvas>
    </div>
  );
}

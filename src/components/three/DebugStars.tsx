import { useRef } from 'react';
import * as THREE from 'three';

/**
 * Ultra-simple debug component to verify Three.js is working
 * If you can see bright stars, Three.js is rendering correctly
 */
export function DebugStars() {
  const count = 500;
  
  // Simple positions - no complex math
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={3.0} 
        color="#FFFFFF"
        transparent
        opacity={1.0}
        sizeAttenuation
      />
    </points>
  );
}

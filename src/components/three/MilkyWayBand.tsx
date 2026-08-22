import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Creates a photorealistic Milky Way with nebula clouds, dust lanes, and galactic core
function createPhotorealisticMilkyWayTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Clear to transparent
  ctx.clearRect(0, 0, 2048, 512);
  
  // 1. Base Nebula Layer (Cyan-Purple gradient like reference image)
  const nebulaGrad = ctx.createLinearGradient(0, 0, 0, 512);
  nebulaGrad.addColorStop(0, 'rgba(20, 30, 60, 0)');
  nebulaGrad.addColorStop(0.25, 'rgba(60, 80, 140, 0.4)'); // Blue nebula
  nebulaGrad.addColorStop(0.5, 'rgba(80, 60, 120, 0.6)');  // Purple core
  nebulaGrad.addColorStop(0.75, 'rgba(60, 80, 140, 0.4)'); // Blue nebula
  nebulaGrad.addColorStop(1, 'rgba(20, 30, 60, 0)');
  
  ctx.fillStyle = nebulaGrad;
  ctx.fillRect(0, 0, 2048, 512);
  
  // 2. Galactic Core Glow (Bright center)
  ctx.globalCompositeOperation = 'screen';
  const coreGrad = ctx.createRadialGradient(1024, 256, 0, 1024, 256, 400);
  coreGrad.addColorStop(0, 'rgba(255, 220, 180, 0.8)');    // Warm white core
  coreGrad.addColorStop(0.2, 'rgba(200, 150, 255, 0.6)');  // Purple
  coreGrad.addColorStop(0.4, 'rgba(100, 150, 255, 0.4)');  // Blue
  coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = coreGrad;
  ctx.fillRect(0, 0, 2048, 512);
  
  // 3. Nebula Clouds (Colored gas clouds)
  ctx.globalCompositeOperation = 'screen';
  
  // Cyan clouds
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 2048;
    const y = 200 + Math.random() * 112;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 80 + Math.random() * 100);
    grad.addColorStop(0, `rgba(93, 253, 203, ${0.15 + Math.random() * 0.15})`);
    grad.addColorStop(1, 'rgba(93, 253, 203, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - 150, y - 150, 300, 300);
  }
  
  // Pink/Purple clouds
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 2048;
    const y = 200 + Math.random() * 112;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 80 + Math.random() * 100);
    grad.addColorStop(0, `rgba(255, 107, 181, ${0.12 + Math.random() * 0.12})`);
    grad.addColorStop(1, 'rgba(255, 107, 181, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - 150, y - 150, 300, 300);
  }
  
  // 4. Dark Dust Lanes (like in reference image)
  ctx.globalCompositeOperation = 'multiply';
  
  // Main dark rift
  const riftGrad = ctx.createLinearGradient(0, 0, 0, 512);
  riftGrad.addColorStop(0, 'rgba(0,0,0,1)');
  riftGrad.addColorStop(0.42, 'rgba(0,0,0,1)');
  riftGrad.addColorStop(0.5, 'rgba(30,20,40,0.4)');  // Dark dust
  riftGrad.addColorStop(0.58, 'rgba(0,0,0,1)');
  riftGrad.addColorStop(1, 'rgba(0,0,0,1)');
  
  ctx.fillStyle = riftGrad;
  ctx.fillRect(0, 0, 2048, 512);
  
  // Additional dust clouds (organic shapes)
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 2048;
    const y = 200 + Math.random() * 112;
    const size = 40 + Math.random() * 80;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
    grad.addColorStop(0, `rgba(0,0,0,${0.3 + Math.random() * 0.4})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
  }
  
  // 5. Star Specks (small dots, not dominant)
  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 2048;
    const y = Math.random() * 512;
    const brightness = Math.random();
    const size = brightness < 0.98 ? 0.5 : (1 + Math.random() * 1.5); // Most stars tiny, few bigger
    
    ctx.fillStyle = brightness > 0.95 
      ? `rgba(255,255,255,${brightness})` 
      : `rgba(200,210,255,${brightness * 0.6})`;
    ctx.fillRect(x, y, size, size);
  }
  
  // 6. Edge Fade (horizontal)
  ctx.globalCompositeOperation = 'destination-in';
  const edgeGrad = ctx.createLinearGradient(0, 0, 2048, 0);
  edgeGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  edgeGrad.addColorStop(0.1, 'rgba(255, 255, 255, 1)');
  edgeGrad.addColorStop(0.9, 'rgba(255, 255, 255, 1)');
  edgeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, 2048, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export function MilkyWayBand() {
  const groupRef = useRef<THREE.Group>(null);
  
  const texture = useMemo(() => createPhotorealisticMilkyWayTexture(), []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow drift
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.08) * 1.5;
      groupRef.current.rotation.z = Math.PI / 5.5 + Math.sin(state.clock.elapsedTime * 0.04) * 0.015;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 5.5]} position={[0, 0, -50]}>
      <mesh>
        <planeGeometry args={[160, 40]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          opacity={0.85}
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
}

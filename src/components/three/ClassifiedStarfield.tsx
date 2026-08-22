import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_CLASSES = [
  { color: '#9BB0FF', weight: 0.002, sizeMult: 1.8 }, // O — sangat langka, paling besar/terang
  { color: '#AABFFF', weight: 0.008, sizeMult: 1.5 }, // B
  { color: '#CAD7FF', weight: 0.03,  sizeMult: 1.2 }, // A
  { color: '#F8F7FF', weight: 0.12,  sizeMult: 1.0 }, // F
  { color: '#FFF4EA', weight: 0.15,  sizeMult: 0.9 }, // G
  { color: '#FFD2A1', weight: 0.25,  sizeMult: 0.8 }, // K
  { color: '#FFB56C', weight: 0.44,  sizeMult: 0.7 }, // M — paling umum, paling kecil/redup
];

// Generate circular soft-falloff texture SEKALI via canvas, dipakai sebagai sprite
function generateStarTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

function pickClass(rand: number) {
  let cumulative = 0;
  for (const cls of STAR_CLASSES) {
    cumulative += cls.weight;
    if (rand <= cumulative) return cls;
  }
  return STAR_CLASSES[STAR_CLASSES.length - 1];
}

export function ClassifiedStarfield({ count = 3000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const starTexture = useMemo(() => generateStarTexture(), []);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Distribusi bola (sphere) di sekitar kamera, radius 20-80
      const radius = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const cls = pickClass(Math.random());
      color.set(cls.color);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Most stars TINY (subtle), few prominent ones
      const prominent = Math.random() > 0.95; // Only 5% prominent
      sizes[i] = prominent 
        ? cls.sizeMult * (0.8 + Math.random() * 0.6) 
        : cls.sizeMult * (0.1 + Math.random() * 0.3); // Very small
    }
    return [positions, colors, sizes];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.002; // drift ambient SANGAT pelan
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        alphaTest={0.01}
        size={1.0}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function StarCluster({ center = [10, 5, -15] as [number, number, number] }) {
  const starTexture = useMemo(() => generateStarTexture(), []);
  
  const [positions, colors] = useMemo(() => {
    const count = 25;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Distribusi RAPAT dalam radius kecil (bukan tersebar seperti starfield utama)
      const r = Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = center[0] + r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = center[1] + r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = center[2] + r * Math.cos(phi);

      // Cluster ini bias ke kelas B/A (biru-putih terang)
      color.set(Math.random() > 0.5 ? '#AABFFF' : '#CAD7FF');
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, [center]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        map={starTexture}
        alphaTest={0.01}
        size={2.0} 
        vertexColors 
        transparent 
        opacity={1.0} 
        sizeAttenuation 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

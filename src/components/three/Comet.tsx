import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export function Comet() {
  const [active, setActive] = useState(false);
  const progress = useRef(0);
  const pathPoints = useRef<THREE.Vector3[]>([]);
  
  const [currentPoints, setCurrentPoints] = useState<THREE.Vector3[]>([]);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // HANYA SEKALI per page load, delay awal acak 5-15 detik
    const delay = 5000 + Math.random() * 10000;
    const timeout = window.setTimeout(() => {
      // Generate curved path (quadratic bezier, 3 titik kontrol)
      const start = new THREE.Vector3(-30, 15, -25);
      const control = new THREE.Vector3(-5, 8, -20);
      const end = new THREE.Vector3(20, -10, -25);
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);
      pathPoints.current = curve.getPoints(50);
      progress.current = 0;
      setActive(true);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, []);

  useFrame((_, delta) => {
    if (!active || pathPoints.current.length === 0) return;
    
    progress.current += delta / 2.5; // 2.5 detik total
    
    if (progress.current >= 1) {
      setActive(false);
      setOpacity(0);
      return;
    }
    
    const t = progress.current;
    
    // Generate a sub-segment of the curve for the comet trail
    const tailT = Math.max(0, t - 0.2);
    
    // Reconstruct the curve segment manually using the same bezier
    const start = new THREE.Vector3(-30, 15, -25);
    const control = new THREE.Vector3(-5, 8, -20);
    const end = new THREE.Vector3(20, -10, -25);
    const curve = new THREE.QuadraticBezierCurve3(start, control, end);
    
    // Get points between tailT and t
    const segments = 10;
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const ptT = tailT + (t - tailT) * (i / segments);
      pts.push(curve.getPoint(ptT));
    }
    
    setCurrentPoints(pts);
    
    // Fade in cepat, fade out perlahan
    setOpacity(t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1);
  });

  if (!active || currentPoints.length < 2) return null;

  return (
    <>
      {/* Outer glow */}
      <Line
        points={currentPoints}
        color="#5DFDCB"
        lineWidth={10}
        transparent
        opacity={opacity * 0.25}
      />
      {/* Middle glow */}
      <Line
        points={currentPoints}
        color="#8B7BFF"
        lineWidth={6}
        transparent
        opacity={opacity * 0.4}
      />
      {/* Core */}
      <Line
        points={currentPoints}
        color="#FFFFFF"
        lineWidth={3}
        transparent
        opacity={opacity * 0.9}
      />
    </>
  );
}

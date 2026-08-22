import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export function ShootingStar() {
  const [active, setActive] = useState(false);
  const progress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());
  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let timeoutId: number;

    const trigger = () => {
      // Posisi mulai acak di tepi frustum kamera, arah lintasan acak
      const startX = (Math.random() - 0.5) * 40;
      const startY = 10 + Math.random() * 10;
      const startZ = -10 - Math.random() * 20;
      startPos.current.set(startX, startY, startZ);
      endPos.current.set(startX - 8 - Math.random() * 6, startY - 6 - Math.random() * 4, startZ);

      progress.current = 0;
      setActive(true);
    };

    const schedule = () => {
      const delay = 2000 + Math.random() * 3000; // 2-5 detik untuk mudah terlihat
      timeoutId = window.setTimeout(() => {
        trigger();
      }, delay);
    };

    schedule();
    return () => window.clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active === false]); // re-schedule tiap kali selesai (active balik ke false)

  useFrame((_, delta) => {
    if (!active) return;
    progress.current += delta / 1.5; // durasi total 1.5s agar lebih terlihat

    if (progress.current >= 1) {
      setActive(false);
      setOpacity(0);
      return;
    }

    // Posisi kepala shooting star bergerak dari start ke end
    const t = progress.current;
    const headPos = new THREE.Vector3().lerpVectors(startPos.current, endPos.current, t);
    // Trail pendek di belakang kepala (15% dari total jarak)
    const tailT = Math.max(0, t - 0.15);
    const tailPos = new THREE.Vector3().lerpVectors(startPos.current, endPos.current, tailT);

    setPoints([tailPos, headPos]);

    // Fade in cepat, fade out di akhir
    setOpacity(t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1);
  });

  if (!active || points.length < 2) return null;

  return (
    <>
      {/* Glow layer */}
      <Line
        points={points}
        color="#FFFFFF"
        lineWidth={8}
        transparent
        opacity={opacity * 0.3}
      />
      {/* Core trail */}
      <Line
        points={points}
        color="#FFFFFF"
        lineWidth={2.5}
        transparent
        opacity={opacity}
      />
    </>
  );
}

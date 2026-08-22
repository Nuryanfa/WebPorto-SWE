import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function ScrollCameraRig() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };
    
    // Initial call in case not at top
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state) => {
    // Camera moves slowly forward based on scroll
    const targetZ = 1 + scrollProgress.current * 8;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.02; // Damping
    
    // Subtle mouse parallax
    const targetX = (state.pointer.x * 0.15); // R3F uses state.pointer now (from -1 to 1)
    const targetY = (state.pointer.y * 0.1);
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

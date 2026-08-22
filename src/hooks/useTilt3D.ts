import { useState, MouseEvent } from 'react';
import { useMotionValue, useTransform } from 'motion/react';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

/**
 * 3D Tilt hook for cards (§3.3).
 * Tracks mouse position over an element and returns mapped rotateX/rotateY transforms.
 * Max tilt is clamped to very subtle ±6 degrees for premium feel.
 */
export function useTilt3D() {
  const isTouch = useIsTouchDevice();
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Subtle tilt limits: [-6deg, 6deg]
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates to [-0.5, 0.5] from center
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setIsHovering(false);
    // Smooth reset
    mouseX.set(0);
    mouseY.set(0);
  };

  return {
    rotateX: isHovering ? rotateX : 0,
    rotateY: isHovering ? rotateY : 0,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    isHovering,
  };
}

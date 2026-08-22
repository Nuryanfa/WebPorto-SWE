import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  r: number;
  opacity: number;
  layer: number; // 0=far, 1=mid, 2=near
  vx: number;
  vy: number;
}

const LAYERS = [
  { count: 30, opacity: 0.2, parallax: 0.01, sizeRange: [0.3, 0.6] },
  { count: 40, opacity: 0.4, parallax: 0.03, sizeRange: [0.4, 0.8] },
  { count: 20, opacity: 0.7, parallax: 0.06, sizeRange: [0.6, 1.2] },
];

/**
 * Multi-layer parallax starfield (§3.1).
 * 3 layers with different parallax speeds create depth illusion.
 * Mouse repulsion + inter-particle connections per-layer.
 */
export function InteractiveStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Text exclusion zone
      const excludeX = w * 0.08 + 240;
      const excludeY = h * 0.55;

      const spawnW = w * 1.5;
      const spawnH = h * 1.5;
      const offsetX = (w - spawnW) / 2;
      const offsetY = (h - spawnH) / 2;

      stars = [];

      LAYERS.forEach((layer, layerIdx) => {
        let placed = 0;
        let attempts = 0;
        while (placed < layer.count && attempts < layer.count * 10) {
          attempts++;
          const px = offsetX + Math.random() * spawnW;
          const py = offsetY + Math.random() * spawnH;

          const dx = px - excludeX;
          const dy = py - excludeY;
          if (Math.sqrt(dx * dx + dy * dy) < 150) continue;

          stars.push({
            x: px,
            y: py,
            baseX: px,
            baseY: py,
            r: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
            opacity: layer.opacity * (0.7 + Math.random() * 0.3),
            layer: layerIdx,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
          });
          placed++;
        }
      });
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;
      const mouseOffsetX = mouse.x - centerX;
      const mouseOffsetY = mouse.y - centerY;

      // Apply slow global rotation
      const time = Date.now() * 0.00005;
      ctx.save();
      ctx.translate(centerX, centerY);
      if (!shouldReduceMotion) {
        ctx.rotate(time);
      }
      ctx.translate(-centerX, -centerY);

      const spawnW = w * 1.5;
      const spawnH = h * 1.5;
      const offsetX = (w - spawnW) / 2;
      const offsetY = (h - spawnH) / 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const layerCfg = LAYERS[s.layer];

        // Drift
        s.baseX += s.vx;
        s.baseY += s.vy;
        if (s.baseX < offsetX || s.baseX > offsetX + spawnW) s.vx *= -1;
        if (s.baseY < offsetY || s.baseY > offsetY + spawnH) s.vy *= -1;

        // Parallax offset
        let px = s.baseX;
        let py = s.baseY;

        if (!shouldReduceMotion) {
          px += mouseOffsetX * layerCfg.parallax;
          py += mouseOffsetY * layerCfg.parallax;
        }

        s.x = px;
        s.y = py;

        // Mouse repulsion
        if (!shouldReduceMotion) {
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            s.x -= (dx / dist) * force * 4;
            s.y -= (dy / dist) * force * 4;
          }
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 239, 247, ${s.opacity})`;
        ctx.fill();
        
        // Removed lines connecting stars to fit pure astronomy theme
      }

      ctx.restore(); // Restore context after rotation

      animId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animId);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
    />
  );
}

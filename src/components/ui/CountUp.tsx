import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

interface CountUpProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

/**
 * CountUp — animates a number from 0 to target value on viewport entry.
 * §1.3: tabular-nums, 1200ms easeOut, triggers once on scroll into view.
 */
export function CountUp({
  value,
  duration = 1.2,
  suffix = '%',
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {displayValue}{suffix}
    </span>
  );
}

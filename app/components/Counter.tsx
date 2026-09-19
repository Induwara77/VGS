'use client';

import { useEffect, useState } from 'react';
import { outrun } from '../fonts';

interface CounterProps {
  end: number;
  suffix?: string;
  className?: string;
}

export default function Counter({ end, suffix = '+', className = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation duration

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease-out expo formula for a smooth slowdown at the end
      const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOutProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <div className={`${outrun.className} ${className} leading-none`}>
      {count}
      {suffix}
    </div>
  );
}
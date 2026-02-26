import React, { useMemo } from 'react';

interface HeartProps {
  id: number;
  left: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  rotation: number;
}

function generateHearts(count: number): HeartProps[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    startY: Math.random() * 110,
    size: 20 + Math.random() * 32,
    duration: 7 + Math.random() * 9,
    delay: -(Math.random() * 16),
    opacity: 0.55 + Math.random() * 0.35,
    drift: (Math.random() - 0.5) * 100,
    rotation: (Math.random() - 0.5) * 50,
  }));
}

interface FloatingHeartsProps {
  visible: boolean;
  count?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ visible, count = 40 }) => {
  // Generate max pool of 40 hearts; slice to the requested count
  const allHearts = useMemo(() => generateHearts(40), []);
  const hearts = useMemo(() => allHearts.slice(0, count), [allHearts, count]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            top: `${heart.startY}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            '--heart-scale': 1,
            '--heart-opacity': heart.opacity,
            '--heart-drift': `${heart.drift}px`,
            '--heart-rot': `${heart.rotation}deg`,
            animation: `float-heart ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          } as React.CSSProperties}
        >
          <img
            src="/assets/generated/heart-graphic.dim_120x120.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: heart.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;

import React, { useMemo } from 'react';

interface HeartProps {
  id: number;
  left: number;
  startY: number; // percentage from top (0–110) so hearts are spread across full page
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
    // Spread hearts across the full viewport height, including some above/below
    startY: Math.random() * 110,
    size: 20 + Math.random() * 32,
    duration: 7 + Math.random() * 9,
    // Stagger delays so hearts are always visible at all positions
    delay: -(Math.random() * 16),
    opacity: 0.55 + Math.random() * 0.35,
    drift: (Math.random() - 0.5) * 100,
    rotation: (Math.random() - 0.5) * 50,
  }));
}

interface FloatingHeartsProps {
  visible: boolean;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ visible }) => {
  const hearts = useMemo(() => generateHearts(40), []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
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
            src="/assets/generated/heart-float.dim_64x64.png"
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

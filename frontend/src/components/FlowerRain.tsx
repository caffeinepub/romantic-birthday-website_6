import React, { useMemo } from 'react';

interface FlowerProps {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotation: number;
}

function generateFlowers(count: number): FlowerProps[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 20 + Math.random() * 28,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 8,
    drift: (Math.random() - 0.5) * 100,
    rotation: Math.random() * 720 - 360,
  }));
}

interface FlowerRainProps {
  visible: boolean;
  count?: number;
}

const FlowerRain: React.FC<FlowerRainProps> = ({ visible, count = 40 }) => {
  // Generate max pool of 40 flowers; slice to the requested count
  const allFlowers = useMemo(() => generateFlowers(40), []);
  const flowers = useMemo(() => allFlowers.slice(0, count), [allFlowers, count]);

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
        zIndex: 2,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {flowers.map((flower) => (
        <div
          key={flower.id}
          style={{
            position: 'absolute',
            left: `${flower.left}%`,
            top: '-60px',
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            '--flower-drift': `${flower.drift}px`,
            '--flower-rot': `${flower.rotation}deg`,
            animation: `flower-fall ${flower.duration}s ease-in ${flower.delay}s infinite`,
          } as React.CSSProperties}
        >
          <img
            src="/assets/generated/flower-graphic.dim_120x120.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FlowerRain;

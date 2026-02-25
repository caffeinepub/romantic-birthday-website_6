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
}

const FlowerRain: React.FC<FlowerRainProps> = ({ visible }) => {
  const flowers = useMemo(() => generateFlowers(40), []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute"
          style={{
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
            src="/assets/generated/flower-petal.dim_48x48.png"
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

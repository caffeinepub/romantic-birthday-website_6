import React, { useMemo } from 'react';

interface BalloonProps {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  tilt: number;
}

function generateBalloons(count: number): BalloonProps[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    size: 50 + Math.random() * 60,
    duration: 5 + Math.random() * 8,
    delay: Math.random() * 10,
    drift: (Math.random() - 0.5) * 80,
    tilt: (Math.random() - 0.5) * 20,
  }));
}

interface BalloonAnimationProps {
  visible: boolean;
  count?: number;
}

const BalloonAnimation: React.FC<BalloonAnimationProps> = ({ visible, count = 32 }) => {
  // Generate max pool of 35 balloons; slice to the requested count
  const allBalloons = useMemo(() => generateBalloons(35), []);
  const balloons = useMemo(() => allBalloons.slice(0, count), [allBalloons, count]);

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
        zIndex: 3,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          style={{
            position: 'absolute',
            left: `${balloon.left}%`,
            bottom: '-140px',
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.5}px`,
            '--balloon-drift': `${balloon.drift}px`,
            '--balloon-tilt': `${balloon.tilt}deg`,
            animation: `balloon-rise ${balloon.duration}s ease-in-out ${balloon.delay}s infinite`,
          } as React.CSSProperties}
        >
          <img
            src="/assets/generated/balloon-graphic.dim_80x140.png"
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

export default BalloonAnimation;

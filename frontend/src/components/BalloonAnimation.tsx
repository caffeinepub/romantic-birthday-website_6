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
}

const BalloonAnimation: React.FC<BalloonAnimationProps> = ({ visible }) => {
  const balloons = useMemo(() => generateBalloons(25), []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute"
          style={{
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
            src="/assets/generated/balloon.dim_80x120.png"
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

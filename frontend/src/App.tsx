import React, { useState, useEffect, useCallback } from 'react';
import FloatingHearts from './components/FloatingHearts';
import FlowerRain from './components/FlowerRain';
import BalloonAnimation from './components/BalloonAnimation';

type AppState =
  | 'intro'
  | 'question'
  | 'no-response'
  | 'yes-transition'
  | 'blackout'
  | 'decorate'
  | 'decorated'
  | 'balloons'
  | 'final';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  // Auto-transition from intro to question after 3.5 seconds
  useEffect(() => {
    if (appState === 'intro') {
      const timer = setTimeout(() => {
        setContentVisible(false);
        setTimeout(() => {
          setAppState('question');
          setContentVisible(true);
        }, 600);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Auto-transition from no-response back to question
  useEffect(() => {
    if (appState === 'no-response') {
      const timer = setTimeout(() => {
        setContentVisible(false);
        setTimeout(() => {
          setAppState('question');
          setContentVisible(true);
        }, 600);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Auto-transition from yes-transition to blackout
  useEffect(() => {
    if (appState === 'yes-transition') {
      const timer = setTimeout(() => {
        setContentVisible(false);
        setTimeout(() => {
          setAppState('blackout');
          setContentVisible(true);
        }, 600);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleYes = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      setAppState('yes-transition');
      setContentVisible(true);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const handleNo = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      setAppState('no-response');
      setContentVisible(true);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const handleTurnOnLight = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      setAppState('decorate');
      setContentVisible(true);
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  const handleDecorate = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      setAppState('decorated');
      setContentVisible(true);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const handleFlyBalloons = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      setAppState('balloons');
      setContentVisible(true);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const handleFinalMessage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      setAppState('final');
      setContentVisible(true);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const isBlackout = appState === 'blackout';

  // Stage-aware visibility and counts
  // Hearts: always visible except blackout/yes-transition; count varies by stage
  const showHearts = !isBlackout && appState !== 'yes-transition';
  // Normal stage: 40 hearts | decorate/decorated: 12 hearts | balloons/final: 5 hearts
  const heartCount =
    appState === 'balloons' || appState === 'final'
      ? 5
      : appState === 'decorated' || appState === 'decorate'
      ? 12
      : 40;

  // Flowers: visible from decorated stage onward; count varies by stage
  const showFlowers = appState === 'decorated' || appState === 'balloons' || appState === 'final';
  // decorated: 40 flowers (dominant) | balloons/final: 5 flowers (minimal)
  const flowerCount =
    appState === 'balloons' || appState === 'final' ? 5 : 40;

  // Balloons: visible from balloons stage onward
  const showBalloons = appState === 'balloons' || appState === 'final';
  // 32 balloons — dominant
  const balloonCount = 32;

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000"
      style={{
        background: isBlackout
          ? '#000000'
          : 'linear-gradient(135deg, oklch(0.95 0.03 5) 0%, oklch(0.92 0.05 355) 50%, oklch(0.94 0.04 10) 100%)',
      }}
    >
      {/* Floating Hearts — fixed full-viewport overlay, z-index 1 */}
      <FloatingHearts visible={showHearts} count={heartCount} />

      {/* Flower Rain — fixed full-viewport overlay, z-index 2 */}
      <FlowerRain visible={showFlowers} count={flowerCount} />

      {/* Balloon Animation — fixed full-viewport overlay, z-index 3 */}
      <BalloonAnimation visible={showBalloons} count={balloonCount} />

      {/* Main Content — above all animations */}
      <main
        className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 py-12"
        style={{ zIndex: 10 }}
      >
        <div
          className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl mx-auto"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* INTRO STATE */}
          {appState === 'intro' && (
            <div className="text-center space-y-4">
              <p
                className="font-playfair text-3xl md:text-5xl font-semibold leading-relaxed"
                style={{ color: 'oklch(0.38 0.16 10)' }}
              >
                It's your special day.
              </p>
              <p
                className="font-dancing text-2xl md:text-4xl font-semibold"
                style={{ color: 'oklch(0.52 0.18 10)' }}
              >
                I have made something for you.
              </p>
              <div className="flex justify-center mt-4">
                <span className="text-4xl animate-bounce">💝</span>
              </div>
            </div>
          )}

          {/* QUESTION STATE */}
          {appState === 'question' && (
            <div className="text-center space-y-10">
              <div className="space-y-3">
                <p
                  className="font-playfair text-3xl md:text-5xl font-semibold leading-relaxed"
                  style={{ color: 'oklch(0.38 0.16 10)' }}
                >
                  Do you want to see
                </p>
                <p
                  className="font-dancing text-2xl md:text-4xl font-semibold"
                  style={{ color: 'oklch(0.52 0.18 10)' }}
                >
                  what I made? 🌸
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <button
                  className="btn-romantic-primary"
                  onClick={handleYes}
                  disabled={isTransitioning}
                >
                  <span>💖</span> Yes!
                </button>
                <button
                  className="btn-romantic-secondary"
                  onClick={handleNo}
                  disabled={isTransitioning}
                >
                  <span>🙈</span> No
                </button>
              </div>
            </div>
          )}

          {/* NO RESPONSE STATE */}
          {appState === 'no-response' && (
            <div className="text-center space-y-4">
              <p className="text-6xl">💔</p>
              <p
                className="font-playfair text-2xl md:text-4xl font-semibold"
                style={{ color: 'oklch(0.48 0.20 10)' }}
              >
                Aww, please try again!
              </p>
              <p
                className="font-dancing text-xl md:text-2xl"
                style={{ color: 'oklch(0.62 0.18 8)' }}
              >
                I promise it's worth it... 🌹
              </p>
            </div>
          )}

          {/* YES TRANSITION STATE */}
          {appState === 'yes-transition' && (
            <div className="text-center space-y-4">
              <p className="text-5xl">✨</p>
              <p
                className="font-playfair text-3xl md:text-5xl font-semibold italic"
                style={{ color: 'oklch(0.38 0.16 10)' }}
              >
                Have a look at it,
              </p>
              <p
                className="font-dancing text-3xl md:text-5xl font-bold text-glow"
                style={{ color: 'oklch(0.48 0.20 10)' }}
              >
                madam ji! 💫
              </p>
            </div>
          )}

          {/* BLACKOUT STATE */}
          {appState === 'blackout' && (
            <div className="text-center space-y-8">
              <div className="space-y-2">
                <p
                  className="font-dancing text-2xl md:text-3xl"
                  style={{ color: 'oklch(0.65 0.10 75)' }}
                >
                  It's dark in here...
                </p>
              </div>
              <button
                className="btn-gold"
                onClick={handleTurnOnLight}
                disabled={isTransitioning}
              >
                💡 Turn On the Light
              </button>
            </div>
          )}

          {/* DECORATE STATE */}
          {appState === 'decorate' && (
            <div className="text-center space-y-8">
              <div className="space-y-3">
                <p
                  className="font-playfair text-3xl md:text-5xl font-semibold"
                  style={{ color: 'oklch(0.38 0.16 10)' }}
                >
                  Welcome back! 🌸
                </p>
                <p
                  className="font-dancing text-xl md:text-2xl"
                  style={{ color: 'oklch(0.55 0.16 10)' }}
                >
                  Let's make this even more beautiful
                </p>
              </div>
              <button
                className="btn-action"
                onClick={handleDecorate}
                disabled={isTransitioning}
              >
                🌺 Decorate
              </button>
            </div>
          )}

          {/* DECORATED STATE */}
          {appState === 'decorated' && (
            <div className="text-center space-y-10">
              {/* Happy Birthday Text */}
              <div
                className="space-y-2"
                style={{ animation: 'birthday-bounce 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
              >
                <p
                  className="font-dancing font-bold leading-none"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 7rem)',
                    background: 'linear-gradient(135deg, oklch(0.48 0.20 10), oklch(0.78 0.14 75), oklch(0.55 0.22 350))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 4px 12px oklch(0.48 0.20 10 / 0.4))',
                  }}
                >
                  Happy
                </p>
                <p
                  className="font-dancing font-bold leading-none"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 7rem)',
                    background: 'linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.78 0.14 75), oklch(0.48 0.20 10))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 4px 12px oklch(0.55 0.22 350 / 0.4))',
                  }}
                >
                  Birthday! 🎂
                </p>
              </div>
              <button
                className="btn-action"
                onClick={handleFlyBalloons}
                disabled={isTransitioning}
              >
                🎈 Fly Balloons
              </button>
            </div>
          )}

          {/* BALLOONS STATE */}
          {appState === 'balloons' && (
            <div className="text-center space-y-10">
              <div
                className="space-y-2"
                style={{ animation: 'birthday-bounce 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
              >
                <p
                  className="font-dancing font-bold leading-none"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 7rem)',
                    background: 'linear-gradient(135deg, oklch(0.48 0.20 10), oklch(0.78 0.14 75), oklch(0.55 0.22 350))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 4px 12px oklch(0.48 0.20 10 / 0.4))',
                  }}
                >
                  Happy
                </p>
                <p
                  className="font-dancing font-bold leading-none"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 7rem)',
                    background: 'linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.78 0.14 75), oklch(0.48 0.20 10))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 4px 12px oklch(0.55 0.22 350 / 0.4))',
                  }}
                >
                  Birthday! 🎂
                </p>
              </div>
              <button
                className="btn-romantic-primary"
                onClick={handleFinalMessage}
                disabled={isTransitioning}
              >
                💌 My Message for You
              </button>
            </div>
          )}

          {/* FINAL MESSAGE STATE */}
          {appState === 'final' && (
            <div
              className="text-center space-y-8 px-4"
              style={{ animation: 'sparkle-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
            >
              <div className="space-y-2">
                <p className="text-5xl md:text-6xl">💝</p>
              </div>
              <p
                className="font-playfair font-semibold italic leading-relaxed text-final-glow"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 5rem)',
                  color: 'oklch(0.38 0.16 10)',
                }}
              >
                You are a good girl.
              </p>
              <div className="flex justify-center gap-3 text-3xl">
                <span>🌸</span>
                <span>💖</span>
                <span>🌸</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 py-3 text-center text-xs"
        style={{
          color: isBlackout ? 'oklch(0.45 0.08 10)' : 'oklch(0.62 0.10 10)',
          zIndex: 20,
          background: 'transparent',
        }}
      >
        Built with{' '}
        <span style={{ color: isBlackout ? 'oklch(0.55 0.18 10)' : 'oklch(0.52 0.18 10)' }}>♥</span>{' '}
        using{' '}
        <a
          href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'romantic-birthday')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80 transition-opacity"
          style={{ color: isBlackout ? 'oklch(0.55 0.18 10)' : 'oklch(0.52 0.18 10)' }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
};

export default App;


import React, { useState, useCallback, useRef } from 'react';
import Fireworks from './components/Fireworks';
import RunningHorses from './components/RunningHorses';
import GreetingContent from './components/GreetingContent';

interface FireworkInstance {
  x: number;
  y: number;
  id: number;
  isBig: boolean;
}

const App: React.FC = () => {
  const [fireworks, setFireworks] = useState<FireworkInstance[]>([]);
  const [grandFinaleDone, setGrandFinaleDone] = useState(false);
  const nextId = useRef(0);

  const addFirework = useCallback((x: number, y: number, isBig: boolean = false) => {
    const newFirework = { x, y, id: nextId.current++, isBig };
    setFireworks(prev => [...prev, newFirework]);

    // Cleanup: Big sustained firework lasts longer (8s), normal ones (3s)
    const duration = isBig ? 8000 : 3000;
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
    }, duration);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.no-global-click')) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    addFirework(clientX, clientY, false);
  }, [addFirework]);

  const triggerBigFirework = useCallback(() => {
    if (grandFinaleDone) return;
    
    setGrandFinaleDone(true);
    // Release the sustained big firework in the upper center
    addFirework(window.innerWidth / 2, window.innerHeight * 0.35, true);
  }, [grandFinaleDone, addFirework]);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden silk-bg cursor-pointer select-none"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      
      {/* Floating Particles / Light Effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600 blur-[120px] rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <GreetingContent onBigFirework={triggerBigFirework} isBigDone={grandFinaleDone} />
      </div>

      {/* Interactive Layer: Fireworks */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {fireworks.map(fw => (
          <Fireworks key={fw.id} x={fw.x} y={fw.y} isBig={fw.isBig} />
        ))}
      </div>

      {/* Running Horses Animation */}
      <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
        <RunningHorses />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 border-l-4 border-t-4 border-yellow-500 w-12 h-12 opacity-60"></div>
      <div className="absolute top-4 right-4 border-r-4 border-t-4 border-yellow-500 w-12 h-12 opacity-60"></div>
      <div className="absolute bottom-24 left-4 border-l-4 border-b-4 border-yellow-500 w-12 h-12 opacity-60"></div>
      <div className="absolute bottom-24 right-4 border-r-4 border-b-4 border-yellow-500 w-12 h-12 opacity-60"></div>
    </div>
  );
};

export default App;

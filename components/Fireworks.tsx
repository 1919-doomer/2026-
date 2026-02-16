
import React, { useEffect, useRef } from 'react';

interface FireworksProps {
  x: number;
  y: number;
  isBig?: boolean;
}

const Fireworks: React.FC<FireworksProps> = ({ x, y, isBig = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: any[] = [];
    const colors = isBig 
      ? ['#FF0000', '#FFD700', '#FFA500', '#FFFFFF', '#FF4500', '#FFD700'] 
      : ['#FFD700', '#FFA500', '#FFFFFF', '#FFFACD'];

    // Function to create a particle
    const createParticle = (originX: number, originY: number, burst: boolean = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = isBig 
        ? (burst ? (Math.random() * 15 + 5) : (Math.random() * 8 + 2))
        : (Math.random() * 6 + 1);
      
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: isBig ? (Math.random() * 4 + 1) : (Math.random() * 3 + 1),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: isBig ? (Math.random() * 0.005 + 0.005) : (Math.random() * 0.02 + 0.015)
      };
    };

    // Initial burst
    const initialCount = isBig ? 150 : 60;
    for (let i = 0; i < initialCount; i++) {
      particles.push(createParticle(x, y, true));
    }

    let animationFrame: number;
    let startTime = Date.now();
    const sustainDuration = 5000; // Emit for 5 seconds if big

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const elapsed = Date.now() - startTime;

      // Sustained emission for big firework
      if (isBig && elapsed < sustainDuration) {
        // Add new particles every frame to keep it "sustained"
        for (let i = 0; i < 5; i++) {
          particles.push(createParticle(x, y, false));
        }
      }

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += isBig ? 0.02 : 0.05; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          
          if (isBig) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
          }
          
          ctx.fill();
        }
      });

      if (particles.length > 0 || (isBig && elapsed < sustainDuration)) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [x, y, isBig]);

  return (
    <canvas 
      ref={canvasRef} 
      width={window.innerWidth} 
      height={window.innerHeight} 
      className="absolute top-0 left-0 w-full h-full"
    />
  );
};

export default Fireworks;

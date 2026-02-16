
import React from 'react';

const RunningHorses: React.FC = () => {
  const horseEmojis = ["🐎", "🏇", "🐎", "🏇", "🐎"];
  
  return (
    <div className="relative h-20 overflow-hidden w-full bg-gradient-to-t from-black/20 to-transparent">
      <div className="flex absolute whitespace-nowrap animate-running-horses">
        {[...Array(6)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex gap-24 px-12 items-end">
            {horseEmojis.map((emoji, i) => (
              <div 
                key={i} 
                className="text-4xl md:text-5xl opacity-40 grayscale-0 filter brightness-125"
                style={{
                  animation: `bounce ${1 + Math.random()}s infinite ease-in-out`
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes running-horses {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-running-horses {
          animation: running-horses 25s linear infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default RunningHorses;

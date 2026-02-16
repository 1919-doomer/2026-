
import React, { useState, useRef } from 'react';

interface GreetingContentProps {
  onBigFirework: () => void;
  isBigDone: boolean;
}

const GreetingContent: React.FC<GreetingContentProps> = ({ onBigFirework, isBigDone }) => {
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFooterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBigDone) return;
    
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    if (newCount >= 5) {
      onBigFirework();
      setClickCount(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl animate-[fadeIn_1.5s_ease-out]">
      {/* Main Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 tracking-widest drop-shadow-lg font-calligraphy">
        2026 丙午马年
      </h2>

      {/* Big Animated Blessing */}
      <div className="relative group">
        <h1 className="text-5xl md:text-8xl font-bold text-yellow-400 font-calligraphy drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:text-yellow-200 cursor-default float-anim">
          龙马精神 马到成功
        </h1>
        <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150 -z-10 animate-pulse"></div>
      </div>

      {/* Body Text */}
      <div className="bg-red-900/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-yellow-500/30 shadow-2xl transition-all duration-300 hover:bg-red-900/60">
        <p className="text-yellow-100/90 text-lg md:text-xl leading-relaxed tracking-wide">
          新春伊始，万象更新。<br />
          愿您在丙午马年，如骏马奔腾，意气风发！<br />
          祝：<span className="text-yellow-400 font-bold hover:text-white transition-colors">阖家欢乐</span>、
          <span className="text-yellow-400 font-bold hover:text-white transition-colors">万事如意</span>、
          <span className="text-yellow-400 font-bold hover:text-white transition-colors">财源广进</span>。
        </p>
      </div>

      {/* Footer - Interactive */}
      <div 
        onClick={handleFooterClick}
        className={`no-global-click flex flex-col items-center gap-2 mt-4 transition-all select-none ${isBigDone ? 'cursor-default opacity-90' : 'cursor-pointer active:scale-95'}`}
      >
        <div className="flex items-center gap-2 text-xl md:text-2xl text-yellow-500 font-bold">
          <span className={`text-4xl ${isBigDone ? 'animate-none text-yellow-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]' : (clickCount > 0 ? 'animate-ping' : 'animate-bounce')}`}>
            {isBigDone ? '✨🐴✨' : '🐴'}
          </span>
          <span className={`${isBigDone ? 'text-yellow-300 tracking-wider' : (clickCount > 0 ? 'text-yellow-200 scale-110' : '')} transition-all`}>
            {isBigDone ? '祝您马年大吉！' : '给您拜年了！'}
          </span>
        </div>
        
        {!isBigDone && clickCount > 0 && (
          <div className="w-32 h-1.5 bg-red-950 rounded-full overflow-hidden border border-yellow-900/50 mt-1">
            <div 
              className="h-full bg-gradient-to-r from-yellow-600 to-yellow-300 transition-all duration-300" 
              style={{ width: `${(clickCount / 5) * 100}%` }}
            ></div>
          </div>
        )}
        
        {!isBigDone && clickCount > 0 && clickCount < 5 && (
          <span className="text-xs text-yellow-500/60 font-medium">连续点击触发惊喜 ({clickCount}/5)</span>
        )}
      </div>

      {/* Interaction prompt */}
      <p className="mt-8 text-yellow-500/40 text-sm animate-pulse">
        {isBigDone ? "惊喜已送达，新春快乐！" : "点击屏幕 绽放新年烟火"}
      </p>
    </div>
  );
};

export default GreetingContent;

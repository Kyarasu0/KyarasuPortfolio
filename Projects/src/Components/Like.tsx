import React, { useState } from "react";
import { Heart } from "lucide-react";

// 3. Kudos Button with 100-click Flag Logic
export const KudosButton = () => {
  const [mana, setMana] = useState(0);
  const [particles, setParticles] = useState<{id: number, x: number, y: number}[]>([]);
  const [showSecret, setShowSecret] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newMana = mana + 1;
    setMana(newMana);
    
    // Create particles
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setParticles(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);

    // 100回クリックでフラグ表示
    if (newMana === 100) {
      setShowSecret(true);
    }
  };

  return (
    <div className="flex flex-col items-end">
        <button 
          onClick={handleClick}
          className={`
            relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full 
            transition-all duration-100 border border-white/60 backdrop-blur-md
            bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg
            active:scale-95 hover:shadow-pink-500/30 hover:shadow-xl z-20
          `}
        >
          <Heart size={18} className="fill-current animate-pulse-fast" />
          <span className="text-xs font-bold tracking-wide">
            LOVE: {mana}
          </span>
          
          {particles.map(p => (
            <span 
              key={p.id}
              className="absolute text-pink-500 pointer-events-none animate-float-up text-xl font-bold"
              style={{ left: p.x, top: p.y }}
            >
              +1
            </span>
          ))}
          {particles.map(p => (
            <span 
              key={p.id + 'h'}
              className="absolute text-pink-300 pointer-events-none animate-ping opacity-75"
              style={{ left: p.x, top: p.y, width: '20px', height: '20px', borderRadius: '50%' }}
            />
          ))}
        </button>
        {/* Secret Flag Reveal */}
        <div className={`
             mt-2 text-[10px] font-mono bg-black text-green-400 px-2 py-1 rounded border border-green-500
             transition-all duration-500
             ${showSecret ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}>
            Kyarasu&#123;100_LOVE_POWER&#125;
        </div>
    </div>
  );
};
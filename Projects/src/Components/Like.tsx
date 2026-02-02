import React, { useState } from "react";
import { Heart } from "lucide-react";

export const KudosButton = () => {
  const [mana, setMana] = useState(0);

  const unlocked = mana >= 100;

  const handleClick = () => {
    setMana(prev => prev + 1);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full
        transition-all duration-300 border backdrop-blur-md z-20
        shadow-lg hover:shadow-xl active:scale-95
        ${
          unlocked
            ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 border-emerald-300 shadow-emerald-400/40'
            : 'bg-gradient-to-r from-pink-500 to-rose-500 border-white/60 hover:shadow-pink-500/30'
        }
        text-white
      `}
    >
      <Heart
        size={18}
        className={`
          fill-current
          ${unlocked ? 'animate-none' : 'animate-pulse-fast'}
        `}
      />

      <span
        className={`
          text-xs font-bold tracking-wide font-mono transition-all duration-300
          ${unlocked ? 'text-white' : ''}
        `}
      >
        {unlocked
          ? 'FLAG: Kyarasu{100_LOVE_POWER}'
          : `LOVE: ${mana}`}
      </span>
    </button>
  );
};

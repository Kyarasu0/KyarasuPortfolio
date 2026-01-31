import { useState, useEffect } from "react";

interface TypingConsoleProps {
  text: string;       // 打ち込む文字列
  speed?: number;     // 1文字の表示スピード(ms)
}

export const TypingConsole = ({ text, speed = 50 }: TypingConsoleProps) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="font-mono text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line min-h-[80px]">
      {displayText}
      <span className="animate-pulse inline-block w-2 h-4 bg-slate-400 ml-1 align-middle"></span>
    </div>
  );
};

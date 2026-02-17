import { useState, useEffect } from "react";

interface TypingConsoleProps {
  text: string;
  speed?: number;
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
    <div className="
      relative 
      flex justify-center sm:justify-start
      font-mono text-xs sm:text-sm 
      text-slate-600 
      leading-relaxed 
      whitespace-pre-line
      mb-3 sm:mb-3
    ">

      {/* 幅確保用（見えない全文） */}
      <div className="invisible whitespace-pre-line text-center sm:text-left">
        {text}
      </div>

      {/* 実際に表示する文字 */}
      <div className="absolute top-0 text-center sm:text-left">
        {displayText}
        <span className="animate-pulse inline-block w-2 h-4 bg-slate-400 ml-1 align-middle"></span>
      </div>

    </div>
  );
};

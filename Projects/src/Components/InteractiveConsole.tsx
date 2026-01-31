import { useState, useEffect, useRef, FormEvent } from 'react';
import { PROFILE } from '../data/profile';

export const InteractiveConsole = () => {
  const [logs, setLogs] = useState<string[]>([
    "Initialising system...",
    "User: Kyarasu detected.",
    "Type 'help' for commands."
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [logs]);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLogs = [...logs, `> ${input}`];

    switch (cmd) {
      case "help":
        newLogs.push("Available commands: help, whoami, ls, clear, date, flag");
        break;
      case "whoami":
        newLogs.push(`User: ${PROFILE.nickname} [Admin]`);
        break;
      case "ls":
        newLogs.push("profile.txt  skills.json  secret_flag.txt  images/");
        break;
      case "clear":
        setLogs([]);
        setInput("");
        return;
      case "date":
        newLogs.push(new Date().toString());
        break;
      case "flag":
      case "cat secret_flag.txt":
        newLogs.push("FLAG{Y0U_F0UND_1T_H4CK3R!}"); // Easter Egg
        break;
      default:
        newLogs.push(`Command not found: ${cmd}`);
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs sm:text-sm bg-[#1e1e1e] text-slate-300 rounded-2xl p-4 shadow-inner overflow-hidden border border-slate-700/50">
      <div className="flex-1 overflow-y-auto space-y-1 min-h-[140px] max-h-[200px] scrollbar-hide">
        {logs.map((log, i) => (
          <div key={i} className={log.startsWith(">") ? "text-blue-400 font-bold" : "text-slate-300"}>
            {log}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2 border-t border-slate-700 pt-2">
        <span className="text-green-400 animate-pulse">➜</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-slate-100 w-full placeholder-slate-600 focus:ring-0 p-0"
          placeholder="Type command..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};
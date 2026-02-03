import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { SKILLS } from "../data/skills";

// 2. Interactive Console (Fully Functional Mock)
// ファイルシステムの定義
type FileSystem = {
  [key: string]: string | FileSystem;
};

const FILE_SYSTEM: FileSystem = {
  "home": {
    "kyarasu": {
      "profile.txt": "Name: Kyarasu\nRole: Student Engineer\nLike: Sweets",
      "skills.json": JSON.stringify(SKILLS.map(s => s.name), null, 2),
      "secret": {
        "flag_hint.txt": "Try to find the flag in the LOVE Button..."
      },
      "images": {
        "me.png": "[Binary Data]",
        "logo.svg": "[SVG Data]"
      }
    }
  }
};

export const InteractiveConsole = () => {
  const [logs, setLogs] = useState<string[]>([
    "Initialising system...",
    "User: Kyarasu detected.",
    "Type 'help' for commands."
  ]);
  const [input, setInput] = useState("");
  // Current Working Directory (path stack)
  const [cwd, setCwd] = useState<string[]>(["home", "kyarasu"]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(scrollToBottom, [logs]);

  // ファイルシステム走査ヘルパー
  const resolvePath = (path: string[]): any => {
    let current: any = FILE_SYSTEM;
    for (const p of path) {
      if (current && typeof current === 'object' && p in current) {
        current = current[p];
      } else {
        return null;
      }
    }
    return current;
  };

  const logContainerRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const rawCmd = input.trim();
    const args = rawCmd.split(" ");
    const cmd = args[0].toLowerCase();
    
    const newLogs = [...logs, `${cwd.join("/")} $ ${rawCmd}`];

    switch (cmd) {
      case "help":
        newLogs.push("Available commands: help, whoami, ls, cd, cat, pwd, clear, date");
        break;
      case "whoami":
        newLogs.push(`uid=1000(kyarasu) gid=1000(kyarasu) groups=1000(kyarasu),27(sudo)`);
        break;
      case "pwd":
        newLogs.push("/" + cwd.join("/"));
        break;
      case "ls":
        const currentDir = resolvePath(cwd);
        if (typeof currentDir === 'object') {
          // ディレクトリとファイルを色分け
          const items = Object.keys(currentDir).map(key => {
            const isDir = typeof currentDir[key] === 'object';
            return isDir ? `${key}/` : key;
          });
          newLogs.push(items.join("  "));
        } else {
          newLogs.push("Error: Not a directory");
        }
        break;
      case "cd":
        if (!args[1]) {
          // 引数なしはホームへ
          setCwd(["home", "kyarasu"]);
        } else if (args[1] === "..") {
          // 親ディレクトリへ
          if (cwd.length > 0) {
            setCwd(prev => prev.slice(0, -1));
          }
        } else if (args[1] === "/") {
            setCwd([]);
        } else {
          // 指定ディレクトリへ
          const targetName = args[1].replace("/", ""); // 簡易的な処理
          const targetDir = resolvePath([...cwd, targetName]);
          if (targetDir && typeof targetDir === 'object') {
            setCwd(prev => [...prev, targetName]);
          } else {
            newLogs.push(`cd: no such file or directory: ${args[1]}`);
          }
        }
        break;
      case "cat":
        if (!args[1]) {
          newLogs.push("Usage: cat <filename>");
        } else {
          const targetFile = resolvePath([...cwd, args[1]]);
          if (typeof targetFile === 'string') {
            newLogs.push(targetFile);
            if (args[1] === "flag_hint.txt") {
                newLogs.push("Another flag might be: Kyarasu{C0NS0LE_M4STER}");
            }
          } else if (typeof targetFile === 'object') {
             newLogs.push(`cat: ${args[1]}: Is a directory`);
          } else {
            newLogs.push(`cat: ${args[1]}: No such file or directory`);
          }
        }
        break;
      case "clear":
        setLogs([]);
        setInput("");
        return;
      case "date":
        newLogs.push(new Date().toString());
        break;
      default:
        newLogs.push(`command not found: ${cmd}`);
    }
    setLogs(newLogs);
    setInput("");

    requestAnimationFrame(() => {
      const el = logContainerRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });

  };

  return (
    <div
      className="
        group
        flex flex-col h-full font-mono text-xs sm:text-sm
        bg-[#1e1e1e] text-slate-300
        rounded-2xl p-4
        shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        overflow-hidden border border-slate-700/50

        transition-all duration-500 ease-out
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:-translate-y-1
      "
    >

      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto space-y-1 min-h-[140px] max-h-[200px] scrollbar-hide"
      >
        {logs.map((log, i) => (
          <div key={i} className={log.includes("$") ? "text-green-400 font-bold mt-2" : "text-slate-300 whitespace-pre-wrap pl-2"}>
            {log}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2 border-t border-slate-700 pt-2">
        <span className="text-blue-400 font-bold">{cwd[cwd.length-1] || "/"}</span>
        <span className="text-green-400 animate-pulse">➜</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-slate-100 w-full placeholder-slate-600 focus:ring-0 p-0"
          placeholder="ls, cd, cat..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};
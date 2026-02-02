import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Terminal, 
  Code, 
  Cpu, 
  Award, 
  Share2, 
  MapPin, 
  School,
  Globe,
  Shield,
  Zap,
  ExternalLink,
  Users,
  Calendar,
  Heart,
  Maximize2,
  FileText,
  Flag,
  CheckCircle,
  AlertCircle,
  Twitter
} from 'lucide-react';

/**
 * ============================================================================
 * DATA SECTION
 * ============================================================================
 */
const PROFILE = {
  name: "田中 太郎",
  nickname: "Kyarasu",
  role: "Student Engineer",
  university: "立命館大学",
  faculty: "情報理工学部 情報理工学科",
  course: "セキュリティネットワークコース",
  birth: "2005/08/04",
  gradYear: "28卒",
  hobby: "FlipperZero",
  comment: "甘い物大好き",
  location: "Japan, Shiga/Kyoto"
};

const AFFILIATIONS = [
  { name: "RiST", icon: <Shield size={24} className="text-blue-500" />, role: "Member", desc: "Security Team" },
  { name: "Envice", icon: <Globe size={24} className="text-emerald-500" />, role: "Developer", desc: "Web Dev Team" },
];

const SKILLS = [
  { name: "React / Next.js", level: 90, icon: <Code size={16} /> },
  { name: "TypeScript", level: 85, icon: <Code size={16} /> },
  { name: "Python", level: 70, icon: <Terminal size={16} /> },
  { name: "Network Security", level: 60, icon: <Shield size={16} /> },
  { name: "FlipperZero Dev", level: 80, icon: <Cpu size={16} /> },
  { name: "Cyber Security", level: 65, icon: <Shield size={16} /> },
  { name: "Rust", level: 40, icon: <Code size={16} /> },
  { name: "Go", level: 50, icon: <Code size={16} /> },
];

const HISTORY = [
  { year: "2024", title: "立命館大学 入学", desc: "情報理工学部での研究開始" },
  { year: "2024", title: "RiST 入団", desc: "セキュリティ技術の研鑽" },
  { year: "2025", title: "ハッカソン優勝", desc: "技育展2025 優秀賞" },
  { year: "Present", title: "Current Status", desc: "Web開発とセキュリティを猛勉強中" },
];

/**
 * プロジェクトデータ
 * roles: 担当箇所を個条書きタグとして複数設定可能
 */
const PROJECTS = [
  {
    id: 1,
    name: "SecureChat",
    summary: "E2E暗号化チャットアプリ",
    icon: "https://cdn-icons-png.flaticon.com/512/2913/2913990.png", 
    themeColor: "#3b82f6", // Blue
    memberCount: 3,
    startDate: "2024-06",
    // 担当箇所を個数で貼っていく形式
    roles: [
      "Frontend Leader",
      "E2E Encryption Logic",
      "WebSocket Design",
      "UI/UX Design",
      "Performance Tuning",
      "CI/CD Pipeline"
    ],
    description: "セキュリティとUXを両立させた次世代メッセンジャー。"
  },
  {
    id: 2,
    name: "RitsMap",
    summary: "キャンパスマップ最適化ツール",
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    themeColor: "#ef4444", // Red
    memberCount: 2,
    startDate: "2024-10",
    roles: [
      "Project Manager",
      "Google Maps API",
      "React Native",
      "User Interview",
      "Figma Prototyping"
    ],
    description: "新入生でも迷わないナビゲーションシステム。"
  },
  {
    id: 3,
    name: "FlipperTools",
    summary: "FlipperZero用カスタムプラグイン",
    icon: "https://cdn-icons-png.flaticon.com/512/9672/9672338.png",
    themeColor: "#f97316", // Orange
    memberCount: 1,
    startDate: "2025-01",
    roles: [
      "Embedded C",
      "NFC Protocol",
      "Hardware Debugging",
      "UI Graphics",
      "Documentation"
    ],
    description: "ハードウェアハッキング支援ツール。"
  }
];

const AWARDS = [
  "技育展 2024 優秀賞",
  "SecHack365 修了",
  "AtCoder Green",
  "JPHACKS 2024 Finalist"
];

const SNS_LINKS = {
  x: "https://twitter.com/",
  insta: "https://instagram.com/",
  github: "https://github.com/",
};

// 写真素材
const GALLERY_IMAGES = [
  "images/Kyarasus/1.png",
  "images/Kyarasus/2.png",
  "images/Kyarasus/3.png",
  "images/Kyarasus/4.png",
  "images/Kyarasus/5.png" 
];

// 正解のFlagリスト（どれか一つでOK）
const VALID_FLAGS = [
  "FLAG{Y0U_F0UND_1T_H4CK3R!}",
  "FLAG{100_MANA_POWER}",
  "FLAG{C0NS0LE_M4STER}"
];

/**
 * ============================================================================
 * COMPONENTS
 * ============================================================================
 */

// 1. Bento Grid Card with Floating Animation
const BentoCard = ({ 
  children, 
  className = "", 
  title, 
  delay = 0,
  noPadding = false,
  glass = true,
  floating = false 
}: { 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  delay?: number;
  noPadding?: boolean;
  glass?: boolean;
  floating?: boolean;
}) => {
  return (
    <div 
      className={`
        group relative overflow-hidden flex flex-col
        ${glass ? 'bg-white/60 backdrop-blur-xl border border-white/60' : 'bg-white border border-slate-100'}
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        rounded-[32px] 
        transition-all duration-500 ease-out
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        animate-fade-in-up
        ${floating ? 'animate-float' : ''}
        ${className}
      `}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {glass && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/40 via-transparent to-transparent z-10" />
      )}
      <div className={`relative z-20 h-full flex flex-col ${noPadding ? '' : 'p-6'}`}>
        {title && (
          <h3 className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2 shrink-0">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

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
        "flag_hint.txt": "Try to find the flag in the Mana Button..."
      },
      "images": {
        "me.png": "[Binary Data]",
        "logo.svg": "[SVG Data]"
      }
    }
  }
};

const InteractiveConsole = () => {
  const [logs, setLogs] = useState<string[]>([
    "Initialising system...",
    "User: Kyarasu detected.",
    "Type 'help' for commands."
  ]);
  const [input, setInput] = useState("");
  // Current Working Directory (path stack)
  const [cwd, setCwd] = useState<string[]>(["home", "kyarasu"]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [logs]);

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
                newLogs.push("Another flag might be: FLAG{C0NS0LE_M4STER}");
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
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs sm:text-sm bg-[#1e1e1e] text-slate-300 rounded-2xl p-4 shadow-inner overflow-hidden border border-slate-700/50">
      <div className="flex-1 overflow-y-auto space-y-1 min-h-[140px] max-h-[200px] scrollbar-hide">
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

// 3. Kudos Button with 100-click Flag Logic
const KudosButton = () => {
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
            MANA: {mana}
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
            FLAG&#123;100_MANA_POWER&#125;
        </div>
    </div>
  );
};

// 4. Confetti Effect Component (Simple DOM Implementation)
const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
           key={i}
           className="absolute animate-confetti"
           style={{
             left: `${Math.random() * 100}%`,
             top: `-5%`,
             backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)],
             width: `${Math.random() * 10 + 5}px`,
             height: `${Math.random() * 10 + 5}px`,
             animationDelay: `${Math.random() * 2}s`,
             animationDuration: `${Math.random() * 3 + 2}s`
           }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
         <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-bounce drop-shadow-lg">
           CONGRATULATIONS!
         </h1>
      </div>
    </div>
  );
};

// 5. Flag Submission Form
const FlagForm = () => {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (VALID_FLAGS.includes(input.trim())) {
            setStatus("success");
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000); // 8秒間祝う
        } else {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 2000);
        }
    };

    return (
        <>
            {showConfetti && <Confetti />}
            <div className="mt-8 p-6 bg-slate-900 rounded-2xl border border-slate-700 text-slate-200">
                <h3 className="flex items-center gap-2 font-mono text-lg font-bold mb-4 text-green-400">
                    <Flag size={20} /> CTF Challenge
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    Find the hidden flag in this portfolio and submit it here.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="FLAG{...}"
                        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors font-mono"
                    />
                    <button 
                        type="submit"
                        className={`
                            px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
                            ${status === 'success' ? 'bg-green-500 text-white' : 
                              status === 'error' ? 'bg-red-500 text-white' : 
                              'bg-blue-600 text-white hover:bg-blue-500'}
                        `}
                    >
                        {status === 'success' ? <CheckCircle size={16} /> : 
                         status === 'error' ? <AlertCircle size={16} /> : 
                         'Submit'}
                    </button>
                </form>
                {status === 'success' && (
                    <p className="mt-3 text-green-400 font-mono text-sm animate-pulse">
                        &gt; Correct! Access Granted. You are a true hacker!
                    </p>
                )}
                {status === 'error' && (
                    <p className="mt-3 text-red-400 font-mono text-sm">
                        &gt; Incorrect flag. Access Denied.
                    </p>
                )}
            </div>
        </>
    );
};

// 6. Marquee Skill Ticker
const SkillTicker = () => {
  return (
    <div className="w-full overflow-hidden relative group">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
      
      <div className="flex gap-8 whitespace-nowrap animate-marquee">
        {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
           <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-slate-600 text-xs font-bold">
             {skill.icon} {skill.name} <span className="text-slate-400 font-normal">| {skill.level}%</span>
           </div>
        ))}
      </div>
    </div>
  );
};

// 7. Main Application
export default function App() {
  const [activeTab, setActiveTab] = useState('projects'); 

  const handleShare = () => {
    const text = `Check out ${PROFILE.nickname}'s Portfolio!`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20 overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none animate-grid-scroll" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }} 
      />
      <div className="fixed top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-200/40 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-200/40 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-white/60 shadow-sm backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold text-slate-500">SYSTEM: ONLINE</span>
          </div>
          <KudosButton />
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-min">
          
          {/* --- Profile Area --- */}
          <BentoCard className="md:col-span-2 lg:col-span-2 row-span-1" delay={100} floating={true}>
            <div className="flex flex-col sm:flex-row gap-6 items-start h-full">
              {/* Avatar */}
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src={GALLERY_IMAGES[0]} 
                    alt="Kyarasu" 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyarasu&backgroundColor=e2e8f0"; }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
                  <span className="text-xl animate-bounce">💻</span>
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mb-2">
                  {PROFILE.nickname}
                </h1>
                <p className="text-sm font-mono text-blue-600 mb-4 bg-blue-50 inline-block px-2 py-1 rounded-md border border-blue-100">
                  {PROFILE.role}
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-500 font-medium">
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <School size={16} className="text-slate-400" /> {PROFILE.university}
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <MapPin size={16} className="text-slate-400" /> {PROFILE.faculty} / {PROFILE.course}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                     <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 text-[10px] border border-slate-200"># {PROFILE.hobby}</span>
                     <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 text-[10px] border border-slate-200"># {PROFILE.comment}</span>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* SNS Links */}
          <BentoCard className="md:col-span-1 h-full" title="Connect" delay={200}>
             <div className="flex flex-col justify-center gap-2 h-full">
                {Object.entries(SNS_LINKS).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" 
                     className="flex items-center justify-between p-3 bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md rounded-xl transition-all group/btn">
                     <span className="text-xs font-bold uppercase text-slate-600 group-hover/btn:text-blue-600">{key}</span>
                     <ExternalLink size={14} className="text-slate-300 group-hover/btn:text-blue-500" />
                  </a>
                ))}
             </div>
          </BentoCard>

          {/* Console (Interactive) */}
          <div className="md:col-span-1 h-[280px] md:h-full animate-fade-in-up" style={{ animationDelay: '250ms' }}>
             <InteractiveConsole />
          </div>

          {/* Tech Stack */}
          <BentoCard className="md:col-span-2 lg:col-span-4" title="Proficiency" delay={300}>
             <div className="py-2">
               <SkillTicker />
             </div>
          </BentoCard>

          {/* Affiliations */}
          <BentoCard className="md:col-span-2 h-full" title="Affiliations" delay={300} floating={true}>
            <div className="grid grid-cols-2 gap-3 h-full">
              {AFFILIATIONS.map((aff) => (
                <div key={aff.name} className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-colors group/aff cursor-default">
                  <div className="mb-2 p-3 bg-white rounded-full shadow-sm group-hover/aff:scale-110 transition-transform duration-300">
                    {aff.icon}
                  </div>
                  <span className="font-bold text-slate-700">{aff.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">{aff.role}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{aff.desc}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* --- PROJECTS SECTION --- */}
          <BentoCard className="md:col-span-3 lg:col-span-3" noPadding delay={500}>
             <div className="p-6 pb-0 flex justify-between items-center border-b border-slate-100/50">
               <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                 <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                 Featured Projects
               </h3>
               <div className="flex bg-slate-100 rounded-lg p-1">
                 <button 
                   onClick={() => setActiveTab('projects')}
                   className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'projects' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   Dev
                 </button>
                 <button 
                   onClick={() => setActiveTab('gallery')}
                   className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'gallery' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   Photos
                 </button>
               </div>
             </div>
             
             <div className="p-6 bg-slate-50/50 min-h-[400px]">
               {activeTab === 'projects' ? (
                 <div className="grid grid-cols-1 gap-6">
                   {PROJECTS.map((project) => (
                     <div 
                        key={project.id} 
                        className="bg-white rounded-[24px] border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all group/project relative overflow-hidden flex flex-col md:flex-row"
                     >
                       {/* Left Side: Icon & Basic Info */}
                       <div className="w-full md:w-[160px] bg-slate-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative overflow-hidden shrink-0">
                          <div className="absolute inset-0 opacity-10" style={{ backgroundColor: project.themeColor }} />
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm p-3 mb-3 relative z-10">
                            <img 
                              src={project.icon} 
                              alt="icon" 
                              className="w-full h-full object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).src = "https://cdn-icons-png.flaticon.com/512/1005/1005141.png"; }}
                            />
                          </div>
                          <h4 className="font-bold text-slate-800 text-center relative z-10">{project.name}</h4>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-2 z-10">
                             <Users size={10} /> {project.memberCount} Members
                          </div>
                       </div>

                       {/* Right Side: Tags & Description */}
                       <div className="flex-1 p-6 flex flex-col">
                          <div className="mb-3">
                             <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono mb-2 inline-block">
                               {project.startDate}
                             </span>
                             <h5 className="text-sm font-bold text-slate-700 mb-2">{project.summary}</h5>
                          </div>

                          {/* Role Tags Area (Scrollable chips) */}
                          <div className="mb-4">
                             <h6 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">My Roles / Tech Stack</h6>
                             <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                               {project.roles.map((role, i) => (
                                 <span 
                                   key={i} 
                                   className="px-3 py-1 rounded-full text-[10px] font-medium border border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors cursor-default whitespace-nowrap"
                                 >
                                   {role}
                                 </span>
                               ))}
                             </div>
                          </div>

                          <div className="mt-auto pt-3 border-t border-slate-100">
                             <p className="text-xs text-slate-500 leading-relaxed">
                               {project.description}
                             </p>
                          </div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {GALLERY_IMAGES.map((src, i) => (
                      <div key={i} className="aspect-square rounded-xl bg-slate-200 overflow-hidden relative group/img cursor-pointer">
                        <img 
                          src={src} 
                          alt="Gallery" 
                          className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500 scale-100 group-hover/img:scale-110"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=Image+${i+1}`; }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                        <Maximize2 size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-md" />
                      </div>
                    ))}
                 </div>
               )}
             </div>
          </BentoCard>

          {/* Timeline */}
          <BentoCard className="md:col-span-1 lg:col-span-1 row-span-1" title="History" delay={600}>
            <div className="relative pl-2 py-2 space-y-6">
              <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-slate-100" />
              {HISTORY.map((item, index) => (
                <div key={index} className="relative pl-6 group/time">
                  <div className="absolute left-[3.5px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover/time:border-blue-500 group-hover/time:bg-blue-500 transition-colors shadow-sm z-10" />
                  <div className="flex flex-col transition-transform duration-300 group-hover/time:translate-x-1">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 self-start px-1.5 rounded mb-1">{item.year}</span>
                    <span className="text-sm font-bold text-slate-800 leading-tight">{item.title}</span>
                    <span className="text-xs text-slate-500 mt-1">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Awards */}
          <BentoCard className="md:col-span-3 lg:col-span-2" title="Awards" delay={700}>
            <div className="flex flex-wrap gap-2">
              {AWARDS.map((award, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-yellow-50/50 border border-yellow-100 px-3 py-2 rounded-xl hover:bg-yellow-100/50 transition-colors cursor-default">
                  <Award size={14} className="text-yellow-500 shrink-0" />
                  {award}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Share Action */}
          <BentoCard className="md:col-span-1 lg:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none" delay={800} floating={true}>
            <div className="flex flex-row items-center justify-between h-full gap-4">
               <div className="flex flex-col">
                 <h3 className="text-lg font-bold flex items-center gap-2">
                   Share <Share2 size={16} />
                 </h3>
                 <p className="text-xs text-slate-400">Let the world know.</p>
               </div>
               <button 
                 onClick={handleShare}
                 className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors active:scale-95 flex items-center gap-2 text-sm shadow-lg whitespace-nowrap"
               >
                 <Twitter size={16} /> Post
               </button>
            </div>
          </BentoCard>

          {/* CTF Challenge Section (Flag Input) */}
          <div className="md:col-span-3 lg:col-span-4 animate-fade-in-up" style={{ animationDelay: '900ms' }}>
             <FlagForm />
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-20 text-center border-t border-slate-200/50 pt-10 relative z-20">
           <p className="font-mono text-sm text-slate-400">&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
           <p className="text-xs mt-2 text-slate-300">
             System Version 2.0.2 <span className="mx-2">•</span> 
             Kyarasu Portfolio
           </p>
        </footer>
      </main>

      {/* Styles */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-up {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.5); }
        }
        @keyframes grid-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-up {
          animation: float-up 0.8s ease-out forwards;
        }
        .animate-grid-scroll {
          animation: grid-scroll 20s linear infinite;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-fast {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-confetti {
          animation: confetti 4s linear forwards;
        }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
// 右上に100回押すとフラグが出るボタン付き
// コンソールの内容が進化した
// projectsセクションが充実した
// 最後にflagを打ち込むと祝うエフェクトが出るようになった
// flagでかつて何点とったかを保存したい
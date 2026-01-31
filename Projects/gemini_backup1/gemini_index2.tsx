import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Share2, 
  Bookmark, 
  Terminal, 
  Cpu, 
  Code, 
  Award, 
  Ghost,
  Lock,
  Zap,
  Coffee,
  MapPin,
  ChevronRight,
  Maximize2
} from 'lucide-react';

/* ===========================================================================
  DATA CONFIGURATION
  ===========================================================================
*/
const PORTFOLIO_DATA = {
  profile: {
    name: "田中 太郎",
    nickname: "Kyarasu",
    role: "Student Security Engineer",
    university: "立命館大学",
    faculty: "情報理工学部 情報理工学科",
    course: "セキュリティネットワークコース",
    graduation: "28卒",
    comment: "甘い物が燃料です。セキュアで美しい世界を構築します。",
    // アバターアイコン
    avatar: "images/Kyarasus/avatar.png", 
    // キャラクター立ち絵・イラスト用（複数指定可能）
    characterImages: [
      "images/Kyarasus/standing_art_01.png",
      "images/Kyarasus/standing_art_02.png"
    ]
  },
  socials: [
    { id: 'x', name: 'X (Twitter)', url: 'https://twitter.com/Kyarasu', icon: <Twitter size={20} />, color: 'hover:text-blue-400', label: '@Kyarasu' },
    { id: 'github', name: 'GitHub', url: 'https://github.com/Kyarasu', icon: <Github size={20} />, color: 'hover:text-gray-900', label: 'Kyarasu' },
    { id: 'insta', name: 'Instagram', url: 'https://instagram.com/Kyarasu', icon: <Instagram size={20} />, color: 'hover:text-pink-500', label: 'Kyarasu' },
  ],
  affiliations: [
    { id: 1, name: "RiST", role: "Security Team", icon: <Lock size={16} /> },
    { id: 2, name: "Envice", role: "Developer", icon: <Code size={16} /> },
  ],
  hobbies: ["FlipperZero", "CTF", "Sweets"],
  // 技術スタック（増えても大丈夫なように独立セクション化）
  skills: [
    { name: "React / Next.js", level: 90, color: "bg-cyan-400" },
    { name: "TypeScript", level: 85, color: "bg-blue-500" },
    { name: "Python / Security", level: 75, color: "bg-yellow-400" },
    { name: "C / C++", level: 60, color: "bg-purple-500" },
    { name: "FlipperZero Dev", level: 80, color: "bg-orange-400" },
    { name: "Linux / Shell", level: 70, color: "bg-slate-600" },
    { name: "Network Forensics", level: 65, color: "bg-green-500" },
  ],
  projects: [
    {
      id: 1,
      title: "SecureChat",
      summary: "E2E暗号化を実装したチャットアプリ。Signalプロトコルを参考に実装。",
      bgColor: "bg-blue-50/50",
      accentColor: "border-blue-200",
      members: ["Kyarasu", "Alice"],
      startDate: "2024.01",
      role: "Frontend / Encryption",
    },
    {
      id: 2,
      title: "Ritsumei Portal Mod",
      summary: "大学ポータルのUIをモダンにするChrome拡張機能。",
      bgColor: "bg-red-50/50",
      accentColor: "border-red-200",
      members: ["Kyarasu"],
      startDate: "2023.09",
      role: "All",
    },
    {
      id: 3,
      title: "Portfolio v1",
      summary: "Three.jsを使用した3Dポートフォリオサイト。",
      bgColor: "bg-gray-100/50",
      accentColor: "border-gray-300",
      members: ["Kyarasu"],
      startDate: "2023.04",
      role: "Design & Dev",
    },
     {
      id: 4,
      title: "CTF Tools",
      summary: "自作のCTF用攻撃・解析スクリプト群。",
      bgColor: "bg-green-50/50",
      accentColor: "border-green-200",
      members: ["Kyarasu"],
      startDate: "2023.11",
      role: "Scripting",
    },
  ],
  history: [
    { year: "2024", event: "SECCON Beginners 出場" },
    { year: "2023", event: "立命館大学 入学" },
    { year: "2023", event: "Hack U Kinki 優秀賞" },
  ],
  ctf: {
    flag: "FLAG{Kyarasu_Loves_Sweets_And_Security}",
    hint: "Try 'ls -a' or check hidden files..."
  }
};

/* ===========================================================================
  UI COMPONENTS
  ===========================================================================
*/

// Glass Card Component
const GlassCard = ({ children, className = "", delay = 0, onClick, noHover = false }) => (
  <div 
    onClick={onClick}
    className={`
      relative overflow-hidden bg-white/60 backdrop-blur-xl 
      border border-white/40 shadow-lg rounded-3xl 
      transition-all duration-500 ease-out 
      ${!noHover ? 'hover:shadow-2xl hover:scale-[1.01] hover:bg-white/70' : ''}
      animate-fade-in-up
      ${className}
    `}
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    {children}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
  </div>
);

// Skill Item Component
const SkillItem = ({ name, level, color }) => (
  <div className="flex flex-col gap-1 mb-2">
    <div className="flex justify-between text-xs font-mono text-slate-600">
      <span className="font-bold">{name}</span>
      <span>{level}%</span>
    </div>
    <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden backdrop-blur-sm">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${level}%` }} 
      />
    </div>
  </div>
);

// Terminal Component (Fully Functional)
const TerminalEmulator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: 'output', content: "Kyarasu OS v1.0.0 [Secure Boot]" },
    { type: 'output', content: "Type 'help' for available commands." },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    // Add command to history
    const newHistory = [...history, { type: 'input', content: input }];

    // Process command
    let response = "";
    switch (cmd) {
      case 'help':
        response = "Available commands: ls, whoami, cat [file], clear, date, flag";
        break;
      case 'ls':
        response = "projects/  skills/  profile/  secret.txt  flag.txt";
        break;
      case 'ls -a':
        response = "projects/  skills/  profile/  secret.txt  flag.txt  .real_flag";
        break;
      case 'whoami':
        response = `User: ${PORTFOLIO_DATA.profile.nickname} (Guest)`;
        break;
      case 'cat secret.txt':
        response = "Encrypted data... Access denied. Try harder.";
        break;
      case 'cat flag.txt':
        response = "Not here. Look deeper.";
        break;
      case 'cat .real_flag':
        response = PORTFOLIO_DATA.ctf.flag;
        break;
      case 'flag':
        response = "Did you try 'ls' first?";
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case '':
        response = "";
        break;
      default:
        response = `Command not found: ${cmd}`;
    }

    if (response) {
      newHistory.push({ type: 'output', content: response });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <GlassCard className="col-span-full bg-slate-900/95 text-green-400 font-mono text-sm border-slate-700 min-h-[300px] flex flex-col" noHover={true}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700 bg-slate-800/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="ml-2 text-xs text-slate-400">guest@kyarasu-portfolio: ~</span>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[400px] font-mono" onClick={() => document.getElementById('term-input').focus()}>
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-cyan-300' : 'text-green-400/90'}`}>
            <span className="opacity-50 mr-2">{line.type === 'input' ? '$' : '>'}</span>
            {line.content}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex gap-2 mt-2">
          <span className="text-cyan-400 animate-pulse">$</span>
          <input 
            id="term-input"
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-cyan-100 w-full placeholder-slate-700 focus:ring-0 p-0"
            autoComplete="off"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </GlassCard>
  );
};

// Background Ripples
const BackgroundEffect = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute border-2 border-cyan-400/30 rounded-full animate-ripple"
          style={{ left: ripple.x, top: ripple.y, width: '20px', height: '20px', transform: 'translate(-50%, -50%)' }}
        />
      ))}
    </div>
  );
};

/* ===========================================================================
  MAIN APP COMPONENT
  ===========================================================================
*/
export default function App() {
  const [isSaved, setIsSaved] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  // キャラクター画像の切り替え（クリック時）
  const toggleChar = () => {
    setActiveCharIndex((prev) => (prev + 1) % PORTFOLIO_DATA.profile.characterImages.length);
  };

  const handleShare = () => {
    const text = `Check out ${PORTFOLIO_DATA.profile.nickname}'s Portfolio!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 relative overflow-x-hidden selection:bg-cyan-200 selection:text-cyan-900">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
         <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <BackgroundEffect />

      <main className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* HEADER */}
        <header className="flex justify-between items-center py-2 animate-slide-down">
          <div className="flex gap-3">
             <button onClick={handleShare} className="group p-3 bg-white/50 backdrop-blur-md border border-white/40 rounded-full hover:bg-black hover:text-white transition-all shadow-sm">
               <Share2 size={20} />
             </button>
             <button onClick={() => setIsSaved(!isSaved)} className={`p-3 backdrop-blur-md border border-white/40 rounded-full transition-all shadow-sm ${isSaved ? 'bg-cyan-500 text-white' : 'bg-white/50 hover:bg-cyan-50'}`}>
               <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
             </button>
          </div>
          <div className="font-mono text-xs text-slate-400 bg-white/30 px-3 py-1 rounded-full border border-white/40">
            LAST LOGIN: {new Date().toLocaleDateString()}
          </div>
        </header>


        {/* ========================================================================
            ROW 1: PROFILE & CHARACTER ART
            高さ固定で崩れにくいセクション
           ======================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 左側: プロフィール情報 (2/3) */}
          <GlassCard className="lg:col-span-2 p-8 flex flex-col justify-center relative" delay={100}>
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start z-10">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                  <img 
                    src={PORTFOLIO_DATA.profile.avatar} 
                    alt="avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=K&background=f1f5f9"; }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-400 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm">
                  ONLINE
                </div>
              </div>
              
              {/* Text Info */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 mb-2">
                  {PORTFOLIO_DATA.profile.nickname}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-800 text-white text-xs font-mono rounded-md flex items-center gap-1">
                    <Terminal size={12} /> {PORTFOLIO_DATA.profile.role}
                  </span>
                  <span className="px-3 py-1 bg-white/50 text-slate-600 text-xs font-mono rounded-md border border-white/50">
                    {PORTFOLIO_DATA.profile.graduation}
                  </span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed max-w-lg">
                  {PORTFOLIO_DATA.profile.comment}
                </p>
              </div>
            </div>

            {/* 所属・SNS (Bottom Area of Profile Card) */}
            <div className="mt-8 pt-6 border-t border-slate-200/50 flex flex-wrap gap-6 justify-center sm:justify-start">
              {PORTFOLIO_DATA.socials.map(sns => (
                <a key={sns.id} href={sns.url} target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors ${sns.color}`}>
                  {sns.icon} <span>{sns.label}</span>
                </a>
              ))}
            </div>

            {/* 背景の装飾文字 */}
            <div className="absolute top-4 right-4 text-9xl font-black text-slate-900/5 pointer-events-none select-none z-0">
              ID
            </div>
          </GlassCard>

          {/* 右側: キャラクターイラスト (1/3) */}
          <GlassCard className="lg:col-span-1 min-h-[300px] lg:min-h-0 flex items-center justify-center p-0 bg-gradient-to-b from-blue-50 to-indigo-50" delay={200} onClick={toggleChar}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-multiply"></div>
            
            {/* キャラクター画像表示エリア */}
            <div className="relative w-full h-full flex items-end justify-center overflow-hidden cursor-pointer group">
              <img 
                src={PORTFOLIO_DATA.profile.characterImages[activeCharIndex]} 
                alt="Character"
                className="w-auto h-[90%] object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                onError={(e) => { 
                  e.target.onerror = null;
                  e.target.style.display = 'none'; // 画像がない場合は非表示
                }}
              />
              {/* 画像がない場合のプレセット表示（デバッグ用） */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-300 pointer-events-none -z-10">
                <Ghost size={64} className="opacity-20" />
                <span className="absolute mt-20 text-xs font-mono opacity-40">Tap to Change Art</span>
              </div>
              
              {/* キャラクター名ラベル */}
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white/50">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Character Art</p>
                 <p className="text-sm font-black text-slate-800">#{activeCharIndex + 1}</p>
              </div>
            </div>
          </GlassCard>
        </div>


        {/* ========================================================================
            ROW 2: INFO BAR
            高さがあまり変わらない情報を横並びにする
           ======================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Affiliations */}
          <GlassCard className="p-5 flex flex-col justify-center" delay={300}>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Lock size={14} /> Affiliations
            </h3>
            <div className="space-y-2">
              {PORTFOLIO_DATA.affiliations.map(org => (
                <div key={org.id} className="flex items-center justify-between group">
                  <span className="font-bold text-slate-700 group-hover:text-cyan-600 transition-colors">{org.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-500">{org.role}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Hobbies */}
          <GlassCard className="p-5 flex flex-col justify-center" delay={350}>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap size={14} /> Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.hobbies.map(hobby => (
                <span key={hobby} className="text-xs font-bold px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full border border-cyan-100 hover:bg-cyan-100 transition-colors cursor-default">
                  {hobby}
                </span>
              ))}
            </div>
          </GlassCard>

           {/* History */}
          <GlassCard className="md:col-span-2 p-5" delay={400}>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award size={14} /> Timeline
            </h3>
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {PORTFOLIO_DATA.history.map((h, i) => (
                <div key={i} className="flex-shrink-0 min-w-[120px] relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-white"></div>
                  <p className="text-xs font-mono text-cyan-600 mb-0.5">{h.year}</p>
                  <p className="text-sm font-bold text-slate-700 leading-tight">{h.event}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>


        {/* ========================================================================
            ROW 3: TECH STACK (FULL WIDTH BLOCK)
            縦に伸びてもレイアウト崩れしない独立ブロック
           ======================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
             <div className="h-px bg-slate-300 flex-1"></div>
             <span className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Tech Stack</span>
             <div className="h-px bg-slate-300 flex-1"></div>
          </div>

          <GlassCard className="p-6 md:p-8" delay={500} noHover={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              {PORTFOLIO_DATA.skills.map((skill, idx) => (
                <SkillItem key={idx} {...skill} />
              ))}
            </div>
          </GlassCard>
        </div>


        {/* ========================================================================
            ROW 4: PROJECTS (FULL WIDTH GRID)
            増えても自動で段落ちするグリッド
           ======================================================================== */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 px-2">
             <div className="h-px bg-slate-300 flex-1"></div>
             <span className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Projects</span>
             <div className="h-px bg-slate-300 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <GlassCard 
                key={project.id} 
                className={`p-6 flex flex-col justify-between min-h-[220px] border-t-4 ${project.accentColor} ${project.bgColor}`}
                delay={600 + idx * 50}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-slate-800 font-mono tracking-tight">{project.title}</h3>
                    <ExternalLinkButton />
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">{project.summary}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-200/50 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1"><Ghost size={12}/> {project.members.join(", ")}</span>
                    <span>{project.startDate}</span>
                  </div>
                  <div className="inline-block bg-white/60 px-2 py-1 rounded text-xs font-bold text-slate-600 border border-slate-200/50">
                    {project.role}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* ========================================================================
            ROW 5: TERMINAL (FOOTER AREA)
            ちゃんと動くターミナル
           ======================================================================== */}
        <div className="pt-8 pb-4 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <TerminalEmulator />
        </div>

        {/* FOOTER */}
        <footer className="text-center pb-8 opacity-60">
          <p className="text-xs font-mono text-slate-500">
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.profile.nickname}. 
            Built with React & Tailwind.
          </p>
        </footer>

      </main>


      {/* Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.8s ease-out forwards; }
        
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .animate-ripple { animation: ripple 0.6s linear forwards; }
        
        /* Hide scrollbar for clean look */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// 補助コンポーネント: プロジェクトのリンクボタン（ダミー）
const ExternalLinkButton = () => (
  <button className="text-slate-400 hover:text-cyan-600 transition-colors">
    <Maximize2 size={16} />
  </button>
);

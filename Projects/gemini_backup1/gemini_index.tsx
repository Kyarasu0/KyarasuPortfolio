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
  ExternalLink,
  Ghost,
  Lock,
  Zap,
  Coffee,
  MapPin
} from 'lucide-react';

/* ===========================================================================
  DATA CONFIGURATION SECTION
  ここを編集するだけでサイトの内容が更新されます
  ===========================================================================
*/
const PORTFOLIO_DATA = {
  profile: {
    name: "田中 太郎",
    nickname: "Kyarasu",
    role: "Student Security Engineer",
    birthDate: "2005/08/04",
    university: "立命館大学",
    faculty: "情報理工学部 情報理工学科",
    course: "セキュリティネットワークコース",
    graduation: "2028年卒業予定",
    hobbies: ["FlipperZero", "CTF"],
    comment: "甘い物が燃料です。セキュアで美しい世界を構築します。",
    // キャラクター画像のパス (publicフォルダやsrcフォルダの構成に合わせてください)
    avatar: "images/Kyarasus/avatar.png", 
  },
  socials: [
    { id: 'x', name: 'X (Twitter)', url: 'https://twitter.com/Kyarasu', icon: <Twitter size={24} />, color: 'hover:text-blue-400' },
    { id: 'github', name: 'GitHub', url: 'https://github.com/Kyarasu', icon: <Github size={24} />, color: 'hover:text-gray-900' },
    { id: 'insta', name: 'Instagram', url: 'https://instagram.com/Kyarasu', icon: <Instagram size={24} />, color: 'hover:text-pink-500' },
  ],
  affiliations: [
    { id: 1, name: "RiST", role: "Security Team", icon: <Lock size={18} /> },
    { id: 2, name: "Envice", role: "Developer", icon: <Code size={18} /> },
  ],
  skills: [
    { name: "React / Next.js", level: 90, color: "bg-cyan-400" },
    { name: "TypeScript", level: 85, color: "bg-blue-500" },
    { name: "Python / Security", level: 75, color: "bg-yellow-400" },
    { name: "C / C++", level: 60, color: "bg-purple-500" },
    { name: "FlipperZero Dev", level: 80, color: "bg-orange-400" },
  ],
  projects: [
    {
      id: 1,
      title: "SecureChat",
      summary: "E2E暗号化を実装したチャットアプリ",
      bgColor: "bg-blue-50",
      accentColor: "border-blue-200",
      members: ["Kyarasu", "Alice"],
      startDate: "2024.01",
      role: "Frontend / Encryption Logic",
    },
    {
      id: 2,
      title: "Ritsumei Portal Mod",
      summary: "大学ポータルのUIをモダンにする拡張機能",
      bgColor: "bg-red-50",
      accentColor: "border-red-200",
      members: ["Kyarasu"],
      startDate: "2023.09",
      role: "All",
    },
    {
      id: 3,
      title: "Portfolio v1",
      summary: "過去のポートフォリオサイト",
      bgColor: "bg-gray-100",
      accentColor: "border-gray-300",
      members: ["Kyarasu"],
      startDate: "2023.04",
      role: "Design & Dev",
    },
  ],
  history: [
    { year: "2024", event: "SECCON Beginners 出場" },
    { year: "2023", event: "立命館大学 入学" },
    { year: "2023", event: "Hack U Kinki 優秀賞" },
  ],
  ctf: {
    flag: "FLAG{Kyarasu_Loves_Sweets_And_Security}",
    hint: "コンソールログか、どこかの隠しコマンドを探せ..."
  }
};

/* ===========================================================================
  COMPONENTS
  これ以下はUIロジックです。デザインを修正する場合に触ります。
  ===========================================================================
*/

// グラスモーフィズムの基本カードスタイル
const GlassCard = ({ children, className = "", delay = 0, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      relative overflow-hidden bg-white/60 backdrop-blur-xl 
      border border-white/40 shadow-lg rounded-3xl 
      transition-all duration-500 ease-out 
      hover:shadow-2xl hover:scale-[1.01] hover:bg-white/70
      animate-fade-in-up group
      ${className}
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
    {/* 光沢のエフェクト */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />
  </div>
);

// プロジェクトカード
const ProjectCard = ({ project }) => (
  <div className={`p-5 rounded-2xl h-full flex flex-col justify-between border ${project.accentColor} ${project.bgColor} bg-opacity-50 transition-all hover:bg-opacity-80`}>
    <div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-800 font-mono tracking-tight">{project.title}</h3>
        <span className="text-xs font-mono text-slate-500 bg-white/50 px-2 py-1 rounded-md">{project.startDate}</span>
      </div>
      <p className="text-sm text-slate-600 mb-4 font-medium leading-relaxed">{project.summary}</p>
    </div>
    <div className="space-y-2 text-xs text-slate-500 font-mono">
      <div className="flex items-center gap-1">
        <Ghost size={12} />
        <span>{project.members.join(", ")}</span>
      </div>
      <div className="flex items-center gap-1">
        <Code size={12} />
        <span className="truncate">{project.role}</span>
      </div>
    </div>
  </div>
);

// スキルバー
const SkillBar = ({ name, level, color }) => (
  <div className="mb-3 group">
    <div className="flex justify-between text-xs font-mono mb-1 text-slate-600">
      <span className="group-hover:text-slate-900 transition-colors">{name}</span>
      <span>{level}%</span>
    </div>
    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
        style={{ width: `${level}%` }} 
      />
    </div>
  </div>
);

// 背景のパーティクルエフェクト（クリックで波紋）
const BackgroundEffect = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
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
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

// メインアプリケーション
export default function App() {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("> System Ready...");
  
  // ハッカー要素: コンソールにFlagを表示
  useEffect(() => {
    console.log(
      "%c WARNING: UNAUTHORIZED ACCESS DETECTED ",
      "background: #ff0000; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;"
    );
    console.log(
      `%c Just kidding. Here is your flag: ${PORTFOLIO_DATA.ctf.flag}`,
      "color: #00ff00; font-family: monospace; font-size: 14px;"
    );
  }, []);

  // シェア機能
  const handleShare = () => {
    const text = `Check out ${PORTFOLIO_DATA.profile.nickname}'s Portfolio! #Kyarasu #Portfolio`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  // 保存（ブックマーク）機能のシミュレーション
  const handleSave = () => {
    setIsSaved(!isSaved);
    // 実際のアプリではLocal Storageなどに保存
    if (!isSaved) {
      alert("端末にプロファイルを保存しました (Simulation)");
    }
  };

  // 簡易ターミナル機能
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    
    if (cmd === 'ls') {
      setTerminalOutput("> projects  skills  about  secret.txt");
    } else if (cmd === 'cat secret.txt') {
      setTerminalOutput(`> ${PORTFOLIO_DATA.ctf.flag}`);
    } else if (cmd === 'whoami') {
      setTerminalOutput(`> ${PORTFOLIO_DATA.profile.nickname}`);
    } else if (cmd === 'help') {
      setTerminalOutput("> Available commands: ls, whoami, cat [file]");
    } else {
      setTerminalOutput(`> Command not found: ${cmd}`);
    }
    setTerminalInput("");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-cyan-200 selection:text-cyan-900 pb-20 relative overflow-x-hidden">
      {/* 背景装飾 */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <BackgroundEffect />

      <main className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ヘッダーエリア: SNSとアクションボタン */}
        <header className="flex justify-between items-center mb-8 animate-slide-down">
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              className="p-3 bg-white/50 backdrop-blur-md border border-white/40 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Share on X"
            >
              <Share2 size={20} />
            </button>
            <button 
              onClick={handleSave}
              className={`p-3 backdrop-blur-md border border-white/40 rounded-full transition-all duration-300 shadow-sm ${isSaved ? 'bg-cyan-400 text-white' : 'bg-white/50 hover:bg-cyan-100'}`}
              aria-label="Save Profile"
            >
              <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="flex gap-3">
            {PORTFOLIO_DATA.socials.map((sns) => (
              <a 
                key={sns.id} 
                href={sns.url} 
                target="_blank" 
                rel="noreferrer"
                className={`p-3 bg-white/50 backdrop-blur-md rounded-full border border-white/40 transition-all duration-300 shadow-sm hover:scale-110 ${sns.color}`}
              >
                {sns.icon}
              </a>
            ))}
          </div>
        </header>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">

          {/* 1. Profile Main Card (大きいカード) */}
          <GlassCard className="md:col-span-2 lg:col-span-2 row-span-2 p-6 md:p-8 flex flex-col justify-between" delay={100}>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* アバター画像エリア (フォールバック付き) */}
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200 relative">
                  <img 
                    src={PORTFOLIO_DATA.profile.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://ui-avatars.com/api/?name=Kyarasu&background=random&color=fff"; // Fallback
                    }}
                  />
                </div>
                {/* 状態ステータス */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
                  {PORTFOLIO_DATA.profile.nickname}
                </h1>
                <p className="text-sm font-mono text-slate-500 mb-2">{PORTFOLIO_DATA.profile.name}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100/50 rounded-full border border-slate-200">
                  <Cpu size={14} className="text-cyan-600" />
                  <span className="text-xs font-bold text-slate-700">{PORTFOLIO_DATA.profile.role}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="p-4 bg-white/40 rounded-xl border border-white/50">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  "{PORTFOLIO_DATA.profile.comment}"
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600">
                <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md"><MapPin size={12}/> {PORTFOLIO_DATA.profile.university}</span>
                <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md"><Ghost size={12}/> {PORTFOLIO_DATA.profile.course}</span>
                <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md">🎓 {PORTFOLIO_DATA.profile.graduation}</span>
              </div>
            </div>
          </GlassCard>

          {/* 2. Affiliations & Hobbies (縦長カード) */}
          <GlassCard className="md:col-span-1 row-span-2 p-6 flex flex-col gap-6" delay={200}>
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Coffee size={16} /> Affiliations
              </h2>
              <div className="space-y-3">
                {PORTFOLIO_DATA.affiliations.map(org => (
                  <div key={org.id} className="flex items-center gap-3 p-2 hover:bg-white/50 rounded-lg transition-colors cursor-default">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                      {org.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{org.name}</div>
                      <div className="text-xs text-slate-500">{org.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap size={16} /> Hobbies
              </h2>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.profile.hobbies.map(hobby => (
                  <span key={hobby} className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold rounded-full border border-cyan-100">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* 3. Tech Stack (リスト表示) */}
          <GlassCard className="md:col-span-1 lg:col-span-1 row-span-2 p-6 overflow-hidden" delay={300}>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Terminal size={16} /> Tech Stack
            </h2>
            <div className="space-y-4">
              {PORTFOLIO_DATA.skills.map(skill => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
            {/* 装飾用背景文字 */}
            <div className="absolute -bottom-4 -right-4 text-9xl opacity-5 font-mono pointer-events-none select-none">
              JS
            </div>
          </GlassCard>

          {/* 4. Projects Area (グリッド内グリッド) */}
          <div className="md:col-span-3 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <GlassCard key={project.id} className="h-48 md:h-56 p-1" delay={400 + (idx * 100)}>
                <ProjectCard project={project} />
              </GlassCard>
            ))}
            
            {/* Add New Project Placeholder (追加削除しやすさの示唆) */}
            <div className="border-2 border-dashed border-slate-300 rounded-3xl flex items-center justify-center h-48 md:h-56 text-slate-400 hover:text-cyan-500 hover:border-cyan-400 transition-colors cursor-pointer group">
               <div className="text-center">
                 <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">+</div>
                 <div className="text-xs font-mono">Add Project</div>
               </div>
            </div>
          </div>

          {/* 5. History / Awards */}
          <GlassCard className="md:col-span-1 lg:col-span-1 p-6" delay={700}>
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award size={16} /> History
             </h2>
             <ul className="space-y-4 relative border-l-2 border-slate-200 ml-2 pl-4">
                {PORTFOLIO_DATA.history.map((item, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[21px] top-1 w-3 h-3 bg-white border-2 border-cyan-400 rounded-full"></span>
                    <span className="block text-xs font-mono text-cyan-600 mb-1">{item.year}</span>
                    <span className="block text-sm font-bold text-slate-700">{item.event}</span>
                  </li>
                ))}
             </ul>
          </GlassCard>

          {/* 6. Mini Terminal (Gimmick / CTF) */}
          <GlassCard className="md:col-span-4 lg:col-span-4 p-4 bg-slate-900 text-green-400 font-mono text-sm shadow-inner" delay={800}>
            <div className="flex gap-2 mb-2 border-b border-slate-700 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-slate-500">kyarasu@macbook-pro: ~</span>
            </div>
            <div className="font-mono min-h-[60px] p-2">
              <div className="opacity-70 mb-2">{terminalOutput}</div>
              <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                <span className="text-cyan-400">$</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-green-400 w-full placeholder-slate-700"
                  placeholder="Try 'ls', 'whoami' or find the flag..."
                />
              </form>
            </div>
          </GlassCard>

        </div>

        {/* フッター */}
        <footer className="mt-12 text-center text-slate-400 text-xs font-mono">
           <p>© {new Date().getFullYear()} Kyarasu. All rights reserved.</p>
           <p className="mt-1 opacity-50 hover:opacity-100 transition-opacity cursor-help" title={PORTFOLIO_DATA.ctf.hint}>
             Designed with React & Tailwind
           </p>
        </footer>

      </main>

      {/* カスタムCSSアニメーション定義 */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0; /* 初期状態は非表示 */
        }
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.6s linear forwards;
        }
      `}</style>
    </div>
  );
}

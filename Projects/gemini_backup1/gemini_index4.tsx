import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Terminal, 
  Code, 
  Cpu, 
  Award, 
  Share2, 
  Bookmark, 
  MapPin, 
  School,
  Heart,
  Zap,
  ExternalLink,
  Shield,
  Globe,
  ChevronRight,
  Maximize2
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
  { name: "Cyber Security", level: 65, icon: <Shield size={16} /> }, // 追加例：項目が増えてもスクロールで対応
];

const HISTORY = [
  { year: "2024", title: "立命館大学 入学", desc: "情報理工学部での研究開始" },
  { year: "2024", title: "RiST 入団", desc: "セキュリティ技術の研鑽" },
  { year: "2025", title: "ハッカソン優勝", desc: "技育展2025 優秀賞" },
  { year: "Present", title: "Current Status", desc: "Web開発とセキュリティを猛勉強中" },
  // 追加しても縦に伸びるだけで崩れません
];

const PROJECTS = [
  {
    id: 1,
    name: "SecureChat",
    summary: "E2E暗号化チャットアプリ",
    color: "bg-blue-500",
    members: ["Me", "A-san", "B-san"],
    startDate: "2024-06",
    role: "Frontend / Encryption Logic"
  },
  {
    id: 2,
    name: "RitsMap",
    summary: "キャンパスマップ最適化ツール",
    color: "bg-red-500",
    members: ["Me", "C-san"],
    startDate: "2024-10",
    role: "UI/UX Design"
  },
  {
    id: 3,
    name: "FlipperTools",
    summary: "FlipperZero用カスタムプラグイン",
    color: "bg-orange-500",
    members: ["Solo"],
    startDate: "2025-01",
    role: "All"
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

// 写真素材（増やしてもOK）
const GALLERY_IMAGES = [
  "images/Kyarasus/1.png",
  "images/Kyarasus/2.png",
  "images/Kyarasus/3.png",
  "images/Kyarasus/4.png",
  "images/Kyarasus/5.png" 
];

/**
 * ============================================================================
 * COMPONENTS
 * ============================================================================
 */

// 1. Bento Grid Card
const BentoCard = ({ 
  children, 
  className = "", 
  title, 
  delay = 0,
  noPadding = false,
  glass = true
}: { 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  delay?: number;
  noPadding?: boolean;
  glass?: boolean;
}) => {
  return (
    <div 
      className={`
        group relative overflow-hidden flex flex-col
        ${glass ? 'bg-white/40 backdrop-blur-xl border border-white/60' : 'bg-white border border-slate-100'}
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        rounded-[32px] 
        transition-all duration-500 ease-out
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:-translate-y-1
        animate-fade-in-up
        ${className}
      `}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* Glossy Reflection Effect */}
      {glass && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/40 via-transparent to-transparent z-10" />
      )}
      
      {/* Content */}
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

// 2. Interactive Console (Playable)
const InteractiveConsole = () => {
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

// 3. Photo Frame Component (New)
const PhotoFrame = ({ imageIndex, className = "" }: { imageIndex: number, className?: string }) => {
  return (
    <div className={`relative group overflow-hidden rounded-[24px] shadow-sm border border-white/50 bg-white ${className}`}>
      <img 
        src={GALLERY_IMAGES[imageIndex % GALLERY_IMAGES.length]} 
        alt="Gallery"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
           (e.target as HTMLImageElement).src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=Photo`;
        }}
      />
      {/* Tape Effect */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/30 backdrop-blur-sm border border-white/40 rotate-1 shadow-sm opacity-80" />
    </div>
  );
};

// 4. Main Application
export default function App() {
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('projects'); 

  const handleBookmark = () => {
    setBookmarked(true);
    setTimeout(() => setBookmarked(false), 2000);
  };

  const handleShare = () => {
    const text = `Check out ${PROFILE.nickname}'s Portfolio!`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      {/* Soft Gradient Blob */}
      <div className="fixed top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/40 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-100/40 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-white/60 shadow-sm backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
            <span className="font-mono text-xs font-bold text-slate-500">SYSTEM: ONLINE</span>
          </div>
          <button 
            onClick={handleBookmark}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full 
              transition-all duration-300 border border-white/60 backdrop-blur-md
              ${bookmarked ? 'bg-blue-500 text-white shadow-lg scale-105' : 'bg-white/50 text-slate-600 hover:bg-white hover:shadow-md'}
            `}
          >
            <Bookmark size={18} className={bookmarked ? "fill-current" : ""} />
            <span className="text-xs font-bold tracking-wide">{bookmarked ? "SAVED" : "BOOKMARK"}</span>
          </button>
        </header>

        {/* Bento Grid Layout - Reorganized for vertical stability */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-min">
          
          {/* --- ROW 1: Profile & Photos --- */}
          
          {/* Profile Card (Large) */}
          <BentoCard className="md:col-span-2 lg:col-span-2 row-span-1" delay={100}>
            <div className="flex flex-col sm:flex-row gap-6 items-start h-full">
              {/* Avatar Area */}
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
                  <span className="text-xl">💻</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mb-2">
                  {PROFILE.nickname}
                </h1>
                <p className="text-sm font-mono text-blue-600 mb-4 bg-blue-50 inline-block px-2 py-1 rounded-md border border-blue-100">
                  {PROFILE.role} / {PROFILE.name}
                </p>
                
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-500 font-medium">
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <School size={16} className="text-slate-400" /> {PROFILE.university}
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-2">
                    <MapPin size={16} className="text-slate-400" /> {PROFILE.course}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                     <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 text-[10px] border border-slate-200"># {PROFILE.hobby}</span>
                     <span className="px-2 py-1 bg-slate-100 rounded text-slate-600 text-[10px] border border-slate-200"># {PROFILE.comment}</span>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Photo Frame 1 (Decoration) */}
          <PhotoFrame imageIndex={1} className="hidden md:block md:col-span-1 h-[280px] rotate-2 hover:rotate-0 transition-transform" />

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


          {/* --- ROW 2: Interactive & Affiliations --- */}

          {/* Console (Interactive) - 独立させて操作しやすく */}
          <div className="md:col-span-2 h-[240px] animate-fade-in-up" style={{ animationDelay: '250ms' }}>
             <InteractiveConsole />
          </div>

          {/* Affiliations (Separated from Tech Stack) */}
          <BentoCard className="md:col-span-2 h-full" title="Affiliations" delay={300}>
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


          {/* --- ROW 3: Tech Stack (Full Width / Scrollable) --- */}
          
          {/* Tech Stack - 縦に並ぶ問題を解消するため独立行。内容が増えてもスクロール対応 */}
          <BentoCard className="md:col-span-2 lg:col-span-3 min-h-[220px]" title="Tech Stack & Proficiency" delay={400}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="group/skill">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                      <span className="p-1 bg-slate-100 rounded-md text-slate-500">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 rounded">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100/50">
                    <div 
                      className="h-full bg-slate-800 rounded-full transition-all duration-1000 ease-out group-hover/skill:bg-blue-600 relative overflow-hidden"
                      style={{ width: `${skill.level}%` }}
                    >
                      {/* Shimmer effect on bar */}
                      <div className="absolute inset-0 bg-white/20 w-full -translate-x-full group-hover/skill:animate-[shimmer_1.5s_infinite]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Photo Frame 2 (Decoration) - Fill the grid */}
          <PhotoFrame imageIndex={2} className="hidden lg:block lg:col-span-1 h-full -rotate-1 hover:rotate-0 transition-transform" />


          {/* --- ROW 4: Projects (Main Content) --- */}
          
          <BentoCard className="md:col-span-3 lg:col-span-3" noPadding delay={500}>
             <div className="p-6 pb-0 flex justify-between items-center border-b border-slate-100/50">
               <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                 My Projects
               </h3>
               {/* Tab Switcher */}
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
                   Gallery
                 </button>
               </div>
             </div>

             <div className="p-6 bg-slate-50/50">
               {activeTab === 'projects' ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {PROJECTS.map((project) => (
                     <div key={project.id} className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all group/project relative overflow-hidden h-full flex flex-col">
                       <div className={`absolute top-0 left-0 w-1.5 h-full ${project.color}`} />
                       <div className="flex justify-between items-start mb-2 pl-2">
                         <h4 className="font-bold text-slate-800">{project.name}</h4>
                         <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">{project.startDate}</span>
                       </div>
                       <p className="text-xs text-slate-500 mb-4 pl-2 line-clamp-2 flex-1">{project.summary}</p>
                       <div className="pl-2 mt-auto">
                         <div className="flex -space-x-2 overflow-hidden mb-2">
                           {project.members.map((m, i) => (
                             <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500" title={m}>
                               {m.charAt(0)}
                             </div>
                           ))}
                         </div>
                         <span className="inline-block px-2 py-1 bg-slate-50 rounded border border-slate-100 text-[10px] text-slate-500 font-medium">
                           Role: {project.role}
                         </span>
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

          {/* Timeline - Right Side / Vertical Layout */}
          {/* このカードは内容が増えても縦に伸びるだけで、グリッドのrow-spanにより他の要素と競合しにくい配置にしています */}
          <BentoCard className="md:col-span-1 lg:col-span-1 row-span-1" title="History" delay={600}>
            <div className="relative pl-2 py-2 space-y-6">
              {/* Line */}
              <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-slate-100" />
              
              {HISTORY.map((item, index) => (
                <div key={index} className="relative pl-6 group/time">
                  {/* Dot */}
                  <div className="absolute left-[3.5px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover/time:border-blue-500 group-hover/time:bg-blue-500 transition-colors shadow-sm z-10" />
                  
                  <div className="flex flex-col transition-transform duration-300 group-hover/time:translate-x-1">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 self-start px-1.5 rounded mb-1">{item.year}</span>
                    <span className="text-sm font-bold text-slate-800 leading-tight">{item.title}</span>
                    <span className="text-xs text-slate-500 mt-1">{item.desc}</span>
                  </div>
                </div>
              ))}
              
              {/* Add Button Mock */}
              <button className="relative pl-6 w-full text-left group/add">
                 <div className="absolute left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-200 group-hover/add:bg-blue-300 transition-colors" />
                 <span className="text-xs text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-1">
                   + Add History
                 </span>
              </button>
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

          {/* Share / Footer Action */}
          <BentoCard className="md:col-span-1 lg:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none" delay={800}>
            <div className="flex flex-row items-center justify-between h-full gap-4">
               <div className="flex flex-col">
                 <h3 className="text-lg font-bold flex items-center gap-2">
                   Share Portfolio <Share2 size={16} />
                 </h3>
                 <p className="text-xs text-slate-400">Let the world know about Kyarasu.</p>
               </div>
               <button 
                 onClick={handleShare}
                 className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors active:scale-95 flex items-center gap-2 text-sm shadow-lg whitespace-nowrap"
               >
                 <Twitter size={16} /> Post
               </button>
            </div>
          </BentoCard>

        </div>

        {/* Footer */}
        <footer className="mt-20 text-center border-t border-slate-200/50 pt-10">
           <p className="font-mono text-sm text-slate-400">&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
           <p className="text-xs mt-2 text-slate-300">
             System Version 1.0.5 <span className="mx-2">•</span> 
             Designed with React & Tailwind
           </p>
        </footer>

      </main>

      {/* Global CSS */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

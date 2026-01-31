import React, { useState, useEffect, useRef } from 'react';
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
  Calendar, 
  School,
  Coffee,
  Heart,
  Zap,
  ExternalLink,
  Flag
} from 'lucide-react';

/**
 * ============================================================================
 * DATA SECTION (ここを編集して情報を更新してください)
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
  { name: "RiST", icon: "🛡️", role: "Member" },
  { name: "Envice", icon: "🌐", role: "Developer" },
];

const SKILLS = [
  { name: "React / Next.js", level: 90, icon: <Code size={16} /> },
  { name: "TypeScript", level: 85, icon: <Code size={16} /> },
  { name: "Python", level: 70, icon: <Terminal size={16} /> },
  { name: "Network Security", level: 60, icon: <ShieldIcon /> }, // Custom icon below
  { name: "FlipperZero Dev", level: 80, icon: <Cpu size={16} /> },
];

const HISTORY = [
  { year: "2024", title: "立命館大学 入学", desc: "情報理工学部での研究開始" },
  { year: "2024", title: "RiST 入団", desc: "セキュリティ技術の研鑽" },
  { year: "2025", title: "ハッカソン優勝", desc: "技育展2025 優秀賞" },
  { year: "Present", title: "Current Status", desc: "Web開発とセキュリティを猛勉強中" },
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

// Character Image Placeholders (Assuming files exist as requested)
// 実際のファイルがない場合でもエラーにならないようフォールバック処理を入れています
const GALLERY_IMAGES = [
  "images/Kyarasus/1.png",
  "images/Kyarasus/2.png",
  "images/Kyarasus/3.png",
  "images/Kyarasus/4.png"
];

/**
 * ============================================================================
 * COMPONENTS
 * ============================================================================
 */

// Helper: Custom Shield Icon wrapper
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// 1. Bento Grid Card Component (The core building block)
const BentoCard = ({ 
  children, 
  className = "", 
  title, 
  delay = 0,
  noPadding = false
}: { 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  delay?: number;
  noPadding?: boolean;
}) => {
  return (
    <div 
      className={`
        group relative overflow-hidden
        bg-white/40 backdrop-blur-xl 
        border border-white/60 
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/40 via-transparent to-transparent z-10" />
      
      {/* Content */}
      <div className={`relative z-20 h-full flex flex-col ${noPadding ? '' : 'p-6'}`}>
        {title && (
          <h3 className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

// 2. Typing Console Component
const TypingConsole = () => {
  const [text, setText] = useState("");
  const fullText = `> Initializing User: Kyarasu...\n> Status: Student Engineer\n> Target: World Class\n> Ready...`;
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line min-h-[80px]">
      {text}
      <span className="animate-pulse inline-block w-2 h-4 bg-slate-400 ml-1 align-middle"></span>
    </div>
  );
};

// 3. Main Application
export default function App() {
  const [bookmarked, setBookmarked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('projects'); // projects | gallery
  const [easterEggFound, setEasterEggFound] = useState(false);

  // Bookmark Function
  const handleBookmark = () => {
    setBookmarked(true);
    // 実際のブックマークはブラウザ仕様上JSからはできないため、UXとしてのフィードバックのみ
    setTimeout(() => setBookmarked(false), 2000);
  };

  // Share Function
  const handleShare = () => {
    const text = `Check out ${PROFILE.nickname}'s Portfolio!`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  // Easter Egg Function
  const handleFlagClick = () => {
    setEasterEggFound(true);
    setTimeout(() => setEasterEggFound(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F8] text-slate-800 font-sans selection:bg-slate-300 selection:text-slate-900 pb-20">
      {/* Background Decor (Subtle Tech Grid) */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      {/* Soft Gradient Blob */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-200/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header / Navbar-ish area */}
        <header className="flex justify-between items-center mb-10 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
            <span className="ml-3 font-mono text-sm text-slate-400">user: @kyarasu</span>
          </div>
          <button 
            onClick={handleBookmark}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full 
              transition-all duration-300 border border-white/50
              ${bookmarked ? 'bg-green-100 text-green-700 shadow-inner' : 'bg-white/50 hover:bg-white shadow-sm hover:shadow-md'}
            `}
          >
            <Bookmark size={18} className={bookmarked ? "fill-current" : ""} />
            <span className="text-sm font-medium">{bookmarked ? "Saved!" : "Save Portfolio"}</span>
          </button>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto">
          
          {/* 1. Hero / Profile (Large) */}
          <BentoCard className="md:col-span-2 row-span-1 lg:row-span-1 min-h-[280px]" delay={100}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-800 mb-2">
                      {PROFILE.nickname}
                      <span className="text-lg sm:text-2xl text-slate-400 font-normal ml-3">/ {PROFILE.name}</span>
                    </h1>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                      <School size={16} /> {PROFILE.university} {PROFILE.gradYear}
                    </p>
                  </div>
                  {/* Pseudo-3D Avatar Container */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-xl border-2 border-white transform rotate-3 hover:rotate-0 transition-all duration-300 cursor-pointer bg-slate-200">
                    <img 
                      src={GALLERY_IMAGES[0]} 
                      alt="Kyarasu" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                         // Fallback if image not found
                         (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyarasu&backgroundColor=e2e8f0";
                      }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className="px-3 py-1 bg-slate-100/80 rounded-lg border border-slate-200/50 flex items-center gap-1">
                    <MapPin size={14} /> {PROFILE.location}
                  </span>
                  <span className="px-3 py-1 bg-slate-100/80 rounded-lg border border-slate-200/50 flex items-center gap-1">
                    <Heart size={14} /> {PROFILE.comment}
                  </span>
                  <span className="px-3 py-1 bg-slate-100/80 rounded-lg border border-slate-200/50 flex items-center gap-1">
                    <Zap size={14} /> {PROFILE.hobby}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <TypingConsole />
              </div>
            </div>
          </BentoCard>

          {/* 2. SNS & Quick Links (Tall on Mobile, compact on desktop) */}
          <BentoCard className="md:col-span-1" title="Connect" delay={200}>
             <div className="flex flex-col gap-3 h-full justify-center">
                <a href={SNS_LINKS.x} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 hover:bg-black hover:text-white rounded-2xl transition-all duration-300 group/btn">
                   <div className="flex items-center gap-3">
                     <Twitter size={20} />
                     <span className="font-semibold">X (Twitter)</span>
                   </div>
                   <ExternalLink size={16} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
                <a href={SNS_LINKS.github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 hover:bg-[#333] hover:text-white rounded-2xl transition-all duration-300 group/btn">
                   <div className="flex items-center gap-3">
                     <Github size={20} />
                     <span className="font-semibold">GitHub</span>
                   </div>
                   <ExternalLink size={16} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
                <a href={SNS_LINKS.insta} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white rounded-2xl transition-all duration-300 group/btn">
                   <div className="flex items-center gap-3">
                     <Instagram size={20} />
                     <span className="font-semibold">Instagram</span>
                   </div>
                   <ExternalLink size={16} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </a>
             </div>
          </BentoCard>

          {/* 3. Tech Stack (Tall vertical card) */}
          <BentoCard className="md:col-span-1 md:row-span-2" title="Tech Stack" delay={300}>
            <div className="flex flex-col gap-4">
              {SKILLS.map((skill, i) => (
                <div key={skill.name} className="group/skill">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium flex items-center gap-2 text-slate-700">
                      {skill.icon} {skill.name}
                    </span>
                    <span className="text-xs text-slate-400 opacity-0 group-hover/skill:opacity-100 transition-opacity">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-800 rounded-full transition-all duration-1000 ease-out group-hover/skill:bg-blue-600"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">Affiliations</h3>
              <div className="grid grid-cols-2 gap-2">
                {AFFILIATIONS.map((aff) => (
                  <div key={aff.name} className="p-3 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center border border-slate-100 hover:border-blue-200 transition-colors">
                    <span className="text-2xl mb-1">{aff.icon}</span>
                    <span className="text-sm font-bold text-slate-700">{aff.name}</span>
                    <span className="text-[10px] text-slate-400">{aff.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 4. Timeline / History (Interactive) */}
          <BentoCard className="md:col-span-1 lg:col-span-1" title="Timeline" delay={400}>
            <div className="relative pl-4 space-y-6">
              {/* Vertical Line */}
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-200 rounded-full" />
              
              {HISTORY.map((item, index) => (
                <div key={index} className="relative group/time">
                  {/* Node Dot */}
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover/time:border-blue-500 group-hover/time:bg-blue-500 transition-colors shadow-sm" />
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-slate-400">{item.year}</span>
                    <span className="text-sm font-bold text-slate-800">{item.title}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* 5. My Projects (Expandable / Tabbed) */}
          <BentoCard className="md:col-span-2 lg:col-span-2" noPadding delay={500}>
             <div className="p-6 pb-0 flex justify-between items-center border-b border-slate-100/50">
               <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                 Creative Works
               </h3>
               <div className="flex bg-slate-100 rounded-lg p-1">
                 <button 
                   onClick={() => setActiveTab('projects')}
                   className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'projects' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   Projects
                 </button>
                 <button 
                   onClick={() => setActiveTab('gallery')}
                   className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'gallery' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   Gallery
                 </button>
               </div>
             </div>

             <div className="p-6 bg-slate-50/30 h-full min-h-[250px]">
               {activeTab === 'projects' ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {PROJECTS.map((project) => (
                     <div key={project.id} className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all cursor-default group/project relative overflow-hidden">
                       <div className={`absolute top-0 left-0 w-1 h-full ${project.color}`} />
                       <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-slate-800">{project.name}</h4>
                         <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500">{project.startDate}</span>
                       </div>
                       <p className="text-xs text-slate-500 mb-3 line-clamp-2">{project.summary}</p>
                       <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-auto">
                         <span className="font-medium text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded">Role: {project.role}</span>
                       </div>
                     </div>
                   ))}
                    {/* Add New Project Placeholder */}
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 text-slate-400 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer min-h-[120px]">
                      <span className="text-2xl">+</span>
                      <span className="text-xs font-medium">Coming Soon</span>
                    </div>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {GALLERY_IMAGES.map((src, i) => (
                      <div key={i} className="aspect-square rounded-xl bg-slate-200 overflow-hidden relative group/img">
                        <img 
                          src={src} 
                          alt="Kyarasu shot" 
                          className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500 scale-100 group-hover/img:scale-110"
                          onError={(e) => {
                             (e.target as HTMLImageElement).src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=Image+${i+1}`;
                          }}
                        />
                      </div>
                    ))}
                 </div>
               )}
             </div>
          </BentoCard>

          {/* 6. Awards & Achievements */}
          <BentoCard className="md:col-span-1" title="Awards" delay={600}>
            <ul className="space-y-3">
              {AWARDS.map((award, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 bg-white/50 p-2 rounded-lg border border-transparent hover:border-yellow-200 transition-colors">
                  <Award size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* 7. Action Card (Share / Hidden Flag) */}
          <BentoCard className="md:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none" delay={700}>
            <div className="flex flex-col h-full items-center justify-center text-center p-2">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 Spread the word
                 <Share2 size={20} />
               </h3>
               
               <button 
                 onClick={handleShare}
                 className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors active:scale-95 flex items-center justify-center gap-2 mb-4"
               >
                 <Twitter size={18} /> Share on X
               </button>

               {/* Hidden Flag Trigger */}
               <div 
                 onClick={handleFlagClick}
                 className="mt-2 text-slate-700 hover:text-slate-600 text-[10px] cursor-pointer font-mono select-none"
               >
                 {easterEggFound ? "FLAG{HACK_THE_PLANET}" : "v1.0.4-beta"}
               </div>
            </div>
          </BentoCard>

        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-400 text-sm font-mono">
           <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
           <p className="text-xs mt-1 opacity-50">Designed by Awwwards Winner AI</p>
        </footer>

      </main>

      {/* Global CSS for custom animations that Tailwind utility classes don't cover fully */}
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0; /* Start hidden */
        }
        
        /* Glassmorphism utility reinforcement */
        .glass {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}

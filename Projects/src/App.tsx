import { PROFILE } from "./data/profile";
import { PhotoFrame } from "./Components/PhotoFrame";
import { InteractiveConsole } from "./Components/InteractiveConsole";
import './styles/global.css'
import ProfileCard from "./Components/ProfileCard";
import SNS_LinksCard from "./Components/SNS_LinksCard";
import Affiliations from "./Components/Affiliations";
import ProjectsCard from "./Components/ProjectsCard";
import SkillsCards from "./Components/SkillsCard";
import Timeline from "./Components/TimelineCard";
import ShareCard from "./Components/ShareCard";
import AwardsCard from "./Components/AwardsCard";
import { KudosButton } from "./Components/Like";
import { FlagForm } from "./Components/FlagSubmission";

export default function App() {
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
      <main className="relative z-10 max-w-full mx-auto px-4 sm:px-6 py-12">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-white/60 shadow-sm backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs font-bold text-slate-500">ONLINE</span>
          </div>
          <KudosButton />
        </header>

        {/* Bento Grid Layout - Reorganized for vertical stability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-min">
          
          {/* --- ROW 1: Profile & Photos --- */}
          {/* Profile Card (Large) */}
          <ProfileCard />
          {/* Photo Frame 1 (Decoration) */}
          <PhotoFrame imageIndex={1} className="hidden md:block col-span-1 h-[300px] rotate-2 hover:rotate-0 transition-transform" />
          {/* SNS Links */}
          <SNS_LinksCard />

          {/* --- ROW 2: Interactive & Affiliations --- */}
          {/* Console (Interactive) - 独立させて操作しやすく */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[240px] animate-fade-in-up" style={{ animationDelay: '250ms' }}>
             <InteractiveConsole />
          </div>
          {/* Affiliations (Separated from Tech Stack) */}
          <Affiliations />

          {/* --- ROW 3: Tech Stack (Full Width / Scrollable) --- */}
          {/* Tech Stack - 縦に並ぶ問題を解消するため独立行。内容が増えてもスクロール対応 */}
          <SkillsCards />
          {/* Photo Frame 2 (Decoration) - Fill the grid */}
          <PhotoFrame imageIndex={2} className="hidden lg:block col-span-1 h-full -rotate-1 hover:rotate-0 transition-transform" />

          {/* --- ROW 4: Projects (Main Content) --- */}
          {/* Projects Card */}
          <ProjectsCard />
          {/* Timeline - Right Side / Vertical Layout */}
          {/* このカードは内容が増えても縦に伸びるだけで、グリッドのrow-spanにより他の要素と競合しにくい配置にしています */}
          <Timeline />
          {/* Awards */}
          <AwardsCard />
          {/* Share */}
          <ShareCard />
          {/* CTF Challenge Section (Flag Input) */}
          <div className="md:col-span-3 lg:col-span-4 animate-fade-in-up" style={{ animationDelay: '900ms' }}>
             <FlagForm />
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-20 text-center border-t border-slate-200/50 pt-10">
           <p className="font-mono text-sm text-slate-400">&copy; {new Date().getFullYear()} {PROFILE.nickname}. All rights reserved.</p>
           <p className="text-xs mt-2 text-slate-300">
             System Version 1.0.5 <span className="mx-2">•</span> 
             Designed with React & Tailwind
           </p>
        </footer>

      </main>
    </div>
  )};
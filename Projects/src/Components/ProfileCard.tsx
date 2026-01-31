import { School, MapPin } from "lucide-react";
import { PROFILE } from "../data/profile";
import { GALLERY_IMAGES } from "../data/gallery_images";
import { BentoCard } from "./BentoCard";
import { TypingConsole } from "./TypingConsole";

{/* Profile Card (Large) */}
export default function ProfileCard() {
  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1" delay={100}>
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
          {/* <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100">
            <span className="text-xl">💻</span>
          </div> */}
        </div>

        {/* Text Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mb-2">
            {PROFILE.nickname}
          </h1>
          <p className="text-sm font-mono text-blue-600 mb-4 bg-blue-50 inline-block px-2 py-1 rounded-md border border-blue-100">
            {PROFILE.role} / {PROFILE.name}
          </p>

          {/* Typing Console をここに挿入 */}
          <TypingConsole text={`> Initializing User: ${PROFILE.nickname}...\n> Status: ${PROFILE.role}\n> Target: World Class\n> Ready...`} />
          
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
  );
};
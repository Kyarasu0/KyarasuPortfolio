import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { PROJECTS } from "../data/projects";
import { GALLERY_IMAGES } from "../data/gallery_images";

{/* Projects Card */}
export default function ProjectsCard() {
  const [activeTab, setActiveTab] = useState('projects'); 
  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-3" noPadding delay={500}>
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
  );
};
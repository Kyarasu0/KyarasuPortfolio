import { BentoCard } from "./BentoCard";
import { HISTORY } from "../data/history";

{/* Timeline - Right Side / Vertical Layout */}
{/* このカードは内容が増えても縦に伸びるだけで、グリッドのrow-spanにより他の要素と競合しにくい配置にしています */}
export default function Timeline() {
  return (
    <BentoCard className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1" title="History" delay={600}>
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
  );
};
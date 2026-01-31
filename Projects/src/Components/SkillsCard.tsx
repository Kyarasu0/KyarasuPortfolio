import { BentoCard } from "./BentoCard";
import { SKILLS } from "../data/skills";

{/* Skills Cards - 縦に並ぶ問題を解消するため独立行。内容が増えてもスクロール対応 */}
export default function SkillsCards() {
  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[220px]" title="Tech Stack & Proficiency" delay={400}>
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
  );
};
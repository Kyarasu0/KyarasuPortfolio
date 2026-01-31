import { AFFILIATIONS } from "../data/affiliations";
import { BentoCard } from "./BentoCard";

{/* Affiliations (Separated from Tech Stack) */}
export default function Affiliations() {
    return (
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2 h-full" title="Affiliations" delay={300}>
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
    );
};
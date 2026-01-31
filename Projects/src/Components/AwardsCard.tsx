import { Award } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { AWARDS } from "../data/awards";

{/* Awards Card (Large) */}
export default function AwardsCard() {
  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2" title="Awards" delay={700}>
      <div className="flex flex-wrap gap-2">
        {AWARDS.map((award, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-yellow-50/50 border border-yellow-100 px-3 py-2 rounded-xl hover:bg-yellow-100/50 transition-colors cursor-default">
            <Award size={14} className="text-yellow-500 shrink-0" />
            {award}
          </div>
        ))}
      </div>
    </BentoCard>
  );
};
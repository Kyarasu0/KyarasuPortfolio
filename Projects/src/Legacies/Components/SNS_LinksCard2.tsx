import { SNS_LINKS } from "../../data/sns_links";
import { BentoCard } from "../../Components/BentoCard";
import { ExternalLink } from "lucide-react";

{/* SNS Links Card */}
export default function SNS_LinksCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-1 lg:col-span-1 h-full" title="Connect" delay={200}>
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
    );
};
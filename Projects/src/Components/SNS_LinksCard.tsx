import { SNS_LINKS } from "../data/sns_links";
import { BentoCard } from "./BentoCard";
import { ExternalLink } from "lucide-react";
import { Twitter, Github, Instagram } from "lucide-react";

{/* SNS Links Card */}
export default function SNS_LinksCard() {
    return (
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
    );
};
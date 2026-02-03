import { Share2, Twitter } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { PROFILE } from "../data/profile";

{/* ShareCard */}
export default function ShareCard() {

    const handleShare = () => {
        const text = `#${PROFILE.nickname}\nみんなも ${PROFILE.nickname} のポートフォリオを見てみよう！\nFLAG: Kyarasu{Thanks_f0r_sharing!!}`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none" delay={800}>
            <div className="flex flex-row items-center justify-between h-full gap-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                    Share Portfolio <Share2 size={16} />
                    </h3>
                    <p className="text-xs text-slate-400">Let the world know about Kyarasu.</p>
                </div>
                <button 
                    onClick={handleShare}
                    className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors active:scale-95 flex items-center gap-2 text-sm shadow-lg whitespace-nowrap"
                >
                    <Twitter size={16} /> Post
                </button>
            </div>
        </BentoCard>
    );
};
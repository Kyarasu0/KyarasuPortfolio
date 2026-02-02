import { useState, FormEvent } from "react";
import { Flag, CheckCircle, AlertCircle } from "lucide-react";
import Confetti from "react-confetti";
import { VALID_FLAGS } from "../data/valid_flags";

// 5. Flag Submission Form
export const FlagForm = () => {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (VALID_FLAGS.includes(input.trim())) {
            setStatus("success");
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000); // 8秒間祝う
        } else {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 2000);
        }
    };

    return (
        <>
            {showConfetti && <Confetti />}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700 text-slate-200">
                <h3 className="flex items-center gap-2 font-mono text-lg font-bold mb-4 text-green-400">
                    <Flag size={20} /> CTF Challenge
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    Find the hidden flag in this portfolio and submit it here.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Kyarasu{...}"
                        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors font-mono"
                    />
                    <button 
                        type="submit"
                        className={`
                            px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2
                            ${status === 'success' ? 'bg-green-500 text-white' : 
                              status === 'error' ? 'bg-red-500 text-white' : 
                              'bg-blue-600 text-white hover:bg-blue-500'}
                        `}
                    >
                        {status === 'success' ? <CheckCircle size={16} /> : 
                         status === 'error' ? <AlertCircle size={16} /> : 
                         'Submit'}
                    </button>
                </form>
                {status === 'success' && (
                    <p className="mt-3 text-green-400 font-mono text-sm animate-pulse">
                        &gt; Correct! Access Granted. You are a true hacker!
                    </p>
                )}
                {status === 'error' && (
                    <p className="mt-3 text-red-400 font-mono text-sm">
                        &gt; Incorrect flag. Access Denied.
                    </p>
                )}
            </div>
        </>
    );
};
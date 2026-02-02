import { useState, useEffect, FormEvent } from "react";
import { Flag, CheckCircle, AlertCircle, Trophy } from "lucide-react";
import Confetti from "react-confetti";
import { VALID_FLAGS } from "../data/valid_flags";

const SCORE_KEY = "ctf_score";
const SOLVED_KEY = "ctf_solved_flags";
const SCORE_PER_FLAG = 100;

type Status = "idle" | "success" | "error" | "duplicate";

export const FlagForm = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [solvedFlags, setSolvedFlags] = useState<string[]>([]);

  // 初期ロード：localStorage → state
  useEffect(() => {
    setScore(Number(localStorage.getItem(SCORE_KEY)) || 0);
    setSolvedFlags(JSON.parse(localStorage.getItem(SOLVED_KEY) || "[]"));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = input.trim();

    // ===== clear コマンド =====
    if (value.toLowerCase() === "clear") {
      localStorage.removeItem(SCORE_KEY);
      localStorage.removeItem(SOLVED_KEY);
      setScore(0);
      setSolvedFlags([]);
      setStatus("idle");
      setInput("");
      return;
    }

    // ===== 正解チェック =====
    if (!VALID_FLAGS.includes(value)) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    // ===== 重複チェック =====
    if (solvedFlags.includes(value)) {
      setStatus("duplicate");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    // ===== 新規正解 =====
    const newScore = score + SCORE_PER_FLAG;
    const newSolved = [...solvedFlags, value];

    setScore(newScore);
    setSolvedFlags(newSolved);
    localStorage.setItem(SCORE_KEY, String(newScore));
    localStorage.setItem(SOLVED_KEY, JSON.stringify(newSolved));

    setStatus("success");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
    setInput("");
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div
        className="
            group
            p-6
            bg-slate-900 text-slate-200
            rounded-2xl
            border border-slate-700
            shadow-[0_4px_12px_rgba(0,0,0,0.15)]

            transition-all duration-500 ease-out
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            hover:-translate-y-1
        "
       >


        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 font-mono text-lg font-bold text-green-400">
            <Flag size={20} /> CTF Challenge
          </h3>

          <div className="flex items-center gap-1 text-yellow-400 font-mono text-sm">
            <Trophy size={16} />
            {score} pts
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          Find the hidden flag in this portfolio and submit it here.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Kyarasu{...} / clear"
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors font-mono"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg font-bold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-all"
          >
            Submit
          </button>
        </form>

        {/* Messages */}
        {status === "success" && (
          <p className="mt-3 text-green-400 font-mono text-sm animate-pulse">
            &gt; Correct! +{SCORE_PER_FLAG} pts.
          </p>
        )}

        {status === "duplicate" && (
          <p className="mt-3 text-yellow-400 font-mono text-sm">
            &gt; Duplicate flag. Already submitted. No points awarded.
          </p>
        )}

        {status === "error" && (
          <p className="mt-3 text-red-400 font-mono text-sm">
            &gt; Incorrect flag. Access Denied.
          </p>
        )}
      </div>
    </>
  );
};

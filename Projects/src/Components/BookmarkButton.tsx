import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

interface SavedPage {
  url: string;
  title: string;
}

export default function BookmarkButton({ title }: { title: string }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const savedPages: SavedPage[] = JSON.parse(localStorage.getItem("myPages") || "[]");
    const exists = savedPages.some(p => p.url === window.location.href);
    setBookmarked(exists);
  }, []);

  const toggle = () => {
    const savedPages: SavedPage[] = JSON.parse(localStorage.getItem("myPages") || "[]");
    if (bookmarked) {
      // 解除
      const filtered = savedPages.filter(p => p.url !== window.location.href);
      localStorage.setItem("myPages", JSON.stringify(filtered));
      setBookmarked(false);
    } else {
      // 保存
      savedPages.push({ url: window.location.href, title });
      localStorage.setItem("myPages", JSON.stringify(savedPages));
      setBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-full 
        transition-all duration-300 border border-white/60 backdrop-blur-md
        ${bookmarked ? 'bg-blue-500 text-white shadow-lg scale-105' : 'bg-white/50 text-slate-600 hover:bg-white hover:shadow-md'}
      `}
    >
      <Bookmark size={18} className={bookmarked ? "fill-current" : ""} />
      <span className="text-xs font-bold tracking-wide">{bookmarked ? "SAVED" : "BOOKMARK"}</span>
    </button>
  );
}

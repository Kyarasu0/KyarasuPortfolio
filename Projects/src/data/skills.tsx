import { Shield, Code, Terminal, Cpu } from "lucide-react";

export const SKILLS = [
  { name: "React / Next.js", level: 50, icon: <Code size={16} /> },
  { name: "TypeScript", level: 30, icon: <Code size={16} /> },
  { name: "Python", level: 60, icon: <Terminal size={16} /> },
  { name: "Network Security", level: 60, icon: <Shield size={16} /> },
  { name: "FlipperZero Dev", level: 60, icon: <Cpu size={16} /> },
  { name: "Cyber Security", level: 65, icon: <Shield size={16} /> }, // 追加例：項目が増えてもスクロールで対応
];
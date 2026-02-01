import { Shield, Code, Terminal, Cpu, Activity, Palette, Wind } from "lucide-react";

export const SKILLS = [
  { name: "KyarasuProfile (React)", level: 50, icon: <Code size={16} /> },
  { name: "OS Development", level: 5, icon: <Cpu size={16} /> },
  { name: "CryptoHack (Python)", level: Math.floor(25 / 308 * 100), icon: <Terminal size={16} /> },
  { name: "PortSwigger (Web Security)", level: 0, icon: <Shield size={16} /> },
  { name: "Cognitive Bias", level: 50, icon: <Activity size={16} /> },
  { name: "Color Certification", level: 50, icon: <Palette size={16} /> },
  { name: "OpenFOAM", level: 5, icon: <Wind size={16} /> }
];
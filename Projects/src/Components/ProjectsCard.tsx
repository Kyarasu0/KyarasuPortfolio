// import { useState } from "react";
import { BentoCard } from "./BentoCard";
import { PROJECTS } from "../data/projects";
// import { GALLERY_IMAGES } from "../data/gallery_images";

export default function ProjectsCard() {
  // const [activeTab, setActiveTab] = useState<"projects" | "gallery">("projects");

  return (
    <BentoCard
      className="col-span-1 md:col-span-2 lg:col-span-3"
      noPadding
      delay={500}
    >
      {/* Header */}
      <div className="p-6 pb-0 flex justify-between items-center border-b border-slate-100/50">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          My Projects
        </h3>

        {/* Tab Switcher
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "projects"
                ? "bg-white shadow-sm text-slate-800"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Dev
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "gallery"
                ? "bg-white shadow-sm text-slate-800"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Gallery
          </button>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="
                  relative overflow-hidden
                  bg-white p-4 rounded-2xl
                  border border-slate-100
                  hover:border-slate-300
                  hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]
                  transition-all
                  hover:-translate-y-0.5
                  group/project
                  flex flex-col
                "
              >
                {/* Left color bar */}
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${project.color}`}
                />

                {/* Title Row */}
                <div className="flex items-center gap-4 mb-3 pl-2">
                  {/* BIG ICON */}
                  <div
                    className="
                      w-16 h-16 rounded-2xl
                      bg-slate-100
                      flex items-center justify-center
                      overflow-hidden shrink-0
                      transition-all
                      group-hover/project:bg-white
                      group-hover/project:scale-[1.03]
                    "
                  >
                    <img
                      src={project.icon}
                      alt={`${project.name} icon`}
                      className="
                        w-16 h-16
                        object-contain
                        opacity-90
                        transition-all
                        group-hover/project:opacity-100
                        group-hover/project:scale-105
                      "
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/64x64/e2e8f0/94a3b8?text=APP";
                      }}
                    />

                  </div>

                  {/* Name + Date */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-slate-800 leading-tight">
                        {project.name}
                      </h4>
                      <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono shrink-0">
                        {project.startDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-500 mb-4 pl-2 line-clamp-2 flex-1">
                  {project.summary}
                </p>

                {/* Footer */}
                <div className="pl-2 mt-auto flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {project.memberCount} member
                    {project.memberCount > 1 ? "s" : ""}
                  </span>

                  <span className="inline-block px-2 py-1 bg-slate-50 rounded border border-slate-100 text-[10px] text-slate-500 font-medium">
                    Role: {project.role}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </BentoCard>
  );
}

// /* Gallery */
// <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//   {GALLERY_IMAGES.map((src, i) => (
//     <div
//       key={i}
//       className="
//         aspect-square
//         rounded-xl
//         bg-slate-200
//         overflow-hidden
//         relative
//         group/img
//       "
//     >
//       <img
//         src={src}
//         alt="Gallery"
//         className="
//           w-full h-full object-cover
//           transition-transform duration-500
//           group-hover/img:scale-[1.03]
//         "
//         onError={(e) => {
//           (e.target as HTMLImageElement).src =
//             `https://placehold.co/400x400/e2e8f0/94a3b8?text=Image+${i + 1}`;
//         }}
//       />

//       {/* subtle overlay (no link feeling)
//       <div
//         className="
//           absolute inset-0
//           bg-black/0
//           group-hover/img:bg-black/5
//           transition-colors
//         "
//       /> */}
//     </div>
//   ))}
// </div>
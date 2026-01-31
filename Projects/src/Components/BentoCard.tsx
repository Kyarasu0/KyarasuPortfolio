export const BentoCard = ({ 
  children, 
  className = "", 
  title, 
  delay = 0,
  noPadding = false,
  glass = true
}: { 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  delay?: number;
  noPadding?: boolean;
  glass?: boolean;
}) => {
  return (
    <div 
      className={`
        group relative overflow-hidden flex flex-col
        ${glass ? 'bg-white/40 backdrop-blur-xl border border-white/60' : 'bg-white border border-slate-100'}
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        rounded-[32px] 
        transition-all duration-500 ease-out
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:-translate-y-1
        animate-fade-in-up
        ${className}
      `}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* Glossy Reflection Effect */}
      {glass && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/40 via-transparent to-transparent z-10" />
      )}
      
      {/* Content */}
      <div className={`relative z-20 h-full flex flex-col ${noPadding ? '' : 'p-6'}`}>
        {title && (
          <h3 className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2 shrink-0">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};
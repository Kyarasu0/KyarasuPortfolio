// 4. Confetti Effect Component (Simple DOM Implementation)
export const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
           key={i}
           className="absolute animate-confetti"
           style={{
             left: `${Math.random() * 100}%`,
             top: `-5%`,
             backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)],
             width: `${Math.random() * 10 + 5}px`,
             height: `${Math.random() * 10 + 5}px`,
             animationDelay: `${Math.random() * 2}s`,
             animationDuration: `${Math.random() * 3 + 2}s`
           }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
         <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-bounce drop-shadow-lg">
           CONGRATULATIONS!
         </h1>
      </div>
    </div>
  );
};
import { GALLERY_IMAGES } from "../data/gallery_images";

export const PhotoFrame = ({ imageIndex, className = "" }: { imageIndex: number, className?: string }) => {
  return (
    <div className={`relative group overflow-hidden rounded-[24px] shadow-sm border border-white/50 bg-white ${className}`}>
      <img 
        src={GALLERY_IMAGES[imageIndex % GALLERY_IMAGES.length]} 
        alt="Gallery"
        className="
          w-full h-full
          object-contain
          scale-90
          transition-transform duration-700
          group-hover:scale-100
        "
      />
      {/* Tape Effect */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/30 backdrop-blur-sm border border-white/40 rotate-1 shadow-sm opacity-80" />
    </div>
  );
};
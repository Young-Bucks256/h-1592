
import { useRef } from "react";

const locations = [
  {
    title: "Paris, France",
    description: "The City of Light beckons with its iconic architecture and timeless romance.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
  },
  {
    title: "Santorini, Greece",
    description: "White-washed buildings cascade down volcanic cliffs into the crystal-clear Aegean Sea.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2073&auto=format&fit=crop",
  },
  {
    title: "Kyoto, Japan",
    description: "Ancient temples and traditional gardens preserve Japan's cultural heart.",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=2073&auto=format&fit=crop",
  },
  {
    title: "Machu Picchu, Peru",
    description: "This ancient Incan citadel sits among the clouds in the Andes Mountains.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2073&auto=format&fit=crop",
  }
];

const LocationScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen bg-black" ref={containerRef}>
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20">
        <div className="sticky top-1/2 w-4 h-4 -ml-2 rounded-full bg-rose-600" />
      </div>

      {/* Location Panels */}
      <div className="relative max-w-7xl mx-auto">
        {locations.map((location, index) => (
          <div
            key={location.title}
            className={`flex items-center min-h-screen ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="w-full max-w-xl p-8">
              <div className="group relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/40" />
                <img
                  src={location.image}
                  alt={location.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {location.title}
                  </h3>
                  <p className="text-white/90">
                    {location.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationScroll;

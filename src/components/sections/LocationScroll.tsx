
import { useRef, useEffect, useState } from "react";

const locations = [
  {
    title: "Paris, France",
    description: "The City of Light beckons with its iconic architecture and timeless romance.",
    image: "/lovable-uploads/e6764045-1a5d-4f3d-80b8-d6ba711e528d.png",
    flag: "🇫🇷"
  },
  {
    title: "Santorini, Greece",
    description: "White-washed buildings cascade down volcanic cliffs into the crystal-clear Aegean Sea.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2073&auto=format&fit=crop",
    flag: "🇬🇷"
  },
  {
    title: "Kyoto, Japan",
    description: "Ancient temples and traditional gardens preserve Japan's cultural heart.",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=2073&auto=format&fit=crop",
    flag: "🇯🇵"
  },
  {
    title: "Machu Picchu, Peru",
    description: "This ancient Incan citadel sits among the clouds in the Andes Mountains.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2073&auto=format&fit=crop",
    flag: "🇵🇪"
  }
];

const LocationScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.children[1].children;
      const scrollPosition = window.scrollY - containerRef.current.offsetTop;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop - sectionHeight / 2 &&
          scrollPosition < sectionTop + sectionHeight / 2
        ) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black" ref={containerRef}>
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20">
        <div className="sticky top-1/2 -translate-y-1/2">
          <div className="w-8 h-8 -ml-4 flex items-center justify-center text-2xl transition-all duration-300 transform">
            {locations[activeIndex].flag}
          </div>
        </div>
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

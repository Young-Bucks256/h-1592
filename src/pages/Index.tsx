
import { useEffect, useState } from "react";
import DestinationSearch from "@/components/search/DestinationSearch";
import TrustBadges from "@/components/hero/TrustBadges";
import ChromaticSmoke from "@/components/hero/ChromaticSmoke";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="min-h-screen relative bg-black">
      {/* Smoke Background */}
      <ChromaticSmoke />

      {/* Hero Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <span className={`inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-6 transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Over 1000+ Destinations Available
          </span>
          
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            Discover Your Perfect Getaway
          </h1>
          
          <p className={`text-lg sm:text-xl text-white/90 mb-8 transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            Find and book your dream destination with exclusive deals and personalized recommendations
          </p>

          <DestinationSearch />
          <TrustBadges />
        </div>
      </div>
    </main>
  );
};

export default Index;

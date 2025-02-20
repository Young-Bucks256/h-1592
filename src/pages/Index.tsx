
import { useEffect, useState } from "react";
import DestinationSearch from "@/components/search/DestinationSearch";
import TrustBadges from "@/components/hero/TrustBadges";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
          alt="Stunning mountain landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

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

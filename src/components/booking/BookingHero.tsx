
import { Sparkles, Clock, Shield } from "lucide-react";

const BookingHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="w-12 h-12 text-yellow-300" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Book Your Dream Getaway
        </h1>
        <p className="text-xl mb-8 text-white/90">
          Exclusive deals • Instant confirmation • 24/7 support
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>100% Secure Booking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHero;

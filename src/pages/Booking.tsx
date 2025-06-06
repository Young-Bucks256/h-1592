
import { useState } from "react";
import BookingHero from "@/components/booking/BookingHero";
import BookingForm from "@/components/booking/BookingForm";
import PackageOptions from "@/components/booking/PackageOptions";
import TrustIndicators from "@/components/booking/TrustIndicators";
import BookingSummary from "@/components/booking/BookingSummary";

const Booking = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    packageType: "",
    totalPrice: 0
  });

  return (
    <div className="min-h-screen bg-background">
      <BookingHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BookingForm 
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
            <PackageOptions 
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
              onPackageSelect={(pkg, price) => {
                setSelectedPackage(pkg);
                setBookingData(prev => ({ ...prev, packageType: pkg, totalPrice: price }));
              }}
            />
            <TrustIndicators />
          </div>
          <div className="lg:col-span-1">
            <BookingSummary 
              bookingData={bookingData}
              selectedPackage={selectedPackage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

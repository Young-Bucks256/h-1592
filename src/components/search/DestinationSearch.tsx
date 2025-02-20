
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const DestinationSearch = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg w-full max-w-3xl mx-auto animate-fade-up [animation-delay:400ms]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ocean" size={20} />
            <input
              type="text"
              placeholder="Where to?"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-ocean focus:ring-1 focus:ring-ocean outline-none transition-all"
            />
          </div>
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ocean" size={20} />
          <input
            type="text"
            placeholder="When?"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-ocean focus:ring-1 focus:ring-ocean outline-none transition-all"
          />
        </div>
        <div>
          <Button className="w-full bg-ocean hover:bg-ocean/90 text-white py-3 h-[46px]">
            <Search className="mr-2" size={20} />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationSearch;

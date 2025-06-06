
import { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingFormProps {
  bookingData: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  setBookingData: (data: any) => void;
}

const BookingForm = ({ bookingData, setBookingData }: BookingFormProps) => {
  const destinations = [
    "Paris, France",
    "Santorini, Greece", 
    "Kyoto, Japan",
    "Machu Picchu, Peru",
    "Bali, Indonesia",
    "Swiss Alps, Switzerland"
  ];

  return (
    <Card className="border-2 border-rose-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="w-6 h-6 text-rose-600" />
          Trip Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Select 
              value={bookingData.destination}
              onValueChange={(value) => setBookingData(prev => ({ ...prev, destination: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose your destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Select 
              value={bookingData.guests.toString()}
              onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="checkin">Check-in Date</Label>
            <Input 
              type="date" 
              id="checkin"
              value={bookingData.checkIn}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="checkout">Check-out Date</Label>
            <Input 
              type="date" 
              id="checkout"
              value={bookingData.checkOut}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
              min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;

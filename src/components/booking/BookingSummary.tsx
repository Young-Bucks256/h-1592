
import { useState } from "react";
import { CreditCard, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface BookingSummaryProps {
  bookingData: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    packageType: string;
    totalPrice: number;
  };
  selectedPackage: string | null;
}

const BookingSummary = ({ bookingData, selectedPackage }: BookingSummaryProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const tax = bookingData.totalPrice * 0.12;
  const discount = bookingData.totalPrice * 0.15; // 15% early bird discount
  const finalTotal = bookingData.totalPrice + tax - discount;

  const handleBooking = () => {
    console.log("Processing booking...", { bookingData, email, phone });
    // Here you would integrate with your payment processor
  };

  return (
    <div className="space-y-6">
      {/* Urgency Banner */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4 text-center">
          <Badge variant="destructive" className="mb-2">
            Limited Time
          </Badge>
          <p className="text-sm font-medium">
            🔥 Only 3 spots left at this price!
          </p>
          <p className="text-xs text-muted-foreground">
            Price increases in 2 hours
          </p>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {bookingData.destination && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Destination</span>
                <span className="text-sm font-medium">{bookingData.destination}</span>
              </div>
              
              {bookingData.checkIn && bookingData.checkOut && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Dates</span>
                  <span className="text-sm font-medium">
                    {new Date(bookingData.checkIn).toLocaleDateString()} - {new Date(bookingData.checkOut).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Guests</span>
                <span className="text-sm font-medium">{bookingData.guests}</span>
              </div>
              
              {selectedPackage && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Package</span>
                  <span className="text-sm font-medium capitalize">{selectedPackage}</span>
                </div>
              )}
            </div>
          )}

          {bookingData.totalPrice > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Package Price</span>
                  <span>${bookingData.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Early Bird Discount (15%)</span>
                  <span>-${discount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes & Fees</span>
                  <span>${tax.toFixed(0)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-rose-600">${finalTotal.toFixed(0)}</span>
                </div>
              </div>
            </>
          )}

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone"
                type="tel" 
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <Button 
            className="w-full h-12 text-lg bg-rose-600 hover:bg-rose-700"
            onClick={handleBooking}
            disabled={!email || !phone || !selectedPackage}
          >
            <Lock className="w-4 h-4 mr-2" />
            Secure Booking
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            <Lock className="w-3 h-3 inline mr-1" />
            Secured by 256-bit SSL encryption
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSummary;

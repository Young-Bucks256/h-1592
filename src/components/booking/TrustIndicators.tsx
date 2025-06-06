
import { Shield, Award, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: "Secure Booking",
      description: "256-bit SSL encryption"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Top travel company 2024"
    },
    {
      icon: Users,
      title: "500K+ Happy Travelers",
      description: "Join our community"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "We're here when you need us"
    }
  ];

  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-center mb-6">Why Book With Us?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {indicators.map((item, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="flex justify-center">
                <item.icon className="w-8 h-8 text-rose-600" />
              </div>
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustIndicators;

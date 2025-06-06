
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PackageOptionsProps {
  selectedPackage: string | null;
  setSelectedPackage: (pkg: string) => void;
  onPackageSelect: (pkg: string, price: number) => void;
}

const PackageOptions = ({ selectedPackage, setSelectedPackage, onPackageSelect }: PackageOptionsProps) => {
  const packages = [
    {
      id: "essential",
      name: "Essential",
      price: 1299,
      originalPrice: 1599,
      savings: 300,
      popular: false,
      features: [
        "Standard accommodation",
        "Daily breakfast",
        "Airport transfers",
        "24/7 support",
        "Travel insurance"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 1899,
      originalPrice: 2399,
      savings: 500,
      popular: true,
      features: [
        "Luxury accommodation",
        "All meals included",
        "Private transfers",
        "Guided tours",
        "Premium travel insurance",
        "Spa credits",
        "Concierge service"
      ]
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: 2699,
      originalPrice: 3299,
      savings: 600,
      popular: false,
      features: [
        "Ultra-luxury accommodation",
        "All-inclusive dining",
        "Private jet transfers",
        "Personal guide",
        "Comprehensive insurance",
        "Unlimited spa access",
        "VIP experiences",
        "Photography service"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Experience</h2>
        <p className="text-muted-foreground">Limited time pricing - Save up to $600!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative transition-all duration-300 hover:shadow-lg cursor-pointer ${
              selectedPackage === pkg.id 
                ? 'ring-2 ring-rose-600 shadow-lg transform scale-105' 
                : 'hover:scale-102'
            } ${pkg.popular ? 'border-rose-600 border-2' : ''}`}
            onClick={() => onPackageSelect(pkg.id, pkg.price)}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-rose-600 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-rose-600">
                  ${pkg.price.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground line-through">
                  ${pkg.originalPrice.toLocaleString()}
                </div>
                <div className="text-sm font-semibold text-green-600">
                  Save ${pkg.savings}!
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  selectedPackage === pkg.id 
                    ? 'bg-rose-600 hover:bg-rose-700' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onPackageSelect(pkg.id, pkg.price);
                }}
              >
                {selectedPackage === pkg.id ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Selected
                  </>
                ) : (
                  'Select Package'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageOptions;

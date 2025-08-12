import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";

export const LiveIndicator = () => {
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [isFlying, setIsFlying] = useState(true);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFlying) {
        setCurrentMultiplier(prev => {
          const newValue = prev + (Math.random() * 0.1);
          // Random crash between 1.2x and 10x
          if (newValue > (1.2 + Math.random() * 8.8)) {
            setIsFlying(false);
            setTimeout(() => {
              setCurrentMultiplier(1.0);
              setIsFlying(true);
              setRounds(prev => prev + 1);
            }, 2000);
            return newValue;
          }
          return newValue;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isFlying]);

  return (
    <Card className="bg-gradient-card border-border/50 shadow-glow animate-pulse-glow">
      <CardContent className="p-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <Plane 
              className={`h-12 w-12 text-primary transition-all duration-300 ${
                isFlying ? 'animate-float' : 'text-destructive'
              }`} 
            />
            {isFlying && (
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
            )}
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">
              {currentMultiplier.toFixed(2)}x
            </div>
            <Badge variant={isFlying ? "default" : "destructive"}>
              {isFlying ? "EN VOL" : "CRASH"}
            </Badge>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <div>Round #{rounds}</div>
            <div className="mt-1">
              <span className="inline-block w-2 h-2 bg-success rounded-full animate-pulse mr-1"></span>
              Live
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
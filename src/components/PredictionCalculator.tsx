import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Target, Zap, TrendingUp, AlertCircle } from "lucide-react";

export const PredictionCalculator = () => {
  const [roundNumber, setRoundNumber] = useState<string>("");
  const [prediction, setPrediction] = useState<any>(null);

  const generatePrediction = (round: number) => {
    // Algorithme de prédiction basé sur le numéro du tour
    const seed = round * 137; // Utilise le numéro comme seed
    
    // Simulation d'analyse de patterns
    const patterns = [
      { round: round % 7, multiplier: 1.2 + (round % 3) },
      { round: round % 11, multiplier: 2.1 + (round % 4) * 0.3 },
      { round: round % 13, multiplier: 3.2 + (round % 5) * 0.2 }
    ];
    
    // Calcul de la prédiction basée sur des "patterns"
    const baseMultiplier = 1.5 + (Math.sin(seed / 100) + 1) * 1.5;
    const confidence = 65 + (round % 30);
    
    // Prédiction pour 3x+
    const chance3x = Math.max(15, Math.min(85, 30 + Math.cos(seed / 50) * 25));
    
    // Recommandation
    let recommendation = "ATTENDRE";
    let recommendationColor = "warning";
    
    if (chance3x > 70) {
      recommendation = "JOUER";
      recommendationColor = "success";
    } else if (chance3x < 30) {
      recommendation = "ÉVITER";
      recommendationColor = "destructive";
    }
    
    // Signal strength
    const signalStrength = Math.floor(chance3x / 20) + 1;
    
    return {
      roundNumber: round,
      predictedMultiplier: baseMultiplier.toFixed(2),
      chance3x: chance3x.toFixed(1),
      confidence: confidence.toFixed(1),
      recommendation,
      recommendationColor,
      signalStrength,
      nextRounds: [
        { round: round + 1, chance: (chance3x * 0.8).toFixed(1) },
        { round: round + 2, chance: (chance3x * 1.2).toFixed(1) },
        { round: round + 3, chance: (chance3x * 0.9).toFixed(1) }
      ]
    };
  };

  const handlePredict = () => {
    const round = parseInt(roundNumber);
    if (round > 0) {
      const result = generatePrediction(round);
      setPrediction(result);
    }
  };

  const getSignalBars = (strength: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-6 rounded-sm ${
          i < strength ? 'bg-primary' : 'bg-muted'
        }`}
      />
    ));
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Prédiction par Tour
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Numéro du tour (ex: 25)"
            value={roundNumber}
            onChange={(e) => setRoundNumber(e.target.value)}
            min="1"
            className="flex-1"
          />
          <Button 
            onClick={handlePredict}
            disabled={!roundNumber || parseInt(roundNumber) <= 0}
            className="bg-gradient-aviator hover:opacity-90"
          >
            Prédire
          </Button>
        </div>

        {/* Prediction Results */}
        {prediction && (
          <div className="space-y-4">
            {/* Main Prediction */}
            <div className="text-center p-6 bg-gradient-accent rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-2">
                Tour #{prediction.roundNumber}
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {prediction.predictedMultiplier}x
              </div>
              <Badge 
                variant={
                  prediction.recommendationColor === "success" ? "default" :
                  prediction.recommendationColor === "destructive" ? "destructive" : "secondary"
                }
                className="text-lg px-4 py-1"
              >
                {prediction.recommendation}
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">
                  {prediction.chance3x}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Chance 3x+
                </div>
              </div>
              
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary">
                  {prediction.confidence}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Confiance
                </div>
              </div>
              
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Zap className="h-6 w-6 text-warning mx-auto mb-2" />
                <div className="flex justify-center gap-1 mb-1">
                  {getSignalBars(prediction.signalStrength)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Signal
                </div>
              </div>
            </div>

            {/* Next Rounds Preview */}
            <div className="p-4 bg-muted/10 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-info" />
                <span className="font-medium text-sm">Prochains Tours</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {prediction.nextRounds.map((round: any, index: number) => (
                  <div key={index} className="text-center p-2 bg-background/50 rounded">
                    <div className="text-sm font-medium">#{round.round}</div>
                    <div className="text-lg font-bold text-primary">{round.chance}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="text-xs text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
              ⚠️ Prédiction basée sur l'analyse algorithmique. 
              Aucune garantie - Jeu responsable uniquement !
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
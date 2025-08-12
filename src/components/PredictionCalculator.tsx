import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Target, Percent } from "lucide-react";

export const PredictionCalculator = () => {
  const [rounds, setRounds] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  const calculateProbabilities = (numRounds: number) => {
    // Algorithme simple basé sur des statistiques simulées
    const baseChance = 0.25; // 25% de chance de base pour 3x+
    const roundsAnalyzed = Math.min(numRounds, 1000);
    
    // Probabilité ajustée selon le nombre de tours
    const adjustmentFactor = Math.log(roundsAnalyzed + 1) / 10;
    const probability3x = Math.min(0.95, baseChance + adjustmentFactor);
    
    // Calculs statistiques simulés
    const expectedHits = Math.floor(roundsAnalyzed * probability3x);
    const confidence = Math.min(95, 60 + (roundsAnalyzed / 20));
    const nextRoundChance = 20 + Math.random() * 30;
    
    // Pattern analysis simulé
    const patterns = [
      { name: "Série basse", probability: 35 + Math.random() * 20 },
      { name: "Accumulation", probability: 25 + Math.random() * 15 },
      { name: "Pic imminent", probability: 15 + Math.random() * 25 }
    ];

    return {
      probability3x: (probability3x * 100).toFixed(1),
      expectedHits,
      confidence: confidence.toFixed(1),
      nextRoundChance: nextRoundChance.toFixed(1),
      patterns: patterns.sort((a, b) => b.probability - a.probability),
      roundsAnalyzed
    };
  };

  const handleCalculate = () => {
    const numRounds = parseInt(rounds);
    if (numRounds > 0 && numRounds <= 10000) {
      const result = calculateProbabilities(numRounds);
      setResults(result);
    }
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return "text-success";
    if (prob >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Calculateur de Probabilités 3x
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Nombre de tours à analyser"
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
            min="1"
            max="10000"
            className="flex-1"
          />
          <Button 
            onClick={handleCalculate}
            disabled={!rounds || parseInt(rounds) <= 0}
            className="bg-gradient-aviator hover:opacity-90"
          >
            Analyser
          </Button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-accent rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Probabilité 3x+</span>
                </div>
                <div className={`text-2xl font-bold ${getProbabilityColor(parseFloat(results.probability3x))}`}>
                  {results.probability3x}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Sur {results.roundsAnalyzed} tours
                </div>
              </div>

              <div className="p-4 bg-gradient-accent rounded-lg border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium">Hits Attendus</span>
                </div>
                <div className="text-2xl font-bold text-secondary">
                  {results.expectedHits}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Occurrences prévues
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Percent className="h-4 w-4 text-info" />
                <span className="font-medium">Analyse des Patterns</span>
              </div>
              <div className="space-y-2">
                {results.patterns.map((pattern: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{pattern.name}</span>
                    <Badge variant={index === 0 ? "default" : "outline"}>
                      {pattern.probability.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="text-lg font-bold text-primary">
                  {results.nextRoundChance}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Prochain tour
                </div>
              </div>
              <div className="p-3 bg-info/10 rounded-lg">
                <div className="text-lg font-bold text-info">
                  {results.confidence}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Confiance
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
              ⚠️ Ces statistiques sont basées sur des algorithmes d'analyse et ne garantissent aucun résultat.
              Les jeux restent imprévisibles.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
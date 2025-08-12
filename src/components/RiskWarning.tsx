import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const RiskWarning = () => {
  return (
    <Alert className="max-w-4xl mx-auto bg-destructive/10 border-destructive/20">
      <AlertTriangle className="h-4 w-4 text-destructive" />
      <AlertDescription className="text-destructive font-medium">
        <strong>Avertissement :</strong> Ceci est un outil d'analyse statistique. 
        Les jeux de hasard sont imprévisibles et basés sur des algorithmes aléatoires. 
        Aucune prédiction n'est garantie. Jouez de manière responsable.
      </AlertDescription>
    </Alert>
  );
};
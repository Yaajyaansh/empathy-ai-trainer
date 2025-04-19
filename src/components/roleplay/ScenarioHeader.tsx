
import { TrainingScenario, ScenarioStep } from "@/types";
import { ChevronLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ScenarioHeaderProps {
  scenario: TrainingScenario;
  currentStep: ScenarioStep;
  totalSteps: number;
  onExit: () => void;
}

export function ScenarioHeader({ 
  scenario, 
  currentStep, 
  totalSteps,
  onExit 
}: ScenarioHeaderProps) {
  const currentStepNumber = currentStep.order;
  const progressPercentage = (currentStepNumber / totalSteps) * 100;
  
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground"
            onClick={onExit}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Help
          </Button>
        </div>
        
        <h2 className="text-xl font-bold">{scenario.title}</h2>
        <p className="text-muted-foreground text-sm">{scenario.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Step {currentStepNumber} of {totalSteps}</span>
          </div>
          
          <div className="w-1/2">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

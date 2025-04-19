
import { TrainingScenario } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Clock, Award, ChevronRight } from "lucide-react";
import { useTraining } from "@/contexts/TrainingContext";

interface ScenarioCardProps {
  scenario: TrainingScenario;
  progress?: number;
}

export function ScenarioCard({ scenario, progress = 0 }: ScenarioCardProps) {
  const { startScenario } = useTraining();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIndicator = () => {
    switch (scenario.completionStatus) {
      case 'completed':
        return (
          <div className="flex items-center text-green-600">
            <BadgeCheck className="w-4 h-4 mr-1" />
            <span className="text-xs">Completed</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center text-blue-600">
            <Progress value={progress * 100} className="h-2 w-16 mr-2" />
            <span className="text-xs">{Math.round(progress * 100)}%</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-xs">Not Started</span>
          </div>
        );
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{scenario.title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(scenario.difficulty)}`}>
            {scenario.difficulty}
          </span>
        </div>
        <CardDescription>{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>{scenario.duration} minutes</span>
          {scenario.score && (
            <div className="flex items-center ml-4">
              <Award className="w-4 h-4 mr-1 text-yellow-500" />
              <span>{scenario.score}% Score</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/30 pt-3">
        {getStatusIndicator()}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary font-medium"
          onClick={() => startScenario(scenario.id)}
        >
          {scenario.completionStatus === 'completed' ? 'Practice Again' : 'Start Training'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

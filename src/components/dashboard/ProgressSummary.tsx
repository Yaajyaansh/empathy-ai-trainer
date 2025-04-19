
import { useAuth } from "@/contexts/AuthContext";
import { useTraining } from "@/contexts/TrainingContext";
import { BarChart, Award, Clock3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressSummary() {
  const { currentEmployee } = useAuth();
  const { availableScenarios, progress } = useTraining();
  
  // Calculate summary statistics
  const employeeProgress = currentEmployee 
    ? progress.filter(p => p.employeeId === currentEmployee.id)
    : [];
  
  const totalScenarios = availableScenarios.length;
  const completedScenarios = employeeProgress.filter(p => 
    p.completedSteps === p.totalSteps
  ).length;
  
  const inProgressScenarios = employeeProgress.filter(p => 
    p.completedSteps > 0 && p.completedSteps < p.totalSteps
  ).length;
  
  const completionRate = totalScenarios ? (completedScenarios / totalScenarios) * 100 : 0;
  
  // Calculate average score across all completed modules
  const completedWithScores = employeeProgress.filter(p => p.averageScore !== undefined);
  const averageScore = completedWithScores.length
    ? completedWithScores.reduce((sum, p) => sum + (p.averageScore || 0), 0) / completedWithScores.length
    : 0;
  
  // Find best score
  const bestScore = completedWithScores.length
    ? Math.max(...completedWithScores.map(p => p.bestScore || 0))
    : 0;
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm text-muted-foreground mb-3">YOUR PROGRESS</h3>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-sm">{completedScenarios} of {totalScenarios} completed</span>
          </div>
          <Progress value={completionRate} className="h-2 mb-4" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-md p-3">
              <BarChart className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <div className="text-xs text-muted-foreground">In Progress</div>
              <div className="font-medium">{inProgressScenarios}</div>
            </div>
            
            <div className="bg-green-50 rounded-md p-3">
              <Award className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <div className="text-xs text-muted-foreground">Avg Score</div>
              <div className="font-medium">{averageScore.toFixed(0)}%</div>
            </div>
            
            <div className="bg-purple-50 rounded-md p-3">
              <Clock3 className="w-5 h-5 mx-auto mb-1 text-purple-500" />
              <div className="text-xs text-muted-foreground">Best Score</div>
              <div className="font-medium">{bestScore.toFixed(0)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

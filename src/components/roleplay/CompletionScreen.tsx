
import { TrainingScenario, Feedback } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletionScreenProps {
  scenario: TrainingScenario;
  feedbackResults: Feedback[];
  onComplete: () => void;
  onReset: () => void;
}

export function CompletionScreen({ scenario, feedbackResults, onComplete, onReset }: CompletionScreenProps) {
  // Calculate average scores
  const getAverageScore = (scoreType: keyof Feedback) => {
    if (!feedbackResults.length) return 0;
    const sum = feedbackResults.reduce((acc, feedback) => {
      return acc + (typeof feedback[scoreType] === 'number' ? Number(feedback[scoreType]) : 0);
    }, 0);
    return Math.round(sum / feedbackResults.length);
  };
  
  const overallAvg = getAverageScore('overallScore');
  const empathyAvg = getAverageScore('empathyScore');
  const clarityAvg = getAverageScore('clarityScore');
  const responsivenessAvg = getAverageScore('responsivenessScore');
  
  // Get performance label
  const getPerformanceLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Satisfactory";
    if (score >= 60) return "Needs Improvement";
    return "Needs Significant Improvement";
  };
  
  // Get common strengths and improvements
  const allStrengths = feedbackResults.flatMap(f => f.strengths);
  const allImprovements = feedbackResults.flatMap(f => f.improvements);
  
  const getTopItems = (items: string[], count: number = 3) => {
    const itemCounts = items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([item]) => item);
  };
  
  const topStrengths = getTopItems(allStrengths);
  const topImprovements = getTopItems(allImprovements);
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-t-4 border-t-green-500 mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-2 text-green-500" />
                Training Completed
              </CardTitle>
              <CardDescription>
                You've completed the "{scenario.title}" training scenario
              </CardDescription>
            </div>
            <div className="bg-green-50 rounded-full p-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-base font-medium">Overall Performance</span>
              <span className="text-base font-medium">
                {getPerformanceLabel(overallAvg)} ({overallAvg}%)
              </span>
            </div>
            <Progress value={overallAvg} className="h-3" />
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="border rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">Empathy</div>
              <div className="text-2xl font-bold text-blue-600">{empathyAvg}%</div>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">Clarity</div>
              <div className="text-2xl font-bold text-purple-600">{clarityAvg}%</div>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">Responsiveness</div>
              <div className="text-2xl font-bold text-green-600">{responsivenessAvg}%</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
              <h3 className="text-base font-semibold flex items-center mb-4">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                Your Strengths
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {topStrengths.map((strength, i) => (
                  <li key={i} className="text-sm">{strength}</li>
                ))}
              </ul>
            </div>
            
            <div className="border rounded-lg p-5">
              <h3 className="text-base font-semibold flex items-center mb-4">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                Areas to Improve
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {topImprovements.length > 0 ? (
                  topImprovements.map((improvement, i) => (
                    <li key={i} className="text-sm">{improvement}</li>
                  ))
                ) : (
                  <li className="text-sm">No specific improvement areas identified</li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <Button 
              variant="outline" 
              onClick={onReset}
            >
              Practice Again
            </Button>
            <Button 
              onClick={onComplete}
            >
              Complete & Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

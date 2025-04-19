
import { Feedback } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackPanelProps {
  feedback: Feedback;
  onContinue: () => void;
}

export function FeedbackPanel({ feedback, onContinue }: FeedbackPanelProps) {
  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Satisfactory";
    if (score >= 60) return "Needs Improvement";
    return "Poor";
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-600";
    if (score >= 80) return "bg-blue-600";
    if (score >= 70) return "bg-yellow-600";
    if (score >= 60) return "bg-orange-600";
    return "bg-red-600";
  };
  
  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Feedback</CardTitle>
        <CardDescription>
          Feedback on your customer interaction from Sesame AI's Miles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Overall Performance</span>
            <span className={`text-sm font-medium ${getScoreColor(feedback.overallScore)}`}>
              {getScoreLabel(feedback.overallScore)} ({feedback.overallScore}%)
            </span>
          </div>
          <div className="relative">
            <Progress value={feedback.overallScore} className="h-2" />
            <div 
              className={`absolute inset-0 ${getProgressColor(feedback.overallScore)} h-2 rounded-full`} 
              style={{ width: `${feedback.overallScore}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-sm font-medium mb-1">Empathy</div>
            <div className="relative">
              <Progress value={feedback.empathyScore} className="h-2 mb-1" />
              <div 
                className={`absolute inset-0 ${getProgressColor(feedback.empathyScore)} h-2 rounded-full`} 
                style={{ width: `${feedback.empathyScore}%` }}
              ></div>
            </div>
            <div className="text-xs text-right">
              {feedback.empathyScore}%
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Clarity</div>
            <div className="relative">
              <Progress value={feedback.clarityScore} className="h-2 mb-1" />
              <div 
                className={`absolute inset-0 ${getProgressColor(feedback.clarityScore)} h-2 rounded-full`} 
                style={{ width: `${feedback.clarityScore}%` }}
              ></div>
            </div>
            <div className="text-xs text-right">
              {feedback.clarityScore}%
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Responsiveness</div>
            <div className="relative">
              <Progress value={feedback.responsivenessScore} className="h-2 mb-1" />
              <div 
                className={`absolute inset-0 ${getProgressColor(feedback.responsivenessScore)} h-2 rounded-full`} 
                style={{ width: `${feedback.responsivenessScore}%` }}
              ></div>
            </div>
            <div className="text-xs text-right">
              {feedback.responsivenessScore}%
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-medium flex items-center text-green-600 mb-2">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Strengths
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {feedback.strengths.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>
          
          {feedback.improvements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium flex items-center text-orange-600 mb-2">
                <AlertCircle className="h-4 w-4 mr-2" />
                Areas for Improvement
              </h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {feedback.improvements.map((improvement, idx) => (
                  <li key={idx}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Suggestions</h4>
          <p className="text-sm text-blue-800">{feedback.suggestions}</p>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onContinue}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTraining } from "@/contexts/TrainingContext";
import { Header } from "@/components/layout/Header";
import { ScenarioHeader } from "@/components/roleplay/ScenarioHeader";
import { CustomerChat } from "@/components/roleplay/CustomerChat";
import { EmployeeResponseInput } from "@/components/roleplay/EmployeeResponseInput";
import { FeedbackPanel } from "@/components/roleplay/FeedbackPanel";
import { CompletionScreen } from "@/components/roleplay/CompletionScreen";
import { EmployeeResponse, Feedback } from "@/types";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Training() {
  const { isAuthenticated, currentEmployee } = useAuth();
  const { 
    currentScenario, 
    currentStep, 
    scenarioSteps,
    responses,
    feedback, 
    customerResponse,
    isProcessing,
    isComplete,
    submitResponse,
    nextStep,
    resetScenario,
    completeScenario
  } = useTraining();
  
  const navigate = useNavigate();
  const [allFeedback, setAllFeedback] = useState<Feedback[]>([]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Redirect to dashboard if no current scenario
  useEffect(() => {
    if (!currentScenario) {
      navigate("/dashboard");
    }
  }, [currentScenario, navigate]);
  
  // Update collected feedback
  useEffect(() => {
    const feedbackItems = responses
      .filter(r => r.feedback)
      .map(r => r.feedback) as Feedback[];
    
    setAllFeedback(feedbackItems);
  }, [responses]);
  
  const handleSubmitResponse = async (responseText: string) => {
    if (currentStep) {
      await submitResponse(responseText);
    }
  };
  
  const handleContinue = () => {
    nextStep();
  };
  
  const handleComplete = () => {
    completeScenario();
    navigate("/dashboard");
  };
  
  if (!isAuthenticated || !currentEmployee || !currentScenario || !currentStep) {
    return null; // Will redirect
  }
  
  // Handle scenario completion
  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <CompletionScreen 
            scenario={currentScenario}
            feedbackResults={allFeedback}
            onComplete={handleComplete}
            onReset={resetScenario}
          />
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <ScenarioHeader 
        scenario={currentScenario}
        currentStep={currentStep}
        totalSteps={scenarioSteps.length}
        onExit={handleComplete}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Scenario Instructions</h3>
            <p className="text-muted-foreground mb-4">
              Respond to the customer as if you were in a real retail situation. Focus on:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              {currentStep.tips?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
              {!currentStep.tips?.length && (
                <>
                  <li>Being empathetic to the customer's concerns</li>
                  <li>Providing clear and concise information</li>
                  <li>Offering specific solutions when possible</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="space-y-6">
            {/* Customer Chat */}
            <CustomerChat 
              step={currentStep}
              customerResponse={customerResponse}
            />
            
            {/* Employee Response */}
            {responses.map((response) => (
              response.stepId === currentStep.id && (
                <div key={response.id} className="flex items-start justify-end gap-3">
                  <div className="bg-primary-foreground rounded-lg p-4 max-w-[80%]">
                    <p className="text-primary font-medium mb-1">You</p>
                    <p className="text-gray-800">{response.responseText}</p>
                  </div>
                  <div className="bg-primary rounded-full p-2 mt-1">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              )
            ))}
            
            {/* Input for response if no feedback yet */}
            {!feedback && (
              <EmployeeResponseInput 
                onSubmit={handleSubmitResponse}
                isProcessing={isProcessing}
                responseSubmitted={!!responses.find(r => r.stepId === currentStep.id)}
              />
            )}
          </div>
        </div>
        
        {/* Feedback Panel */}
        {feedback && (
          <FeedbackPanel 
            feedback={feedback}
            onContinue={handleContinue}
          />
        )}
      </main>
    </div>
  );
}

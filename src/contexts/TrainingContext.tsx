
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TrainingScenario, 
  ScenarioStep, 
  EmployeeResponse, 
  Feedback, 
  ProgressRecord 
} from '@/types';
import { scenarios, scenarioSteps, progressRecords } from '@/data/mockData';
import { useAuth } from './AuthContext';
import { milesAPI } from '@/services/milesAPI';

interface TrainingContextType {
  availableScenarios: TrainingScenario[];
  currentScenario: TrainingScenario | null;
  currentStep: ScenarioStep | null;
  scenarioSteps: ScenarioStep[];
  progress: ProgressRecord[];
  responses: EmployeeResponse[];
  customerResponse: string | null;
  feedback: Feedback | null;
  isProcessing: boolean;
  isComplete: boolean;
  
  startScenario: (scenarioId: string) => void;
  submitResponse: (responseText: string) => Promise<void>;
  nextStep: () => void;
  resetScenario: () => void;
  completeScenario: () => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentEmployee } = useAuth();
  
  const [availableScenarios, setAvailableScenarios] = useState<TrainingScenario[]>(scenarios);
  const [currentScenario, setCurrentScenario] = useState<TrainingScenario | null>(null);
  const [currentStep, setCurrentStep] = useState<ScenarioStep | null>(null);
  const [allScenarioSteps, setAllScenarioSteps] = useState<ScenarioStep[]>(scenarioSteps);
  const [currentSteps, setCurrentSteps] = useState<ScenarioStep[]>([]);
  const [progress, setProgress] = useState<ProgressRecord[]>(progressRecords);
  const [responses, setResponses] = useState<EmployeeResponse[]>([]);
  const [customerResponse, setCustomerResponse] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Initialize Miles API (this would normally use a real API key)
  useEffect(() => {
    milesAPI.initialize({
      apiKey: 'mock-api-key',
      endpoint: 'https://api.example.com/miles',
    });
  }, []);

  // Update current steps when current scenario changes
  useEffect(() => {
    if (currentScenario) {
      const steps = allScenarioSteps.filter(step => step.scenarioId === currentScenario.id)
        .sort((a, b) => a.order - b.order);
      setCurrentSteps(steps);
      
      // Set the first step as the current step when starting a scenario
      if (steps.length > 0 && !currentStep) {
        setCurrentStep(steps[0]);
      }
    }
  }, [currentScenario, allScenarioSteps]);

  const startScenario = (scenarioId: string) => {
    const scenario = availableScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setCurrentScenario(scenario);
      setIsComplete(false);
      setFeedback(null);
      setCustomerResponse(null);
      setResponses([]);
      
      // Create or update progress record
      if (currentEmployee) {
        const existingProgress = progress.find(
          p => p.employeeId === currentEmployee.id && p.scenarioId === scenarioId
        );
        
        if (!existingProgress) {
          const newProgress: ProgressRecord = {
            employeeId: currentEmployee.id,
            scenarioId,
            completedSteps: 0,
            totalSteps: allScenarioSteps.filter(s => s.scenarioId === scenarioId).length,
            startTime: new Date(),
          };
          setProgress([...progress, newProgress]);
        }
      }
    }
  };

  const submitResponse = async (responseText: string) => {
    if (!currentEmployee || !currentScenario || !currentStep) return;
    
    setIsProcessing(true);
    
    try {
      // Create an employee response record
      const newResponse: EmployeeResponse = {
        id: `resp-${Date.now()}`,
        employeeId: currentEmployee.id,
        scenarioId: currentScenario.id,
        stepId: currentStep.id,
        responseText,
        timestamp: new Date(),
      };
      
      // Get customer's simulated response
      const customerResp = await milesAPI.simulateCustomerInteraction(
        currentStep,
        responseText
      );
      setCustomerResponse(customerResp);
      
      // Get feedback from Miles API
      const feedbackResult = await milesAPI.getFeedback(
        currentStep,
        responseText
      );
      
      // Update response with feedback
      newResponse.feedback = feedbackResult;
      setFeedback(feedbackResult);
      
      // Add to responses
      setResponses(prev => [...prev, newResponse]);
      
      // Update the progress
      updateProgress();
    } catch (error) {
      console.error('Error processing response:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (!currentScenario || !currentStep) return;
    
    const currentIndex = currentSteps.findIndex(step => step.id === currentStep.id);
    if (currentIndex < currentSteps.length - 1) {
      setCurrentStep(currentSteps[currentIndex + 1]);
      setFeedback(null);
      setCustomerResponse(null);
    } else {
      // This was the last step
      setIsComplete(true);
    }
  };

  const resetScenario = () => {
    if (!currentScenario) return;
    
    setCurrentStep(currentSteps[0]);
    setFeedback(null);
    setCustomerResponse(null);
    setResponses([]);
    setIsComplete(false);
  };

  const completeScenario = () => {
    if (!currentEmployee || !currentScenario) return;
    
    // Update the scenario completion status
    const updatedScenarios = availableScenarios.map(s => 
      s.id === currentScenario.id ? { ...s, completionStatus: 'completed' as const } : s
    );
    setAvailableScenarios(updatedScenarios);
    
    // Update progress record with completion time
    const updatedProgress = progress.map(p => {
      if (p.employeeId === currentEmployee.id && p.scenarioId === currentScenario.id) {
        const completedResponses = responses.filter(r => r.scenarioId === currentScenario.id);
        const scores = completedResponses.map(r => r.feedback?.overallScore || 0).filter(s => s > 0);
        
        return {
          ...p,
          completedSteps: currentSteps.length,
          completionTime: new Date(),
          averageScore: scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : undefined,
          bestScore: scores.length ? Math.max(...scores) : undefined,
        };
      }
      return p;
    });
    
    setProgress(updatedProgress);
    setCurrentScenario(null);
    setCurrentStep(null);
    setIsComplete(false);
  };

  const updateProgress = () => {
    if (!currentEmployee || !currentScenario || !currentStep) return;
    
    const updatedProgress = progress.map(p => {
      if (p.employeeId === currentEmployee.id && p.scenarioId === currentScenario.id) {
        const completedSteps = Math.max(
          p.completedSteps,
          currentSteps.findIndex(s => s.id === currentStep.id) + 1
        );
        
        return {
          ...p,
          completedSteps,
        };
      }
      return p;
    });
    
    setProgress(updatedProgress);
    
    // Update scenario status to in-progress if not already completed
    const updatedScenarios = availableScenarios.map(s => {
      if (s.id === currentScenario.id && s.completionStatus !== 'completed') {
        return { ...s, completionStatus: 'in-progress' as const };
      }
      return s;
    });
    
    setAvailableScenarios(updatedScenarios);
  };

  return (
    <TrainingContext.Provider value={{
      availableScenarios,
      currentScenario,
      currentStep,
      scenarioSteps: currentSteps,
      progress,
      responses,
      customerResponse,
      feedback,
      isProcessing,
      isComplete,
      startScenario,
      submitResponse,
      nextStep,
      resetScenario,
      completeScenario,
    }}>
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = (): TrainingContextType => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};

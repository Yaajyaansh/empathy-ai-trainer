
export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

export interface ScenarioCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TrainingScenario {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  completionStatus?: 'not-started' | 'in-progress' | 'completed';
  score?: number;
}

export interface ScenarioStep {
  id: string;
  scenarioId: string;
  order: number;
  customerPrompt: string;
  expectedResponse?: string[];
  tips?: string[];
}

export interface EmployeeResponse {
  id: string;
  employeeId: string;
  scenarioId: string;
  stepId: string;
  responseText: string;
  timestamp: Date;
  feedback?: Feedback;
}

export interface Feedback {
  id: string;
  responseId: string;
  empathyScore: number;
  clarityScore: number;
  responsivenessScore: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: string;
}

export interface ProgressRecord {
  employeeId: string;
  scenarioId: string;
  completedSteps: number;
  totalSteps: number;
  startTime: Date;
  completionTime?: Date;
  averageScore?: number;
  bestScore?: number;
}

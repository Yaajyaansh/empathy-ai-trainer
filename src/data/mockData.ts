
import { Employee, ScenarioCategory, TrainingScenario, ScenarioStep, ProgressRecord } from '@/types';

// Mock Employees
export const employees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Sales Associate',
    email: 'john.smith@retailtraining.com',
    avatar: '/avatar-1.png',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Customer Support',
    email: 'sarah.johnson@retailtraining.com',
    avatar: '/avatar-2.png',
  },
];

// Mock Categories
export const categories: ScenarioCategory[] = [
  {
    id: 'cs',
    name: 'Customer Support',
    description: 'Handle customer inquiries, complaints, and service requests',
    icon: 'headset',
  },
  {
    id: 'sales',
    name: 'Sales Techniques',
    description: 'Learn effective selling strategies and upselling methods',
    icon: 'tag',
  },
  {
    id: 'conflict',
    name: 'Conflict Resolution',
    description: 'Manage difficult situations and resolve customer conflicts',
    icon: 'shield',
  },
  {
    id: 'product',
    name: 'Product Knowledge',
    description: 'Deepen your understanding of products and services',
    icon: 'package',
  },
];

// Mock Training Scenarios
export const scenarios: TrainingScenario[] = [
  {
    id: 'cs-1',
    title: 'Handling Late Delivery Complaints',
    description: 'Learn how to address customer complaints about delayed deliveries and provide appropriate solutions.',
    category: 'cs',
    difficulty: 'beginner',
    duration: 15,
    completionStatus: 'completed',
    score: 85,
  },
  {
    id: 'cs-2',
    title: 'Processing Returns and Exchanges',
    description: 'Practice handling product returns and exchanges while maintaining positive customer relations.',
    category: 'cs',
    difficulty: 'intermediate',
    duration: 20,
    completionStatus: 'in-progress',
  },
  {
    id: 'sales-1',
    title: 'Effective Upselling Techniques',
    description: 'Learn strategies to suggest complementary products and increase average order value.',
    category: 'sales',
    difficulty: 'intermediate',
    duration: 25,
    completionStatus: 'not-started',
  },
  {
    id: 'conflict-1',
    title: 'De-escalating Customer Frustration',
    description: 'Practice techniques to calm upset customers and resolve their concerns effectively.',
    category: 'conflict',
    difficulty: 'advanced',
    duration: 30,
    completionStatus: 'not-started',
  },
  {
    id: 'product-1',
    title: 'Premium Product Features Overview',
    description: 'Learn the key features and benefits of our premium product line to better assist customers.',
    category: 'product',
    difficulty: 'beginner',
    duration: 15,
    completionStatus: 'not-started',
  },
];

// Mock Scenario Steps (for the first scenario)
export const scenarioSteps: ScenarioStep[] = [
  {
    id: 'cs-1-step1',
    scenarioId: 'cs-1',
    order: 1,
    customerPrompt: "I ordered a package three days ago with express shipping, and it still hasn't arrived. I paid extra for fast delivery, and I'm really frustrated!",
    expectedResponse: [
      "Acknowledge the customer's frustration",
      "Apologize for the delay",
      "Offer to track the package immediately",
    ],
    tips: [
      "Make sure to validate the customer's feelings",
      "Don't make promises you can't keep about delivery times",
    ],
  },
  {
    id: 'cs-1-step2',
    scenarioId: 'cs-1',
    order: 2,
    customerPrompt: "I checked the tracking and it says 'in transit', but that's not helpful. I need it for a birthday tomorrow!",
    expectedResponse: [
      "Empathize with the urgency",
      "Provide specific information about current location if possible",
      "Offer solutions or alternatives",
    ],
    tips: [
      "Focus on what you can do, not what you can't",
      "If appropriate, offer compensation such as a discount code or free shipping on next order",
    ],
  },
  {
    id: 'cs-1-step3',
    scenarioId: 'cs-1',
    order: 3,
    customerPrompt: "I appreciate your help, but I still need a solution for the birthday gift. What options do I have at this point?",
    expectedResponse: [
      "Offer expedited shipping for a replacement",
      "Suggest digital gift card as immediate alternative",
      "Propose a discount or coupon for the inconvenience",
    ],
    tips: [
      "Present multiple options to give the customer choice",
      "Make sure any solution you offer is actually feasible",
    ],
  },
];

// Mock Progress Records
export const progressRecords: ProgressRecord[] = [
  {
    employeeId: '1',
    scenarioId: 'cs-1',
    completedSteps: 3,
    totalSteps: 3,
    startTime: new Date(2023, 3, 15, 10, 30),
    completionTime: new Date(2023, 3, 15, 10, 45),
    averageScore: 85,
    bestScore: 92,
  },
  {
    employeeId: '1',
    scenarioId: 'cs-2',
    completedSteps: 1,
    totalSteps: 4,
    startTime: new Date(2023, 3, 16, 14, 15),
  },
];

// Miles API simulation responses
export const getAIFeedback = (userResponse: string, scenarioStep: ScenarioStep) => {
  // This simulates what would come from Miles API
  const randomScore = () => Math.floor(Math.random() * 30) + 70; // Generate a score between 70-100
  
  const empathyScore = randomScore();
  const clarityScore = randomScore();
  const responsivenessScore = randomScore();
  const overallScore = Math.floor((empathyScore + clarityScore + responsivenessScore) / 3);
  
  const strengths = [];
  const improvements = [];
  
  if (empathyScore > 85) strengths.push("Excellent empathy in your response");
  else improvements.push("Try to acknowledge the customer's feelings more directly");
  
  if (clarityScore > 85) strengths.push("Clear and concise explanation");
  else improvements.push("Be more specific about what actions you're taking");
  
  if (responsivenessScore > 85) strengths.push("Great job addressing the specific issue");
  else improvements.push("Make sure to answer all parts of the customer's concern");
  
  let suggestions = "To improve, consider using more specific language and offering a concrete next step or timeline.";
  
  if (userResponse.toLowerCase().includes("apologize") || userResponse.toLowerCase().includes("sorry")) {
    strengths.push("Good job acknowledging responsibility");
  }
  
  if (userResponse.toLowerCase().includes("help") || userResponse.toLowerCase().includes("assist")) {
    strengths.push("Positive language offering assistance");
  }
  
  return {
    id: `feedback-${Date.now()}`,
    responseId: `resp-${Date.now()}`,
    empathyScore,
    clarityScore,
    responsivenessScore,
    overallScore,
    strengths,
    improvements,
    suggestions,
  };
};

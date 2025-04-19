
// This file will be used to integrate with Sesame AI's Miles API
// For MVP, we're using mock responses, but this would be replaced with actual API calls

/*
 * IMPLEMENTATION NOTES FOR SESAME AI'S MILES API INTEGRATION:
 * 
 * When ready to connect to the actual Miles API:
 * 
 * 1. Replace the mock implementation in this file with actual API calls to Sesame AI's endpoints
 *
 * 2. Update the initialize method to store the actual API key securely
 *
 * 3. Update the simulateCustomerInteraction method to:
 *    - Send the employee response to Miles API
 *    - Include context about the scenario and previous interactions
 *    - Parse and return Miles' simulated customer response
 *
 * 4. Update the getFeedback method to:
 *    - Send the entire conversation context to Miles
 *    - Include expected behaviors and evaluation criteria
 *    - Parse Miles' structured feedback into the Feedback type format
 *
 * 5. Consider adding error handling and retry logic for API reliability
 *
 * 6. Implement proper API request authentication following Sesame AI's documentation
 */

import { ScenarioStep, Feedback } from '@/types';

export interface MilesAPIConfig {
  apiKey: string;
  endpoint: string;
}

class MilesAPIService {
  private config: MilesAPIConfig | null = null;

  initialize(config: MilesAPIConfig) {
    this.config = config;
    console.log('Miles API initialized with configuration:', config);
    return this;
  }

  isInitialized(): boolean {
    return this.config !== null;
  }

  async simulateCustomerInteraction(
    scenarioStep: ScenarioStep,
    employeeResponse: string
  ): Promise<string> {
    // This would call the Miles API to get a simulated customer response
    // For MVP, we'll just return a static response
    
    console.log('Simulating customer interaction based on employee response:', employeeResponse);
    
    // In a real implementation, this would send the context and the employee's
    // response to the Miles API and get back a contextually relevant response
    
    // More dynamic simulation of customer responses based on employee answer quality
    const lowerCaseResponse = employeeResponse.toLowerCase();
    
    if (lowerCaseResponse.length < 20) {
      return "That's not very helpful. Can you please give me a more detailed response?";
    } else if (lowerCaseResponse.includes('sorry') || lowerCaseResponse.includes('apologize')) {
      if (lowerCaseResponse.length < 50) {
        return "I appreciate your apology, but I need more than just 'sorry'. What are you going to do to fix my problem?";
      }
      return "I appreciate your apology, but I still need to know what you can do about my situation.";
    } else if (lowerCaseResponse.includes('help') || lowerCaseResponse.includes('assist')) {
      if (!lowerCaseResponse.includes('will') && !lowerCaseResponse.includes('can')) {
        return "You're saying you want to help, but how exactly are you planning to do that?";
      }
      return "Thank you for offering to help. What are my options at this point?";
    } else if (lowerCaseResponse.includes('check') || lowerCaseResponse.includes('track')) {
      if (!lowerCaseResponse.includes('for you')) {
        return "Yes, please check on that for me. But I need you to be more personal in your approach.";
      }
      return "Yes, please check on that for me. I really need this order soon.";
    } else if (lowerCaseResponse.includes('refund') || lowerCaseResponse.includes('discount')) {
      return "That's helpful, but I was hoping there might be another solution before resorting to a refund.";
    } else if (lowerCaseResponse.includes('policy') || lowerCaseResponse.includes('procedure')) {
      return "I don't care about your policy. I just want my problem solved. Can you help me or not?";
    } else {
      return "I don't feel like you're understanding my concern. Can you please be more specific about how you'll resolve this issue?";
    }
  }

  async getFeedback(
    scenarioStep: ScenarioStep,
    employeeResponse: string
  ): Promise<Feedback> {
    console.log('Getting AI feedback for employee response:', employeeResponse);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Much more critical feedback implementation
    const lowerCaseResponse = employeeResponse.toLowerCase();
    const wordCount = employeeResponse.split(' ').length;
    
    // Initialize scores based on length - short responses start with lower scores
    let empathyScore = wordCount < 15 ? 40 : wordCount < 30 ? 60 : 70;
    let clarityScore = wordCount < 15 ? 45 : wordCount < 30 ? 65 : 75;
    let responsivenessScore = wordCount < 15 ? 50 : wordCount < 30 ? 65 : 75;
    
    // Analyze for empathy
    if (lowerCaseResponse.includes('understand') || lowerCaseResponse.includes('sorry')) {
      empathyScore += 10;
    } else {
      empathyScore -= 15;
    }
    
    if (lowerCaseResponse.includes('frustrat') || lowerCaseResponse.includes('disappoint')) {
      empathyScore += 15;
    }
    
    if (!lowerCaseResponse.includes('you') && !lowerCaseResponse.includes('your')) {
      empathyScore -= 20;
    }
    
    // Analyze for clarity
    if (wordCount > 50 && !lowerCaseResponse.includes('step') && !lowerCaseResponse.includes('process')) {
      clarityScore -= 15; // Long responses without clear steps are less clear
    }
    
    if (lowerCaseResponse.includes('policy') && !lowerCaseResponse.includes('exception')) {
      clarityScore -= 10; // Mentioning policy without exceptions is rigid
    }
    
    if (lowerCaseResponse.includes('can') && lowerCaseResponse.includes('will')) {
      clarityScore += 10; // Clear commitment
    }
    
    // Analyze for responsiveness
    if (!lowerCaseResponse.includes('help') && !lowerCaseResponse.includes('assist') && 
        !lowerCaseResponse.includes('resolve') && !lowerCaseResponse.includes('solution')) {
      responsivenessScore -= 25; // No mention of helping or resolving
    }
    
    if (lowerCaseResponse.includes('manager') || lowerCaseResponse.includes('supervisor')) {
      responsivenessScore -= 15; // Escalating without trying to solve first
    }
    
    if (lowerCaseResponse.includes('immediately') || lowerCaseResponse.includes('right away')) {
      responsivenessScore += 10;
    }
    
    // Cap scores between 10 and 95 to allow room for improvement
    empathyScore = Math.min(95, Math.max(10, empathyScore));
    clarityScore = Math.min(95, Math.max(10, clarityScore));
    responsivenessScore = Math.min(95, Math.max(10, responsivenessScore));
    
    // Overall score is weighted average
    const overallScore = Math.round((empathyScore * 0.4) + (clarityScore * 0.3) + (responsivenessScore * 0.3));
    
    // Determine strengths and improvements
    const strengths = [];
    const improvements = [];
    
    // Add strengths
    if (empathyScore > 70) strengths.push("Shows good empathy by acknowledging customer feelings");
    if (clarityScore > 70) strengths.push("Provides clear information about next steps");
    if (responsivenessScore > 70) strengths.push("Actively offers solutions to address the issue");
    if (lowerCaseResponse.includes('sorry') || lowerCaseResponse.includes('apologize')) 
      strengths.push("Takes ownership with a proper apology");
    if (lowerCaseResponse.includes('what I can do') || lowerCaseResponse.includes('what we can do'))
      strengths.push("Shows initiative in finding solutions");
    
    // If we don't have at least one strength, add a generic one
    if (strengths.length === 0) {
      strengths.push("Makes an attempt to address the customer's concern");
    }
    
    // Add improvements
    if (empathyScore < 70) improvements.push("Could show more empathy by acknowledging customer's feelings");
    if (clarityScore < 70) improvements.push("Response could be more structured with clearer steps or options");
    if (responsivenessScore < 70) improvements.push("Should offer more specific solutions instead of generic responses");
    if (!lowerCaseResponse.includes('sorry') && !lowerCaseResponse.includes('apologize'))
      improvements.push("Missing an apology for the inconvenience caused");
    if (lowerCaseResponse.includes('policy') || lowerCaseResponse.includes('cannot'))
      improvements.push("Focuses too much on limitations rather than possibilities");
    if (wordCount < 25)
      improvements.push("Response is too brief to adequately address customer concerns");
    if (wordCount > 100)
      improvements.push("Response is overly verbose which may frustrate an already upset customer");
    
    // Suggestions
    let suggestions = "Try to balance empathy with practical solutions. ";
    
    if (empathyScore < 60) {
      suggestions += "Start by acknowledging how the customer feels before offering solutions. ";
    }
    
    if (clarityScore < 60) {
      suggestions += "Structure your response with clear, numbered steps when possible. ";
    }
    
    if (responsivenessScore < 60) {
      suggestions += "Offer specific actions you will take, with timeframes if possible. ";
    }
    
    return {
      id: `feedback-${Date.now()}`,
      responseId: 'mock-response-id',
      empathyScore,
      clarityScore,
      responsivenessScore,
      overallScore,
      strengths,
      improvements,
      suggestions
    };
  }
}

// Export a singleton instance
export const milesAPI = new MilesAPIService();


# Retail Employee Training App

A training application designed to help retail employees practice and improve their customer service and sales skills through AI-powered role-play scenarios.

## Overview

This application leverages Sesame AI's Miles API to provide realistic customer interaction simulations for retail employees. Employees can practice handling various customer scenarios, receive immediate feedback, and track their progress over time.

## Features

### Core Features

- **AI Role-play Scenarios**: Simulated customer interactions for training using Sesame AI's Miles API
- **Immediate AI Feedback**: Performance evaluation based on empathy, clarity, and responsiveness
- **Employee Progress Tracking**: Monitor improvement over time with detailed metrics
- **Customizable Training Modules**: Different categories of training scenarios

### Key Sections

1. **Dashboard**: View available training modules and track progress
2. **Training Simulator**: Interactive role-play with simulated customers
3. **Feedback Analysis**: Detailed evaluation of performance with specific improvement suggestions
4. **Progress Reports**: Track improvement over time across different skill areas

## Technical Implementation

### Frontend

- React with TypeScript
- TailwindCSS for styling
- Context API for state management

### Integration

- Designed to integrate with Sesame AI's Miles API for:
  - Customer conversation simulation
  - Response evaluation
  - Personalized feedback generation

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Demo Access

Use the following credentials to access the demo:
- **Email**: john.smith@retailtraining.com
- **Password**: password

## Implementation Notes

### Miles API Integration

The current version uses mock data to simulate the Miles API functionality. For production:

1. Update the `milesAPI.ts` service with actual API endpoints
2. Implement proper authentication with Sesame AI
3. Update the response processing to match the actual API response format

### Customizing Training Scenarios

Training scenarios can be customized by editing the mock data files. In a production environment, these would be stored in a database and managed through an admin interface.

## Future Enhancements

- **Manager Dashboard**: For overseeing team progress
- **Custom Scenario Creation**: Interface for creating company-specific training scenarios
- **Advanced Analytics**: Deeper insights into employee performance trends
- **Mobile Application**: For on-the-go training

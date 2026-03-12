export interface Question {
  id: string;
  text: string;
  options: string[];
  category: 'mood' | 'sleep' | 'stress' | 'goals';
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'How are you feeling right now?',
    options: ['Very happy', 'Content', 'Neutral', 'Anxious', 'Low'],
    category: 'mood',
  },
  {
    id: 'q2',
    text: 'How well did you sleep last night?',
    options: ['Excellent (7-9 hours)', 'Good (6-7 hours)', 'Fair (4-6 hours)', 'Poor (less than 4 hours)'],
    category: 'sleep',
  },
  {
    id: 'q3',
    text: 'What is your current stress level?',
    options: ['Very low', 'Low', 'Moderate', 'High', 'Very high'],
    category: 'stress',
  },
  {
    id: 'q4',
    text: 'What is your main goal for today?',
    options: ['Reduce stress', 'Improve focus', 'Build energy', 'Find balance', 'Rest and recover'],
    category: 'goals',
  },
  {
    id: 'q5',
    text: 'How would you describe your energy level?',
    options: ['Very energized', 'Fairly energized', 'Moderate', 'Tired', 'Exhausted'],
    category: 'mood',
  },
  {
    id: 'q6',
    text: 'What area would you like to focus on most?',
    options: ['Mindfulness & meditation', 'Breathing & relaxation', 'Healthy eating', 'Physical movement', 'Mental clarity'],
    category: 'goals',
  },
];

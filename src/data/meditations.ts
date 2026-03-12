export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'morning' | 'evening' | 'focus' | 'sleep';
  audioUrl?: string;
}

export const meditations: Meditation[] = [
  {
    id: 'med1',
    title: 'Morning Awakening',
    description: 'Start your day with gentle awareness. Focus on your breath and set a positive intention for the hours ahead.',
    duration: 5,
    category: 'morning',
  },
  {
    id: 'med2',
    title: 'Deep Focus Flow',
    description: 'Sharpen your concentration with this focused meditation designed to clear mental clutter and boost productivity.',
    duration: 10,
    category: 'focus',
  },
  {
    id: 'med3',
    title: 'Evening Wind-Down',
    description: 'Release the tensions of the day with this calming evening practice. Let go of stress and prepare for restful sleep.',
    duration: 8,
    category: 'evening',
  },
  {
    id: 'med4',
    title: 'Sleep Journey',
    description: 'Drift peacefully into sleep with this guided body scan meditation. Allow each part of your body to completely relax.',
    duration: 15,
    category: 'sleep',
  },
  {
    id: 'med5',
    title: 'Midday Reset',
    description: 'A quick recharge for the middle of your day. Reconnect with the present moment and renew your energy.',
    duration: 5,
    category: 'focus',
  },
  {
    id: 'med6',
    title: 'Gratitude Reflection',
    description: 'Cultivate thankfulness with this heart-opening meditation. Acknowledge what is going well in your life.',
    duration: 7,
    category: 'morning',
  },
  {
    id: 'med7',
    title: 'Stress Relief',
    description: 'Release anxiety and tension through mindful awareness. Return to a state of calm and inner peace.',
    duration: 12,
    category: 'evening',
  },
];

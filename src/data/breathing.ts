export interface BreathingPrompts {
  inhale: string;
  hold: string;
  exhale: string;
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  benefit: string;
  prompts: BreathingPrompts;
}

export const breathingExercises: BreathingExercise[] = [
  {
    id: 'b1',
    name: 'Box Breathing',
    description: 'Equal counts of inhale, hold, exhale, and hold again. Used by Navy SEALs for stress control.',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 4,
    benefit: 'Reduces stress and improves focus',
    prompts: {
      inhale: 'Inhale slowly and deeply through your nose',
      hold: 'Hold gently, retain the breath',
      exhale: 'Exhale fully and steadily through your mouth',
    },
  },
  {
    id: 'b2',
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8. A natural tranquilizer for the nervous system.',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4,
    benefit: 'Promotes relaxation and better sleep',
    prompts: {
      inhale: 'Breathe in through your nose, filling your lungs completely',
      hold: 'Hold gently, letting the breath settle',
      exhale: 'Release slowly and fully through your mouth with a soft whoosh',
    },
  },
  {
    id: 'b3',
    name: 'Belly Breathing',
    description: 'Deep diaphragmatic breathing that fully engages the lungs and calms the mind.',
    inhale: 5,
    hold: 2,
    exhale: 5,
    cycles: 6,
    benefit: 'Activates the parasympathetic nervous system',
    prompts: {
      inhale: 'Inhale through your nose, letting your belly rise like the sun',
      hold: 'Pause at the top, feeling the fullness',
      exhale: 'Exhale through your mouth, letting your belly fall gently',
    },
  },
  {
    id: 'b4',
    name: 'Energizing Breath',
    description: 'Quick inhale through the nose, long exhale through the mouth to increase alertness.',
    inhale: 3,
    hold: 1,
    exhale: 6,
    cycles: 5,
    benefit: 'Increases energy and mental clarity',
    prompts: {
      inhale: 'Sharp, crisp inhale through the nose — awaken your senses',
      hold: 'Brief pause at the peak',
      exhale: 'Long, releasing exhale through the mouth — let go completely',
    },
  },
  {
    id: 'b5',
    name: 'Sacred Nadi Shodhana',
    description: 'Inspired by ancient alternate nostril breathing to balance the mind and restore harmony.',
    inhale: 4,
    hold: 4,
    exhale: 6,
    cycles: 5,
    benefit: 'Balances the nervous system and clears the mind',
    prompts: {
      inhale: 'Breathe in gently and fully through your nose, drawing in calm energy',
      hold: 'Hold the sacred breath, let it purify and balance you',
      exhale: 'Release slowly and completely through your nose, letting go with gratitude',
    },
  },
];

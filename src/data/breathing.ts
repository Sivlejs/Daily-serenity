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
      inhale: 'Inhale slowly through your nose, filling your lungs from the bottom up',
      hold: 'Hold your breath gently — body still, mind calm',
      exhale: 'Exhale smoothly through your mouth, emptying fully',
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
      inhale: 'Breathe in gently through your nose, feel your belly expand',
      hold: 'Hold with ease — let the breath settle inside you',
      exhale: 'Breathe out slowly through your mouth, releasing all tension',
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
      inhale: 'Breathe deep into your belly through your nose — feel it rise like a gentle wave',
      hold: 'Pause at the top, savouring the fullness',
      exhale: 'Release fully and slowly through your mouth, belly falling softly',
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
      inhale: 'Sharp, crisp inhale through the nose — feel the awakening energy',
      hold: 'Brief pause — gather your focus',
      exhale: 'Long, steady exhale through the mouth — let go of sluggishness',
    },
  },
  {
    id: 'b5',
    name: 'Alternate Nostril',
    description: 'Ancient pranayama technique balancing the left and right hemispheres of the brain.',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 6,
    benefit: 'Balances mind and body, reduces anxiety',
    prompts: {
      inhale: 'Inhale slowly through your left nostril — feel calmness flow in',
      hold: 'Hold gently, both nostrils softly closed',
      exhale: 'Exhale quietly through your right nostril — release what no longer serves you',
    },
  },
  {
    id: 'b6',
    name: 'Coherent Breathing',
    description: 'Breathe at five breaths per minute to synchronise heart rate and nervous system.',
    inhale: 6,
    hold: 0,
    exhale: 6,
    cycles: 5,
    benefit: 'Harmonises heart, lungs and nervous system',
    prompts: {
      inhale: 'Breathe in smoothly through your nose for six counts — long and unhurried',
      hold: 'Flow directly into the exhale without pausing',
      exhale: 'Breathe out softly through your nose for six counts — steady and even',
    },
  },
];

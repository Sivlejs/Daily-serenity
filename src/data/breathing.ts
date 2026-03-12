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
      inhale: 'Inhale slowly and deeply through your nose, filling your lungs completely',
      hold: 'Hold your breath gently — keep your body still and relaxed',
      exhale: 'Exhale fully through your mouth, releasing all tension with the breath',
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
      inhale: 'Breathe in through your nose quietly and steadily for four counts',
      hold: 'Hold gently — let the breath settle throughout your body',
      exhale: 'Exhale completely through your mouth with a long, soft whooshing sound',
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
      inhale: 'Breathe deep into your belly through your nose — feel your abdomen rise gently',
      hold: 'Pause at the top, sensing the fullness of breath in your body',
      exhale: 'Slowly release through your mouth, letting your belly fall naturally',
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
      inhale: 'Take a sharp, invigorating inhale through your nose to awaken your senses',
      hold: 'Hold briefly — feel the energy gathering',
      exhale: 'Release fully through your mouth in one long, powerful breath',
    },
  },
  {
    id: 'b5',
    name: 'Kemetic Calm Breath',
    description: 'A slow, rhythmic breath pattern inspired by ancient meditative traditions for deep inner peace.',
    inhale: 6,
    hold: 3,
    exhale: 7,
    cycles: 5,
    benefit: 'Deepens calm and connects to inner stillness',
    prompts: {
      inhale: 'Breathe in through your nose slowly and silently, as if drawing in golden light',
      hold: 'Hold at the peak — allow the sacred breath to nourish every cell',
      exhale: 'Exhale through your mouth in a long, smooth flow, releasing all that no longer serves you',
    },
  },
  {
    id: 'b6',
    name: 'Grief Release Breath',
    description: 'A tender, compassionate breath practice to help move through grief and sorrow with gentle awareness.',
    inhale: 4,
    hold: 2,
    exhale: 8,
    cycles: 4,
    benefit: 'Gently releases held emotions and soothes the heart',
    prompts: {
      inhale: 'Breathe in softly through your nose — breathe in compassion for yourself',
      hold: 'Rest here tenderly, holding both the pain and the love',
      exhale: 'Let it all move through you and out through your mouth — you do not have to hold this alone',
    },
  },
];

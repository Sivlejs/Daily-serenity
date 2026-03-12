export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  benefit: string;
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
  },
];

import type { MusicTone } from '../utils/audioService';

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'morning' | 'evening' | 'focus' | 'sleep';
  audioUrl?: string;
  guidedScript: string;
  musicTone: MusicTone;
}

export const meditations: Meditation[] = [
  {
    id: 'med1',
    title: 'Morning Awakening',
    description: 'Start your day with gentle awareness. Focus on your breath and set a positive intention for the hours ahead.',
    duration: 5,
    category: 'morning',
    guidedScript:
      'Good morning. Close your eyes and take a slow, deep breath. Feel the new day welcoming you. Set a gentle intention — one word that will guide your morning. Breathe in possibility, breathe out any lingering sleepiness. You are awake, you are present, and today holds something beautiful for you.',
    musicTone: 'calm',
  },
  {
    id: 'med2',
    title: 'Deep Focus Flow',
    description: 'Sharpen your concentration with this focused meditation designed to clear mental clutter and boost productivity.',
    duration: 10,
    category: 'focus',
    guidedScript:
      'Settle into your seat and let your body become still. Bring your attention to a single point — the tip of your nose, or the sensation of your hands resting on your lap. When thoughts arise, gently acknowledge them and return to your focal point. With every breath, your mind becomes clearer, sharper, and more focused.',
    musicTone: 'focus',
  },
  {
    id: 'med3',
    title: 'Evening Wind-Down',
    description: 'Release the tensions of the day with this calming evening practice. Let go of stress and prepare for restful sleep.',
    duration: 8,
    category: 'evening',
    guidedScript:
      'The day is drawing to a close. Allow your shoulders to drop and your jaw to soften. With each exhale, release everything that no longer serves you. Think of three things from today that you are grateful for. Let your body grow heavy with relaxation as you prepare to rest.',
    musicTone: 'calm',
  },
  {
    id: 'med4',
    title: 'Sleep Journey',
    description: 'Drift peacefully into sleep with this guided body scan meditation. Allow each part of your body to completely relax.',
    duration: 15,
    category: 'sleep',
    guidedScript:
      'Lie down and close your eyes. Starting from the top of your head, slowly scan downward — your forehead, cheeks, jaw... your neck and shoulders... your chest rising and falling with each breath. Continue down through your arms, your belly, your hips, your legs, all the way to the tips of your toes. Every part of you is safe, warm, and deeply relaxed. Drift now into peaceful sleep.',
    musicTone: 'sleep',
  },
  {
    id: 'med5',
    title: 'Midday Reset',
    description: 'A quick recharge for the middle of your day. Reconnect with the present moment and renew your energy.',
    duration: 5,
    category: 'focus',
    guidedScript:
      'Pause whatever you are doing. Take three deep breaths. Notice the sounds around you, the feeling of the ground beneath you. You are here, right now. Release any tension in your neck and shoulders. In just a few moments you will return to your day feeling refreshed and re-energised.',
    musicTone: 'focus',
  },
  {
    id: 'med6',
    title: 'Gratitude Reflection',
    description: 'Cultivate thankfulness with this heart-opening meditation. Acknowledge what is going well in your life.',
    duration: 7,
    category: 'morning',
    guidedScript:
      'Place one hand on your heart and breathe slowly. Bring to mind something you are grateful for — a person, a moment, or simply the breath that sustains you. Let the warmth of that gratitude radiate outward. You deserve abundance and joy. Today, carry this feeling of thankfulness with you wherever you go.',
    musicTone: 'healing',
  },
  {
    id: 'med7',
    title: 'Stress Relief',
    description: 'Release anxiety and tension through mindful awareness. Return to a state of calm and inner peace.',
    duration: 12,
    category: 'evening',
    guidedScript:
      'Acknowledge any stress or tension you are carrying right now. It is okay to feel this way. Breathe in slowly for four counts, hold gently for four counts, and breathe out for four counts. With each cycle, imagine the tension dissolving like fog in sunlight. You are safe. You are capable. This moment of calm is yours.',
    musicTone: 'calm',
  },
  {
    id: 'med8',
    title: 'Inner Sanctuary',
    description: 'Journey within to discover your sacred inner space — a place of timeless stillness and divine knowing.',
    duration: 10,
    category: 'morning',
    guidedScript:
      'Close your eyes and imagine a vast temple of light within your heart. Its walls are ancient stone, warm with the glow of a thousand candles. You are the keeper of this sanctuary. With each breath, feel its sacred stillness expand outward. Nothing outside can disturb this inner peace. Rest here, in this holy place of your own being.',
    musicTone: 'healing',
  },
  {
    id: 'med9',
    title: 'River of Awareness',
    description: 'Float gently on the current of present-moment awareness, letting thoughts pass like leaves on the Nile.',
    duration: 8,
    category: 'focus',
    guidedScript:
      'Imagine you are sitting beside a great, slow-moving river. Thoughts and feelings float past like boats on the water — you watch them drift by without grasping or pushing away. You are not the boats; you are the riverbank, steady and still. Breathe slowly. The river flows. You remain. Present. Aware. At peace.',
    musicTone: 'calm',
  },
  {
    id: 'med10',
    title: 'Starlight Restoration',
    description: 'Under a canopy of ancient stars, restore your energy and reconnect with the cosmos before sleep.',
    duration: 12,
    category: 'sleep',
    guidedScript:
      'Imagine lying beneath a boundless night sky, dark as deep water, scattered with stars that have watched over humanity for thousands of years. Let their ancient light wash over you. Your body is heavy and warm. Your mind grows quiet as starlight. You are held by the universe itself. Let go completely and surrender to the deep, healing embrace of the night.',
    musicTone: 'sleep',
  },
];

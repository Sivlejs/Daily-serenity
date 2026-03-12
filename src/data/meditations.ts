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
    title: 'Ancient Stillness',
    description: 'Tap into the timeless wisdom of the ancients. Sit in sacred silence and connect with the eternal now.',
    duration: 10,
    category: 'morning',
    guidedScript:
      'Imagine you are seated beside the great Nile at dawn. The air is cool, the water glistening gold with the first light of Ra. Feel the earth beneath you — solid, ancient, wise. With each breath, draw in the wisdom of countless generations who sat in stillness before you. You are part of something timeless. Breathe in eternity. Breathe out all urgency.',
    musicTone: 'healing',
  },
  {
    id: 'med9',
    title: 'Inner Sanctuary',
    description: 'Create a sacred inner space to retreat to at any moment. A temple of peace within.',
    duration: 12,
    category: 'focus',
    guidedScript:
      'Close your eyes and picture a golden doorway. Step through it into your inner sanctuary — a chamber adorned with lapis and gold, lit by warm torchlight. This is your sacred space. Nothing harmful can enter here. Feel the serenity of this place fill your chest with every breath. Know that you can return here any time you need refuge or clarity.',
    musicTone: 'calm',
  },
  {
    id: 'med10',
    title: 'Star Gazing',
    description: 'Connect with the vast cosmos and rediscover your place in the universe.',
    duration: 8,
    category: 'evening',
    guidedScript:
      'Lie back and let the stars above you become the ceiling of the universe. Like the ancient astronomers of Kemet, gaze upward and feel the infinite sky stretching beyond your imagination. You are made of the same light that fills those stars. Let any worries dissolve into the vastness. You are small, yet perfectly held in the arms of the cosmos.',
    musicTone: 'sleep',
  },
  {
    id: 'med11',
    title: 'Desert Sunrise',
    description: 'Welcome a fresh start with the rise of Ra — an energising morning ritual inspired by Kemetic tradition.',
    duration: 7,
    category: 'morning',
    guidedScript:
      'As the sun rises over golden dunes, feel its warmth touch your face. Ra, the source of all life, offers his light to you freely. Breathe in that golden warmth — it fills your lungs, your belly, your fingertips. Today is a new creation. You arise renewed, radiant, and purposeful. Carry this morning light throughout your day.',
    musicTone: 'focus',
  },
];

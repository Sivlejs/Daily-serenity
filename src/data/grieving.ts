import type { MusicTone } from '../utils/audioService';

export interface GrievingSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'comfort' | 'reflection' | 'healing' | 'acceptance';
  guidedScript: string;
  musicTone: MusicTone;
}

export const grievingSessions: GrievingSession[] = [
  {
    id: 'g1',
    title: 'Finding Comfort',
    description: 'A gentle session to help you feel held and supported in moments of sorrow.',
    duration: 8,
    type: 'comfort',
    guidedScript:
      'You are not alone in this pain. Take a slow breath and allow yourself to simply be here, as you are, without any need to be okay right now. Place your hands over your heart. Feel the warmth. You are safe. Grief is love with nowhere to go, and that love is still real. Let yourself rest in that truth for a few moments.',
    musicTone: 'comfort',
  },
  {
    id: 'g2',
    title: 'Gentle Reflection',
    description: 'Honor memories and allow feelings to move through you with compassionate awareness.',
    duration: 10,
    type: 'reflection',
    guidedScript:
      'Close your eyes and bring to mind a cherished memory. Notice the details — a voice, a smile, a feeling. You are allowed to hold this tenderly. Grief does not erase love; it is a testament to it. Breathe slowly and let the memory wash over you like a gentle wave. It is okay to feel both the sadness and the gratitude at once.',
    musicTone: 'calm',
  },
  {
    id: 'g3',
    title: 'Heart Healing',
    description: 'Begin to tend to the wounds of loss through loving-kindness and self-compassion.',
    duration: 12,
    type: 'healing',
    guidedScript:
      'With each breath, imagine a warm golden light surrounding your heart. This light does not take away the pain, but it softens the edges. Breathe in compassion for yourself. Breathe out any shame or guilt around your grief. You are allowed to heal at your own pace. Healing does not mean forgetting — it means learning to carry love in a new way.',
    musicTone: 'healing',
  },
  {
    id: 'g4',
    title: 'Peaceful Acceptance',
    description: 'Move gently toward acceptance without forcing it — a quiet acknowledgment of what is.',
    duration: 10,
    type: 'acceptance',
    guidedScript:
      'Acceptance does not mean that everything is okay. It means acknowledging what is real. Take a breath and say gently to yourself: this happened, and I am still here. With each exhale, release the fight against reality. With each inhale, welcome the present moment as it is. You have survived difficult moments before, and you carry a quiet strength within you.',
    musicTone: 'calm',
  },
  {
    id: 'g5',
    title: 'Honoring the Bond',
    description: 'A compassionate space to celebrate the love that connected you, and acknowledge how it lives on within you.',
    duration: 9,
    type: 'reflection',
    guidedScript:
      'The connection you shared was real, and love like that does not disappear — it transforms. Take a slow breath and bring to mind a moment when you felt most seen, most held, most yourself in the presence of what you have lost. Let yourself smile, or cry, or both. Your love was not wasted. It shaped you. It is still shaping you. That is not ending — that is legacy.',
    musicTone: 'comfort',
  },
  {
    id: 'g6',
    title: 'Returning to the River',
    description: 'Like the Nile that nourishes the land each season, this meditation guides you toward renewal after loss.',
    duration: 11,
    type: 'healing',
    guidedScript:
      'Imagine standing at the edge of a great river at dawn. The water is golden and ancient. This river has seen countless lives, countless loves, countless losses — and still it flows. Step into the shallows. Feel the cool water around your feet. With every gentle wave, let a little grief loosen and be carried downstream. You do not have to carry it all. The river is strong enough to hold it for you. Breathe. Remain. Slowly, the light grows warmer on your face.',
    musicTone: 'healing',
  },
];

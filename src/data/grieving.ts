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
    title: 'Letters to the Stars',
    description: 'A compassionate session to help you express what was left unsaid through loving inner dialogue.',
    duration: 12,
    type: 'reflection',
    guidedScript:
      'Imagine the one you grieve is a star — luminous and ever-present in the sky above you. Breathe gently and begin to compose a letter in your heart. What would you say if you knew they could hear you? Speak it now, silently or aloud. There is nothing that cannot be said in this sacred space. Let the words flow like a river to the sea. They are received. They are heard. They are felt.',
    musicTone: 'comfort',
  },
  {
    id: 'g6',
    title: 'The Eternal Bond',
    description: 'Honour that love does not end with physical separation — it transforms and endures.',
    duration: 10,
    type: 'healing',
    guidedScript:
      'Place both hands over your heart and breathe slowly. Know that love is the only force that transcends time. The bond between you and those you have loved cannot be severed by any loss. With each breath, affirm: the love is still here. The connection endures. Breathe in the warmth of that unbroken bond. You carry them with you — in your laughter, in your courage, in your kindness.',
    musicTone: 'healing',
  },
  {
    id: 'g7',
    title: 'Rest in the River',
    description: 'Release grief into the great flow of life, trusting that healing moves in its own perfect time.',
    duration: 14,
    type: 'acceptance',
    guidedScript:
      'Visualise a great, sacred river — the ancient Nile at dusk. See your grief as a burden you have carried faithfully for a long time. Now, gently, place it on the surface of the water. Watch as the river carries it onward. You do not forget. You do not abandon. You simply allow the flow of life to move through you. With each exhale, release a little more. With each inhale, receive a little more peace. You are held. You are loved. And healing is already underway.',
    musicTone: 'calm',
  },
];

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
    title: 'The River of Remembrance',
    description: 'A compassionate journey to honor those you have lost and the love that remains within you, guided by the imagery of the sacred Nile.',
    duration: 12,
    type: 'reflection',
    guidedScript:
      'Imagine yourself sitting at the edge of a gentle river at twilight. The water carries your memories downstream — beautiful, tender, irreplaceable. You do not need to hold on tightly; the love you shared lives inside you, as the river carries the light of the stars. Breathe in softly through your nose and breathe out through your mouth. Let each breath be an act of love for yourself. You are worthy of care, of rest, of peace. The river flows on, and so do you — gently, bravely, and not alone.',
    musicTone: 'healing',
  },
  {
    id: 'g6',
    title: 'Wings of Healing',
    description: 'Inspired by the wings of Isis, embrace the ancient truth that grief and love are the same breath — and that healing is always possible.',
    duration: 10,
    type: 'healing',
    guidedScript:
      'Close your eyes and breathe gently — inhale through your nose, exhale through your mouth. Imagine wings of golden light wrapping around you, warm and encompassing. This is the embrace of something larger than your pain. Grief is not weakness; it is the measure of how deeply you have loved. Breathe in the knowing that healing does not mean forgetting — it means learning to carry love with open hands. With each breath, the golden warmth softens your sorrow. You are held. You are healing. You are whole.',
    musicTone: 'comfort',
  },
];

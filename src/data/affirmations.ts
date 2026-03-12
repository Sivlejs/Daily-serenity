export interface Affirmation {
  id: string;
  text: string;
  category: 'confidence' | 'gratitude' | 'peace' | 'growth' | 'self-love';
}

export const affirmations: Affirmation[] = [
  // Confidence
  { id: 'aff-1', text: 'I believe in my ability to succeed.', category: 'confidence' },
  { id: 'aff-2', text: 'I am capable of achieving my goals.', category: 'confidence' },
  { id: 'aff-3', text: 'I trust myself to make the right decisions.', category: 'confidence' },
  { id: 'aff-4', text: 'I am strong, capable, and resilient.', category: 'confidence' },
  { id: 'aff-5', text: 'I have the power to create change in my life.', category: 'confidence' },

  // Gratitude
  { id: 'aff-6', text: 'I am grateful for this moment and all it brings.', category: 'gratitude' },
  { id: 'aff-7', text: 'I appreciate the small joys in my daily life.', category: 'gratitude' },
  { id: 'aff-8', text: 'I am thankful for my health and well-being.', category: 'gratitude' },
  { id: 'aff-9', text: 'I recognize the abundance that surrounds me.', category: 'gratitude' },
  { id: 'aff-10', text: 'Every day brings new reasons to be thankful.', category: 'gratitude' },

  // Peace
  { id: 'aff-11', text: 'I release all tension and embrace calm.', category: 'peace' },
  { id: 'aff-12', text: 'My mind is quiet, and my heart is at peace.', category: 'peace' },
  { id: 'aff-13', text: 'I let go of worry and welcome serenity.', category: 'peace' },
  { id: 'aff-14', text: 'Peaceful thoughts flow through me with ease.', category: 'peace' },
  { id: 'aff-15', text: 'I am calm, centered, and grounded.', category: 'peace' },

  // Growth
  { id: 'aff-16', text: 'I am constantly growing and evolving.', category: 'growth' },
  { id: 'aff-17', text: 'Every challenge is an opportunity to learn.', category: 'growth' },
  { id: 'aff-18', text: 'I embrace change as a path to growth.', category: 'growth' },
  { id: 'aff-19', text: 'I am open to new experiences and perspectives.', category: 'growth' },
  { id: 'aff-20', text: 'I learn something valuable every day.', category: 'growth' },

  // Self-love
  { id: 'aff-21', text: 'I am worthy of love and respect.', category: 'self-love' },
  { id: 'aff-22', text: 'I honor my needs and treat myself with kindness.', category: 'self-love' },
  { id: 'aff-23', text: 'I am enough, just as I am.', category: 'self-love' },
  { id: 'aff-24', text: 'I forgive myself and let go of past mistakes.', category: 'self-love' },
  { id: 'aff-25', text: 'I celebrate my uniqueness and embrace who I am.', category: 'self-love' },
];

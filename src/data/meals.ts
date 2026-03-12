export interface MealSuggestion {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  mood: string[];
  prepTime: number;
}

export const meals: MealSuggestion[] = [
  {
    id: 'm1',
    name: 'Berry Overnight Oats',
    description: 'Rolled oats soaked with almond milk, topped with mixed berries, chia seeds, and a drizzle of honey.',
    category: 'breakfast',
    mood: ['energized', 'focused', 'calm'],
    prepTime: 5,
  },
  {
    id: 'm2',
    name: 'Avocado Toast with Eggs',
    description: 'Whole grain toast topped with smashed avocado, poached eggs, and a sprinkle of hemp seeds.',
    category: 'breakfast',
    mood: ['energized', 'content'],
    prepTime: 10,
  },
  {
    id: 'm3',
    name: 'Green Buddha Bowl',
    description: 'Quinoa base with roasted chickpeas, cucumber, spinach, avocado, and tahini dressing.',
    category: 'lunch',
    mood: ['calm', 'focused', 'balanced'],
    prepTime: 20,
  },
  {
    id: 'm4',
    name: 'Mediterranean Wrap',
    description: 'Whole wheat wrap filled with hummus, falafel, roasted veggies, and fresh herbs.',
    category: 'lunch',
    mood: ['energized', 'content'],
    prepTime: 15,
  },
  {
    id: 'm5',
    name: 'Salmon with Roasted Vegetables',
    description: 'Baked salmon fillet with a colorful medley of roasted sweet potato, broccoli, and bell peppers.',
    category: 'dinner',
    mood: ['calm', 'relaxed', 'content'],
    prepTime: 30,
  },
  {
    id: 'm6',
    name: 'Lentil Soup',
    description: 'Warming red lentil soup with turmeric, cumin, and a squeeze of lemon. Served with crusty bread.',
    category: 'dinner',
    mood: ['calm', 'comforted', 'balanced'],
    prepTime: 25,
  },
  {
    id: 'm7',
    name: 'Stir-Fried Tofu & Vegetables',
    description: 'Crispy tofu with colorful stir-fried vegetables in a ginger-sesame sauce over brown rice.',
    category: 'dinner',
    mood: ['energized', 'focused'],
    prepTime: 20,
  },
  {
    id: 'm8',
    name: 'Apple Slices with Almond Butter',
    description: 'Crisp apple slices paired with natural almond butter and a sprinkle of cinnamon.',
    category: 'snack',
    mood: ['energized', 'calm'],
    prepTime: 3,
  },
];

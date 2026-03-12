import type { Meditation } from '../data/meditations';
import type { BreathingExercise } from '../data/breathing';
import type { MealSuggestion } from '../data/meals';
import type { Affirmation } from '../data/affirmations';

const MS_PER_DAY = 86_400_000;

export function getDailyIndex(arrayLength: number): number {
  if (arrayLength === 0) return 0;
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / MS_PER_DAY);
  return dayOfYear % arrayLength;
}

export function getTodaysMeditation(meditationList: Meditation[]): Meditation {
  return meditationList[getDailyIndex(meditationList.length)];
}

export function getTodaysBreathingExercise(
  exercises: BreathingExercise[],
): BreathingExercise {
  return exercises[getDailyIndex(exercises.length)];
}

export function getTodaysMeals(mealList: MealSuggestion[]): {
  breakfast: MealSuggestion;
  lunch: MealSuggestion;
  dinner: MealSuggestion;
  snack: MealSuggestion;
} {
  const breakfasts = mealList.filter((m) => m.category === 'breakfast');
  const lunches = mealList.filter((m) => m.category === 'lunch');
  const dinners = mealList.filter((m) => m.category === 'dinner');
  const snacks = mealList.filter((m) => m.category === 'snack');
  return {
    breakfast: breakfasts[getDailyIndex(breakfasts.length)],
    lunch: lunches[getDailyIndex(lunches.length)],
    dinner: dinners[getDailyIndex(dinners.length)],
    snack: snacks[getDailyIndex(snacks.length)],
  };
}

export function getTodaysAffirmations(
  affirmations: Affirmation[],
  count: number = 3,
): Affirmation[] {
  const baseIndex = getDailyIndex(affirmations.length);
  const result: Affirmation[] = [];
  for (let i = 0; i < count; i++) {
    const index = (baseIndex + i) % affirmations.length;
    result.push(affirmations[index]);
  }
  return result;
}

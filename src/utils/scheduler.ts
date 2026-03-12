import type { Meditation } from '../data/meditations';
import type { BreathingExercise } from '../data/breathing';
import type { MealSuggestion } from '../data/meals';

export function getDailyIndex(arrayLength: number): number {
  if (arrayLength === 0) return 0;
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
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
} {
  const breakfasts = mealList.filter((m) => m.category === 'breakfast');
  const lunches = mealList.filter((m) => m.category === 'lunch');
  const dinners = mealList.filter((m) => m.category === 'dinner');
  return {
    breakfast: breakfasts[getDailyIndex(breakfasts.length)],
    lunch: lunches[getDailyIndex(lunches.length)],
    dinner: dinners[getDailyIndex(dinners.length)],
  };
}

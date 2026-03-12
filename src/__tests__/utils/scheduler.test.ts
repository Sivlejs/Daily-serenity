import { describe, it, expect } from 'vitest';
import { getDailyIndex, getTodaysMeals } from '../../utils/scheduler';
import { meals } from '../../data/meals';

describe('scheduler utils', () => {
  it('getDailyIndex returns the same value for the same call', () => {
    const idx1 = getDailyIndex(7);
    const idx2 = getDailyIndex(7);
    expect(idx1).toBe(idx2);
  });

  it('getDailyIndex returns a value within bounds', () => {
    const length = 5;
    const idx = getDailyIndex(length);
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(length);
  });

  it('getDailyIndex returns 0 for length 1', () => {
    expect(getDailyIndex(1)).toBe(0);
  });

  it('getDailyIndex returns 0 for empty array', () => {
    expect(getDailyIndex(0)).toBe(0);
  });

  it('getTodaysMeals includes a snack', () => {
    const plan = getTodaysMeals(meals);
    expect(plan.snack).toBeDefined();
    expect(plan.snack.category).toBe('snack');
  });

  it('getTodaysMeals returns all four meal categories', () => {
    const plan = getTodaysMeals(meals);
    expect(plan.breakfast.category).toBe('breakfast');
    expect(plan.lunch.category).toBe('lunch');
    expect(plan.dinner.category).toBe('dinner');
    expect(plan.snack.category).toBe('snack');
  });
});

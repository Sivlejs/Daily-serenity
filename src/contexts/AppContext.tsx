import { createContext, useContext, useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { Meditation } from '../data/meditations';
import type { BreathingExercise } from '../data/breathing';
import type { MealSuggestion } from '../data/meals';
import { meditations } from '../data/meditations';
import { breathingExercises } from '../data/breathing';
import { meals } from '../data/meals';
import { getTodaysMeditation, getTodaysBreathingExercise, getTodaysMeals } from '../utils/scheduler';
import { getItem, setItem, removeItem } from '../utils/storage';

interface DailyGuide {
  meditation: Meditation;
  breathingExercise: BreathingExercise;
  meals: { breakfast: MealSuggestion; lunch: MealSuggestion; dinner: MealSuggestion };
  completedActivities: string[];
  date: string;
}

interface DailyProgress {
  completedActivities: string[];
  date: string;
}

interface AppContextType {
  dailyGuide: DailyGuide | null;
  markActivityComplete: (activityId: string) => void;
  isActivityComplete: (activityId: string) => boolean;
  questionnaireAnswers: Record<string, string>;
  saveQuestionnaireAnswers: (answers: Record<string, string>) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const DS_PROGRESS_KEY = 'ds_daily_progress';
const DS_ANSWERS_KEY = 'ds_questionnaire_answers';

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const today = new Date().toISOString().slice(0, 10);

  const [dailyGuide, setDailyGuide] = useState<DailyGuide | null>(() => {
    const meditation = getTodaysMeditation(meditations);
    const breathingExercise = getTodaysBreathingExercise(breathingExercises);
    const mealPlan = getTodaysMeals(meals);
    const stored = getItem<DailyProgress>(DS_PROGRESS_KEY);
    let completedActivities: string[] = [];
    if (stored) {
      if (stored.date === today) {
        completedActivities = stored.completedActivities;
      } else {
        // Stale data from a previous day – clear it
        removeItem(DS_PROGRESS_KEY);
      }
    }
    return { meditation, breathingExercise, meals: mealPlan, completedActivities, date: today };
  });
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>(
    () => getItem<Record<string, string>>(DS_ANSWERS_KEY) ?? {},
  );

  const markActivityComplete = (activityId: string): void => {
    setDailyGuide((prev) => {
      if (!prev) return prev;
      if (prev.completedActivities.includes(activityId)) return prev;
      const updated = { ...prev, completedActivities: [...prev.completedActivities, activityId] };
      setItem<DailyProgress>(DS_PROGRESS_KEY, { completedActivities: updated.completedActivities, date: today });
      return updated;
    });
  };

  const isActivityComplete = (activityId: string): boolean =>
    dailyGuide?.completedActivities.includes(activityId) ?? false;

  const saveQuestionnaireAnswers = (answers: Record<string, string>): void => {
    setItem(DS_ANSWERS_KEY, answers);
    setQuestionnaireAnswers(answers);
  };

  const resetProgress = (): void => {
    removeItem(DS_PROGRESS_KEY);
    removeItem(DS_ANSWERS_KEY);
    setDailyGuide((prev) =>
      prev ? { ...prev, completedActivities: [] } : prev,
    );
    setQuestionnaireAnswers({});
  };

  return (
    <AppContext.Provider
      value={{ dailyGuide, markActivityComplete, isActivityComplete, questionnaireAnswers, saveQuestionnaireAnswers, resetProgress }}
    >
      {children}
    </AppContext.Provider>
  );
};

import { createContext, useContext, useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { Meditation } from '../data/meditations';
import type { BreathingExercise } from '../data/breathing';
import type { MealSuggestion } from '../data/meals';
import type { Affirmation } from '../data/affirmations';
import { meditations } from '../data/meditations';
import { breathingExercises } from '../data/breathing';
import { meals } from '../data/meals';
import { affirmations } from '../data/affirmations';
import { getTodaysMeditation, getTodaysBreathingExercise, getTodaysMeals, getTodaysAffirmations } from '../utils/scheduler';
import { getItem, setItem, removeItem } from '../utils/storage';

interface DailyGuide {
  meditation: Meditation;
  breathingExercise: BreathingExercise;
  meals: { breakfast: MealSuggestion; lunch: MealSuggestion; dinner: MealSuggestion; snack: MealSuggestion };
  affirmations: Affirmation[];
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
  currentMood: number | null;
  setMood: (mood: number) => void;
  journalEntry: string;
  setJournalEntry: (entry: string) => void;
  streak: number;
}

const AppContext = createContext<AppContextType | null>(null);

const DS_PROGRESS_KEY = 'ds_daily_progress';
const DS_ANSWERS_KEY = 'ds_questionnaire_answers';
const DS_MOOD_KEY = 'ds_daily_mood';
const DS_JOURNAL_KEY = 'ds_daily_journal';
const DS_STREAK_KEY = 'ds_streak';

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
    const dailyAffirmations = getTodaysAffirmations(affirmations, 3);
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
    return { meditation, breathingExercise, meals: mealPlan, affirmations: dailyAffirmations, completedActivities, date: today };
  });
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>(
    () => getItem<Record<string, string>>(DS_ANSWERS_KEY) ?? {},
  );

  // Mood: stored as { mood: number; date: string }
  const [currentMood, setCurrentMoodState] = useState<number | null>(() => {
    const stored = getItem<{ mood: number; date: string }>(DS_MOOD_KEY);
    if (stored && stored.date === today) return stored.mood;
    return null;
  });

  // Journal: stored as { entry: string; date: string }
  const [journalEntry, setJournalEntryState] = useState<string>(() => {
    const stored = getItem<{ entry: string; date: string }>(DS_JOURNAL_KEY);
    if (stored && stored.date === today) return stored.entry;
    return '';
  });

  // Streak: stored as { count: number; lastDate: string }
  const [streak, setStreak] = useState<number>(() => {
    const stored = getItem<{ count: number; lastDate: string }>(DS_STREAK_KEY);
    if (!stored) return 0;
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    if (stored.lastDate === today || stored.lastDate === yesterday) return stored.count;
    // Streak is broken
    return 0;
  });

  const markActivityComplete = (activityId: string): void => {
    setDailyGuide((prev) => {
      if (!prev) return prev;
      if (prev.completedActivities.includes(activityId)) return prev;
      const updated = { ...prev, completedActivities: [...prev.completedActivities, activityId] };
      setItem<DailyProgress>(DS_PROGRESS_KEY, { completedActivities: updated.completedActivities, date: today });

      // Update streak when all core activities are completed
      const coreActivities = [prev.meditation.id, prev.breathingExercise.id];
      const allCoreCompleted = coreActivities.every(
        (id) => updated.completedActivities.includes(id),
      );
      if (allCoreCompleted) {
        const stored = getItem<{ count: number; lastDate: string }>(DS_STREAK_KEY);
        const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
        let newCount = 1;
        if (stored) {
          if (stored.lastDate === today) {
            newCount = stored.count;
          } else if (stored.lastDate === yesterday) {
            newCount = stored.count + 1;
          }
        }
        setItem(DS_STREAK_KEY, { count: newCount, lastDate: today });
        setStreak(newCount);
      }

      return updated;
    });
  };

  const isActivityComplete = (activityId: string): boolean =>
    dailyGuide?.completedActivities.includes(activityId) ?? false;

  const saveQuestionnaireAnswers = (answers: Record<string, string>): void => {
    setItem(DS_ANSWERS_KEY, answers);
    setQuestionnaireAnswers(answers);
  };

  const setMood = (mood: number): void => {
    setItem(DS_MOOD_KEY, { mood, date: today });
    setCurrentMoodState(mood);
  };

  const setJournalEntry = (entry: string): void => {
    setItem(DS_JOURNAL_KEY, { entry, date: today });
    setJournalEntryState(entry);
  };

  const resetProgress = (): void => {
    removeItem(DS_PROGRESS_KEY);
    removeItem(DS_ANSWERS_KEY);
    removeItem(DS_MOOD_KEY);
    removeItem(DS_JOURNAL_KEY);
    setDailyGuide((prev) =>
      prev ? { ...prev, completedActivities: [] } : prev,
    );
    setQuestionnaireAnswers({});
    setCurrentMoodState(null);
    setJournalEntryState('');
  };

  return (
    <AppContext.Provider
      value={{
        dailyGuide,
        markActivityComplete,
        isActivityComplete,
        questionnaireAnswers,
        saveQuestionnaireAnswers,
        resetProgress,
        currentMood,
        setMood,
        journalEntry,
        setJournalEntry,
        streak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

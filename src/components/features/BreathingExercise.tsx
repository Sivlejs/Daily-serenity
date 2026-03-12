import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { BreathingExercise as BreathingExerciseType } from '../../data/breathing';
import { useApp } from '../../contexts/AppContext';
import { speak, stopSpeech, isSpeechSupported } from '../../utils/audioService';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface BreathingExerciseProps {
  exercise: BreathingExerciseType;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'idle';

const phaseColors: Record<Phase, string> = {
  inhale: '#C8970A',   /* Kemetic gold – drawing in the light of Ra */
  hold: '#1B3A6B',     /* lapis lazuli – stillness of deep water */
  exhale: '#7B2D2D',   /* earthy terracotta – releasing to the earth */
  idle: '#8B7355',     /* warm sand – at rest */
};

const phaseLabels: Record<Phase, string> = {
  inhale: 'Inhale',
  hold: 'Hold',
  exhale: 'Exhale',
  idle: 'Ready',
};

function getPhaseDuration(p: Phase, inhale: number, hold: number, exhale: number): number {
  if (p === 'inhale') return inhale;
  if (p === 'hold') return hold;
  if (p === 'exhale') return exhale;
  return 0;
}

function getNextPhase(current: Phase, hold: number): Phase {
  if (current === 'inhale') return hold > 0 ? 'hold' : 'exhale';
  if (current === 'hold') return 'exhale';
  return 'inhale';
}

const BreathingExercise: FC<BreathingExerciseProps> = ({ exercise }) => {
  const { markActivityComplete, isActivityComplete } = useApp();
  const completed = isActivityComplete(exercise.id);

  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cyclesDone, setCyclesDone] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef<Phase>('idle');
  const timeRef = useRef(0);
  const cyclesRef = useRef(0);
  const exerciseRef = useRef(exercise);
  const markCompleteRef = useRef(markActivityComplete);
  const voiceOnRef = useRef(voiceOn);

  useEffect(() => {
    exerciseRef.current = exercise;
  }, [exercise]);

  useEffect(() => {
    markCompleteRef.current = markActivityComplete;
  }, [markActivityComplete]);

  useEffect(() => {
    voiceOnRef.current = voiceOn;
  }, [voiceOn]);

  const announcePhase = (p: Phase) => {
    if (!voiceOnRef.current || !isSpeechSupported()) return;
    const ex = exerciseRef.current;
    const prompt = p === 'inhale' ? ex.prompts.inhale : p === 'hold' ? ex.prompts.hold : ex.prompts.exhale;
    speak(prompt);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setPhase('idle');
    setTimeLeft(0);
    setCyclesDone(0);
    phaseRef.current = 'idle';
    cyclesRef.current = 0;
    stopSpeech();
  };

  const start = () => {
    phaseRef.current = 'inhale';
    timeRef.current = exercise.inhale;
    cyclesRef.current = 0;
    setPhase('inhale');
    setTimeLeft(exercise.inhale);
    setCyclesDone(0);
    setIsRunning(true);
    announcePhase('inhale');
  };

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      timeRef.current -= 1;
      setTimeLeft(timeRef.current);

      if (timeRef.current <= 0) {
        const ex = exerciseRef.current;
        const next = getNextPhase(phaseRef.current, ex.hold);
        if (next === 'inhale') {
          cyclesRef.current += 1;
          setCyclesDone(cyclesRef.current);
          if (cyclesRef.current >= ex.cycles) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRunning(false);
            setPhase('idle');
            setTimeLeft(0);
            cyclesRef.current = 0;
            stopSpeech();
            markCompleteRef.current(ex.id);
            return;
          }
        }
        phaseRef.current = next;
        timeRef.current = getPhaseDuration(next, ex.inhale, ex.hold, ex.exhale);
        setPhase(next);
        setTimeLeft(timeRef.current);
        announcePhase(next);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    if (!next) stopSpeech();
  };

  const circleSize = 120;

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ color: '#1B3A6B' }}>{exercise.name}</h3>
        {completed && <span style={{ color: '#C8970A', fontWeight: 600 }}>✓ Done</span>}
      </div>
      <p style={{ color: '#5C4A2A', fontSize: '0.9rem', marginBottom: '8px' }}>{exercise.description}</p>
      <p style={{ color: '#C8970A', fontSize: '0.85rem', fontWeight: 500, marginBottom: '16px' }}>
        ☥ {exercise.benefit}
      </p>

      {/* Voice toggle */}
      {isSpeechSupported() && !completed && (
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={toggleVoice}
            aria-pressed={voiceOn}
            style={{
              fontSize: '0.78rem',
              padding: '4px 10px',
              borderRadius: '999px',
              border: `1.5px solid ${voiceOn ? '#C8970A' : '#D4B896'}`,
              background: voiceOn ? '#C8970A15' : 'transparent',
              color: voiceOn ? '#C8970A' : '#8B7355',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            🎙 Voice {voiceOn ? 'On' : 'Off'}
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          width: circleSize, height: circleSize,
          borderRadius: '50%',
          background: phaseColors[phase] + '20',
          border: `4px solid ${phaseColors[phase]}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
          transition: 'all 0.5s ease',
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: phaseColors[phase] }}>
            {isRunning ? timeLeft : ''}
          </span>
          <span style={{ fontSize: '0.85rem', color: phaseColors[phase], fontWeight: 600 }}>
            {phaseLabels[phase]}
          </span>
        </div>
        <p style={{ color: '#8B7355', fontSize: '0.85rem' }}>
          Cycle {cyclesDone + (isRunning ? 1 : 0)} of {exercise.cycles}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.8rem', color: '#5C4A2A' }}>In: {exercise.inhale}s</span>
        {exercise.hold > 0 && <span style={{ fontSize: '0.8rem', color: '#5C4A2A' }}>Hold: {exercise.hold}s</span>}
        <span style={{ fontSize: '0.8rem', color: '#5C4A2A' }}>Out: {exercise.exhale}s</span>
        <span style={{ fontSize: '0.8rem', color: '#5C4A2A' }}>{exercise.cycles} cycles</span>
      </div>

      {!completed && (
        isRunning
          ? <Button variant="outline" onClick={stop} fullWidth>Stop</Button>
          : <Button variant="secondary" onClick={start} fullWidth>Start Exercise</Button>
      )}
    </Card>
  );
};

export default BreathingExercise;

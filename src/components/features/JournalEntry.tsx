import { useRef } from 'react';
import type { FC } from 'react';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';

const MAX_LENGTH = 1000;

const JournalEntry: FC = () => {
  const { journalEntry, setJournalEntry } = useApp();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (value.length > MAX_LENGTH) return;
    // Optimistic update immediately shown; debounce the persist call
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setJournalEntry(value);
    }, 400);
    // Also call synchronously so the textarea is controlled without lag
    setJournalEntry(value);
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <h3 style={{ color: '#1E293B' }}>📝 Daily Reflection</h3>
        <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{journalEntry.length}/{MAX_LENGTH}</span>
      </div>
      <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '14px' }}>
        What's on your mind today? Jot down thoughts, intentions, or gratitude.
      </p>
      <textarea
        value={journalEntry}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write freely — this is your space…"
        rows={5}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '12px',
          borderRadius: '10px',
          border: '1.5px solid #CBD5E1',
          fontSize: '0.92rem',
          fontFamily: 'inherit',
          lineHeight: 1.6,
          color: '#1E293B',
          background: '#F8FAFC',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; }}
      />
      {journalEntry.length > 0 && (
        <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#0D9488' }}>✓ Entry saved</p>
      )}
    </Card>
  );
};

export default JournalEntry;

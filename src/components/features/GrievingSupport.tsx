import { useState } from 'react';
import type { FC } from 'react';
import type { GrievingSession } from '../../data/grieving';
import { speakGrieving, stopSpeech, startTone, stopTone, isSpeechSupported, isAudioContextSupported } from '../../utils/audioService';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface GrievingSupportProps {
  session: GrievingSession;
}

const typeColors: Record<GrievingSession['type'], string> = {
  comfort: '#B8860B',     /* Kemetic gold – warm, embracing */
  reflection: '#1B3A6B',  /* deep lapis blue – contemplative depth */
  healing: '#8B4513',     /* earthy sienna – grounded restoration */
  acceptance: '#4A3060',  /* violet-night – peaceful release */
};

const typeEmoji: Record<GrievingSession['type'], string> = {
  comfort: '☥',
  reflection: '𓂀',
  healing: '𓋹',
  acceptance: '𓅃',
};

const GrievingSupport: FC<GrievingSupportProps> = ({ session }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [narrationOn, setNarrationOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);

  const color = typeColors[session.type];

  const handlePlay = () => {
    setIsPlaying(true);
    if (musicOn) startTone(session.musicTone);
    if (narrationOn) {
      speakGrieving(session.guidedScript, () => {
        stopTone();
        setIsPlaying(false);
      });
    }
  };

  const handleStop = () => {
    stopSpeech();
    stopTone();
    setIsPlaying(false);
  };

  const toggleNarration = () => {
    const next = !narrationOn;
    setNarrationOn(next);
    if (isPlaying) {
      if (next) {
        // Web Speech API has no resume – restart from beginning when re-enabled
        speakGrieving(session.guidedScript, () => {
          stopTone();
          setIsPlaying(false);
        });
      } else {
        stopSpeech();
      }
    }
  };

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    if (isPlaying) {
      if (next) {
        startTone(session.musicTone);
      } else {
        stopTone();
      }
    }
  };

  return (
    <Card>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{
          fontSize: '0.8rem',
          background: color + '20',
          color,
          padding: '3px 10px',
          borderRadius: '999px',
          fontWeight: 600,
          textTransform: 'capitalize',
        }}>
          {typeEmoji[session.type]} {session.type}
        </span>
        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>⏱ {session.duration} min</span>
      </div>

      <h3 style={{ color: '#1B3A6B', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>{session.title}</h3>
      <p style={{ color: '#7A5C2E', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>{session.description}</p>

      {/* Script preview */}
      <blockquote style={{
        borderLeft: `3px solid ${color}`,
        paddingLeft: '12px',
        margin: '0 0 16px 0',
        color: '#5C4020',
        fontSize: '0.88rem',
        fontStyle: 'italic',
        lineHeight: 1.7,
        fontFamily: 'Georgia, serif',
      }}>
        {session.guidedScript.length > 160
          ? session.guidedScript.slice(0, 160) + '…'
          : session.guidedScript}
      </blockquote>

      {/* Audio toggles */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {isSpeechSupported() && (
          <button
            onClick={toggleNarration}
            aria-pressed={narrationOn}
            style={{
              fontSize: '0.78rem',
              padding: '4px 10px',
              borderRadius: '999px',
              border: `1.5px solid ${narrationOn ? '#B8860B' : '#D4B483'}`,
              background: narrationOn ? '#B8860B15' : 'transparent',
              color: narrationOn ? '#B8860B' : '#7A5C2E',
              cursor: 'pointer',
              fontWeight: 600,
              fontFamily: 'Georgia, serif',
            }}
          >
            🎙 Narration {narrationOn ? 'On' : 'Off'}
          </button>
        )}
        {isAudioContextSupported() && (
          <button
            onClick={toggleMusic}
            aria-pressed={musicOn}
            style={{
              fontSize: '0.78rem',
              padding: '4px 10px',
              borderRadius: '999px',
              border: `1.5px solid ${musicOn ? '#1B3A6B' : '#D4B483'}`,
              background: musicOn ? '#1B3A6B15' : 'transparent',
              color: musicOn ? '#1B3A6B' : '#7A5C2E',
              cursor: 'pointer',
              fontWeight: 600,
              fontFamily: 'Georgia, serif',
            }}
          >
            🎵 Music {musicOn ? 'On' : 'Off'}
          </button>
        )}
      </div>

      {/* Playback controls */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {isPlaying ? (
          <Button variant="outline" onClick={handleStop} fullWidth>⏹ Stop</Button>
        ) : (
          <Button variant="primary" onClick={handlePlay} fullWidth>
            ▶ Begin Session
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GrievingSupport;

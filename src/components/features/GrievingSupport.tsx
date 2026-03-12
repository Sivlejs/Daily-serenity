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
  comfort: '#A0783A',    /* Kemetic gold – warmth */
  reflection: '#1A5E7A', /* Nile blue – depth */
  healing: '#5C3A1E',    /* earth – grounding */
  acceptance: '#4A6B3A', /* Nile green – growth */
};

const typeEmoji: Record<GrievingSession['type'], string> = {
  comfort: '🤗',
  reflection: '🌿',
  healing: '💛',
  acceptance: '🕊️',
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
        <span style={{ fontSize: '0.85rem', color: '#6B4C2A' }}>⏱ {session.duration} min</span>
      </div>

      <h3 style={{ color: '#2C1810', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>{session.title}</h3>
      <p style={{ color: '#6B4C2A', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>{session.description}</p>

      {/* Script preview */}
      <blockquote style={{
        borderLeft: `3px solid ${color}`,
        paddingLeft: '12px',
        margin: '0 0 16px 0',
        color: '#5C3A1E',
        fontSize: '0.88rem',
        fontStyle: 'italic',
        lineHeight: 1.7,
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
              border: `1.5px solid ${narrationOn ? '#C9A84C' : '#D4B896'}`,
              background: narrationOn ? '#C9A84C20' : 'transparent',
              color: narrationOn ? '#A0783A' : '#9A8060',
              cursor: 'pointer',
              fontWeight: 600,
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
              border: `1.5px solid ${musicOn ? '#1A5E7A' : '#D4B896'}`,
              background: musicOn ? '#1A5E7A20' : 'transparent',
              color: musicOn ? '#1A5E7A' : '#9A8060',
              cursor: 'pointer',
              fontWeight: 600,
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

import type { FC } from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
  height?: number;
}

const ProgressBar: FC<ProgressBarProps> = ({
  value,
  label,
  color = '#7C3AED',
  height = 8,
}) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.9rem', color: '#64748B' }}>{label}</span>
          <span style={{ fontSize: '0.9rem', color: '#64748B' }}>{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: `${height}px`,
          background: '#E2E8F0',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            background: color,
            borderRadius: '999px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

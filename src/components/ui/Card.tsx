import type { FC, ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
}

const paddingMap = { sm: '12px', md: '20px', lg: '32px' };

const Card: FC<CardProps> = ({ children, title, className, padding = 'md', shadow = true }) => {
  const style: CSSProperties = {
    background: '#fff',
    borderRadius: '14px',
    padding: paddingMap[padding],
    boxShadow: shadow ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
    border: '1px solid #E2E8F0',
  };

  return (
    <div style={style} className={className}>
      {title && (
        <h3 style={{ marginBottom: '12px', color: '#1E293B', fontSize: '1.1rem' }}>{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;

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
    background: 'linear-gradient(160deg, #FDF6E3 0%, #F5E6C8 100%)',
    borderRadius: '14px',
    padding: paddingMap[padding],
    boxShadow: shadow ? '0 4px 20px rgba(200,151,10,0.12), 0 1px 4px rgba(0,0,0,0.08)' : 'none',
    border: '1px solid #D4B896',
  };

  return (
    <div style={style} className={className}>
      {title && (
        <h3 style={{ marginBottom: '12px', color: '#1B3A6B', fontSize: '1.1rem' }}>{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;

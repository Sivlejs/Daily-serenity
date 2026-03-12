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
    background: 'linear-gradient(160deg, #FFFDF5 0%, #FDF6E3 100%)',
    borderRadius: '14px',
    padding: paddingMap[padding],
    boxShadow: shadow ? '0 4px 18px rgba(90,50,0,0.10)' : 'none',
    border: '1px solid #D4B483',
  };

  return (
    <div style={style} className={className}>
      {title && (
        <h3 style={{ marginBottom: '12px', color: '#1B3A6B', fontSize: '1.1rem', fontFamily: 'Georgia, serif', borderBottom: '1px solid #D4B483', paddingBottom: '6px' }}>{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;

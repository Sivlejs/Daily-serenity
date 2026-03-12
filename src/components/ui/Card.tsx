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
    background: 'linear-gradient(160deg, #FFF8ED 0%, #F5E6C8 100%)',
    borderRadius: '10px',
    padding: paddingMap[padding],
    boxShadow: shadow ? '0 4px 18px rgba(44, 24, 16, 0.12), inset 0 1px 0 rgba(201,168,76,0.15)' : 'none',
    border: '1px solid #D4B896',
    position: 'relative' as const,
  };

  return (
    <div style={style} className={className}>
      {title && (
        <h3 style={{ marginBottom: '12px', color: '#2C1810', fontSize: '1.1rem', fontFamily: 'Georgia, serif' }}>{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;

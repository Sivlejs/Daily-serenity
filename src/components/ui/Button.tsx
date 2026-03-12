import type { FC, ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string;
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: 'none',
  fontFamily: 'Georgia, serif',
  letterSpacing: '0.03em',
};

const variantStyles: Record<string, CSSProperties> = {
  primary: { background: '#B8860B', color: '#FDF6E3', border: '2px solid #DAA520' },
  secondary: { background: '#1B3A6B', color: '#DAA520', border: '2px solid #2E5FA3' },
  outline: { background: 'transparent', color: '#B8860B', border: '2px solid #B8860B' },
  ghost: { background: 'transparent', color: '#B8860B' },
};

const sizeStyles: Record<string, CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: '0.85rem' },
  md: { padding: '10px 22px', fontSize: '1rem' },
  lg: { padding: '14px 30px', fontSize: '1.1rem' },
};

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  fullWidth = false,
  className,
}) => {
  const style: CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(fullWidth ? { width: '100%' } : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={style}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;

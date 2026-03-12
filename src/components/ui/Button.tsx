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
  fontFamily: 'inherit',
};

const variantStyles: Record<string, CSSProperties> = {
  primary: { background: '#7C3AED', color: '#fff' },
  secondary: { background: '#0D9488', color: '#fff' },
  outline: { background: 'transparent', color: '#7C3AED', border: '2px solid #7C3AED' },
  ghost: { background: 'transparent', color: '#7C3AED' },
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

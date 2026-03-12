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
  borderRadius: '8px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: 'none',
  fontFamily: 'Georgia, serif',
  letterSpacing: '0.04em',
};

const variantStyles: Record<string, CSSProperties> = {
  primary: { background: 'linear-gradient(135deg, #C9A84C, #A0783A)', color: '#FBF5E6', border: '1px solid #A0783A' },
  secondary: { background: 'linear-gradient(135deg, #1A5E7A, #0F3D52)', color: '#EDD9A3', border: '1px solid #1A5E7A' },
  outline: { background: 'transparent', color: '#C9A84C', border: '2px solid #C9A84C' },
  ghost: { background: 'transparent', color: '#C9A84C' },
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

import { useState } from 'react';
import type { FC, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

type Tab = 'login' | 'register';

const AuthPage: FC = () => {
  const { login, register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  const validateLogin = (): boolean => {
    const errs: Record<string, string> = {};
    if (!loginEmail) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) errs.email = 'Invalid email format';
    if (!loginPassword) errs.password = 'Password is required';
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateRegister = (): boolean => {
    const errs: Record<string, string> = {};
    if (!regName) errs.name = 'Name is required';
    if (!regEmail) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errs.email = 'Invalid email format';
    if (!regPassword) errs.password = 'Password is required';
    else if (regPassword.length < 8) errs.password = 'Password must be at least 8 characters';
    if (!regConfirm) errs.confirm = 'Please confirm your password';
    else if (regPassword !== regConfirm) errs.confirm = 'Passwords do not match';
    setRegErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    try {
      await login(loginEmail, loginPassword);
      navigate('/dashboard', { replace: true });
    } catch {
      // error shown from context
    }
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;
    try {
      await register(regName, regEmail, regPassword);
      navigate('/dashboard', { replace: true });
    } catch {
      // error shown from context
    }
  };

  const inputStyle: CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #E2E8F0', fontSize: '1rem', outline: 'none',
    fontFamily: 'inherit',
  };

  const errorStyle: CSSProperties = { color: '#EF4444', fontSize: '0.8rem', marginTop: '4px' };
  const labelStyle: CSSProperties = { fontSize: '0.9rem', fontWeight: 500, color: '#1E293B', marginBottom: '4px', display: 'block' };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '3rem' }}>🌸</span>
          <h1 style={{ color: '#7C3AED', fontSize: '1.8rem', marginTop: '8px' }}>Daily Serenity</h1>
          <p style={{ color: '#64748B', marginTop: '4px' }}>Your journey to well-being starts here.</p>
        </div>

        <Card padding="lg">
          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '2px solid #E2E8F0' }}>
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '10px', background: 'none', border: 'none',
                  borderBottom: tab === t ? '2px solid #7C3AED' : '2px solid transparent',
                  color: tab === t ? '#7C3AED' : '#64748B',
                  fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
                  fontSize: '1rem', marginBottom: '-2px', fontFamily: 'inherit',
                }}
              >
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          {tab === 'login' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" />
                {loginErrors.email && <p style={errorStyle}>{loginErrors.email}</p>}
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={inputStyle} placeholder="••••••••" />
                {loginErrors.password && <p style={errorStyle}>{loginErrors.password}</p>}
              </div>
              <Button variant="primary" fullWidth onClick={handleLogin} disabled={isLoading} type="submit">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} style={inputStyle} placeholder="Jane Doe" />
                {regErrors.name && <p style={errorStyle}>{regErrors.name}</p>}
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" />
                {regErrors.email && <p style={errorStyle}>{regErrors.email}</p>}
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} style={inputStyle} placeholder="Min. 8 characters" />
                {regErrors.password && <p style={errorStyle}>{regErrors.password}</p>}
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input type="password" value={regConfirm} onChange={(e) => setRegConfirm(e.target.value)} style={inputStyle} placeholder="Repeat password" />
                {regErrors.confirm && <p style={errorStyle}>{regErrors.confirm}</p>}
              </div>
              <Button variant="primary" fullWidth onClick={handleRegister} disabled={isLoading} type="submit">
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;

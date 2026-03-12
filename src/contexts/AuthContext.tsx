import { createContext, useContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  hasCompletedQuestionnaire: boolean;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DS_USER_KEY = 'ds_user';
const DS_USERS_KEY = 'ds_users';

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getItem<User>(DS_USER_KEY);
    if (stored) setUser(stored);
  }, []);

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const users = getItem<StoredUser[]>(DS_USERS_KEY) ?? [];
      if (users.some((u) => u.email === email)) {
        throw new Error('An account with this email already exists.');
      }
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        name,
        email,
        createdAt: new Date().toISOString(),
        hasCompletedQuestionnaire: false,
        // SECURITY WARNING: btoa is Base64 encoding, NOT a cryptographic hash.
        // This is intentionally demo-only client-side storage to avoid a backend
        // dependency. A production application MUST use a server-side API with
        // bcrypt/scrypt/Argon2 password hashing – never store credentials this way.
        passwordHash: btoa(email + ':' + password),
      };
      setItem(DS_USERS_KEY, [...users, newUser]);
      const publicUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        hasCompletedQuestionnaire: newUser.hasCompletedQuestionnaire,
      };
      setItem(DS_USER_KEY, publicUser);
      setUser(publicUser);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const users = getItem<StoredUser[]>(DS_USERS_KEY) ?? [];
      const found = users.find(
        (u) => u.email === email && u.passwordHash === btoa(email + ':' + password),
      );
      if (!found) throw new Error('Invalid email or password.');
      const publicUser: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        createdAt: found.createdAt,
        hasCompletedQuestionnaire: found.hasCompletedQuestionnaire,
      };
      setItem(DS_USER_KEY, publicUser);
      setUser(publicUser);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    removeItem(DS_USER_KEY);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>): void => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setItem(DS_USER_KEY, updated);
    const users = getItem<StoredUser[]>(DS_USERS_KEY) ?? [];
    const updatedUsers = users.map((u) =>
      u.id === updated.id ? { ...u, ...updates } : u,
    );
    setItem(DS_USERS_KEY, updatedUsers);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, error, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

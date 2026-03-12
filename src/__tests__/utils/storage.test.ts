import { describe, it, expect, beforeEach } from 'vitest';
import { getItem, setItem, removeItem, clearAll } from '../../utils/storage';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null for missing keys', () => {
    expect(getItem('nonexistent')).toBeNull();
  });

  it('setItem and getItem round-trip', () => {
    setItem('testKey', { name: 'Alice', age: 30 });
    expect(getItem<{ name: string; age: number }>('testKey')).toEqual({ name: 'Alice', age: 30 });
  });

  it('removeItem deletes the key', () => {
    setItem('deleteMe', 'value');
    removeItem('deleteMe');
    expect(getItem('deleteMe')).toBeNull();
  });

  it('clearAll removes all keys', () => {
    setItem('k1', 1);
    setItem('k2', 2);
    clearAll();
    expect(getItem('k1')).toBeNull();
    expect(getItem('k2')).toBeNull();
  });
});

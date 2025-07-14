import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Custom hook for automatic saving of data
 * @param {*} data - The data to save
 * @param {string} key - The storage key for the data
 * @param {number} delay - Delay in milliseconds before saving (default: 2000)
 * @param {boolean} enabled - Whether autosave is enabled (default: true)
 */
export const useAutosave = (data, key, delay = 2000, enabled = true) => {
  const { user, addActivity } = useAuth();
  const timeoutRef = useRef(null);
  const lastSavedRef = useRef(null);

  const saveData = useCallback(async () => {
    if (!enabled || !user || !key) return;

    try {
      // Create a storage key that includes the user ID
      const storageKey = `${user.id}_${key}`;
      
      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify({
        data,
        timestamp: new Date().toISOString(),
        userId: user.id
      }));

      // Update last saved reference
      lastSavedRef.current = JSON.stringify(data);

      // Add activity log
      addActivity(`Auto-saved ${key}`, `Data saved at ${new Date().toLocaleTimeString()}`);

      console.log(`Auto-saved ${key} for user ${user.id}`);
    } catch (error) {
      console.error('Autosave failed:', error);
    }
  }, [data, key, enabled, user, addActivity]);

  const loadData = useCallback(() => {
    if (!user || !key) return null;

    try {
      const storageKey = `${user.id}_${key}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.data;
      }
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
    
    return null;
  }, [user, key]);

  const clearSavedData = useCallback(() => {
    if (!user || !key) return;

    try {
      const storageKey = `${user.id}_${key}`;
      localStorage.removeItem(storageKey);
      lastSavedRef.current = null;
      addActivity(`Cleared saved ${key}`);
    } catch (error) {
      console.error('Failed to clear saved data:', error);
    }
  }, [user, key, addActivity]);

  const forceSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    saveData();
  }, [saveData]);

  useEffect(() => {
    if (!enabled || !data || !user) return;

    // Check if data has changed
    const currentData = JSON.stringify(data);
    if (currentData === lastSavedRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for saving
    timeoutRef.current = setTimeout(() => {
      saveData();
    }, delay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, saveData, user]);

  // Save immediately when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        saveData();
      }
    };
  }, [saveData]);

  return {
    loadData,
    clearSavedData,
    forceSave,
    isEnabled: enabled && !!user
  };
};

/**
 * Hook for managing autosave status across the application
 */
export const useAutosaveStatus = () => {
  const { user } = useAuth();

  const getAutosaveKeys = useCallback(() => {
    if (!user) return [];

    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${user.id}_`)) {
        keys.push(key.replace(`${user.id}_`, ''));
      }
    }
    return keys;
  }, [user]);

  const getAutosaveInfo = useCallback((key) => {
    if (!user || !key) return null;

    try {
      const storageKey = `${user.id}_${key}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          timestamp: parsed.timestamp,
          hasData: !!parsed.data,
          size: JSON.stringify(parsed.data).length
        };
      }
    } catch (error) {
      console.error('Failed to get autosave info:', error);
    }
    
    return null;
  }, [user]);

  const clearAllAutosaveData = useCallback(() => {
    if (!user) return;

    const keys = getAutosaveKeys();
    keys.forEach(key => {
      const storageKey = `${user.id}_${key}`;
      localStorage.removeItem(storageKey);
    });
  }, [user, getAutosaveKeys]);

  return {
    getAutosaveKeys,
    getAutosaveInfo,
    clearAllAutosaveData
  };
};


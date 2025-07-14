import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    const savedActivity = localStorage.getItem('recentActivity');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedActivity) {
      setRecentActivity(JSON.parse(savedActivity));
    }
    
    setIsLoading(false);
  }, []);

  const signIn = async (email, password) => {
    // Placeholder for authentication logic
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: null
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    addActivity('User signed in');
    return mockUser;
  };

  const signUp = async (email, password, name) => {
    // Placeholder for registration logic
    const mockUser = {
      id: '1',
      email,
      name: name || email.split('@')[0],
      avatar: null
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    addActivity('User account created');
    return mockUser;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('recentActivity');
    setRecentActivity([]);
  };

  const addActivity = (action, details = null) => {
    const newActivity = {
      id: Date.now(),
      action,
      details,
      timestamp: new Date().toISOString()
    };
    
    const updatedActivity = [newActivity, ...recentActivity.slice(0, 4)];
    setRecentActivity(updatedActivity);
    localStorage.setItem('recentActivity', JSON.stringify(updatedActivity));
  };

  const value = {
    user,
    isLoading,
    recentActivity,
    signIn,
    signUp,
    signOut,
    addActivity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


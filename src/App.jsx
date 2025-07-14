import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout/Layout';
import { Router } from '@/components/Router/Router';
import './lib/i18n';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (path) => {
    setCurrentPath(path);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout currentPath={currentPath} onNavigate={handleNavigate}>
          <Router currentPath={currentPath} onNavigate={handleNavigate} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


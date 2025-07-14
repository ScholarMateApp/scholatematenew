# ScholarMate Development Guide

This guide provides detailed instructions for implementing the full ScholarMate application features.

## 🏗️ Architecture Overview

### Frontend Architecture
- **React 19** with functional components and hooks
- **Context API** for state management
- **Custom hooks** for reusable logic
- **Component-based** modular design

### State Management Strategy
```
App Level:
├── ThemeContext (Dark/Light mode)
├── AuthContext (User authentication)
├── LanguageContext (i18n)
└── Feature-specific contexts (as needed)
```

### Component Hierarchy
```
App
├── Layout
│   ├── Header (Auth, Theme, Language)
│   ├── Sidebar (Navigation)
│   └── Main Content
├── Router (Page routing)
├── Auth Modal (Sign in/up/forgot)
└── Feature Pages
```

## 🔧 Implementation Roadmap

### Phase 1: Backend Setup (Recommended)

#### 1.1 Authentication Service
```javascript
// Example API structure
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/profile
PUT  /api/auth/profile
```

#### 1.2 User Data Service
```javascript
// User data endpoints
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account
GET    /api/users/activity
POST   /api/users/activity
```

#### 1.3 Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User activity table
CREATE TABLE user_activity (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Saved data table
CREATE TABLE user_data (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  data_key VARCHAR NOT NULL,
  data_value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Phase 2: AI Research Assistant

#### 2.1 Research Service Integration
```javascript
// src/services/researchService.js
export class ResearchService {
  async askQuestion(question, context = {}) {
    const response = await fetch('/api/research/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context })
    });
    return response.json();
  }

  async getMultiplePerspectives(question) {
    // Implementation for different viewpoints
  }

  async getFollowUpQuestions(conversation) {
    // Implementation for follow-up suggestions
  }
}
```

#### 2.2 Research Component Implementation
```javascript
// src/pages/AIResearch.jsx - Enhanced version
import { useState } from 'react';
import { useAutosave } from '@/hooks/useAutosave';
import { ResearchService } from '@/services/researchService';

export const AIResearch = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Autosave conversation
  useAutosave(conversation, 'research-conversation');

  const handleAskQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await ResearchService.askQuestion(question);
      setConversation(prev => [...prev, { question, response }]);
      setQuestion('');
    } catch (error) {
      console.error('Research failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Question input */}
      <div className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your research question..."
          className="w-full p-4 border rounded-lg"
          rows={3}
        />
        <button
          onClick={handleAskQuestion}
          disabled={!question.trim() || isLoading}
          className="px-6 py-2 bg-primary text-white rounded-lg"
        >
          {isLoading ? 'Researching...' : 'Ask Question'}
        </button>
      </div>

      {/* Conversation history */}
      <div className="space-y-4">
        {conversation.map((item, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="font-semibold mb-2">Q: {item.question}</div>
            <div className="text-muted-foreground">{item.response}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Phase 3: Citation Generator

#### 3.1 Citation Service
```javascript
// src/services/citationService.js
export class CitationService {
  async generateFromUrl(url, style = 'APA') {
    const response = await fetch('/api/citations/from-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, style })
    });
    return response.json();
  }

  async generateFromDoi(doi, style = 'APA') {
    // DOI-based citation generation
  }

  async generateFromPdf(file, style = 'APA') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('style', style);
    
    const response = await fetch('/api/citations/from-pdf', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  async detectCitationStyle(text) {
    // Auto-detect existing citation style
  }
}
```

#### 3.2 Citation Component
```javascript
// Enhanced CitationGenerator component
export const CitationGenerator = () => {
  const [inputType, setInputType] = useState('url');
  const [inputValue, setInputValue] = useState('');
  const [citationStyle, setCitationStyle] = useState('APA');
  const [citations, setCitations] = useState([]);
  
  useAutosave(citations, 'saved-citations');

  const handleGenerate = async () => {
    let citation;
    switch (inputType) {
      case 'url':
        citation = await CitationService.generateFromUrl(inputValue, citationStyle);
        break;
      case 'doi':
        citation = await CitationService.generateFromDoi(inputValue, citationStyle);
        break;
      // ... other cases
    }
    setCitations(prev => [...prev, citation]);
  };

  return (
    <div className="space-y-6">
      {/* Input type selector */}
      <div className="flex space-x-4">
        {['url', 'doi', 'pdf', 'manual'].map(type => (
          <button
            key={type}
            onClick={() => setInputType(type)}
            className={`px-4 py-2 rounded ${
              inputType === type ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Citation style selector */}
      <select
        value={citationStyle}
        onChange={(e) => setCitationStyle(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="APA">APA</option>
        <option value="MLA">MLA</option>
        <option value="Chicago">Chicago</option>
        <option value="Harvard">Harvard</option>
        <option value="BibTeX">BibTeX</option>
      </select>

      {/* Input field based on type */}
      {inputType === 'url' && (
        <input
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter URL..."
          className="w-full p-3 border rounded"
        />
      )}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 bg-primary text-white rounded"
      >
        Generate Citation
      </button>

      {/* Citations list */}
      <div className="space-y-4">
        {citations.map((citation, index) => (
          <div key={index} className="p-4 border rounded">
            <div className="font-mono text-sm">{citation.formatted}</div>
            <div className="mt-2 space-x-2">
              <button onClick={() => navigator.clipboard.writeText(citation.formatted)}>
                Copy
              </button>
              <button onClick={() => downloadCitation(citation)}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Phase 4: Smart Summarizer

#### 4.1 Summarization Service
```javascript
// src/services/summarizerService.js
export class SummarizerService {
  async summarizePdf(file, options = {}) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));
    
    const response = await fetch('/api/summarize/pdf', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  async summarizeUrl(url, options = {}) {
    const response = await fetch('/api/summarize/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, options })
    });
    return response.json();
  }

  async summarizeText(text, options = {}) {
    const response = await fetch('/api/summarize/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, options })
    });
    return response.json();
  }
}
```

### Phase 5: Advanced Features

#### 5.1 Real-time Collaboration
```javascript
// src/hooks/useCollaboration.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useCollaboration = (documentId) => {
  const [socket, setSocket] = useState(null);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const newSocket = io('/collaboration');
    newSocket.emit('join-document', documentId);
    
    newSocket.on('collaborator-joined', setCollaborators);
    newSocket.on('document-updated', handleDocumentUpdate);
    
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, [documentId]);

  const updateDocument = (changes) => {
    socket?.emit('document-change', { documentId, changes });
  };

  return { collaborators, updateDocument };
};
```

#### 5.2 Advanced Search
```javascript
// src/hooks/useAdvancedSearch.js
export const useAdvancedSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({});

  const search = async (query, searchFilters = {}) => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, filters: searchFilters })
    });
    const results = await response.json();
    setSearchResults(results);
  };

  return { searchResults, search, filters, setFilters };
};
```

## 🔌 API Integration Guidelines

### Authentication Headers
```javascript
// src/lib/api.js
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

export const apiClient = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('auth_token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }
};
```

### Error Handling
```javascript
// src/hooks/useErrorHandler.js
export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    console.error('Application Error:', error);
    setError(error.message || 'An unexpected error occurred');
    
    // Optional: Send to error tracking service
    // errorTrackingService.captureException(error);
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};
```

## 🧪 Testing Strategy

### Component Testing
```javascript
// src/components/__tests__/Dashboard.test.jsx
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../Dashboard/Dashboard';
import { AuthProvider } from '@/contexts/AuthContext';

test('renders welcome message', () => {
  render(
    <AuthProvider>
      <Dashboard onNavigate={jest.fn()} />
    </AuthProvider>
  );
  
  expect(screen.getByText('Welcome to ScholarMate')).toBeInTheDocument();
});
```

### Integration Testing
```javascript
// src/__tests__/auth.integration.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';

test('user can sign in and access dashboard', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByText('Sign In'));
  fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
    target: { value: 'password123' }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  
  await waitFor(() => {
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });
});
```

## 📊 Performance Optimization

### Code Splitting
```javascript
// src/components/Router/Router.jsx
import { lazy, Suspense } from 'react';

const AIResearch = lazy(() => import('@/pages/AIResearch'));
const CitationGenerator = lazy(() => import('@/pages/CitationGenerator'));

export const Router = ({ currentPath, onNavigate }) => {
  const renderPage = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {/* Lazy-loaded components */}
      </Suspense>
    );
  };
};
```

### Memoization
```javascript
// src/components/Dashboard/Dashboard.jsx
import { memo, useMemo } from 'react';

export const Dashboard = memo(({ onNavigate }) => {
  const quickAccessItems = useMemo(() => [
    // ... items array
  ], []);

  const memoizedStats = useMemo(() => {
    return calculateUserStats(recentActivity);
  }, [recentActivity]);

  return (
    // Component JSX
  );
});
```

## 🚀 Deployment Configuration

### Environment Variables
```bash
# .env.production
REACT_APP_API_BASE=https://api.scholarmate.com
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_SENTRY_DSN=your_sentry_dsn
REACT_APP_ANALYTICS_ID=your_analytics_id
```

### Build Optimization
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          utils: ['clsx', 'tailwind-merge']
        }
      }
    }
  }
});
```

This development guide provides a comprehensive roadmap for implementing the full ScholarMate application. Each phase builds upon the existing foundation and can be developed incrementally.


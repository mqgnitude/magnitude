import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { UserProvider } from './context/UserContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    // 1. Wrap everything in the UserProvider so XP works everywhere
    <UserProvider>
      {/* 2. Enable Routing */}
      <BrowserRouter>
        <Routes>
          {/* 3. Define the Paths */}
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* We will add /game/:id here later */}
        </Routes>
      </BrowserRouter>
      <Analytics />
    </UserProvider>
  );
}

export default App;
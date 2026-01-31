import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import ActivityView from './pages/ActivityView';
import StarChart from './pages/StarChart';
import ArcadeView from './pages/ArcadeView'; // NEW IMPORT

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [userProfile, setUserProfile] = useState({ name: "Cadet", subjects: [], xp: 0, streak: 0, currency: 0 });

  // Custom Deck State
  const [activeDeck, setActiveDeck] = useState([]);

  // --- NAVIGATION ---
  const handleStart = () => setCurrentView('onboarding');
  const handleSetup = (subjects) => { setUserProfile(p => ({ ...p, subjects })); setCurrentView('dashboard'); };

  const handleNav = (dest) => {
    if (dest === 'arcade') setCurrentView('arcade');
    else if (dest === 'galaxy') setCurrentView('starchart');
    else if (dest === 'home') setCurrentView('dashboard');
  };

  // When launching from Arcade with a custom deck
  const handleLaunchGame = (customDeck) => {
    setActiveDeck(customDeck);
    setCurrentView('activity');
  };

  const handleBack = () => setCurrentView('dashboard');

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
    </UserProvider>
  );
};

export default App;
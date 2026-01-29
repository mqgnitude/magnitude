import React, { useState } from 'react';
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
    <div className="antialiased text-slate-200 min-h-screen bg-black font-sans">
      {currentView === 'landing' && <Landing onStart={handleStart} />}
      {currentView === 'onboarding' && <Onboarding onComplete={handleSetup} />}
      {currentView === 'dashboard' && <Dashboard userProfile={userProfile} onNavigate={handleNav} />}
      {currentView === 'starchart' && <StarChart subjects={userProfile.subjects} onBack={handleBack} />}

      {/* NEW ARCADE VIEW */}
      {currentView === 'arcade' && (
        <ArcadeView
          onBack={handleBack}
          onLaunchCustomGame={handleLaunchGame}
        />
      )}

      {/* GAME VIEW (Uses activeDeck) */}
      {currentView === 'activity' && (
        <ActivityView
          deck={activeDeck}
          onExit={() => setCurrentView('arcade')}
        />
      )}
    </div>
  );
};

export default App;
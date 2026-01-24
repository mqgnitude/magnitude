import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // 1. Score System (Initialize from LocalStorage so it saves on refresh)
    const [xp, setXp] = useState(() => {
        const saved = localStorage.getItem('magnitude_xp');
        return saved ? parseInt(saved) : 0;
    });

    // 2. Save XP whenever it changes
    useEffect(() => {
        localStorage.setItem('magnitude_xp', xp);
    }, [xp]);

    // 3. Function to add XP (Call this when they win a game)
    const addXp = (amount) => {
        setXp(prev => prev + amount);
    };

    return (
        <UserContext.Provider value={{ xp, addXp }}>
            {children}
        </UserContext.Provider>
    );
};

// Easy hook to use the system
export const useUser = () => useContext(UserContext);
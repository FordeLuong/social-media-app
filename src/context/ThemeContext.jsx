// dark/light theme context// src/context/ThemeContext.jsx
import { createContext, useContext } from 'react';


// Tạo Context
export const ThemeContext = createContext();

// Tạo Provider Component

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
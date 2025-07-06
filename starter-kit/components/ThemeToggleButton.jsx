'use client'

import { useState, useEffect } from "react";

export default function ThemeToggleButton () {
const [theme, setTheme] = useState('dark');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleThemeChange = () => {
        if (theme === 'light'){
            setTheme(() => 'dark')
        } else {
            setTheme(() => 'light');
        }
    }

    return(
        <a className="btn" onClick={handleThemeChange}>{theme === 'light' ? 'dark' : 'light'}</a>
    )
}
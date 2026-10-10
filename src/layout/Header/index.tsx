"use client"
import * as React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
// custom component
import Button from '@commonElements/Button';

const Header: React.FC = () => {
    // state management for dark mode
    const [darkMode, setDarkMode] = React.useState(false);

    // pick up the saved theme after mount
    React.useEffect(() => {
        try { setDarkMode(localStorage.getItem('theme') === 'dark'); } catch { }
    }, []);

    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // function to toggle dark mode
    const changeThemeMode = (): void => {
        try { localStorage.setItem('theme', darkMode ? 'light' : 'dark'); } catch { }
        setDarkMode(!darkMode)
    }

    return (
        <header className="h-14 shrink-0 flex items-center justify-between border-b border-line/10 mb-4 md:mb-6">
            <Link href='/' className='flex items-center'>
                <span className="text-base font-semibold">ModelArena</span>
            </Link>
            <Button
                attrBtn={{
                    onClick: changeThemeMode,
                    'aria-label': darkMode ? 'Switch to light mode' : 'Switch to dark mode',
                    className: "h-8 w-8 grid place-items-center rounded-md text-muted hover:text-ink hover:bg-raised",
                }}
            >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </Button>
        </header>
    )
}

export default Header

"use client"
import * as React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
// custom component
import Button from '@commonElements/Button';

const Header: React.FC = () => {
    // state management for dark mode
    const [darkMode, setDarkMode] = React.useState(true);

    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // function to toggle dark mode
    const changeThemeMode = (): void => {
        setDarkMode(!darkMode)
    }

    return (
        <header className="h-16 shrink-0 flex items-center justify-between border-b border-line/10 mb-4 md:mb-6">
            <Link href='/' className='flex items-center gap-2.5'>
                <span className="grid place-items-center h-8 w-8 rounded-lg bg-accent text-accent-ink font-mono font-bold text-sm">M</span>
                <span className="text-lg font-semibold tracking-tight">Model<span className="text-muted">Arena</span></span>
            </Link>
            <Button
                attrBtn={{
                    onClick: changeThemeMode,
                    'aria-label': darkMode ? 'Switch to light mode' : 'Switch to dark mode',
                    className: "h-9 w-9 grid place-items-center rounded-lg hairline text-muted hover:text-ink hover:bg-raised",
                }}
            >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </Button>
        </header>
    )
}

export default Header

"use client"
import * as React from 'react';
import Link from 'next/link';
// custom component
import Image from '@commonElements/Image';
import Checkbox from '@commonElements/Checkbox';

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
        <div className="flex justify-between mb-6">
            <Link href='/' className='flex items-center py-4'>
                <h4 className="text-2xl font-bold ml-2 text-gradient">AI Playground</h4>
            </Link>
            <div className="flex items-center ">
                <label className="swap swap-rotate">
                    {/* change between dark and light mode */}
                    <Checkbox
                        attrBtn={{
                            className: "theme-controller",
                            value: "light",
                            onClick: changeThemeMode,
                        }}

                    />

                    <span className='swap-off '>🌙</span> {/* dark mode */}

                    <span className='swap-on'>☀️</span> {/* light mode */}

                </label>
            </div>
        </div >
    )
}

export default Header
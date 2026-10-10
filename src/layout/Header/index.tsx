import * as React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="h-14 shrink-0 flex items-center justify-between border-b border-line/10">
            <Link href='/' className='flex items-center gap-2 text-base font-semibold tracking-tight'>
                <span className="h-2.5 w-2.5 rounded-sm bg-accent" aria-hidden></span>
                ModelArena
            </Link>
            <nav className="flex items-center gap-5 text-sm text-muted">
                <Link href="/#how-it-works" className="hover:text-ink transition-colors">How it works</Link>
                <a href="https://github.com/prabhat63s/ModelArena" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">GitHub</a>
            </nav>
        </header>
    )
}

export default Header

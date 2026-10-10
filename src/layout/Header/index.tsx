import * as React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="h-14 shrink-0 flex items-center border-b border-line/10">
            <Link href='/' className='text-base font-semibold tracking-tight'>
                ModelArena
            </Link>
        </header>
    )
}

export default Header

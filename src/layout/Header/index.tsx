import * as React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="h-14 shrink-0 flex items-center border-b border-line/10 mb-4 md:mb-6">
            <Link href='/' className='flex items-center'>
                <span className="text-base font-semibold">ModelArena</span>
            </Link>
        </header>
    )
}

export default Header

"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export function Sidebar() {
    const [open, setOpen] = useState(true);
    return (
        <aside className={`bg-white border-r w-64 flex-shrink-0 transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} hidden md:block`}>
            <nav className="p-4 space-y-2 text-sm">
                <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/">Accueil</Link>
                <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/stuffs">Stuffs</Link>
                <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/neighbors">Neighbors</Link>
                <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/authorization">Authorization</Link>
                <Link className="block px-2 py-1 rounded hover:bg-gray-100" href="/oidc">OIDC</Link>
                <button onClick={() => setOpen(o => !o)} className="mt-4 text-xs text-gray-500 underline">{open ? 'Cacher' : 'Montrer'} la sidebar</button>
            </nav>
        </aside>
    );
}

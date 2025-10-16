"use client";
import React from 'react';

export function SidebarToggle() {
    // Placeholder: In a more advanced version, could control a context for small screens
    return (
        <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded p-2 hover:bg-primary/10 focus:outline-none"
            aria-label="Toggle sidebar"
            onClick={() => console.info('Sidebar toggle (mobile) non-implémenté')}
        >
            <span className="sr-only">Toggle sidebar</span>
            ☰
        </button>
    );
}

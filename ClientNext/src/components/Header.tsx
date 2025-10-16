"use client";
import React from 'react';
import { SidebarToggle } from './SidebarToggle';

export function Header() {
    return (
        <header className="bg-primary text-primary-foreground shadow flex items-center px-4 h-14">
            <SidebarToggle />
            <h1 className="font-semibold ml-3">Casbin Minimal Next</h1>
        </header>
    );
}

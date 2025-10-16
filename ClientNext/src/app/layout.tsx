import './globals.css';
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const metadata = {
    title: 'Casbin Minimal – Next',
    description: 'Next.js frontend migrated from Angular version'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="min-h-screen flex flex-col">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
            </body>
        </html>
    );
}

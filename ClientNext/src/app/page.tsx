import React from 'react';

export default function HomePage() {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Accueil</h2>
            <p className="text-sm text-gray-600">Version Next.js de votre front Angular minimal.</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Navigation: Stuffs, Neighbors, Authorization, OIDC</li>
                <li>Services fetch basés sur interfaces partagées</li>
                <li>Tailwind pour le style</li>
            </ul>
        </section>
    );
}

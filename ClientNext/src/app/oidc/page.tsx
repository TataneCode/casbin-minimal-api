import { oidcApi } from '../../lib/api/oidc';

export const dynamic = 'force-dynamic';

export default async function OidcPage() {
    let info: Awaited<ReturnType<typeof oidcApi.signedIn>> | null = null;
    try { info = await oidcApi.signedIn(); } catch { }
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">OIDC</h2>
            {!info && <p className="text-sm text-gray-500">Non authentifié ou erreur.</p>}
            {info && (
                <div className="text-sm space-y-2">
                    <p>{info.message}</p>
                    <p><span className="font-medium">Utilisateur:</span> {info.name ?? 'N/A'}</p>
                    <div>
                        <p className="font-medium mb-1">Claims:</p>
                        <ul className="list-disc list-inside">
                            {info.claims?.map(c => <li key={c.type}><code>{c.type}</code>: {c.value}</li>)}
                            {!info.claims?.length && <li>Aucune claim</li>}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}

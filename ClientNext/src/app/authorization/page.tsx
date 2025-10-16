import { authorizationApi } from '../../lib/api/authorization';

export const dynamic = 'force-dynamic';

export default async function AuthorizationPage() {
    let roles: string[] = [];
    try { roles = await authorizationApi.getRolesForUser('demo'); } catch { }
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">Authorization (Casbin)</h2>
            <p className="text-xs text-gray-600">Exemple: rôles de l’utilisateur <code>demo</code>.</p>
            <ul className="list-disc list-inside text-sm">
                {roles.map(r => <li key={r}>{r}</li>)}
                {!roles.length && <li className="text-gray-400">Aucun rôle</li>}
            </ul>
        </section>
    );
}

import { neighborsApi } from '../../lib/api/neighbors';

export const dynamic = 'force-dynamic';

export default async function NeighborsPage() {
    let neighbors = [] as Awaited<ReturnType<typeof neighborsApi.list>>;
    try { neighbors = await neighborsApi.list(); } catch (e: any) { return <div className="text-red-600">Erreur: {e.message}</div>; }
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">Neighbors</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {neighbors.map(n => (
                    <div key={n.id} className="border rounded p-4 bg-white shadow-sm">
                        <h3 className="font-medium text-primary mb-1">{n.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{n.email}</p>
                        {n.address && (
                            <p className="text-xs text-gray-500">{n.address.street}, {n.address.city} {n.address.zipCode}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

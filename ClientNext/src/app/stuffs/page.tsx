import { stuffsApi } from '../../lib/api/stuffs';

export const dynamic = 'force-dynamic';

export default async function StuffsPage() {
    let stuffs = [] as Awaited<ReturnType<typeof stuffsApi.list>>;
    try {
        stuffs = await stuffsApi.list();
    } catch (e: any) {
        return <div className="text-red-600">Erreur chargement: {e.message}</div>;
    }
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">Stuffs</h2>
            <table className="min-w-full border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Id</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Neighbor</th>
                    </tr>
                </thead>
                <tbody>
                    {stuffs.map(s => (
                        <tr key={s.id} className="odd:bg-white even:bg-gray-50">
                            <td className="p-2 border">{s.id}</td>
                            <td className="p-2 border">{s.name}</td>
                            <td className="p-2 border">{s.description}</td>
                            <td className="p-2 border">{s.neighborId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

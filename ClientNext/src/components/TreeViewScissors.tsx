"use client";
import React, { useState } from 'react';

interface Node { id: string; label: string; children?: Node[]; }

const sample: Node[] = [
    { id: 'r1', label: 'Root 1', children: [{ id: 'c1', label: 'Child 1' }, { id: 'c2', label: 'Child 2' }] },
    { id: 'r2', label: 'Root 2', children: [{ id: 'c3', label: 'Child 3' }] }
];

function NodeItem({ node }: { node: Node }) {
    const [open, setOpen] = useState(true);
    const hasChildren = !!node.children?.length;
    return (
        <li className="ml-2">
            <div className="flex items-center gap-1 cursor-pointer select-none" onClick={() => hasChildren && setOpen(o => !o)}>
                {hasChildren && <span className="text-xs w-4 inline-block text-gray-500">{open ? '-' : '+'}</span>}
                <span className="text-sm">{node.label}</span>
            </div>
            {hasChildren && open && (
                <ul className="border-l ml-2 pl-2 mt-1 space-y-1">
                    {node.children!.map(c => (
                        <NodeItem key={c.id} node={c} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export function TreeViewScissors() {
    return (
        <div className="border rounded p-3 bg-white">
            <h3 className="font-medium mb-2 text-sm">Scissors Tree (demo)</h3>
            <ul className="space-y-1">
                {sample.map(n => (
                    <NodeItem key={n.id} node={n} />
                ))}
            </ul>
        </div>
    );
}

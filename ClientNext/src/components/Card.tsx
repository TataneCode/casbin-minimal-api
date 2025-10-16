import React from 'react';

export function Card({ title, children, footer }: { title?: string; children: React.ReactNode; footer?: React.ReactNode; }) {
    return (
        <div className="border rounded bg-white shadow-sm flex flex-col">
            {title && <div className="px-4 py-2 border-b font-medium text-sm">{title}</div>}
            <div className="p-4 flex-1 text-sm">{children}</div>
            {footer && <div className="px-4 py-2 border-t bg-gray-50 text-xs text-gray-600">{footer}</div>}
        </div>
    );
}

import Library from '@/components/ui/Library/Library';
import Link from 'next/link';
import React from 'react';

const DashboardLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
        <div className="flex">
            {/* <div className="w-1/4">
                <h1 className="text-2xl font-bold p-4">Dashboard</h1>
                <nav className="p-4">
                    <Link href="/dashboard/shape-selector">Shape Selector</Link>
                    <Link href="/dashboard/library">Library</Link>
                </nav>
            </div> */}
            <div className="w-3/4 p-4">
                {children}
            </div>
            {/* <div className="w-1/4 p-4">
                <Library />
            </div> */}
        </div>
    );
};

export default DashboardLayout;
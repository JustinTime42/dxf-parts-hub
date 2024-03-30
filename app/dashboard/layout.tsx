import React from 'react';

const DashboardLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    return (
        <div className="flex">
            <div className="w-1/4 bg-gray-200">
                <h1 className="text-2xl font-bold p-4">Dashboard</h1>
                <nav className="p-4">
                    <ul>
                        <li>
                            <a href="/shape-selector">Shape Selector</a>
                        </li>
                        <li>
                            <a href="/library">Library</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-3/4 p-4">
                {children}
            </div>
            <div className="w-1/4 p-4">
                {/* Add your LibraryList component here */}
            </div>
        </div>
    );
};

export default DashboardLayout;
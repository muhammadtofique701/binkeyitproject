import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from '../components/UserMenu';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr] gap-4">
        
        {/* Sidebar: Only visible on large screens */}
        <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto border-r-2 border-gray-200 pr-2">
          <UserMenu />
        </aside>

        {/* Main content */}
        <main className="bg-white min-h-[80vh]">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Dashboard;

'use client';
import React, { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import AdminNavbar from './AdminNavBar';

const LayoutComponentComposer = ({ children,}: Readonly<{children: React.ReactNode;}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <AdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-64">
        <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
        <main className="py-10 min-h-96">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default LayoutComponentComposer;
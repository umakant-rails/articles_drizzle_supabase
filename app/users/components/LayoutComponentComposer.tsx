'use client';
import React, { useState } from 'react';
import UserSideBar from './UserSideBar';
import UserNavbar from './UserNavBar';

const LayoutComponentComposer = ({ children,}: Readonly<{children: React.ReactNode;}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <UserSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-64">
        <UserNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
        <main className="py-10 min-h-96">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default LayoutComponentComposer;
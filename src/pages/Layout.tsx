
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

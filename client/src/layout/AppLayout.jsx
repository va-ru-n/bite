import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-hero-grid">
      <Navbar onMenuToggle={() => setIsSidebarOpen(true)} />
      <div className="mx-auto flex max-w-7xl gap-6 px-0 lg:px-6">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="min-w-0 flex-1">
          <div className="page-shell">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

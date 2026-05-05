import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * AppLayout Component
 * SIH 25199 Enterprise Project
 * 
 * Acts as the primary shell for the application, providing persistent 
 * navigation and layout structure across all internal views.
 */
const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle window resizing to adjust layout state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        isMobileOpen={isMobileMenuOpen}
        setMobileOpen={setIsMobileMenuOpen} 
      />

      {/* Main Content Area */}
      <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        {/* Top Header/Navbar */}
        <Navbar 
          sidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
          toggleMobileMenu={toggleMobileMenu}
        />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-10">
            <div className="fade-in">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-slate-500 font-medium">
              SIH-25199 Internal System v1.0.4-stable
            </p>
            <div className="flex space-x-6">
              <a href="/support" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">Support</a>
              <a href="/docs" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">Documentation</a>
              <a href="/privacy" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">Privacy Policy</a>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Enterprise Systems Division.
            </p>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;
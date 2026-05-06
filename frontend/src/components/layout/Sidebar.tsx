import React from 'react';
export default function Sidebar({ isOpen, isMobileOpen, setMobileOpen }: any) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-16 items-center justify-between px-4">
        <span className="text-lg font-bold">Menu</span>
      </div>
    </aside>
  );
}

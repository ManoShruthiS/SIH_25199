import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  BookOpen, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Award,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, isMobileOpen, setMobileOpen }: SidebarProps) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Curriculum', path: '/curriculum', icon: BookOpen },
    { name: 'Skill Assessment', path: '/onboarding', icon: Zap },
    { name: 'Career Path', path: '/career', icon: Award },
    { name: 'Market Intelligence', path: '/policymaker', icon: TrendingUp },
  ];

  const adminItems = [
    { name: 'System Logs', path: '/logs', icon: ShieldCheck },
    { name: 'Configuration', path: '/settings', icon: Settings },
  ];

  const NavItem = ({ item }: { item: any }) => {
    const isActive = router.pathname === item.path;
    return (
      <Link
        href={item.path}
        className={`flex items-center px-4 py-3 mb-1 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
            : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <item.icon size={20} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
        {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
        {isActive && isOpen && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        )}
      </Link>
    );
  };

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 bg-white shadow-xl lg:shadow-none ${
        isOpen ? 'w-64' : 'w-20'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >
      <div className="flex flex-col h-full px-3 py-4">
        {/* Brand Logo */}
        <div className={`flex items-center mb-8 px-2 ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <div className="flex-shrink-0 h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <ShieldCheck className="text-white" size={24} />
          </div>
          {isOpen && (
            <div className="ml-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">SIH<span className="text-indigo-600">25199</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Enterprise Portal</p>
            </div>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
          <div>
            {isOpen && <p className="px-4 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Learning</p>}
            {menuItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {(user?.role === 'admin' || user?.role === 'manager') && (
            <div>
              {isOpen && <p className="px-4 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Management</p>}
              {adminItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-slate-100">
          <NavItem item={{ name: 'Help & Support', path: '/support', icon: HelpCircle }} />
          
          <button
            onClick={logout}
            className={`flex items-center w-full px-4 py-3 mt-1 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group ${!isOpen && 'justify-center'}`}
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-red-600" />
            {isOpen && <span className="ml-3 font-medium">Log Out</span>}
          </button>

          {/* User Profile Mini */}
          {isOpen && (
            <div className="mt-4 p-3 bg-slate-50 rounded-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm">
                <span className="text-indigo-700 font-bold">{user?.firstName?.[0] || 'A'}</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate uppercase">{user?.role || 'Learner'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

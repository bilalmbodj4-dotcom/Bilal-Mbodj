import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Heart, History, Settings, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

export const BottomNav = () => {
  const navItems = [
    { icon: Search, label: 'Recherche', path: '/' },
    { icon: Heart, label: 'Favoris', path: '/favorites' },
    { icon: GraduationCap, label: 'Quiz', path: '/quiz' },
    { icon: Settings, label: 'Réglages', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 pb-6 pt-2 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 hover:text-blue-500"
              )
            }
          >
            <Icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

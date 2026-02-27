import React from 'react';
import { Moon, Sun, Globe, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

export const SettingsScreen = () => {
  const sections = [
    {
      title: 'Préférences',
      items: [
        { icon: Moon, label: 'Mode Sombre', value: 'Activé', type: 'toggle' },
        { icon: Globe, label: 'Langue de l\'interface', value: 'Français', type: 'link' },
      ]
    },
    {
      title: 'Apprentissage',
      items: [
        { icon: Bell, label: 'Notifications', value: 'Quotidien', type: 'link' },
        { icon: Shield, label: 'Confidentialité', type: 'link' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Aide & FAQ', type: 'link' },
        { icon: LogOut, label: 'Déconnexion', type: 'button', color: 'text-red-500' },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Réglages</h1>
      </header>

      <main className="px-4 space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">
              {section.title}
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              {section.items.map((item, j) => (
                <button
                  key={j}
                  className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                    j !== section.items.length - 1 ? 'border-bottom border-slate-100 dark:border-slate-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${item.color || 'text-slate-600 dark:text-slate-400'}`}>
                      <item.icon size={20} />
                    </div>
                    <span className={`font-bold ${item.color || 'text-slate-700 dark:text-slate-300'}`}>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-sm text-slate-400">{item.value}</span>}
                    {item.type === 'toggle' ? (
                      <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center text-slate-300">
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

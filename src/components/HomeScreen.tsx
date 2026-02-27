import React, { useState, useEffect } from 'react';
import { Search, Volume2, ChevronRight, History as HistoryIcon, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_WORDS, RECENT_SEARCHES } from '../data/mockData';
import { Word } from '../types';
import { cn } from '../lib/utils';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [langMode, setLangMode] = useState<'FR-EN' | 'EN-FR'>('FR-EN');
  const navigate = useNavigate();

  const wordOfTheDay = MOCK_WORDS[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/word/${searchQuery}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="w-10" />
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Linguist</h1>
        <button className="p-2 text-slate-500">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-xs font-bold">BM</span>
          </div>
        </button>
      </header>

      <main className="px-4 space-y-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-1">
            <div className="pl-3 text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un mot..."
              className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-3 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setLangMode('FR-EN')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                  langMode === 'FR-EN' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500"
                )}
              >
                FR-EN
              </button>
              <button
                type="button"
                onClick={() => setLangMode('EN-FR')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                  langMode === 'EN-FR' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500"
                )}
              >
                EN-FR
              </button>
            </div>
          </div>
        </form>

        {/* Word of the Day */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mot du jour</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2 py-1 rounded uppercase tracking-wider">
              24 Février
            </span>
          </div>
          <Link to={`/word/${wordOfTheDay.term}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-xl shadow-blue-500/20"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{wordOfTheDay.term}</h2>
                    <p className="text-blue-100 italic text-sm">{wordOfTheDay.phonetic}</p>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Volume2 size={24} />
                  </button>
                </div>
                <p className="text-white/90 leading-relaxed mb-6">
                  {wordOfTheDay.definition}
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white border border-white/20 uppercase tracking-widest">
                    {wordOfTheDay.type}
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white border border-white/20 uppercase tracking-widest">
                    Poétique
                  </span>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </motion.div>
          </Link>
        </section>

        {/* Recent Searches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recherches récentes</h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-bold">Effacer</button>
          </div>
          <div className="space-y-2">
            {RECENT_SEARCHES.map((term) => (
              <Link
                key={term}
                to={`/word/${term}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <HistoryIcon size={18} className="text-slate-400 group-hover:text-blue-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{term}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

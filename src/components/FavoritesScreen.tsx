import React, { useState } from 'react';
import { Heart, Search, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOCK_WORDS } from '../data/mockData';
import { cn } from '../lib/utils';

export const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState(MOCK_WORDS.slice(2));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Favorite Words Library</h1>
      </header>

      <main className="px-4 space-y-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <Heart size={40} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aucun favori</h3>
            <p className="text-slate-500">Commencez à ajouter des mots pour les voir ici.</p>
          </div>
        ) : (
          favorites.map((word) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group"
            >
              <Link to={`/word/${word.term}`} className="block pr-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{word.term}</h3>
                <p className="text-slate-500 font-medium mb-3">{word.translation}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 italic line-clamp-2">
                  {word.exampleFr}
                </p>
              </Link>
              <button className="absolute top-5 right-5 text-blue-600">
                <Star size={24} fill="currentColor" />
              </button>
            </motion.div>
          ))
        )}
      </main>
    </div>
  );
};

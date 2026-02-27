import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Volume2, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_WORDS } from '../data/mockData';
import { searchWord } from '../services/geminiService';
import { Word } from '../types';
import { cn } from '../lib/utils';

export const WordDetailScreen = () => {
  const { term } = useParams<{ term: string }>();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchWord = async () => {
      setLoading(true);
      // Check mock data first
      const localWord = MOCK_WORDS.find(w => w.term.toLowerCase() === term?.toLowerCase());
      if (localWord) {
        setWord(localWord);
      } else if (term) {
        // Fetch from Gemini if not in mock
        const geminiWord = await searchWord(term);
        setWord(geminiWord);
      }
      setLoading(false);
    };

    fetchWord();
  }, [term]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-slate-500 font-medium">Recherche en cours...</p>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Mot non trouvé</h2>
        <p className="text-slate-500 mb-6">Désolé, nous n'avons pas pu trouver la définition de "{term}".</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
        >
          Retourner
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <header className="p-4 flex items-center justify-between sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-10">
        <button onClick={() => navigate(-1)} className="p-2 text-slate-600 dark:text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400">Définition du mot</h1>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={cn("p-2 transition-colors", isFavorite ? "text-red-500" : "text-slate-400")}
        >
          <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </header>

      <main className="px-6 space-y-8">
        {/* Word Title Section */}
        <section className="pt-4">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">{word.term}</h2>
            <span className="text-blue-600 dark:text-blue-400 font-medium">{word.phonetic}</span>
          </div>
          <p className="text-slate-500 font-medium mb-6">{word.translation}</p>
          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
              <Volume2 size={20} />
              Écouter
            </button>
            <button className="w-14 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400">
              <Share2 size={20} />
            </button>
          </div>
        </section>

        {/* Definition Section */}
        <section>
          <h3 className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-4">Définition</h3>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {word.definition}
          </p>
        </section>

        {/* Examples Section */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-4">Exemples</h3>
          <div className="space-y-3">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed italic">
                « {word.exampleFr.split(new RegExp(`(${word.term}|${word.term.toLowerCase()})`, 'i')).map((part, i) => 
                  part.toLowerCase() === word.term.toLowerCase() ? (
                    <span key={i} className="text-blue-600 dark:text-blue-400 font-bold">{part}</span>
                  ) : part
                )} »
              </p>
              <p className="mt-2 text-sm text-slate-500">{word.exampleEn}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

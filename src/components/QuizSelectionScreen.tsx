import React from 'react';
import { Play, Brain, PenTool, Languages, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const QuizSelectionScreen = () => {
  const navigate = useNavigate();

  const quizTypes = [
    {
      id: 'multiple-choice',
      title: 'Multiple Choice',
      description: 'Choose the correct meaning from options.',
      icon: Brain,
      color: 'bg-orange-500',
    },
    {
      id: 'fill-blanks',
      title: 'Fill in the Blanks',
      description: 'Complete sentences with the right word.',
      icon: PenTool,
      color: 'bg-blue-500',
    },
    {
      id: 'translation',
      title: 'Translation',
      description: 'Translate words between languages.',
      icon: Languages,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Quiz Selection</h1>
      </header>

      <main className="px-4 space-y-8">
        {/* Progress Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Words Mastered: 45 / 200</h3>
            <span className="text-sm font-bold text-slate-400">22.5%</span>
          </div>
          <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '22.5%' }}
              className="h-full bg-orange-500 rounded-full"
            />
          </div>
          <p className="text-center text-sm text-slate-500 font-medium">Keep going! You're doing great.</p>
        </div>

        {/* Quiz Types */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Choose a Quiz Type</h3>
          {quizTypes.map((quiz) => (
            <motion.button
              key={quiz.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="w-full flex items-center gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left group"
            >
              <div className={`w-14 h-14 rounded-2xl ${quiz.color} flex items-center justify-center text-white shadow-lg shadow-${quiz.color.split('-')[1]}-500/20`}>
                <quiz.icon size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white">{quiz.title}</h4>
                <p className="text-xs text-slate-500">{quiz.description}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <Play size={18} fill="currentColor" />
              </div>
            </motion.button>
          ))}
        </section>
      </main>
    </div>
  );
};

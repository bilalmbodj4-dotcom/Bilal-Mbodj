import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Timer, Lightbulb, CheckCircle2, XCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_WORDS } from '../data/mockData';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion, QuizSession } from '../types';
import { cn } from '../lib/utils';

export const ActiveQuizScreen = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [session, setSession] = useState<QuizSession>({ score: 0, total: 0, results: [] });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      const data = await generateQuiz(MOCK_WORDS.slice(0, 5));
      setQuestions(data.map((q, i) => ({ ...q, id: i.toString() })));
      setLoading(false);
    };
    fetchQuiz();
  }, [type]);

  const handleSubmit = () => {
    const current = questions[currentIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === current.answer.toLowerCase().trim();
    
    const newResults = [
      ...session.results,
      {
        question: current.question,
        userAnswer,
        correctAnswer: current.answer,
        isCorrect,
      }
    ];

    setSession({
      score: isCorrect ? session.score + 1 : session.score,
      total: session.total + 1,
      results: newResults,
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 font-bold">Préparation du quiz...</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 p-6 pb-24">
        <header className="flex items-center justify-between mb-10">
          <div className="w-10" />
          <h1 className="text-lg font-bold">Quiz Results Summary</h1>
          <button onClick={() => navigate('/quiz')} className="text-blue-600 font-bold">Done</button>
        </header>

        <main className="flex-1 space-y-8">
          <div className="relative flex flex-col items-center justify-center py-10">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96" cy="96" r="88"
                  fill="none" stroke="currentColor" strokeWidth="12"
                  className="text-slate-100 dark:text-slate-800"
                />
                <motion.circle
                  cx="96" cy="96" r="88"
                  fill="none" stroke="currentColor" strokeWidth="12"
                  strokeDasharray={552}
                  initial={{ strokeDashoffset: 552 }}
                  animate={{ strokeDashoffset: 552 - (552 * session.score) / questions.length }}
                  className="text-blue-600"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <Star className="text-yellow-400 mb-1" fill="currentColor" size={32} />
                <span className="text-4xl font-bold">{session.score}/{questions.length}</span>
              </div>
            </div>
            <p className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Félicitations! You did great.</p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-bold text-slate-400 mb-3">Correct Answers</h3>
              <div className="space-y-2">
                {session.results.filter(r => r.isCorrect).map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={20} />
                    <span className="font-medium">{r.correctAnswer}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-400 mb-3">Incorrect Answers</h3>
              <div className="space-y-2">
                {session.results.filter(r => !r.isCorrect).map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <XCircle className="text-red-500" size={20} />
                      <span className="font-medium">{r.userAnswer || 'Pas de réponse'}</span>
                    </div>
                    <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">Review</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/favorites')}
            className="w-full py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-blue-600"
          >
            Go Back to Favorites
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-blue-600 p-4 pt-6 pb-10 text-white">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/quiz')}><X size={24} /></button>
          <h2 className="font-bold">Active Quiz Session</h2>
          <div className="w-6" />
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            className="h-full bg-white rounded-full"
          />
        </div>
        <div className="flex justify-between items-center text-xs font-bold">
          <div className="flex items-center gap-1">
            <Timer size={14} />
            <span>02:45</span>
          </div>
          <span>Question {currentIndex + 1}/{questions.length}</span>
        </div>
      </header>

      <main className="flex-1 px-6 -mt-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 mb-8">
          <p className="text-xl font-medium text-center text-slate-800 dark:text-slate-200 leading-relaxed">
            {current.question}
          </p>
        </div>

        <div className="space-y-6">
          {current.type === 'multiple-choice' ? (
            <div className="grid grid-cols-1 gap-3">
              {current.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setUserAnswer(opt)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left font-bold transition-all",
                    userAnswer === opt 
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600" 
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Tapez votre réponse..."
                className="w-full p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus:border-blue-600 focus:ring-0 text-center text-xl font-bold uppercase tracking-widest"
              />
              
              <div className="flex justify-center">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl text-sm font-bold"
                >
                  <Lightbulb size={16} />
                  Hint
                </button>
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-center relative"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-100 dark:bg-slate-800 rotate-45" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Indice : {current.hint}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <div className="p-6">
        <button
          onClick={handleSubmit}
          disabled={!userAnswer}
          className="w-full py-4 bg-blue-600 disabled:bg-slate-300 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

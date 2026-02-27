import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { WordDetailScreen } from './components/WordDetailScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { QuizSelectionScreen } from './components/QuizSelectionScreen';
import { ActiveQuizScreen } from './components/ActiveQuizScreen';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/word/:term" element={<WordDetailScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/quiz" element={<QuizSelectionScreen />} />
          <Route path="/quiz/:type" element={<ActiveQuizScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

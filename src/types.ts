export interface Word {
  id: string;
  term: string;
  phonetic: string;
  type: string;
  definition: string;
  translation: string;
  exampleFr: string;
  exampleEn: string;
  isFavorite?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blanks' | 'translation';
  question: string;
  answer: string;
  options?: string[];
  hint?: string;
}

export interface QuizSession {
  score: number;
  total: number;
  results: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

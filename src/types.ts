/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Player {
  name: string;
  number: string;
  avatarColor: string; // Tailwind class
  avatarIcon: string;  // e.g., 'circle', 'triangle', 'square', 'glass'
  score: number;       // total core correct responses on first try
  wrongAttempts: number;
  totalPrize: number;  // represented in dynamic virtual 'Wons' or 'R$'
  guardPersonality?: 'sarcastic' | 'cute' | 'vip';
}

export interface Question {
  id: number;
  stageName: string; // Squid Game themed stage, e.g. "Batatinha Frita 1, 2, 3"
  stageIcon: string;
  questionText: string;
  topic: string; // 'Rural', 'Urbano', 'Extrativismo', 'Transportes'
  type: 'multiple' | 'typed';
  
  // Multiple Choice fields:
  options?: string[];
  correctIndex?: number;
  
  // Shared & Typed fields:
  hint: string;
  explanation: string;
  typedKeywordsRequired?: string[][]; // [[ "acesso", "acessar" ], [ "alimento", "comida" ]]
  typedFeedbackInstructions?: { missingGroupIndex: number; feedback: string }[];
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedIndices: number[]; // indices chosen by the user for the current question
  isAnswered: boolean; // if they got it correct and are viewing explanation
  attemptsForCurrentQuestion: number;
  scoreEarnedThisQuestion: number; // 100 on first try, decreases or 0 on retry
}

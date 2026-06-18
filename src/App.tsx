/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Player } from './types';
import GameIntro from './components/GameIntro';
import GameStage from './components/GameStage';
import GameOverView from './components/GameOverView';
import StudyNotebook from './components/StudyNotebook';

export default function App() {
  const [step, setStep] = useState<'intro' | 'playing' | 'gameover'>('intro');
  const [player, setPlayer] = useState<Player | null>(null);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);

  const handleStartGame = (newPlayer: Player) => {
    setPlayer(newPlayer);
    setStep('playing');
  };

  const handleQuestionCompleted = (updatedPlayer: Player) => {
    setPlayer(updatedPlayer);
  };

  const handleFinishGame = (finalPlayer: Player) => {
    setPlayer(finalPlayer);
    setStep('gameover');
  };

  const handleRestartGame = () => {
    setPlayer(null);
    setStep('intro');
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-slate-100 relative">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <GameIntro onStart={handleStartGame} />
          </motion.div>
        )}

        {step === 'playing' && player && (
          <motion.div
            key="playing-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <GameStage 
              player={player} 
              onQuestionCompleted={handleQuestionCompleted}
              onFinishGame={handleFinishGame}
              onOpenNotebook={() => setIsNotebookOpen(true)}
            />
          </motion.div>
        )}

        {step === 'gameover' && player && (
          <motion.div
            key="gameover-screen"
            initial={{ opacity: 0, zoom: 0.95 }}
            animate={{ opacity: 1, zoom: 1 }}
            exit={{ opacity: 0, zoom: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <GameOverView player={player} onRestart={handleRestartGame} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Backdrop-drawer study notebook reference */}
      <StudyNotebook 
        isOpen={isNotebookOpen} 
        onClose={() => setIsNotebookOpen(false)} 
      />
    </div>
  );
}

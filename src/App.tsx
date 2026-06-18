/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { Player } from './types';
import GameIntro from './components/GameIntro';
import GameStage from './components/GameStage';
import GameOverView from './components/GameOverView';
import StudyNotebook from './components/StudyNotebook';
import { playSound } from './utils/audio';

export default function App() {
  const [step, setStep] = useState<'intro' | 'playing' | 'gameover'>('intro');
  const [player, setPlayer] = useState<Player | null>(null);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(playSound.getMuteState());

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

  const handleToggleMute = () => {
    const isMuted = playSound.toggleMute();
    setAudioMuted(isMuted);
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-slate-100 relative pt-2">
      {/* Unified Global Floating Audio Selector at Very Top */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <button
          onClick={handleToggleMute}
          id="global-audio-toggle"
          className="px-3 py-2 bg-zinc-900/95 hover:bg-zinc-800 text-slate-350 hover:text-white rounded-xl border border-zinc-800 hover:border-zinc-650 transition-all flex items-center gap-2 shadow-2xl focus:outline-none cursor-pointer text-xs font-mono font-bold select-none"
          title={audioMuted ? "Ativar som de fundo/efeitos rústicos" : "Mutar efeitos sonoros de geografia"}
        >
          {audioMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-rose-500 animate-pulse" />
              <span className="hidden xs:inline text-[9px] text-rose-500/85">MUTADO</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden xs:inline text-[9px] text-emerald-400">ÁUDIO ATIVO</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <GameIntro 
              onStart={handleStartGame} 
              isMuted={audioMuted} 
              onToggleMute={handleToggleMute} 
            />
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
              isMuted={audioMuted}
              onToggleMute={handleToggleMute}
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

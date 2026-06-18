/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Volume2, ShieldAlert, Award, Star, Circle, Triangle, Square, Sparkles } from 'lucide-react';
import { Player } from '../types';
import { playSound } from '../utils/audio';

interface GameIntroProps {
  onStart: (player: Player) => void;
}

export default function GameIntro({ onStart }: GameIntroProps) {
  const [name, setName] = useState('');
  const [playerNum, setPlayerNum] = useState('456');
  const [selectedAvatar, setSelectedAvatar] = useState('circle');
  const [avatarColor, setAvatarColor] = useState('bg-teal-700 hover:bg-teal-600');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [guardPersonality, setGuardPersonality] = useState<'sarcastic' | 'cute' | 'vip'>('sarcastic');

  const colors = [
    { name: 'Verde Jogador', class: 'bg-teal-700 hover:bg-teal-600 ring-teal-500' },
    { name: 'Rosa Soldado', class: 'bg-rose-600 hover:bg-rose-500 ring-rose-400' },
    { name: 'Indigo VIP', class: 'bg-violet-700 hover:bg-violet-600 ring-violet-500' },
    { name: 'Preto Diretor', class: 'bg-zinc-800 hover:bg-zinc-700 ring-zinc-500' },
  ];

  const presetNumbers = ['456', '067', '218', '199', '001'];

  const handleGenerateNickname = () => {
    const funnyNicknames = [
      "Barão_da_Soja_456",
      "Mestre_da_Dutra",
      "Fugitivo_do_Lixão",
      "Besta_Ferroviária",
      "Rei_da_Cabotagem",
      "Gentrificado_Hype",
      "Quebradeira_Pro",
      "Magnata_do_Agro",
      "Chefe_das_Sesmarias",
      "Minifundista_Radical",
      "Sombra_da_Coivara",
      "Fã_de_Babaçu",
      "Fiscal_de_Eclusa",
      "Macrocefalo_Urbano",
      "Chorume_Slayer",
      "Chute_da_Ponte_de_Vidro",
      "Gênio_do_Megalópole"
    ];
    const randIdx = Math.floor(Math.random() * funnyNicknames.length);
    setName(funnyNicknames[randIdx]);
    playSound.playBribe(); // Play fun sound when generating nickname
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || `Jogador ${playerNum}`;
    
    // Play the eerie opening notes
    playSound.playIntro();

    onStart({
      name: finalName,
      number: playerNum,
      avatarColor,
      avatarIcon: selectedAvatar,
      score: 0,
      wrongAttempts: 0,
      totalPrize: 0,
      guardPersonality: guardPersonality
    });
  };

  const handleRandomize = () => {
    const random = Math.floor(Math.random() * 899 + 100).toString();
    setPlayerNum(random);
  };

  const toggleSound = () => {
    const isMuted = playSound.toggleMute();
    setAudioEnabled(!isMuted);
    if (!isMuted) {
      playSound.playIntro();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Decorative scanline background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[length:100%_4px] opacity-20 pointer-events-none" />

      {/* Floating Geometric Ornaments */}
      <div className="absolute top-10 left-10 text-rose-500 opacity-20 animate-pulse">
        <Circle className="w-16 h-16 stroke-[3]" />
      </div>
      <div className="absolute bottom-10 right-10 text-rose-500 opacity-20 animate-pulse delay-500">
        <Triangle className="w-16 h-16 stroke-[3]" />
      </div>
      <div className="absolute top-1/4 right-10 text-rose-500 opacity-15">
        <Square className="w-16 h-16 stroke-[3]" />
      </div>

      <div className="w-full max-w-lg bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 backdrop-blur-md">
        {/* Squid Game Mask Geometric Accent Banner */}
        <div className="flex justify-center gap-4 mb-4 text-rose-600">
          <Circle className="w-6 h-6 stroke-[3]" />
          <Triangle className="w-6 h-6 stroke-[3]" />
          <Square className="w-6 h-6 stroke-[3]" />
        </div>

        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            MINISTÉRIO DA EDUCAÇÃO GEOGRÁFICA
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-white">
            GEOGRAFIA <span className="text-rose-500 font-mono">ROUND 6</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Sobreviva a 10 rodadas intensas sobre o espaço brasileiro. Se errar, nossos guardas te dão uma dica! Consegue ganhar o prêmio máximo de 4.56 Bilhões de Wons?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field with Funny Randomizer */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label id="input-player-name-label" className="block text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                Nome do Recruta (Para o Certificado)
              </label>
              <button
                type="button"
                onClick={handleGenerateNickname}
                className="text-[10px] font-mono bg-rose-950/65 text-rose-300 border border-rose-800 hover:bg-rose-900 px-2 py-0.5 rounded transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                title="Gera um apelido geográfico engraçado"
              >
                <Sparkles className="w-3 h-3 text-rose-400 animate-pulse" />
                <span>NICK ZUEIRA</span>
              </button>
            </div>
            <input
              type="text"
              id="input-player-name"
              placeholder="Digite seu nome ou clique em Nick Zueira ao lado..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500 transition-colors text-base font-semibold"
              maxLength={22}
              required
            />
          </div>

          {/* Guard Personality Selection */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2 tracking-wider">
              Personalidade do Guarda Tutor (Humor do Jogo)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setGuardPersonality('sarcastic')}
                className={`p-2.5 rounded-xl border text-left transition-all ${guardPersonality === 'sarcastic' ? 'bg-rose-950/40 border-rose-500 text-rose-300 ring-2 ring-rose-950' : 'bg-zinc-950 border-zinc-800 text-slate-400 hover:border-zinc-700'}`}
              >
                <div className="font-bold text-xs uppercase font-mono text-rose-400">Pistola ○</div>
                <div className="text-[9px] text-slate-450 mt-1 leading-snug">"O tempo voa, se vira recruta!"</div>
              </button>
              <button
                type="button"
                onClick={() => setGuardPersonality('cute')}
                className={`p-2.5 rounded-xl border text-left transition-all ${guardPersonality === 'cute' ? 'bg-pink-950/40 border-pink-500 text-pink-300 ring-2 ring-pink-950' : 'bg-zinc-950 border-zinc-800 text-slate-400 hover:border-pink-700'}`}
              >
                <div className="font-bold text-xs uppercase font-mono text-pink-400">Fofucho △</div>
                <div className="text-[9px] text-slate-455 mt-1 leading-snug">"Você é show! Força! S2"</div>
              </button>
              <button
                type="button"
                onClick={() => setGuardPersonality('vip')}
                className={`p-2.5 rounded-xl border text-left transition-all ${guardPersonality === 'vip' ? 'bg-amber-950/40 border-amber-500 text-amber-350 ring-2 ring-amber-950' : 'bg-zinc-950 border-zinc-800 text-slate-400 hover:border-zinc-700'}`}
              >
                <div className="font-bold text-xs uppercase font-mono text-amber-550">VIP Dr.R$ ▢</div>
                <div className="text-[9px] text-slate-450 mt-1 leading-snug">"Apostei meu porco em você."</div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Player Number Selection */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2 tracking-wider">
                Nº do Uniforme
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  id="input-player-number"
                  value={playerNum}
                  onChange={(e) => setPlayerNum(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="w-full text-center px-2 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-rose-500 font-mono font-extrabold text-lg focus:outline-none focus:border-rose-500"
                  maxLength={3}
                />
                <button
                  type="button"
                  id="btn-random-number"
                  onClick={handleRandomize}
                  className="px-3 bg-zinc-800 hover:bg-zinc-700 text-slate-300 rounded-lg text-xs font-mono transition-colors border border-zinc-700"
                  title="Gerar número aleatório"
                >
                  RAND
                </button>
              </div>
            </div>

            {/* Avatar Shape Picker */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2 tracking-wider">
                Forma do Uniforme
              </label>
              <div className="grid grid-cols-3 gap-1 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setSelectedAvatar('circle')}
                  className={`p-2 rounded flex justify-center items-center transition-colors ${selectedAvatar === 'circle' ? 'bg-rose-950 text-rose-500' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Circle className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAvatar('triangle')}
                  className={`p-2 rounded flex justify-center items-center transition-colors ${selectedAvatar === 'triangle' ? 'bg-rose-950 text-rose-500' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Triangle className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAvatar('square')}
                  className={`p-2 rounded flex justify-center items-center transition-colors ${selectedAvatar === 'square' ? 'bg-rose-950 text-rose-500' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Square className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-400 mb-2 tracking-wider">
              Escolha a Cor do Agasalho
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setAvatarColor(c.class)}
                  className={`py-2 px-1 text-[11px] font-bold text-white rounded-lg transition-all ${c.class} ${avatarColor.startsWith(c.class.split(' ')[0]) ? 'ring-2 ring-offset-2 ring-offset-zinc-900 border border-white' : 'opacity-80'}`}
                >
                  {c.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Game Rules Sheet card */}
          <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800/80 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-rose-500 font-mono font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DIRETRIZES DA PROVA INTELIGENTE:</span>
            </div>
            <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
              <li>Cada acerto de primeira adiciona <strong className="text-zinc-200">456M de Wons</strong> ao seu cofre.</li>
              <li>Erros <span className="text-rose-450 font-bold">NÃO ELIMINAM</span> você! Os guardas revelam pistas detalhadas.</li>
              <li>Tente novamente na hora até dominar o assunto para avançar de fase!</li>
              <li>Use o <strong className="text-pink-400">Caderno de Estudos</strong> a qualquer segundo para pesquisar e gabaritar a resposta!</li>
            </ul>
          </div>

          {/* Play CTA + Sound Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSound}
              id="sound-toggle-btn"
              className={`p-3 rounded-lg border text-sm font-semibold transition-all ${audioEnabled ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-900/30' : 'bg-zinc-950 border-zinc-800 text-slate-500 hover:text-slate-400'}`}
              title="Ativar ou desativar áudio"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <button
              type="submit"
              id="btn-start-game"
              className="flex-1 py-4 bg-rose-600 hover:bg-rose-500 text-white font-extrabold tracking-wider rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-rose-950/50 hover:shadow-rose-600/30 text-base font-mono flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>INICIAR DESAFIO</span>
              <Play className="w-5 h-5 fill-white" />
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
          PRODUTOR GLOBAL DE ENERGIA PEDAGÓGICA © 2026
        </div>
      </div>
    </div>
  );
}

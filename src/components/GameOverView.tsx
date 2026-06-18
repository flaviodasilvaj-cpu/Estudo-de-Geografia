/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useRef } from 'react';
import { 
  Award, RefreshCw, Printer, ShieldCheck, Heart, Circle, Triangle, Square,
  Map, Sparkles, AlertCircle, ShoppingBag, Trophy, ArrowRight
} from 'lucide-react';
import { Player } from '../types';

interface GameOverViewProps {
  player: Player;
  onRestart: () => void;
}

export default function GameOverView({ player, onRestart }: GameOverViewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Evaluate performance title
  const getRating = (firstTryScore: number) => {
    if (firstTryScore === 100 || firstTryScore === 10 || firstTryScore === 9) {
      return {
        title: "Gênio Supremo de Geografia (Mão de Ferro)",
        subtitle: "Líder Absoluto das Redes Urbanas e do Agro",
        color: "text-amber-400 bg-amber-955/20 border-amber-500/35"
      };
    }
    if (firstTryScore >= 6) {
      return {
        title: "Estrategista de Recursos Naturais",
        subtitle: "Sobreviveu com louvor aos lixões e leis imperiais",
        color: "text-emerald-400 bg-emerald-955/20 border-emerald-500/35"
      };
    }
    return {
      title: "Explorador Aprendiz",
      subtitle: "Sobreviveu graças à audácia e dicas do Guarda Rosa",
      color: "text-rose-400 bg-rose-955/20 border-rose-500/35"
    };
  };

  const rating = getRating(player.score);

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `₩ ${(val / 1000000000).toFixed(2)} Bilhões`;
    }
    return `₩ ${val.toLocaleString('pt-BR')}`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[length:100%_4px] opacity-15 pointer-events-none text-print-hidden" />

      {/* Floating Circles & Triangles */}
      <div className="absolute top-10 left-10 text-rose-500 opacity-20 text-print-hidden">
        <Circle className="w-12 h-12 stroke-[2.5]" />
      </div>
      <div className="absolute bottom-10 right-10 text-rose-500 opacity-20 text-print-hidden">
        <Square className="w-12 h-12 stroke-[2.5]" />
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        
        {/* Confetti celebration header */}
        <div className="text-center text-print-hidden">
          <div className="inline-flex items-center justify-center p-4 bg-rose-600 rounded-full text-white shadow-xl animate-bounce mb-4">
            <Trophy className="w-10 h-10" />
          </div>
          <p className="text-xs font-bold text-rose-500 uppercase tracking-[0.25em] font-mono">Fase Final Concluída</p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-1">VOCÊ SOBREVIVEU!</h1>
          <p className="text-sm text-slate-400 mt-2">
            Desafiou as 10 rodadas de Geografia, tirou dúvidas com nossos guardas de elite e conquistou seu lugar no topo da hierarquia urbana.
          </p>
        </div>

        {/* Dynamic score summary stats */}
        <div className="grid grid-cols-3 gap-4 text-center text-print-hidden">
          <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl">
            <p className="text-[10px] text-slate-500 font-mono uppercase font-bold">Acertos 1ª Tentativa</p>
            <h3 className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{player.score} / 10</h3>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl">
            <p className="text-[10px] text-slate-500 font-mono uppercase font-bold">Dicas Utilizadas</p>
            <h3 className="text-2xl font-extrabold text-rose-400 font-mono mt-1">{player.wrongAttempts}</h3>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl">
            <p className="text-[10px] text-slate-500 font-mono uppercase font-bold">Prêmio Unificado</p>
            <h3 className="text-xl md:text-2xl font-extrabold text-amber-400 font-mono mt-1 leading-none">{formatCurrency(player.totalPrize)}</h3>
          </div>
        </div>

        {/* Survival Certificate display card */}
        <div 
          ref={certificateRef}
          id="survival-certificate-card"
          className="bg-zinc-900 border-4 border-double border-amber-600/60 p-6 md:p-8 rounded-2xl relative shadow-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-900"
        >
          {/* Internal Geometric filigree accents */}
          <div className="absolute top-4 left-4 text-amber-500/20"><Circle className="w-8 h-8" /></div>
          <div className="absolute top-4 right-4 text-amber-500/20"><Triangle className="w-8 h-8" /></div>
          <div className="absolute bottom-4 left-4 text-amber-500/20"><Square className="w-8 h-8" /></div>
          <div className="absolute bottom-4 right-4 text-amber-500/20"><Sparkles className="w-8 h-8" /></div>

          <div className="text-center space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-amber-500 uppercase">
                CERTIFICADO OFICIAL DE SOBREVIVÊNCIA
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight pt-2">
                RELAÇÕES DO ESPAÇO BRASILEIRO
              </h2>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2"></div>
            </div>

            <div className="space-y-3 font-serif">
              <p className="text-xs md:text-sm text-slate-400 italic">
                Certificamos para os devidos fins de aproveitamento escolar que o recruta acadêmico:
              </p>
              <h3 id="certificate-recipient-name" className="text-xl md:text-2xl font-extrabold text-white tracking-wide font-sans underline decoration-amber-500 decoration-2 underline-offset-4 py-2">
                {player.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                Portador do uniforme oficial <strong className="text-rose-450 font-mono">Nº {player.number}</strong>, demonstrou resiliência física e mental ao superar as 10 rodadas de avaliações estratégicas baseadas na série <strong className="text-white">Round 6</strong>, conquistando excelente grau de letramento didático sobre a estrutura fundiária, sistemas rurais e redes urbanas do país.
              </p>
            </div>

            {/* Performance and visual stamp */}
            <div className="py-3 max-w-sm mx-auto border border-zinc-800 rounded-xl bg-black/40 space-y-1.5 px-3">
              <p className="text-[9px] font-mono uppercase text-slate-500 tracking-wider">Patente de Conhecimento Atribuída</p>
              <h4 className="text-sm font-bold text-amber-400 tracking-normal font-sans uppercase">
                {rating.title}
              </h4>
              <p className="text-[10px] text-slate-450 italic">{rating.subtitle}</p>
              
              {/* Custom dynamic guard quote on certificate */}
              <div className="pt-2 border-t border-zinc-900 mt-2 text-[11px] font-mono text-pink-400/90 leading-relaxed italic">
                {player.guardPersonality === 'cute' && "△ 'Parabéns, fofuxo(a)! Você salvou todas as rodadas com seu conhecimento fofo! S2'"}
                {player.guardPersonality === 'vip' && "▢ 'Excelente investimento! Minhas apostas me renderam fortunas graças à sua inteligência tecnológica.'"}
                {player.guardPersonality === 'sarcastic' && "○ 'Sobreviveu... milagrosamente. Mas admita: colar no Caderno de Geografia te salvou da eliminação!'"}
                {!player.guardPersonality && "○ 'Recruta habilitado ao espaço rural e metropolitano.'"}
              </div>
            </div>

            {/* Winner Official Certificate & Redemption Code */}
            <div className="my-5 p-4 bg-gradient-to-r from-amber-950/45 via-yellow-950/30 to-amber-950/45 border-2 border-amber-500/40 rounded-xl max-w-md mx-auto relative overflow-hidden shadow-xl shadow-black/80">
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase mb-1 flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-yellow-400 animate-pulse animate-bounce" />
                <span>★ CÓDIGO DE RESGATE DO VENCEDOR ★</span>
              </p>
              <p className="text-xs text-slate-350 leading-relaxed font-sans max-w-xs mx-auto">
                Parabéns! Você passou com maestria em todos os exames rústicos e didáticos de Geografia!
              </p>
              <div className="mt-3.5 inline-block px-5 py-2.5 bg-zinc-950/95 border-2 border-dashed border-amber-400 text-xl font-mono font-black text-amber-300 tracking-[0.18em] select-all shadow-inner animate-pulse">
                WINNER_FILHA_26
              </div>
            </div>

            {/* Signature Area */}
            <div className="grid grid-cols-2 gap-8 pt-8 text-center font-mono text-[9px] text-slate-500 max-w-md mx-auto border-t border-zinc-800/80">
              <div>
                <p className="text-slate-350 text-xs font-serif italic mb-2">Comissão Organizadora</p>
                <div className="w-24 h-[1px] bg-zinc-700 mx-auto mb-1"></div>
                <p className="uppercase tracking-wider">LULA DIREÇÃO GERAL</p>
              </div>
              <div>
                <p className="text-slate-355 text-xs font-serif italic mb-2">₩ {formatCurrency(player.totalPrize)}</p>
                <div className="w-24 h-[1px] bg-zinc-700 mx-auto mb-1"></div>
                <p className="uppercase tracking-wider">ASSISTENTE COR DE ROSA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Small pedagogical recap summary */}
        <div className="bg-zinc-900 border border-zinc-850 p-5 rounded-xl space-y-3.5 text-print-hidden">
          <h4 className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Recapitulação da Matéria Memorizada:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="space-y-1.5">
              <p><strong className="text-zinc-200">● Agropecuária:</strong> Divisão entre sistema extensivo (familiar, tradicional coivara) e intensivo (mecanizado, Centro-Sul, cana-de-açúcar SP).</p>
              <p><strong className="text-zinc-200">● Concentração:</strong> Herança sesmarIAL consolidada pela Lei de Terras de 1850. Prática da grilagem.</p>
            </div>
            <div className="space-y-1.5">
              <p><strong className="text-zinc-200">● Redes:</strong> São Paulo é a única Grande Metrópole Nacional, conurbada com Rio de Janeiro (Megalópole pela Dutra).</p>
              <p><strong className="text-zinc-200">● Modais:</strong> Domínio do modal rodoviário (anos 50, alto custo) frente aos trilhos isolados e cabotagem costeira barata.</p>
            </div>
          </div>
        </div>

        {/* Cta Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-between text-print-hidden pt-2">
          <button
            onClick={handlePrint}
            id="print-certificate-btn"
            className="w-full sm:w-auto px-5 py-3 bg-zinc-900 border border-zinc-750 hover:bg-zinc-800 text-slate-350 hover:text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Certificado</span>
          </button>

          <button
            onClick={onRestart}
            id="restart-game-btn"
            className="w-full sm:w-auto px-7 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold tracking-wide rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950 cursor-pointer text-base font-mono"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Jogar Novamente</span>
          </button>
        </div>

      </div>
    </div>
  );
}

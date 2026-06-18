/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Target, Hexagon, Scale, CircleDot, Grid, Shield, Compass, Users, Building, Train,
  BookOpen, HelpCircle, Lightbulb, CheckCircle2, AlertTriangle, Volume2, VolumeX, Coins, ArrowRight, CornerDownRight,
  Timer, Sparkles, Zap, AlertCircle, ThumbsUp, Circle, Triangle, Square
} from 'lucide-react';
import { Player, Question, QuizState } from '../types';
import { GEOGRAPHY_QUESTIONS } from '../questions';
import { playSound } from '../utils/audio';

interface GameStageProps {
  player: Player;
  onQuestionCompleted: (updatedPlayer: Player) => void;
  onFinishGame: (finalPlayer: Player) => void;
  onOpenNotebook: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export default function GameStage({ player, onQuestionCompleted, onFinishGame, onOpenNotebook, isMuted, onToggleMute }: GameStageProps) {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isCorrectlyAnswered, setIsCorrectlyAnswered] = useState(false);
  const [attemptsThisQuestion, setAttemptsThisQuestion] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(isMuted === undefined ? !playSound.getMuteState() : !isMuted);

  // Sync state if prop changes
  useEffect(() => {
    if (isMuted !== undefined) {
      setAudioEnabled(!isMuted);
    }
  }, [isMuted]);

  // --- NEW GAMIFICATION STATES ---
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimeOutOpen, setIsTimeOutOpen] = useState(false);
  const [transitionStage, setTransitionStage] = useState<string | null>("Rodada 1: Batatinha Frita 1, 2, 3");
  
  // Power-up charge tracking (disposable per quiz session)
  const [laserCharges, setLaserCharges] = useState(2); // "○ Chute Laser" removes 2 wrong options
  const [bribeCharges, setBribeCharges] = useState(1); // "△ Suborno" tells correct half
  const [leakCharges, setLeakCharges] = useState(2); // "▢ Gabarito" gives exact search keyword

  // Active status messages of the power-ups for current question
  const [bribeText, setBribeText] = useState<string | null>(null);
  const [hackerLeakWord, setHackerLeakWord] = useState<string | null>(null);

  // --- NEW TYPED QUESTION STATES ---
  const [typedResponse, setTypedResponse] = useState('');
  const [typedFeedback, setTypedFeedback] = useState<{ status: 'correta' | 'incompleta' | 'errada'; text: string } | null>(null);

  const currentQuestion: Question = GEOGRAPHY_QUESTIONS[activeQuestionIdx];

  // Timer Effect
  useEffect(() => {
    if (isCorrectlyAnswered || transitionStage || isTimeOutOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          playSound.playExplosion();
          setIsTimeOutOpen(true);
          return 0;
        }
        if (prev <= 15) {
          playSound.playAlarm(); // Play low tension beeps/siren
        } else {
          playSound.playTick(); // Ticking clock woodblock sound
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCorrectlyAnswered, transitionStage, isTimeOutOpen, activeQuestionIdx]);

  const handleToggleSound = () => {
    if (onToggleMute) {
      onToggleMute();
    } else {
      const isMuted = playSound.toggleMute();
      setAudioEnabled(!isMuted);
      if (!isMuted) {
        playSound.playCorrect();
      }
    }
  };

  const handleOptionClick = (idx: number) => {
    if (isCorrectlyAnswered) return; // ignore clicks if already solved
    if (selectedIndices.includes(idx)) return; // already guessed this wrong one

    if (idx === currentQuestion.correctIndex) {
      // Correct!
      playSound.playCorrect();
      setIsCorrectlyAnswered(true);
      
      const firstTry = attemptsThisQuestion === 0;
      const additionalPrize = firstTry ? 456000000 : 0; // 456M wons on first attempt!
      const updatedPlayer: Player = {
        ...player,
        score: player.score + (firstTry ? 1 : 0),
        wrongAttempts: player.wrongAttempts + attemptsThisQuestion,
        totalPrize: player.totalPrize + additionalPrize
      };

      onQuestionCompleted(updatedPlayer);
    } else {
      // Incorrect!
      playSound.playWrong();
      setAttemptsThisQuestion(prev => prev + 1);
      setSelectedIndices(prev => [...prev, idx]);
    }
  };

  const handleAnalyzeTyped = () => {
    if (isCorrectlyAnswered) return;
    if (!typedResponse.trim()) {
      setTypedFeedback({
        status: 'errada',
        text: "Sua resposta está vazia! Digite alguma reflexão baseada no seu Caderno de Geografia rústico."
      });
      return;
    }

    // Normalizing helper (lower-casing & stripping Portuguese accents)
    const normalize = (text: string) => {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };

    const studentAns = normalize(typedResponse);
    const required = currentQuestion.typedKeywordsRequired || [];
    const feedbackIns = currentQuestion.typedFeedbackInstructions || [];

    const missingIndices: number[] = [];

    required.forEach((keywordGroup, idx) => {
      const matched = keywordGroup.some(word => studentAns.includes(normalize(word)));
      if (!matched) {
        missingIndices.push(idx);
      }
    });

    if (missingIndices.length === 0) {
      // CORRECT ANSWER!
      playSound.playCorrect();
      setIsCorrectlyAnswered(true);
      setTypedFeedback({
        status: 'correta',
        text: "Análise Concluída: RESPOSTA EXCELENTE E GABARITADA! Seus argumentos coincidem perfeitamente com o manual de segurança nacional do Diretor!"
      });

      const firstTry = attemptsThisQuestion === 0;
      const additionalPrize = firstTry ? 456000000 : 0;
      const updatedPlayer: Player = {
        ...player,
        score: player.score + (firstTry ? 1 : 0),
        wrongAttempts: player.wrongAttempts + attemptsThisQuestion,
        totalPrize: player.totalPrize + additionalPrize
      };
      onQuestionCompleted(updatedPlayer);
    } else if (missingIndices.length < required.length) {
      // PARTIAL / INCOMPLETE ANSWER!
      playSound.playWrong();
      setAttemptsThisQuestion(prev => prev + 1);

      // Get first missing keyword message
      const firstMissingIdx = missingIndices[0];
      const inst = feedbackIns.find(item => item.missingGroupIndex === firstMissingIdx);
      const adviceText = inst ? inst.feedback : "Faltam conceitos adicionais fundamentando o manual.";

      setTypedFeedback({
        status: 'incompleta',
        text: `RESPOSTA INCOMPLETA! Seu argumento está em parte correto, mas ainda falta um detalhe vital: ${adviceText}`
      });
    } else {
      // WRONG ANSWER!
      playSound.playWrong();
      setAttemptsThisQuestion(prev => prev + 1);

      setTypedFeedback({
        status: 'errada',
        text: "RESPOSTA INCORRETA OU INADEQUADA! Não conseguimos identificar os fatos geográficos básicos que fundamentam essa pergunta no seu parágrafo. Leia a Pista de Estudos do Guarda ou consulte o Caderno de Geografia!"
      });
    }
  };

  const handleNextQuestion = () => {
    if (!isCorrectlyAnswered) return;

    if (activeQuestionIdx < GEOGRAPHY_QUESTIONS.length - 1) {
      // Move to next question with a stage intro transition modal
      const nextIdx = activeQuestionIdx + 1;
      setTransitionStage(GEOGRAPHY_QUESTIONS[nextIdx].stageName);
      playSound.playIntro();

      setActiveQuestionIdx(nextIdx);
      setSelectedIndices([]);
      setIsCorrectlyAnswered(false);
      setAttemptsThisQuestion(0);
      setHackerLeakWord(null);
      setBribeText(null);
      setTimeLeft(180); // Reset timer
      setTypedResponse('');
      setTypedFeedback(null);
    } else {
      // Quiz finished
      playSound.playVictory();
      onFinishGame(player);
    }
  };

  // Safe Revive options for Unlimited attempts but tense feel!
  const handleReviveBribe = () => {
    playSound.playBribe();
    setIsTimeOutOpen(false);
    setTimeLeft(120);

    // Give funny feedback
    setBribeText("Subornado com sucesso! Ganhou +120 segundos rústicos. Responda rápido!");
  };

  const handleRevivePromise = () => {
    playSound.playBribe();
    setIsTimeOutOpen(false);
    setTimeLeft(90);
  };

  // --- POWERUP ACTION HANDLERS ---
  const handleUseLaser = () => {
    if (laserCharges <= 0 || isCorrectlyAnswered || currentQuestion.type === 'typed') return;
    playSound.playBribe();
    setLaserCharges(prev => prev - 1);
    
    // Find incorrect option indices
    const wrongIndices: number[] = [];
    (currentQuestion.options || []).forEach((_, idx) => {
      if (idx !== currentQuestion.correctIndex) {
        wrongIndices.push(idx);
      }
    });

    // Randomly select 2 wrong options and add them to selected (graying them out)
    const shuffled = [...wrongIndices].sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);
    setSelectedIndices(prev => [...prev, ...toEliminate]);
  };

  const handleUseBribe = () => {
    if (bribeCharges <= 0 || isCorrectlyAnswered) return;
    playSound.playBribe();
    setBribeCharges(prev => prev - 1);
    
    const personality = player.guardPersonality || 'sarcastic';
    let text = "";

    if (currentQuestion.type === 'typed') {
      const requiredSample = (currentQuestion.typedKeywordsRequired || []).map(group => group[0]).join(", ");
      if (personality === 'cute') {
        text = `Psiu fofinho! Seu parágrafo precisa mesmo focar nos termos de estudos: [${requiredSample}]! Arrasa! S2`;
      } else if (personality === 'vip') {
        text = `Atas dos investidores: escreva parágrafos contemplando obrigatoriamente [${requiredSample}] para selar seu sucesso econômico.`;
      } else {
        text = `Mão leve! O chefe do vestiário exige que você cite noções de [${requiredSample}] abaixo. Trata de incluir tudo!`;
      }
    } else {
      const correctIdx = currentQuestion.correctIndex ?? 0;
      const correctGroup = correctIdx < 2 ? "A ou B" : "C ou D";
      if (personality === 'cute') {
        text = `Psiu! O correto está escondidinho entre as opções (${correctGroup})! Não conta pra ninguém! S2`;
      } else if (personality === 'vip') {
        text = `Olhei o telão VIP aqui... O porco sinaliza que a resposta certa está no bloco (${correctGroup}). Aproveite!`;
      } else {
        text = `Beleza, peguei a grana virtual. A correta está entre as opções (${correctGroup}). Trata de acertar pra não ser eliminado!`;
      }
    }
    setBribeText(text);
  };

  const handleUseLeak = () => {
    if (leakCharges <= 0 || isCorrectlyAnswered) return;
    playSound.playBribe();
    setLeakCharges(prev => prev - 1);
    
    // Map of search words in the study notebook
    const searchWordMap: { [key: number]: string } = {
      1: "Segurança Alimentar",
      11: "Segurança Alimentar",
      2: "Sistema Extensivo",
      12: "Sistema Extensivo",
      3: "Sistema Intensivo",
      13: "Sistema Intensivo",
      4: "A Revolução Verde & Soja",
      14: "A Revolução Verde & Soja",
      5: "Estrutura Fundiária",
      15: "Estrutura Fundiária",
      6: "Estrutura Fundiária",
      16: "Estrutura Fundiária",
      7: "Coco do Babaçu",
      17: "Coco do Babaçu",
      8: "Industrialização & Êxodo Rural",
      18: "Industrialização & Êxodo Rural",
      9: "Megalópole e Regiões Metropolitanas",
      19: "Megalópole e Regiões Metropolitanas",
      10: "Transporte Rodoviário",
      20: "Transporte Rodoviário"
    };
    const word = searchWordMap[currentQuestion.id] || "Sistemas Agrícolas";
    setHackerLeakWord(word);
  };

  // --- DYNAMIC DIALOG COMPONER (Pinch of Humor!) ---
  const getGuardComment = () => {
    const personality = player.guardPersonality || 'sarcastic';
    
    if (timeLeft <= 15) {
      if (personality === 'cute') {
        return "Aaaai que nervoso! Só 15 segundos! Chuta com carinho ou abra o caderno correndo, amiguinho! :(";
      }
      if (personality === 'vip') {
        return "Uh! 15 segundos de suspense puro na arena. Quem vai cair da ponte de vidro agora?";
      }
      return "SE MEXE RECRUTA! Só 15 segundos! O cronômetro vai explodir na sua orelha rústica!";
    }

    if (attemptsThisQuestion >= 2) {
      if (personality === 'cute') {
        return "Poxa vida, que rodada difícil! Mas não desiste! S2 A dica rosa aí embaixo te dá o caminho do abraço!";
      }
      if (personality === 'vip') {
        return "Duas falhas seguidas? Que ultraje! Até os cavalos puro-sangue da minha fazenda modernizada sabem disso!";
      }
      return "Mas que miolo de coivara queimada! Duas tentativas erradas? Leia a dica do Guarda ou confisque as terras ociosas da sua mente!";
    }

    if (attemptsThisQuestion === 1) {
      if (personality === 'cute') {
        return "Opsie! Acontece, todo mundo cansa. Já tentou usar as trapaças de recruta ali em cima para te ajudar?";
      }
      if (personality === 'vip') {
        return "Uhh, errou! Acabei de perder 456 mil de Wons apostados nessa rodada. Não faça feio de novo!";
      }
      return "ERROU! Tá dormindo na rodovia Presidente Dutra? Concentração senão vira boia-fria do êxodo urbano!";
    }

    // Special written question incomplete validation trigger
    if (typedFeedback && typedFeedback.status === 'incompleta') {
      if (personality === 'cute') {
        return "Ahww! Sua respostinha está quase lá, bem fofinha, mas está faltando um pequeno detalhe fofo! Olhe a dica amarela de ajuda ali embaixo! S2";
      }
      if (personality === 'vip') {
        return "Sua resposta tem certo tato comercial, mas está um pouco rasa. Acrescente as peças que faltam para não desapontar meus investidores.";
      }
      return "DICA DE RECRUTA: Linha de raciocínio correta, mas INCOMPLETA! Alinhave os termos chave sugeridos no alerta!";
    }

    if (isCorrectlyAnswered) {
      if (personality === 'cute') {
        return "Ebaa! Você arrasou de verdade! Que orgulho de você! Vamos de mãozinhas dadas para a próxima fase? S2";
      }
      if (personality === 'vip') {
        return "Muito refinado! O meu porco de ouro adorou o rendimento dessa rodada. Avance para duplicar os Wons!";
      }
      return "Sobreviveu... por enquanto! Não ache que o jogo acabou aqui. A próxima rodada vem mais tensa!";
    }

    // Default hints depending on target topic
    switch (currentQuestion.topic) {
      case "Agropecuária & Segurança Alimentar":
        if (personality === 'cute') return "A Segurança Alimentar apareceu depois da Primeira Grande Guerra por causa do fofinho do alimento! Acha pos-guerra aí!";
        if (personality === 'vip') return "A fome na Grande Guerra desestabilizou países inteiros. Qual alternativa se situa em 1918?";
        return "Segurança alimentar nasceu para medir a fome terrível do pós-Guerra de 1914! Foco!";
      case "Sistemas Agrícolas":
        if (personality === 'cute') return "O sistema extensivo é aquele de base bem familiar e rústica tradicional (tipo coivara)! S2";
        if (personality === 'vip') return "Sem tecnologia, tratores escassos... Extensivo representa produtividade quase nula no campo.";
        return "Extensivo rejeita alta maquinaria e capital! Procure a alternativa mais tradicional e rústica!";
      case "Modernização e Complexos Agroindustriais":
        if (personality === 'cute') return "O Centro-Sul modernão bomba no plantio de cana pra fazer biocombustível fofo! Olha o interior de SP!";
        if (personality === 'vip') return "Nos anos 70, a crise do petróleo mudou tudo. São Paulo liderou a produção massiva de etanol.";
        return "A cana de São Paulo estourou nos anos 1970 para alimentar o Pró-Álcool! Firme a corda!";
      case "Cadeia Produtiva & Agropecuária":
        if (personality === 'cute') return "Exportar a soja em grão cru sem esmagar deixa o Brasil sem carguinhas legais de emprego! :( ";
        if (personality === 'vip') return "Enviar soja em grão cru significa transferir o valor e o emprego de refino para o exterior.";
        return "Grão cru não gera empregos fabris nacionais de farelo ou óleos refinados. Pense grande!";
      case "Estrutura Fundiária":
        if (personality === 'cute') return "A Lei de Terras de 1850 exigiu moedas para regularizar posses rurais. Quão injusto! S2";
        if (personality === 'vip') return "Ah, o império brasileiro e suas restrições de propriedade feudal para garantir lucros de barões.";
        return "Em 1850 a terra pública virou mercadoria! Sem registro, sobrou só a grilagem e a exclusão!";
      case "Reforma Agrária":
        if (personality === 'cute') return "Redistribuir terrinhas ociosas (improdutivas) ajuda a combater a fome dos menorzinhos! Fofa atitude!";
        if (personality === 'vip') return "Investir em propriedades ociosas improdutivas restaura a ordem e fixa o trabalhador no campo.";
        return "Terras ociosas (improdutivas) sofrem reforma agrária por lei, minifúndio de policultura familiar!";
      case "Extrativismo Brasileiro":
        if (personality === 'cute') return "O coco de babaçu é colhido pelas nobres quebradeiras na área de transição. É 100% fofo de usar!";
        if (personality === 'vip') return "Amêndoas de babaçu extraindo óleos para sabonetes suntuosos. Classe e sustentabilidade pura.";
        return "O coco multifuncional de babaçu nas zonas de ecótono! 100% de aproveitamento do óleo!";
      case "Urbanização e Êxodo Rural":
        if (personality === 'cute') return "As máquinas expulsaram os fofinhos do campo pras metrópoles cheias de fumaça! Êxodo rural total!";
        if (personality === 'vip') return "A revolução tecnológica no campo aliada à concentração fundiária gerou migração recorde às cidades.";
        return "Mecanização acelerada e latifúndio forçaram a enxada a virar boia-fria periférica no asfalto!";
      case "Redes Urbanas e Hierarquia":
        if (personality === 'cute') return "São Paulo é o supercentro nacional mais importante de todos! A Grande Metrópole real!";
        if (personality === 'vip') return "São Paulo e Rio de Janeiro conurbando via Rodovia Dutra formam o eixo da Megalópole.";
        return "Conurbação entre SP-RJ conectadas pela Dutra! Esse eixo é nossa megalópole em ebulição!";
      case "Sistemas de Transportes":
        if (personality === 'cute') return "Os caminhões gastam muito asfalto e queimam combustíveis caros, encarecendo a comida do porquinho! :o";
        if (personality === 'vip') return "Optar primordialmente por rodovias encarece consideravelmente os custos logísticos nacionais.";
        return "Modal rodoviário: muita flexibilidade urbana, porém um custo asfáltico e de combustível salgado!";
      default:
        return "Analise as alternativas com cautela acadêmica.";
    }
  };

  // Helper to render current round dynamic icon
  const renderRoundIcon = (iconName: string) => {
    const props = { className: "w-8 h-8 text-rose-500 animate-pulse stroke-[2.5]" };
    switch (iconName) {
      case "Target": return <Target {...props} />;
      case "Hexagon": return <Hexagon {...props} />;
      case "Scale": return <Scale {...props} />;
      case "CircleDot": return <CircleDot {...props} />;
      case "Grid": return <Grid {...props} />;
      case "Shield": return <Shield {...props} />;
      case "Compass": return <Compass {...props} />;
      case "Users": return <Users {...props} />;
      case "Building": return <Building {...props} />;
      case "Train": return <Train {...props} />;
      default: return <HelpCircle {...props} />;
    }
  };

  // Helper to convert virtual Won rewards to beautiful formatted string
  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `₩ ${(val / 1000000000).toFixed(2)} Bilhões`;
    }
    if (val >= 1000000) {
      return `₩ ${(val / 1000000).toFixed(0)} Milhões`;
    }
    return `₩ ${val.toLocaleString('pt-BR')}`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col font-sans relative overflow-hidden pb-10">
      {/* Dynamic Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/80 via-zinc-950 to-black pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[length:100%_4px] opacity-15 pointer-events-none" />

      {/* Top Banner / HUD */}
      <header className="bg-zinc-900/90 border-b border-zinc-800 sticky top-0 z-40 backdrop-blur-md px-4 py-3 md:px-6 shadow-md shadow-black/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* User badge */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${player.avatarColor} text-white border-2 border-zinc-700 font-mono text-xl font-bold shadow-lg`}>
              {player.avatarIcon === 'circle' && '○'}
              {player.avatarIcon === 'triangle' && '△'}
              {player.avatarIcon === 'square' && '▢'}
              {!['circle', 'triangle', 'square'].includes(player.avatarIcon) && player.number}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base font-mono">{player.name}</span>
                <span className="text-[10px] bg-rose-950/80 border border-rose-900 text-rose-450 px-2 py-0.5 rounded font-bold font-mono">
                  Nº {player.number}
                </span>
              </div>
              <p className="text-xs text-slate-450 font-mono mt-0.5">Sobrevivente Estudantil</p>
            </div>
          </div>

          {/* Golden Pigs & Coins (Prize bank) */}
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl px-5 py-2.5 flex items-center gap-3.5 shadow-lg shadow-amber-950/25 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg text-black shadow-inner shadow-white/40 animate-bounce">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <p id="total-prize-label" className="text-[10px] uppercase font-bold tracking-wider text-amber-500/80 font-mono">COFRE DO PORCO DE OURO</p>
              <h2 id="total-prize-amount" className="text-xl md:text-2xl font-extrabold text-amber-400 font-mono flex items-center drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                {formatCurrency(player.totalPrize || 0)}
              </h2>
            </div>
          </div>

          {/* Study Notebook & Audio CTAs */}
          <div className="flex gap-2">
            <button
              onClick={onOpenNotebook}
              id="study-companion-trigger"
              className="px-4 py-2 bg-pink-900/20 hover:bg-pink-900/40 text-pink-400 border border-pink-700/50 hover:border-pink-500 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
              title="Abrir o livro para colar ou estudar"
            >
              <BookOpen className="w-4 h-4" />
              <span>Consultar Caderno</span>
            </button>

            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${audioEnabled ? 'bg-zinc-800 border-zinc-700 text-emerald-450 hover:bg-zinc-700' : 'bg-rose-950/20 border-rose-900/40 text-rose-500 hover:bg-rose-900/30'}`}
              title={audioEnabled ? "Mutar efeitos sonoros" : "Ativar efeitos sonoros"}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4 text-rose-500 animate-pulse" />}
            </button>
          </div>
        </div>
      </header>

      {/* 10-Step Progress Map Bar */}
      <section className="bg-zinc-950 py-3 border-b border-zinc-900 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1 px-1">
            <span>START: FASE 1</span>
            <span className="text-rose-500 font-bold">RODADA ATUAL: {activeQuestionIdx + 1}/10</span>
            <span>PREMIAÇÃO: MAX 4.56B WONS</span>
          </div>
          <div className="grid grid-cols-10 gap-1.5 md:gap-2.5">
            {GEOGRAPHY_QUESTIONS.map((q, idx) => {
              const isPassed = idx < activeQuestionIdx;
              const isCurrent = idx === activeQuestionIdx;
              return (
                <div key={q.id} className="relative flex flex-col items-center">
                  <div 
                    title={`Fase ${q.id}: ${q.stageName}`}
                    className={`w-full h-2.5 rounded-full transition-all duration-500 ${isPassed ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : isCurrent ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-pulse' : 'bg-zinc-800'}`} 
                  />
                  <div className={`mt-1 font-mono text-[9px] font-bold ${isCurrent ? 'text-rose-400' : isPassed ? 'text-emerald-500' : 'text-zinc-600'}`}>
                    {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Table / Game Arena */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 mt-2 grid grid-cols-1 gap-6 relative">
        <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5 md:p-7 shadow-xl shadow-black/80 relative flex flex-col justify-between">
          
          {/* Section: Stage Title, Topic, Timer & Attempts */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-zinc-800 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-950/60 rounded-xl border border-rose-800/40">
                {renderRoundIcon(currentQuestion.stageIcon)}
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg font-mono tracking-tight flex items-center gap-2">
                  {currentQuestion.stageName}
                </h3>
                <p className="text-xs text-rose-500/80 font-mono tracking-widest uppercase">CONTEÚDO: {currentQuestion.topic}</p>
              </div>
            </div>

            {/* Timer and Attempts HUD inside the arena */}
            <div className="flex gap-2 items-center flex-wrap">
              <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${timeLeft <= 15 ? 'text-rose-500 border-rose-500 bg-rose-950/20 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse' : 'text-emerald-400 border-emerald-950 bg-zinc-950'}`}>
                <Timer className="w-3.5 h-3.5 animate-spin-slow" />
                <span>TEMPO: {timeLeft}s</span>
              </div>
              <div className="text-[11px] font-mono bg-zinc-950 px-3 py-1.5 rounded border border-zinc-800 text-slate-400">
                Tentativa: <span className="font-bold text-rose-500">{attemptsThisQuestion + 1}</span>
              </div>
            </div>
          </div>

          {/* Interactive Guardian/Mascot speech bubble connection (Humor!) */}
          <div className="mb-5 p-4 rounded-xl bg-zinc-950 border border-zinc-850 flex gap-3.5 items-center relative overflow-hidden group">
            {/* Symbol indicator vertical banner */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${player.guardPersonality === 'cute' ? 'bg-pink-500' : player.guardPersonality === 'vip' ? 'bg-amber-500' : 'bg-rose-500'}`} />
            
            {/* Mascot circular geometric head */}
            <div className={`w-12 h-12 shrink-0 rounded-full bg-zinc-900 border-2 flex items-center justify-center font-mono text-xl font-bold shadow-md relative ${player.guardPersonality === 'cute' ? 'border-pink-500 text-pink-500' : player.guardPersonality === 'vip' ? 'border-amber-555 text-amber-400' : 'border-rose-500 text-rose-500'}`}>
              {player.guardPersonality === 'cute' ? '△' : player.guardPersonality === 'vip' ? '▢' : '○'}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-ping"></span>
            </div>

            <div className="space-y-0.5">
              <h4 className="text-[10px] font-mono tracking-wider font-extrabold text-slate-400 uppercase flex items-center gap-1.5">
                {player.guardPersonality === 'cute' && <span className="text-pink-400">TUTOR AMIGUINHO</span>}
                {player.guardPersonality === 'vip' && <span className="text-amber-550">VIP DR. BILHÃO</span>}
                {player.guardPersonality === 'sarcastic' && <span className="text-rose-400">GUARDA ROSA PISTOLA</span>}
                
                <span className="py-0.5 px-1 bg-zinc-900 text-[8px] text-zinc-500 border border-zinc-800 rounded font-normal font-mono uppercase">
                  Conexão de Áudio Ativa
                </span>
              </h4>
              <p className="text-slate-200 text-xs md:text-sm italic leading-relaxed font-sans">
                "{getGuardComment()}"
              </p>
            </div>
          </div>

          {/* Tactical Power-Ups Bar (Trapaças / cheats) */}
          <div className="mb-6 bg-zinc-950/80 border border-zinc-900 p-3 rounded-xl">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-2 px-1">
              <span className="uppercase font-extrabold tracking-wider text-rose-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-450 animate-pulse" />
                Estratagemas do Recruta (Trapaças Temáticas)
              </span>
              <span>Uso limitado</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleUseLaser}
                disabled={laserCharges <= 0 || isCorrectlyAnswered || currentQuestion.type === 'typed'}
                className={`py-1.5 px-2 rounded-lg border text-xs font-mono transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${laserCharges > 0 && !isCorrectlyAnswered && currentQuestion.type !== 'typed' ? 'bg-zinc-900 border-rose-900 text-rose-300 hover:border-rose-500 hover:bg-zinc-850' : 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed'}`}
                title={currentQuestion.type === 'typed' ? "Desativado para perguntas de redação!" : "Elimina 2 alternativas erradas instantaneamente!"}
              >
                <span className="font-bold text-[10px] uppercase">○ Laser</span>
                <span className="text-[9px] uppercase font-semibold text-rose-450">({laserCharges} cargas)</span>
              </button>

              <button
                type="button"
                onClick={handleUseBribe}
                disabled={bribeCharges <= 0 || isCorrectlyAnswered}
                className={`py-1.5 px-2 rounded-lg border text-xs font-mono transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${bribeCharges > 0 && !isCorrectlyAnswered ? 'bg-zinc-900 border-pink-900 text-pink-300 hover:border-pink-500 hover:bg-zinc-850' : 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed'}`}
                title="Sussurra em qual bloco (A/B ou C/D) ou quais conceitos-chave focar!"
              >
                <span className="font-bold text-[10px] uppercase">△ Pista</span>
                <span className="text-[9px] uppercase font-semibold text-pink-450">({bribeCharges} carga)</span>
              </button>

              <button
                type="button"
                onClick={handleUseLeak}
                disabled={leakCharges <= 0 || isCorrectlyAnswered}
                className={`py-1.5 px-2 rounded-lg border text-xs font-mono transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${leakCharges > 0 && !isCorrectlyAnswered ? 'bg-zinc-900 border-amber-900 text-amber-300 hover:border-amber-500 hover:bg-zinc-850' : 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed'}`}
                title="Vaza a senha/termo de pesquisa exato para colar no caderno de estudos!"
              >
                <span className="font-bold text-[10px] uppercase">▢ Hack Termo</span>
                <span className="text-[9px] uppercase font-semibold text-amber-450">({leakCharges} cargas)</span>
              </button>
            </div>

            {/* Displaying active power-up effects */}
            {(bribeText || hackerLeakWord) && (
              <div className="mt-3 p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 text-xs gap-2 space-y-1 md:space-y-0.5 flex flex-col items-start font-mono text-zinc-300 animate-scale-up">
                {bribeText && (
                  <p className="text-pink-300">
                    <strong className="text-pink-400">△ Sussurro da Pista:</strong> {bribeText}
                  </p>
                )}
                {hackerLeakWord && (
                  <p className="text-amber-300">
                    <strong className="text-amber-400">▢ Voldo de Hack:</strong> Copie o termo <strong className="bg-amber-955 px-1.5 py-0.5 rounded border border-amber-800/60 font-bold underline text-amber-200 select-all">{hackerLeakWord}</strong>, clique em <button onClick={onOpenNotebook} className="text-pink-400 underline font-bold px-1 select-none hover:text-pink-300">Consultar Caderno</button> e cole-o na busca para gabaritar de graça!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Section: The Question Text */}
          <div className="mb-6">
            <h2 id="question-text" className="text-base md:text-lg font-bold font-sans text-white leading-relaxed">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* Section: Dynamic choices (Multiple choice) or Text fields (Typed) */}
          {currentQuestion.type === 'multiple' ? (
            <div className="space-y-3.5 mb-6">
              {(currentQuestion.options || []).map((option, idx) => {
                const isSelected = selectedIndices.includes(idx);
                const isCorrectOption = idx === currentQuestion.correctIndex;
                const hasTriedAndWrong = isSelected && !isCorrectOption;
                const isSolvedAndCorrect = isCorrectlyAnswered && isCorrectOption;

                let btnStyle = "border-zinc-800 bg-zinc-950/80 hover:bg-zinc-950 text-slate-300 hover:border-zinc-650 cursor-pointer";
                if (hasTriedAndWrong) {
                  btnStyle = "bg-rose-950/20 border-rose-900/60 text-slate-500 cursor-not-allowed line-through";
                } else if (isSolvedAndCorrect) {
                  btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={hasTriedAndWrong || isCorrectlyAnswered}
                    className={`w-full text-left p-4 rounded-xl border font-sans text-sm md:text-[15px] font-medium leading-relaxed transition-all duration-150 flex gap-3 items-start relative group ${btnStyle}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border font-mono text-xs font-bold text-slate-400 group-hover:text-white transition-colors ${hasTriedAndWrong ? 'bg-red-950 border-red-800' : isSolvedAndCorrect ? 'bg-emerald-800 border-emerald-500 text-white' : 'bg-zinc-900 border-zinc-700'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1">{option}</span>

                    {/* Icon Check or Cross indicator */}
                    {hasTriedAndWrong && (
                      <span className="text-rose-500 font-bold text-xs font-mono uppercase bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900 shrink-0">
                        ERRADO
                      </span>
                    )}
                    {isSolvedAndCorrect && (
                      <span className="text-emerald-400 font-bold text-xs font-mono uppercase bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800 shrink-0 flex items-center gap-1 shadow-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        SALVO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              <div className="relative">
                <textarea
                  id="typed-response-area"
                  rows={4}
                  placeholder="Escreva aqui a sua resposta argumentativa contendo os pontos cruciais explicados no manual..."
                  value={typedResponse}
                  onChange={(e) => setTypedResponse(e.target.value)}
                  disabled={isCorrectlyAnswered}
                  className="w-full bg-zinc-950 border border-zinc-850 rounded-xl p-4 text-sm text-slate-200 placeholder-zinc-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-sans leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                />
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-650">
                  {typedResponse.length} caracteres
                </div>
              </div>

              {/* Display analysis feedback */}
              {typedFeedback && (
                <div 
                  id="typed-feedback-alert"
                  className={`p-4 rounded-xl border text-xs md:text-sm shadow-inner transition-all animate-scale-up ${
                    typedFeedback.status === 'correta' 
                      ? 'bg-emerald-950/45 border-emerald-500 text-emerald-300' 
                      : typedFeedback.status === 'incompleta'
                      ? 'bg-amber-955/25 border-amber-650 text-amber-300'
                      : 'bg-rose-955/25 border-rose-650 text-rose-300'
                  }`}
                >
                  <p className="font-mono font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    {typedFeedback.status === 'correta' && (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                        <span>Retorno do Avaliador: Gabaritado!</span>
                      </>
                    )}
                    {typedFeedback.status === 'incompleta' && (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span>Retorno do Avaliador: Em Progresso</span>
                      </>
                    )}
                    {typedFeedback.status === 'errada' && (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                        <span>Retorno do Avaliador: Atenção!</span>
                      </>
                    )}
                  </p>
                  <p className="leading-relaxed font-sans">{typedFeedback.text}</p>
                </div>
              )}

              {/* Action Buttons: Analisar Button */}
              {!isCorrectlyAnswered && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAnalyzeTyped}
                    id="btn-analyze"
                    className="px-6 py-3 bg-pink-700 hover:bg-pink-650 active:scale-95 text-white font-extrabold tracking-wide rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-pink-950 border border-pink-500 cursor-pointer uppercase font-mono"
                    title="Enviar resposta ao Guarda Supervisor para processamento"
                  >
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>Analisar Resposta</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Section: Pedagogical Helper Feedback (Whisper Hint / Correct Explanation) */}
          <div className="space-y-4">
            
            {/* Display failure hint if they typed anything wrong */}
            {attemptsThisQuestion > 0 && !isCorrectlyAnswered && (
              <div 
                id="hint-panel"
                className="p-4 bg-rose-950/20 border border-rose-900/50 rounded-xl text-xs md:text-sm text-rose-200 flex gap-3 animate-fade-in"
              >
                <div className="w-8 h-8 rounded-full bg-rose-900/80 text-white flex items-center justify-center font-mono font-bold shrink-0 shadow-lg">
                  {player.avatarIcon === 'circle' ? '△' : '▢'}
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-rose-450 uppercase tracking-wide font-mono flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Orientação do Guarda Rosa:
                  </p>
                  <p className="leading-relaxed italic">{currentQuestion.hint}</p>
                  <p className="text-[10px] text-slate-450 mt-1">
                    Estude a dica e clique em outra alternativa! Lembre-se: você também pode clicar em 
                    <button onClick={onOpenNotebook} className="text-pink-400 underline font-bold px-1 select-none hover:text-pink-300">Consultar Caderno</button> 
                    para ler o resumo de graça.
                  </p>
                </div>
              </div>
            )}

            {/* Display jubilant success summary box when answered correctly */}
            {isCorrectlyAnswered && (
              <div 
                id="explanation-panel"
                className="p-5 bg-emerald-950/35 border border-emerald-500/40 rounded-xl text-xs md:text-sm text-emerald-200 space-y-3 shadow-xl animate-scale-up"
              >
                <div className="flex items-center gap-2.5 text-emerald-400 font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>SOBREVIVEU AO DESAFIO!</span>
                </div>
                <div className="text-slate-355 leading-relaxed font-sans space-y-2">
                  <div className="flex items-start gap-2 text-emerald-300/90 font-medium">
                    <CornerDownRight className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{currentQuestion.explanation}</p>
                  </div>
                  {attemptsThisQuestion === 0 ? (
                    <p className="text-[11px] text-amber-400 font-mono font-semibold bg-amber-955/20 border border-amber-900/50 p-2 rounded mt-1 shadow-inner">
                      ★ GABARITOU DE PRIMEIRA! +₩ 456.000.000 moedas virtuais adicionadas ao cofre.
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-450 font-mono italic">
                      Dica aproveitada! Você acertou na tentativa nº {attemptsThisQuestion + 1}. Nenhum recruta é deixado para trás.
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    id="btn-next-question"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold tracking-wide rounded-lg text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer"
                  >
                    <span>{activeQuestionIdx < GEOGRAPHY_QUESTIONS.length - 1 ? 'Próxima Rodada' : 'Visualizar Resultados'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Small helpful banner reminding students about study guide */}
        <div className="flex justify-between items-center px-4 py-2 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            Não chute às cegas!
          </span>
          <button 
            onClick={onOpenNotebook}
            className="text-pink-400 hover:text-pink-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            Abrir Livro de Geografia & Reler Texto →
          </button>
        </div>
      </main>

      {/* --- REACIVATION / TIME OUT MODAL --- */}
      {isTimeOutOpen && (
        <div className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 p-6 backdrop-blur-md">
          <div className="bg-zinc-900 border-2 border-rose-500 rounded-2xl p-6 md:p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-rose-950 text-rose-500 flex items-center justify-center mx-auto border border-rose-800 animate-bounce">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-rose-500 uppercase bg-rose-950/60 px-3 py-1 rounded inline-block">
                ELIMINAÇÃO IMINENTE
              </span>
              <h2 className="text-2xl font-black text-white font-mono uppercase mt-2">O TEMPO ACABOU!</h2>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                {player.guardPersonality === 'cute' ? (
                  "Ohhh não! O relóginho fofo parou! Mas não chores, os guardas te dão uma segunda chance fofinha de continuar no desafio!"
                ) : player.guardPersonality === 'vip' ? (
                  "A ampulheta esvaziou inteira. Meus vips estão bocejando. Compre sua reativação com um bônus escolar imediato!"
                ) : (
                  "LENTO DEMAIS! O relógio explodiu. Tem sorte que o Diretor quer que você de fato passe no vestibular de geografia, herói!"
                )}
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <button
                onClick={handleReviveBribe}
                className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-extrabold tracking-wide rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-pink-950 border border-pink-500 cursor-pointer font-mono"
              >
                <Zap className="w-4 h-4 fill-white animate-pulse" />
                <span>Barganhar Pista (+120 Segundos)</span>
              </button>
              <button
                onClick={handleRevivePromise}
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-slate-300 border border-zinc-750 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <ThumbsUp className="w-4 h-4 text-emerald-400" />
                <span>Prometer Estudar o Caderno (+90s)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- stage introduction transitions --- */}
      {transitionStage && (
        <div className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 p-6">
          <div className="text-center space-y-6 max-w-sm animate-scale-up">
            <div className="text-xs font-mono font-bold tracking-[0.3em] text-rose-500 uppercase bg-rose-950/40 border border-rose-900/40 px-3 py-1 rounded">
              PREPARAÇÃO DO SOBREVIVENTE
            </div>
            
            <div className="flex justify-center gap-6 text-rose-600 my-4">
              <Circle className="w-12 h-12 stroke-[3] animate-pulse" />
              <Triangle className="w-12 h-12 stroke-[3] animate-pulse delay-75" />
              <Square className="w-12 h-12 stroke-[3] animate-pulse delay-150" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white font-mono uppercase tracking-tight">
              {transitionStage}
            </h2>

            <p className="text-slate-450 text-xs md:text-sm leading-relaxed">
              {transitionStage.includes("1:") && "A boneca rústica gigante está armada no espaço rural! Escolha a segurança alimentar!"}
              {transitionStage.includes("2:") && "Corte a dalgona dos Sistemas Agrícolas com cuidado rústico extensivo!"}
              {transitionStage.includes("3:") && "Cabo de Guerra! Firme o pé no asfalto e use o complexo intensivo Centro-Sul!"}
              {transitionStage.includes("4:") && "Bolinhas de gude da soja crua! Lembre-se: exportar grão cru custa empregos qualificados!"}
              {transitionStage.includes("5:") && "Vidro fundiário! Cuidado para não pisar na fraude ou posseiro sem registro de 1850!"}
              {transitionStage.includes("6:") && "Redistribuir o latifúndio improdutivo! A reforma agrária traz justiça rústica final!"}
              {transitionStage.includes("7:") && "Extrativismo! Quebre o coco com as quebradeiras do Babaçu do Maranhão!"}
              {transitionStage.includes("8:") && "Êxodo Rural! Metrópoles e o boia-fria expulso pelas colheitadeiras rurais!"}
              {transitionStage.includes("9:") && "Megalópole em obras! A Rodovia Presidente Dutra une o tecido das duas grandes metrópoles!"}
              {transitionStage.includes("10:") && "Fase Final! O modal rodoviário consome combustível de ouro. Conclua os trilhos!"}
              {!transitionStage.includes("1:") && !transitionStage.includes("2:") && !transitionStage.includes("3:") && !transitionStage.includes("4:") && !transitionStage.includes("5:") && !transitionStage.includes("6:") && !transitionStage.includes("7:") && !transitionStage.includes("8:") && !transitionStage.includes("9:") && !transitionStage.includes("10:") && "Fase de transição: Conquiste o letramento rústico nacional!"}
            </p>

            <button
              onClick={() => {
                playSound.playIntro();
                setTransitionStage(null);
              }}
              className="mt-6 px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold tracking-wider rounded-lg transition-all duration-150 transform hover:scale-105 active:scale-95 cursor-pointer font-mono text-sm"
            >
              SOBREVIVER À RODADA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

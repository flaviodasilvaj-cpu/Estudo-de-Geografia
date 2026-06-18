/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, Search, X, Check, ArrowRight, ExternalLink, 
  Lock, Skull, StickyNote, FileText, Sparkles, Circle, Triangle, Square 
} from 'lucide-react';

interface StudyNotebookProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudyNotebook({ isOpen, onClose }: StudyNotebookProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'rural' | 'extrativismo' | 'urbano' | 'transportes'>('rural');

  if (!isOpen) return null;

  const sections = {
    rural: {
      title: "1. Espaço Rural & Sistemas Agrícolas",
      guardComment: "○ Diretiva do Guarda Supervisor 188: 'Certifiquem-se de que os recrutas decorem que a Segurança Alimentar surgiu após a Grande Guerra de 1914. Se algum deles misturar sistema intensivo com extensivo na agricultura, ordene 50 agachamentos rústicos na coivara!'",
      content: [
        {
          subtitle: "A Agropecuária na História",
          text: "O cultivo de plantas e a domesticação de animais têm um longo percurso histórico. A maior produção e regularidade de oferta de alimento contribuíram para formar assentamentos humanos permanentes, fazendo a população crescer. O aumento dos excedentes agrícolas permitiu o surgimento de estruturas sociais complexas, possibilitando que a população se especializasse em outras funções. Atualmente, a agropecuária fornece matéria prima para a indústria. Ela compõe o setor primário da economia, sendo essencial para a garantia de segurança alimentar, crescimento econômico e produção de empregos."
        },
        {
          subtitle: "Segurança Alimentar",
          text: "É a garantia do acesso à comida nutritiva e de qualidade em quantidade suficiente, sem comprometer o acesso a outros itens essenciais. Foi criado após a I Guerra Mundial, para medir o impacto da fome nas regiões afetadas. Em 1945 foi criada a Organização das Nações Unidas para a Alimentação e a Agricultura (FAO)."
        },
        {
          subtitle: "Sistema Extensivo",
          text: "• Baixa aplicação de capital e tecnologia, usando força muscular e tração animal.\n• Poucos adubos químicos, sementes selecionadas e maquinaria, preferindo técnicas tradicionais (ex: agricultura de coivara).\n• Menor produtividade em maiores áreas rurais de pastagem (cerrado e pampas).\n• Típica de países agrícolas, com mão-de-obra de base predominantemente familiar.\n• No Brasil: Amazonas e Pantanal (voltada para subsistência e policultura para mercado local)."
        },
        {
          subtitle: "Sistema Intensivo",
          text: "• Uso intensivo de capital e tecnologia científica de ponta.\n• Níveis de produtividade elevado em áreas menores.\n• Mecanização profunda, uso de fertilizantes químicos e defensivos agrícolas (transforma terras inférteis em férteis).\n• Forte integração com as atividades industriais, gerando os Complexos Agroindustriais (bancos financiam, agrônomos, veterinários e contadores engajados).\n• No Brasil: porção Centro-Sul do país (infraestrutura moderna, capital e grandes mercados). Na década de 1970, foi impulsionada a produção de cana-de-açúcar em São Paulo para produzir álcool combustível."
        },
        {
          subtitle: "A Revolução Verde & Soja",
          text: "Período de modernização acelerada da agricultura (1960-1970).\nA soja é o principal produto de exportação nacional, gerando grande cadeia produtiva. Exportar a soja apenas em grão cru reduz empregos locais de processamento industrial (como a produção de farelo e óleo vegetal). Sua frente avança do Centro-Oeste rumo ao Norte-Nordeste."
        },
        {
          subtitle: "Estrutura Fundiária e Reforma Agrária",
          text: "Forma como as propriedades rurais são organizadas por tamanho. No Brasil ela é profundamente CONCENTRADA (má distribuição de posse, terras ociosas). Isso remonta às Sesmarias e à Lei de Terras de 1850, que passou a exigir documentos e pagamento em dinheiro para validar propriedades, beneficiando grandes latifundiários e forçando a invasão fraudulenta (grilagem de terras).\nO Estatuto da Terra (1964) e movimentos sociais (Sem-Terra) pressionaram pela Reforma Agrária. Terras produtivas NÃO devem ser invadidas (é crime); o foco de redistribuição recai sobre terras IMPREDUTIVAS. Seus benefícios de redistribuição incluem produção de alimentos básicos, combate à fome, cidadania, justiça social, interiorização de serviços vitais, redução do êxodo urbano e diversificação do comércio."
        }
      ]
    },
    extrativismo: {
      title: "2. Extrativismo e Povos Tradicionais",
      guardComment: "△ Nota Secreta do Guarda Fofuxo 03: 'Ooown, as quebradeiras de coco de babaçu na transição do Maranhão são super corajosas! Elas aproveitam 100% do coco para óleos, sabonetes e artesanato fofo. Favor não mandar guardas rústicos atrapalharem a colheita sustentável delas, tá? S2!'",
      content: [
        {
          subtitle: "Extrativismo Vegetal",
          text: "Exploração de produtos como madeira, látex, borracha, castanha-do-pará, açaí, cupuaçu, óleos e plantas medicinais. Concentra-se massivamente na Região Amazônica. Há plantas ricas como o Camu-camu (usado no Peru para fármacos de alto valor comercial, subaproveitado no Brasil)."
        },
        {
          subtitle: "Coco do Babaçu",
          text: "Nas zonas de transição entre a Caatinga e o Cerrado, mulheres quebradeiras colhem e processam o coco do babaçu. Todas as suas estruturas são utilizadas: a amêndoa fornece óleos nobres para a indústria de cosméticos, sabonetes e produtos higiênicos."
        },
        {
          subtitle: "Extrativismo Animal & Comunidades Tradicionais",
          text: "• Ribeirinhos: nordestinos que se fixaram à beira dos rios amazônicos após o declínio dourado do ciclo da borracha.\n• Comunidades Pesqueiras dos Manguezais: famílias que dependem da tradicional coleta artesanal de caranguejos nos mangues (transição entre rio e mar). Sofrem hoje com poluição e vazamento de esgoto bruto.\n• Caiçaras: grupo étnico-cultural litorâneo da pesca artesanal que sofre frequente ameaça da agressiva expansão imobiliária e construções rodoviárias."
        },
        {
          subtitle: "Extrativismo Mineral",
          text: "Promovido pela grande diversidade geológica nacional, com exploração intensiva de petróleo no litoral marítimo e calcário terrestre."
        }
      ]
    },
    urbano: {
      title: "3. Espaço Urbano & Rede de Cidades",
      guardComment: "▢ Relatório de Observação VIP Dr. Bilhão: 'A conurbação entre as duas maiores metrópoles formou o eixo da nossa megalópole, costurada pela Rodovia Presidente Dutra. Ver as fumaças da macrocefalia urbana do topo do meu camarote é fascinante. O êxodo rural dos anos 70 foi excelente para fornecer cobaias industriais!'",
      content: [
        {
          subtitle: "Origem e Colonização",
          text: "Os primeiros núcleos nasceram com a colonização costeira para escoamento de mercadorias agrícolas. A interiorização deu-se pelas atividades mineradoras, pecuária extensiva e as Drogas do Sertão (especiarias amazônicas usadas na culinária), tecendo estradas que conectam o litoral às vilas interiores."
        },
        {
          subtitle: "Industrialização & Êxodo Rural",
          text: "Até a década de 1960, o Brasil era predominantemente de economia rural primária. A partir de 1930 a industrialização se iniciou (destaque em São Paulo). Em 1960, a intensa mecanização do campo, condições ruins rurais e falta de terra gerou o Êxodo Rural massivo. Na década de 1970, a população urbana brasileira superou estatisticamente a rural."
        },
        {
          subtitle: "Rede e Hierarquia Urbana",
          text: "A articulação de cidades respeitando seu grau de influência política e econômica:\n• GRANDE METRÓPOLE NACIONAL: São Paulo (centraliza o país inteiro e tem influência cultural, social e econômica global).\n• METRÓPOLES NACIONAIS: Rio de Janeiro e Brasília.\n• METRÓPOLES REGIONAIS: Manaus, Belo Horizonte, Curitiba, Salvador e Goiânia.\n• CAPITAIS REGIONAIS: Campinas, Palmas e Ribeirão Preto (referência imediata para dezenas de distritos).\n• Centros Sub-regionais, Centros de Zona e Centros Locais (pequenas e restritas à própria população)."
        },
        {
          subtitle: "Megalópole e Regiões Metropolitanas",
          text: "• Região Metropolitana: Cidades integradas política, social e economicamente unidas pelo fenômeno da Conurbação (areas rurais divisoras que desaparecem unindo as porções construídas).\n• Megalópole: Junção contínua de duas metrópoles globais por conurbação. Ocorre uma megalópole em formação no Brasil entre São Paulo e Rio de Janeiro, conectada de ponta a ponta pela Rodovia Presidente Dutra."
        },
        {
          subtitle: "Problemas Urbanos & Segregação",
          text: "A falta de planejamento gera Macrocefalia Urbana (hiperconcentração de serviços e moradores em poucas cidades). Disso emergem:\n• Segregação Socioespacial: Distinção física entre as classes, como condomínios fechados luxuosos encostando em favelas de risco geológico.\n• Especulação Imobiliária & Gentrificação: Valorização monetária de bairros tradicionais que encarece o custo de vida local e expulsa moradores pobres para periferias sem saneamento básico."
        },
        {
          subtitle: "Lixos e Enchentes",
          text: "• Lixões: Lixo exposto aterrado sem proteção no solo, poluindo rios subterrâneos com chorume.\n• Aterros Controlados: Solo protegido precariamente por lona plástica.\n• Aterros Sanitários: Camadas de manta impermeabilizadora moderna, alternativa ecológica ideal junto aos 3R (Reduzir, Reutilizar e Reciclar).\n• Ilha de Calor: Alta densidade de asfalto, concreto, prédios verticais e poluentes que absorvem calor elevando a temperatura local urbana."
        }
      ]
    },
    transportes: {
      title: "4. Sistemas de Transportes",
      guardComment: "○ Alerta de Logística de Fuga do Sargento Sarcástico: 'O modal rodoviário representa mais de 60% das cargas brasileiras por culpa do lobby automotivo dos anos 50, mas gasta combustível feito louco e encarece tudo. Se o porco dourado estivesse sobre trilhos de bitola integrada, o rendimento das apostas seria 300% maior. Não chovam no asfalto!'",
      content: [
        {
          subtitle: "Transporte Rodoviário (Estradas e Ruas)",
          text: "Líder em volumes nacionais. Priorizado na década de 1950 com a abertura para fábricas multinacionais automotivas. Essencial para integrar e interiorizar o território continental brasileiro. Porém, é o mais caro por envolver manutenção asfáltica frequente e queima intensa de combustíveis fósseis (diesel, gasolina), encarecendo custos das vendas finais."
        },
        {
          subtitle: "Transporte Ferroviário (Trens e Vagões)",
          text: "Foi o pioneiro no Brasil cafeeiro. Concentrado no Sul, Sudeste e Nordeste. É muito econômico, transporta grandes volumes e diminui acidentes severos. Contudo, as malhas brasileiras sofrem por serem isoladas e de bitolas divergentes. O novo Marco Regulatório de 2021 tenta atrair capitais privados."
        },
        {
          subtitle: "Transporte Aquaviário & Cabotagem",
          text: "Divide-se em Hidroviário Fluvial (pontuado por secas severas e necessidade de Eclusas reguladoras em rios de planalto para nivelamento das barcaças) e Marítimo (Cabotagem: navegação costeira entre portos nacionais). Transporte limpo, barato e volumoso para commodities rurais e minerais."
        },
        {
          subtitle: "Modais Aéreo e Dutoviário",
          text: "• Aéreo: Viagens ultra-rápidas a custo operacional astronômico, concentrado no Sudeste e emissor de gases poluidores.\n• Dutoviário: Tubulações contínuas, de baixíssimo custo e manutenção automatizada para transporte direto de gás natural, carvão liquefeito, petróleo ou minérios pesados."
        }
      ]
    }
  };

  const currentSection = sections[activeTab];

  // Simple in-component keyword highlighting search
  const matchesSearch = (text: string, sub: string) => {
    if (!searchTerm) return true;
    const norm = searchTerm.toLowerCase();
    return text.toLowerCase().includes(norm) || sub.toLowerCase().includes(norm);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex justify-end transition-all duration-300">
      {/* Decorative notebook binder simulation */}
      <div className="hidden md:flex flex-col justify-around h-full w-8 bg-zinc-800 border-r border-zinc-750 p-1 select-none z-50">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full border-4 border-zinc-900 bg-zinc-650 shadow-inner flex items-center justify-center animate-pulse">
            <div className="w-1.5 h-6 bg-zinc-400 rotate-45 transform rounded-full" />
          </div>
        ))}
      </div>

      <div 
        id="study-notebook-drawer"
        className="w-full max-w-2xl bg-zinc-950 border-l border-pink-900/65 h-full flex flex-col text-slate-100 shadow-2xl overflow-hidden relative"
      >
        {/* Neon Pink glowing visual header stamp */}
        <div className="absolute top-0 right-10 bg-pink-700/20 border-b-2 border-x-2 border-pink-500/40 text-pink-500 px-3 py-1 font-mono text-[9px] font-bold tracking-wider rounded-b uppercase select-none z-10 animate-pulse">
          ★ CONFIDENCIAL: MANUAL DO GUARDA ★
        </div>

        {/* Real notebook binder pages gradient visual effects */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-zinc-950 to-zinc-900 pointer-events-none" />

        {/* Header content */}
        <div className="p-6 pt-7 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-pink-600 rounded-xl text-white shadow-lg shadow-pink-950 border border-pink-500 animate-pulse">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-1.5">
                  VESTIBULAR ROUND 6
                </h2>
                <span className="text-[9px] bg-pink-950/90 text-pink-400 font-mono px-2 py-0.5 rounded border border-pink-850 uppercase font-black">
                  CÓDIGO SECRETO ○ △ ▢
                </span>
              </div>
              <p className="text-xs text-pink-450 font-mono mt-0.5">Caderno Confidencial Autografado do Diretor</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            id="close-notebook-btn"
            className="p-2 bg-zinc-800 hover:bg-pink-900/40 border border-zinc-700 rounded-full transition-all text-slate-300 hover:text-white cursor-pointer"
            title="Fechar Caderno e Voltar à Arena"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search tool with Neon Pink borders */}
        <div className="p-4 bg-zinc-900/40 border-b border-zinc-850 flex gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-pink-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="notebook-search-input"
              placeholder="Pesquise para colar (ex: babaçu, Lei de Terras, rodovias...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-850 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-mono placeholder:text-zinc-650"
            />
          </div>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-xs text-pink-400 hover:text-white font-mono uppercase bg-pink-955 px-3 py-2 rounded-lg border border-pink-900 cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Navigation Tabs aligned with icons ○, △, ▢ */}
        <div className="grid grid-cols-4 bg-zinc-900/25 text-xs font-bold border-b border-zinc-850 text-center">
          <button
            onClick={() => { setActiveTab('rural'); setSearchTerm(''); }}
            id="tab-rural"
            className={`py-3 px-1 border-b-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'rural' ? 'border-pink-500 text-pink-400 bg-pink-950/15' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-zinc-900/25'}`}
          >
            <Circle className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Espaço Rural</span>
          </button>
          <button
            onClick={() => { setActiveTab('extrativismo'); setSearchTerm(''); }}
            id="tab-extra"
            className={`py-3 px-1 border-b-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'extrativismo' ? 'border-pink-500 text-pink-400 bg-pink-950/15' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-zinc-900/25'}`}
          >
            <Triangle className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Povos Extra.</span>
          </button>
          <button
            onClick={() => { setActiveTab('urbano'); setSearchTerm(''); }}
            id="tab-urbano"
            className={`py-3 px-1 border-b-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'urbano' ? 'border-pink-500 text-pink-400 bg-pink-950/15' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-zinc-900/25'}`}
          >
            <Square className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Urbano & Rede</span>
          </button>
          <button
            onClick={() => { setActiveTab('transportes'); setSearchTerm(''); }}
            id="tab-transp"
            className={`py-3 px-1 border-b-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${activeTab === 'transportes' ? 'border-pink-500 text-pink-400 bg-pink-950/15' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-zinc-900/25'}`}
          >
            <Skull className="w-3.5 h-3.5 text-pink-500" />
            <span className="font-mono text-[9px] uppercase tracking-wider">Transportes</span>
          </button>
        </div>

        {/* Content Container styled as classified notes pages */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 scrollbar-thin">
          
          {/* Neon active stamp */}
          {!searchTerm && (
            <div className="p-4 rounded-xl border border-dashed border-pink-700/50 bg-pink-955/10 relative overflow-hidden animate-fade-in group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-start gap-2.5">
                <StickyNote className="w-4 h-4 text-pink-400 shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase font-black text-pink-400 font-mono tracking-wider flex items-center gap-1">
                    Comentários Vazados do Comando do Jogo
                  </p>
                  <p className="text-pink-300/90 text-xs italic leading-relaxed font-sans mt-0.5">
                    {currentSection.guardComment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {searchTerm && (
            <div className="bg-pink-955/10 border border-pink-850/60 rounded-lg p-3 text-xs text-pink-300 flex items-center justify-between font-mono">
              <span>HACK ATIVO: CABAL DO CADERNO FILTROU POR <span className="bg-pink-950 px-1 py-0.5 rounded text-white underline select-none font-bold">"{searchTerm}"</span></span>
              <button onClick={() => setSearchTerm('')} className="underline text-pink-400 hover:text-pink-300 font-bold uppercase text-[10px] cursor-pointer">Reexibir tudo</button>
            </div>
          )}

          <div className="space-y-5">
            <h3 className="text-[13px] font-mono uppercase tracking-wider font-extrabold text-pink-400 border-b border-zinc-850 pb-2 flex items-center justify-between">
              <span>{currentSection.title}</span>
              <span className="text-[10px] text-slate-500 font-mono font-normal">Capítulo completo</span>
            </h3>

            {currentSection.content
              .filter(sec => matchesSearch(sec.text, sec.subtitle))
              .map((sec, idx) => (
                <div 
                  key={idx} 
                  className="bg-zinc-900 hover:bg-zinc-900/90 border border-zinc-850 p-4 rounded-xl transition-all hover:border-pink-800/40 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-pink-600 transition-colors" />
                  
                  <h4 className="font-bold text-white text-sm md:text-base font-sans mb-2 flex items-center gap-1.5 group-hover:text-pink-400 transition-colors">
                    <FileText className="w-4 h-4 text-pink-500/70" />
                    {sec.subtitle}
                  </h4>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {/* Crude highlighting of search term inside notebook view for great usability */}
                    {searchTerm ? (
                      sec.text.split(new RegExp(`(${searchTerm})`, 'gi')).map((chunk, i) => 
                        chunk.toLowerCase() === searchTerm.toLowerCase() ? (
                          <mark key={i} className="bg-pink-500 text-black font-semibold rounded px-0.5">{chunk}</mark>
                        ) : chunk
                      )
                    ) : sec.text}
                  </p>
                </div>
              ))}

            {currentSection.content.filter(sec => matchesSearch(sec.text, sec.subtitle)).length === 0 && (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Skull className="w-10 h-10 mx-auto text-pink-700/40 animate-pulse" />
                <p className="text-xs font-mono uppercase text-zinc-500">NENHUM PARÁGRAFO DO MANUAL VAZOU COM ESSE TERMO!</p>
                <p className="text-[10px] text-zinc-600 max-w-xs mx-auto">Os guardas apagaram logs de rodovias, babaçu, soja ou lei de terras. Digite termos geograficamente mais fáceis!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-850 text-center text-xs text-slate-500 font-mono flex justify-between items-center px-6">
          <span className="text-[10px]">Crivo de segurança: Gabarito Garantido</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-pink-650 hover:bg-pink-500 text-white border border-pink-550 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-lg shadow-pink-950 cursor-pointer uppercase tracking-wider font-mono"
          >
            <span>Voltar ao Combate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

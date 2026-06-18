/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from './types';

export const GEOGRAPHY_QUESTIONS: Question[] = [
  // TOPIC 1: Agropecuária & Segurança Alimentar
  {
    id: 1,
    stageName: "Rodada 1: Batatinha Frita 1, 2, 3",
    stageIcon: "Target",
    topic: "Agropecuária & Segurança Alimentar",
    type: "multiple",
    questionText: "O conceito de 'Segurança Alimentar', vital para a sobrevivência das populações, foi proposto e estruturado em qual momento histórico e com qual objetivo principal?",
    options: [
      "No início da colonização portuguesa do Brasil, visando garantir a alimentação dos escravizados das sesmarias.",
      "Após a Primeira Guerra Mundial, com o objetivo de medir o impacto severo da fome nas regiões afetadas.",
      "Durante a Revolução Verde (1960), para impulsionar a venda de sementes modificadas de soja no Centro-Oeste.",
      "Com a criação da Rodovia Dutra na década de 1950, objetivando transportar caranguejos das comunidades litorâneas."
    ],
    correctIndex: 1,
    hint: "Dica do Guarda (○): Olhe para o pós-guerra! O texto indica que esse conceito surgiu exatamente para rastrear a fome deixada pelo maior conflito global daquele início de século.",
    explanation: "Correto! O conceito de Segurança Alimentar foi criado no período pós-I Guerra Mundial com o intuito de mensurar os níveis de desnutrição e fome. Em 1945, foi consolidado globalmente com a criação da FAO (Organização das Nações Unidas para a Alimentação e a Agricultura)."
  },
  {
    id: 11,
    stageName: "Rodada 1.5: Desafio do Cadete",
    stageIcon: "HelpCircle",
    topic: "Agropecuária & Segurança Alimentar",
    type: "typed",
    questionText: "Defina com suas palavras o conceito de 'Segurança Alimentar' proposto após a Primeira Guerra Mundial. O que ele garante de fato para o cidadão comum de acordo com o manual de estudos?",
    hint: "Escreva uma resposta que mencione que ela garante o acesso físico e econômico de todos a alimentos nutritivamente suficientes e de boa qualidade. (Palavras chave sugeridas: acesso, alimento/comida, nutritiva/qualidade/quantidade)",
    explanation: "Excelente! A Segurança Alimentar é a garantia do acesso contínuo e físico a alimentos saudáveis, nutritivos e de alta qualidade em quantidade ideal para a dignidade humana básica.",
    typedKeywordsRequired: [
      ["acesso", "acessar", "garant", "disponib"],
      ["alimento", "comida", "nutri", "refeic"],
      ["qualidad", "quantidad", "suficient", "nutritiv", "saudavel"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Falta explicar que a pessoa tem que poder conseguir a comida: inclua a palavra 'acesso' ou o verbo 'garantir'." },
      { missingGroupIndex: 1, feedback: "Mencione explicitamente o 'alimento' ou a 'comida' no seu texto." },
      { missingGroupIndex: 2, feedback: "Não é qualquer comida estragada! Indique que ela deve ter 'qualidade', ser 'nutritiva' ou vir em 'quantidade' ideal e suficiente." }
    ]
  },

  // TOPIC 2: Sistemas Agrícolas
  {
    id: 2,
    stageName: "Rodada 2: Colmeia de Açúcar (Dalgona)",
    stageIcon: "Hexagon",
    topic: "Sistemas Agrícolas",
    type: "multiple",
    questionText: "Dentre as características apresentadas no material sobre o ESPAÇO RURAL, quais delas pertencem originalmente ao SISTEMA EXTENSIVO de produção agrícola?",
    options: [
      "Altas taxas de produtividade em territórios reduzidos, com intensa mecanização agrícola e uso assíduo de defensivos e sementeiras geneticamente modificadas.",
      "Intensiva integração com bancos multinacionais e contratação direta de agrônomos, contadores e biólogos em tempo integral.",
      "Baixa aplicação de capital e tecnologia, uso de tração animal/muscular, técnicas tradicionais como a 'agricultura de coivara', e foco na subsistência familiar.",
      "Forte centralidade na produção intensiva de álcool combustível no oeste do Estado de São Paulo a partir da década de 1970."
    ],
    correctIndex: 2,
    hint: "Dica do Guarda (△): O sistema extensivo é o mais rústico. Ele requer pouca grana e usa a força tradicional, como queimadas controladas e descanso da terra (coivara). Pense na subsistência!",
    explanation: "Correto! O sistema extensivo foca em técnicas tradicionais transmitidas entre gerações. Não há uso massivo de tecnologia moderna, o capital investido é escasso, a tração costuma ser humana/animal, e a produção é voltada para a subsistência ou comércio local de cidades periféricas."
  },
  {
    id: 12,
    stageName: "Rodada 2.5: Linhas do Latifúndio",
    stageIcon: "BookOpen",
    topic: "Sistemas Agrícolas",
    type: "typed",
    questionText: "Explique o funcionamento da técnica de plantio tradicional conhecida como 'agricultura de coivara', típica de sistemas agrícolas rústicos e do espaço extensivo.",
    hint: "Foque em explicar as duas etapas cruciais: queimar/fogo/cinzas para preparar o espaço e descansar/pousio do solo para restaurar a fertilidade de modo tradicional. (Palavras chave sugeridas: queimar/fogo, solo/descanso/pousio, tradicional/familiar)",
    explanation: "Perfeito! A agricultura de coivara consiste em queimar restos florestais nativos para servir de adubo rústico com as cinzas e, depois do plantio de subsistência familiar, permitir que a terra entre em pousio (descanso) para se autorecuperar biologicamente.",
    typedKeywordsRequired: [
      ["queima", "fogo", "cinza", "derrub", "limpar"],
      ["descanso", "recuper", "pousio", "rotativ", "tempo", "descans"],
      ["tradicional", "subsistenc", "familiar", "rustic", "tecnica", "campo"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "A coivara usa cinzas naturais do mato limpo. Fale sobre a 'queimada', 'fogo' ou abertura de clareira." },
      { missingGroupIndex: 1, feedback: "Sem tecnologia, o solo cansa. Indique que o solo precisa de um período de 'descanso' ou 'pousio' para regenerar." },
      { missingGroupIndex: 2, feedback: "Destaque que é uma prática 'tradicional', de 'subsistência' ou de base 'familiar'." }
    ]
  },

  // TOPIC 3: Modernização e Complexos Agroindustriais
  {
    id: 3,
    stageName: "Rodada 3: Cabo de Guerra",
    stageIcon: "Scale",
    topic: "Modernização e Complexos Agroindustriais",
    type: "multiple",
    questionText: "O Sistema Intensivo possui altíssima integração entre os três setores da economia brasileira. Qual região do país apresenta maior predominância desse sistema modernizado e qual evento histórico o impulsionou na década de 1970?",
    options: [
      "A região Norte (Amazônia), impulsionada pela coleta mineral de calcário e pelo extrativismo do camu-camu.",
      "A porção Centro-Sul do país, impulsionada a partir da década de 1970 pela produção de cana-de-açúcar em São Paulo para produzir álcool combustível.",
      "A orla marítima do Nordeste, impulsionada pela pesca artesanal do caranguejo de mangue nos estados litorâneos.",
      "O semiárido nordestino, fomentado pelo plantio extensivo de café de subsistência nas encostas rochosas."
    ],
    correctIndex: 1,
    hint: "Dica do Guarda (▢): Pressione a corda! O Centro-Sul brasileiro abriga os maiores complexos industriais e a infraestrutura necessária. Nos anos 70, a crise internacional do petróleo demandou biocombustível rápido a partir da cana do interior paulista.",
    explanation: "Perfeito! O sistema extensivo perde prioridade na porção Centro-Sul, onde o Sistema Intensivo se estabelece com forte apoio de bancos, agrônomos e indústrias de tratores. A produção de cana em SP disparou na década de 1970 para sustentar a demanda nacional por álcool combustível."
  },
  {
    id: 13,
    stageName: "Rodada 3.5: Teste de Resistência",
    stageIcon: "Zap",
    topic: "Modernização e Complexos Agroindustriais",
    type: "typed",
    questionText: "Durante os anos 1970, o complexo agroindustrial paulista foi profundamente impactado por mudanças nas fontes de energia globais. Qual programa público nasceu nessa época, qual era a cultura agrícola envolvida e qual combustível ele gerava?",
    hint: "Lembre-se do plano nacional de biocombustíveis e da cana do interior de SP! (Palavras chave sugeridas: pro-alcool, cana-de-açúcar, alcool/etanol, combustivel)",
    explanation: "Maravilhoso! Trata-se do programa governamental Pró-Álcool, que fomentou o plantio tecnológico de cana-de-açúcar no Centro-Sul brasileiro para a destilação de etanol (álcool) como combustível alternativo à crise mundial do petróleo de 1973.",
    typedKeywordsRequired: [
      ["pro-alcool", "proalcool", "programa", "governo", "incentivo"],
      ["cana", "canavial", "cultura"],
      ["alcool", "etanol", "combustivel", "energia", "biocombustivel"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Mencione que foi incentivado por um plano público ou programa nacional de autossuficiência (como o 'Pró-Álcool')." },
      { missingGroupIndex: 1, feedback: "Insira a planta responsável: a 'cana' de açúcar." },
      { missingGroupIndex: 2, feedback: "Contemple o produto final gerado pelas usinas de moagem: o 'álcool' ou 'etanol' limpo." }
    ]
  },

  // TOPIC 4: Cadeia Produtiva & Agropecuária
  {
    id: 4,
    stageName: "Rodada 4: Bolinhas de Gude",
    stageIcon: "CircleDot",
    topic: "Cadeia Produtiva & Agropecuária",
    type: "multiple",
    questionText: "A soja consolidou-se como o maior trunfo da pauta de exportações agrícolas do Brasil. Contudo, o texto avisa sobre um expressivo problema social de exportarmos a soja majoritariamente em seu 'grão cru' não processado. Que problema é esse?",
    options: [
      "A perda de solo arável por acidez induzida pelas cascas secas da soja que caem nas rodovias de escoamento.",
      "A paralisação obrigatória do transporte ferroviário por excesso de entupimento das eclusas no Pantanal.",
      "Deixamos de criar uma vasta quantidade de empregos internos qualificados que seriam gerados no processamento da soja para farelo ou óleo.",
      "A extinção total do coco de babaçu nas áreas de transição da Caatinga pelo esgoto gerado na secagem da soja."
    ],
    correctIndex: 2,
    hint: "Dica do Guarda (○): Quem joga gude quer o prêmio inteiro! Se exportamos a soja sem nenhum valor agregado (vender apenas o grão para fora), a indústria do farelo para animais e do óleo ocorre em outro país. Logo, as vagas de emprego somem do Brasil.",
    explanation: "Sim! Vender apenas o 'grão' cru significa transferir o valor agregado industrial da soja (produção de farelos para ração do rebanho intensivo ou óleo vegetal refinado) para o exterior, deixando de criar milhares de postos de trabalho em território nacional."
  },
  {
    id: 14,
    stageName: "Rodada 4.5: Quebra-Cabeça da Balança",
    stageIcon: "Coins",
    topic: "Cadeia Produtiva & Agropecuária",
    type: "typed",
    questionText: "Qual a grave consequência para o mercado de trabalho interno e a cadeia industrial brasileira quando exportamos a maior parte da nossa soja em grão bruto ('grão cru') em vez de farelo ou óleos processados?",
    hint: "Lembre-se de discutir a perda de valor agregado e a perda de empregos locais na conversão em subprodutos. (Palavras chave: empregos/postos de trabalho, industria/fábricas/processar/farelo, valor agregado/perda)",
    explanation: "Correto! A exportação exclusiva in natura envia para outros países a margem de lucro industrial da industrialização alimentícia (esmagamento), gerando déficit de postos de trabalho técnico-operacionais no Brasil.",
    typedKeywordsRequired: [
      ["emprego", "vaga", "trabalho", "servico", "cargo"],
      ["industr", "fabric", "process", "esmag", "farelo", "oleo", "agroindustr"],
      ["perda", "redu", "deixa de", "perde", "fora", "exterior"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Estude o impacto social imediato: o que o Brasil deixa de criar para os trabalhadores? Fale sobre 'empregos' ou mercado de 'trabalho' qualificado." },
      { missingGroupIndex: 1, feedback: "O que a soja viraria se fosse beneficiada internamente? Descreva esse setor sugerindo indústrias, 'óleo', 'farelo' ou processamento." },
      { missingGroupIndex: 2, feedback: "Mencione a perda econômica nacional ou que transferimos essa riqueza para o 'exterior' ou 'fora' do país." }
    ]
  },

  // TOPIC 5: Estrutura Fundiária
  {
    id: 5,
    stageName: "Rodada 5: Ponte de Vidro",
    stageIcon: "Grid",
    topic: "Estrutura Fundiária",
    type: "multiple",
    questionText: "O espaço agrícola brasileiro possui uma estrutura fundiária caracterizada por extrema concentração. De acordo com o texto, qual dispositivo legal do Brasil Imperial instituiu formalmente essa barreira de propriedade em 1850?",
    options: [
      "O Estatuto da Terra, que forçou o confisco de pequenas lavouras de minifúndio.",
      "A Lei de Terras de 1850, que passou a exigir documentos oficiais e pagamento em dinheiro para validar propriedades rurais, marginalizando posseiros pobres.",
      "A Lei de Sesmarias, que permitiu o livre assentamento de ribeirinhos e pescadores artesanais no sertão nordestino.",
      "O Código da Borracha da Amazônia, que transferiu latifúndios de cana-de-açúcar do Sudeste para o Norte do país."
    ],
    correctIndex: 1,
    hint: "Dica do Guarda (△): Cuidado para não pisar em falso! Em 1850, foi criada uma lei que impediu a posse livre e determinou que a única forma de obter terras públicas era comprando-as do Estado. Quem dominava o dinheiro conseguiu regularizar, enquanto os pequenos posseiros ficaram sem registro.",
    explanation: "Sensacional! A Lei de Terras de 1850 determinou que a terra pública (devoluta) só poderia ser adquirida por compra oficial. Isso excluiu camponeses e ex-escravizados, sacramentando a desigualdade fundiária e abrindo caminho para fraudes documentais históricas conhecidas como grilagem."
  },
  {
    id: 15,
    stageName: "Rodada 5.5: Registros Históricos",
    stageIcon: "AlertCircle",
    topic: "Estrutura Fundiária",
    type: "typed",
    questionText: "De que forma a Lei de Terras de 1850 no Brasil Imperial estabeleceu as bases legais para a exclusão social e concentração de terras de latifúndios rurais no país?",
    hint: "Indique que a lei exigiu doação monetária (compra) para posses devolutas rurais ricas e títulos de regularização cartoriais, excluindo ex-escravizados e imigrantes sem capital. (Palavras chave recomendadas: compra/dinheiro, registro/documento/titulo, exclusao/pobre/escravo)",
    explanation: "Brilhante! Ao abolir a usucapião livre tradicional de posses e ditar que a regularização fundiária só ocorreria mediante compra por dinheiro vivo e comprovação cartorial escrita de títulos oficiais, o Império selou a exclusão sistemática dos pobres e ex-escravizados do acesso à terra rústica.",
    typedKeywordsRequired: [
      ["compra", "dinheiro", "pagamento", "venda", "comprar"],
      ["registro", "titulo", "documento", "escritura", "validar", "regulariz"],
      ["exclu", "pobre", "escrav", "posseiro", "dificult", "marginaliz"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Sob qual condição exclusiva a lei dizia que a terra pública poderia passar para as mãos de um civil? Abordando a 'compra' por 'dinheiro'." },
      { missingGroupIndex: 1, feedback: "Destaque a necessidade de um papel oficial ou burocrático: cite termos como 'registro', 'título' ou 'documento'." },
      { missingGroupIndex: 2, feedback: "Mencione as camadas sociais reprimidas: os 'pobres', ex-'escravos' ou pequenos 'posseiros'." }
    ]
  },

  // TOPIC 6: Reforma Agrária
  {
    id: 6,
    stageName: "Rodada 6: Jogo da Lula (The Finale)",
    stageIcon: "Shield",
    topic: "Reforma Agrária",
    type: "multiple",
    questionText: "O Estatuto da Terra de 1964 delineou canais para a Reforma Agrária. Segundo o texto, que tipo de propriedade rural deve sofrer redistribuição jurídica por não estar cumprindo sua função social, e quais seus impactos positivos?",
    options: [
      "As pequenas plantações de minifúndios de agricultura familiar altamente lucrativas do Sul.",
      "As terras improdutivas (não produtivas), cujos impactos da redistribuição incluem a produção de alimentos básicos, combate à fome, cidadania e redução da migração caótica para as cidades.",
      "Os ricos latifúndios altamente tecnológicos focados na exportação de cana-de-açúcar de São Paulo.",
      "Os manguezais preservados de proteção permanente, transformando os caranguejos em gado extensivo de planalto."
    ],
    correctIndex: 1,
    hint: "Dica do Guarda (▢): Na rodada final, a justiça deve vencer! Invadir posses produtivas é tipificado como crime. Por lei, a redistribuição deve atuar especificamente em propriedades ociosas ou subutilizadas (as improdutivas) para que gerem alimentos básicos e justiça rústica.",
    explanation: "Vitória espetacular! Destinar terras improdutivas para a reforma agrária fortalece o minifúndio de policultura familiar (que de fato coloca arroz, feijão e hortaliças nas nossas mesas) e desafoga as grandes favelas metropolitanas ao fixar o trabalhador no campo com dignidade."
  },
  {
    id: 16,
    stageName: "Rodada 6.5: Cartilha do Agrônomo",
    stageIcon: "FileText",
    topic: "Reforma Agrária",
    type: "typed",
    questionText: "Quais são as terras elegíveis para reforma agrária de acordo com o Estatuto da Terra e do manual, e cite pelo menos três grandes benefícios econômicos e de bem-estar dessa política familiar?",
    hint: "Escreva sobre as propriedades improdutivas/ociosas que falham no papel produtivo, e benefícios como: comida de mesa, combate à fome e menos desequilíbrio populacional urbano (êxodo). (Palavras chave: improdutivas/ociosas, fome/alimentação/comida, êxodo/migração/justiça)",
    explanation: "Impressionante! A redistribuição foca rigorosamente em terras agrícolas ociosas ou improdutivas. Seus resultados garantem o suprimento alimentício do polo urbano, atenuam a miséria absoluta (fome) e diminuem a favelização decorrente de êxodos descontrolados.",
    typedKeywordsRequired: [
      ["improdutiv", "ocios", "nao produtiv", "desocupad"],
      ["fome", "aliment", "comida", "plantio", "policultura", "subsistenc"],
      ["justica", "exodo", "social", "fixar", "cidade", "urbanizada"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Defina o filtro jurídico das fazendas selecionadas: fale em terras rurais 'improdutivas' ou subutilizadas/ 'ociosas'." },
      { missingGroupIndex: 1, feedback: "Mencione a utilidade disso na mesa do povo: inclua nobremente as palavras 'fome', 'comida' ou 'alimento' de policultura." },
      { missingGroupIndex: 2, feedback: "Cite a redução do caos das periferias ou fixação do sertanejo: mencione a redução do 'êxodo' ou a geração de 'justiça' social." }
    ]
  },

  // TOPIC 7: Extrativismo Brasileiro
  {
    id: 7,
    stageName: "Rodada 7: Jogo dos Cacos (Transição)",
    stageIcon: "Compass",
    topic: "Extrativismo Brasileiro",
    type: "multiple",
    questionText: "O extrativismo vegetal e animal desempenha papéis socioeconômicos essenciais no Brasil. Associe os detalhes do texto sobre o extrativismo do 'coco de babaçu' e sua relevância industrial e regional:",
    options: [
      "É colhido por homens no litoral gaúcho e usado para isolamento térmico das ferrovias de soja do interior.",
      "É coletado por mulheres nas zonas de transição entre a Caatinga e o Cerrado, sendo aproveitado integralmente (sua amêndoa extrai óleos para cosméticos, sabonetes e xampus).",
      "É extraído no Pantanal mato-grossense a partir de navios pesqueiros industriais para servir como ração animal de gado bovino extensivo.",
      "É cultivado apenas em laboratórios em São Paulo para suprir o combustível sintético rodoviário da cana."
    ],
    correctIndex: 1,
    hint: "Dica do Guarda (○): Mulheres conhecidas como quebradeiras desempenham esse trabalho fundamental na área de ecótono do Maranhão/Piauí. O coco é multifuncional: serve para alimentação, combustível de queima e cosméticos de ponta.",
    explanation: "Correto! O coco de babaçu é um símbolo emblemático de economia sustentável e de gênero no Maranhão e estados vizinhos rurais. As mulheres quebradeiras aproveitam desde a casca até a rica amêndoa de óleo nobre."
  },
  {
    id: 17,
    stageName: "Rodada 7.5: Conexões de Gênero",
    stageIcon: "Shield",
    topic: "Extrativismo Brasileiro",
    type: "typed",
    questionText: "Quem são os tradicionais produtores do extrativismo sustentável do coco de babaçu no Maranhão/Piauí, o que as indústrias farmacêutica e estética aproveitam desse fruto e qual o nível de reaproveitamento do coco?",
    hint: "Identifique as guerreiras quebradeiras, seu uso integral de 100% no refino de óleo e na fabricação de sabonete e cosmético. (Palavras chave sugeridas: quebradeiras, oleo/cosmético/sabonete, integral/100%)",
    explanation: "Excelente! Esse sustento provém inteiramente de grupos femininos conhecidos como quebradeiras de coco. Elas utilizam 100% da carcaça do coco de babaçu, cujo núcleo central esmaga um óleo refinado caríssimo para cremes, sabonetes e higiene pessoal.",
    typedKeywordsRequired: [
      ["mulher", "quebradeira", "feminino", "extrativista"],
      ["oleo", "cosmetic", "sabonet", "higiene", "perfum", "xampu", "industr"],
      ["integ", "total", "100%", "tudo"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Mencione a comunidade cultural-tradicional específica: as 'quebradeiras' de coco de babaçu." },
      { missingGroupIndex: 1, feedback: "Contemple as utilidades nas fábricas: óleos essenciais para a fabricação de 'cosméticos', cremes ou 'sabonetes'." },
      { missingGroupIndex: 2, feedback: "Apoie a sustentabilidade absoluta: diga que o reaproveitamento do fruto é 'integral' ou de '100% of eixos'." }
    ]
  },

  // TOPIC 8: Urbanização e Êxodo Rural
  {
    id: 8,
    stageName: "Rodada 8: Passarela do Êxodo",
    stageIcon: "Users",
    topic: "Urbanização e Êxodo Rural",
    type: "multiple",
    questionText: "Na metade do século XX, o Brasil configurou uma migração massiva da população para as cidades (Êxodo Rural), tornando-se um país de concentração urbana na década de 1970. Quais fatores no campo detonaram essa transição histórica?",
    options: [
      "A extinção voluntária e imediata de todos os portos de cabotagem litorâneos no Nordeste e no Sul.",
      "A mecanização do campo (substituição do homem pela máquina), condições ruins de trabalho e a severa concentração de terras rurais nas mãos de poucas pessoas.",
      "O aparecimento inusitado de ilhas de calor artificiais nas pequenas vilas de subsistência do Amazonas.",
      "A interdição federal contra a exportação de grãos de soja para incentivar a fabricação artesanal de cosméticos de babaçu."
    ],
    correctIndex: 1,
    hint: "Dica do Guarda (△): Lembre-se: com tratores e colheitadeiras chegando, sobraram poucos postos para trabalhadores manuais no campo. Além disso, a Lei de Terras anterior e os latifúndios impediam que esses ex-boias-frias adquirissem terras próprias.",
    explanation: "Fascinante! A revolução tecnológica no campo aliada à perpetuação do latifúndio forçou ex-trabalhadores da enxada a buscar novas chances em áreas industriais emergentes como São Paulo e Rio de Janeiro, gerando o fenômeno acelerado do êxodo rural."
  },
  {
    id: 18,
    stageName: "Rodada 8.5: Diário de Asfalto",
    stageIcon: "Grid",
    topic: "Urbanização e Êxodo Rural",
    type: "typed",
    questionText: "Resuma conceitualmente o que significa o termo 'Êxodo Rural' e enumere pelo menos dois graves problemas gerados nas metrópoles receptoras sem saneamento regular.",
    hint: "Explique como migração maciça do campo/rural para os polos urbanos, e problemas como as favelas de risco (moradias precárias), falta de saneamento/esgotos e a macrocefalia urbana rústica. (Palavras chave: migração/deslocamento, urbano/cidades, favelas/esgoto/macrocefalia)",
    explanation: "Espetacular! O Êxodo Rural é a transferência massiva populacional do campo para a malha urbana. Sem uma rede planejada de acomodação física, o fluxo desenfreado engatilha desajustes socioespaciais extremos, como macrocefalia de infraestrutura, moradias em encostas frágeis (favelização) e canais de esgotos clandestinos jorrando chorume.",
    typedKeywordsRequired: [
      ["migra", "saida", "desloca", "campo", "rural", "partida"],
      ["cidade", "urbano", "centro", "metropol"],
      ["macrocefali", "favela", "problema", "segrega", "esgoto", "saneamento", "violenc", "lixo", "favelizac"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Conceitue o vetor humano: cite a 'migração', 'saída' ou deslocamento de trabalhadores do campo." },
      { missingGroupIndex: 1, feedback: "Para onde se direcionava a massa de refugiados rurais? Diga 'cidade' ou centro 'urbano'." },
      { missingGroupIndex: 2, feedback: "Mencione sequelas graves da recepção sem planejamento: cite 'favela', carência de 'esgoto/saneamento' ou 'macrocefalia' urbana." }
    ]
  },

  // TOPIC 9: Redes Urbanas e Hierarquia
  {
    id: 9,
    stageName: "Rodada 9: Torre da Megalópole",
    stageIcon: "Building",
    topic: "Redes Urbanas e Hierarquia",
    type: "multiple",
    questionText: "As cidades brasileiras integram-se por transporte e telecomunicações sob uma rigorosa hierarquia urbana. A respeito das metrópoles, qual conurbação urbana nacional une as duas maiores cidades do Sudeste formando uma megalópole em formação?",
    options: [
      "A união caótica entre Curitiba e Porto Alegre através das ferrovias da soja gaúcha.",
      "A união litorânea entre Manaus e Belém através de eclusas profundas do rio Amazonas.",
      "O eixo que reúne as metrópoles de São Paulo e Rio de Janeiro, conectadas por meio da Rodovia Presidente Dutra.",
      "A conurbação ecológica entre as pequenas cidades e centros locais da orla pesqueira do Manguezal baiano."
    ],
    correctIndex: 2,
    hint: "Dica do Guarda (▢): Essa é a maior artéria rodoviária nacional! O texto diz explicitamente que a Rodovia Presidente Dutra une os extensos tecidos metropolitanos desses dois centros fabris e populacionais gigantes.",
    explanation: "Correto! Duas imensas metrópoles que expandem suas manchas urbanas uma em direção à outra caracterizam uma megalópole. No Brasil, essa mancha em intensa conurbação ocorre entre as regiões metropolitanas de SP e RJ."
  },
  {
    id: 19,
    stageName: "Rodada 9.5: Planos Diretores",
    stageIcon: "BookOpen",
    topic: "Redes Urbanas e Hierarquia",
    type: "typed",
    questionText: "Defina o processo geográfico conhecido como 'Conurbação', explique o que é uma 'Megalópole' e identifique qual a única megalópole brasileira em formação segundo o manual e sua principal via rodoviária.",
    hint: "Descreva o crescimento e emenda contínua de duas manchas urbanas unidas. A megalópole nacional em formação situa-se entre as metrópoles de São Paulo e Rio de Janeiro, integradas pela estrada Dutra. (Palavras chave: conurbação/fusão, paulo, rio, dutra)",
    explanation: "Excepcional! A conurbação é o crescimento simultâneo de áreas urbanas vizinhas até que se fundam fisicamente. A megaescala de conurbação reunindo duas metrópoles globais forma a megalópole. No Brasil, o eixo em estruturação unifica São Paulo e Rio de Janeiro, interligados na dinâmica da Rodovia Presidente Dutra.",
    typedKeywordsRequired: [
      ["conurb", "fusao", "uniao", "junc", "encontro", "cresce"],
      ["paulo", "sp"],
      ["rio", "rj"],
      ["dutra", "presidente dutra", "rodovia"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Diga como se chama a colagem contígua de cidades vizinhas quando o campo divisório desaparece: use a palavra 'conurbação'." },
      { missingGroupIndex: 1, feedback: "Cite a maior metrópole envolvida nesse enorme polo: 'São Paulo'." },
      { missingGroupIndex: 2, feedback: "Qual a outra extremidade do complexo megalopolitano? 'Rio de Janeiro'." },
      { missingGroupIndex: 3, feedback: "Mencione o asfalto federal que une e articula ambas as cidades metropolitanas: do que fala o manual? Da Rodovia Presidente 'Dutra'." }
    ]
  },

  // TOPIC 10: Sistemas de Transportes
  {
    id: 10,
    stageName: "Rodada 10: O Portal dos Trilhos",
    stageIcon: "Train",
    topic: "Sistemas de Transportes",
    type: "multiple",
    questionText: "O Brasil priorizou marcadamente o modal RODOVIÁRIO a partir da década de 1950 com a introdução das indústrias automobilísticas. Qual desvantagem socioeconômica crítica desse modal sobressai diante do ferroviário e do hidroviário, de acordo com as notas de estudo?",
    options: [
      "A total dependência do nível de chuvas locais para inflar os pneus dos furgões e carretas nacionais.",
      "Os altos custos de transporte que encarecem consideravelmente os produtos finais comercializados nas centrais de serviços.",
      "O modal rodoviário é estrito e só consegue operar e descarregar suas encomendas em portos fluviais com eclusas.",
      "Estar limitado unicamente ao transporte de pequenos volumes residuais leves de coco de babaçu industrial."
    ],
    correctIndex: 1,
    hint: "Dica do Guarda (○): O caminhão consome muito combustível por tonelada transportada comparado a um navio ou trem de carga de 100 vagões. Imagine o gasto acumulado de diesel e pedágio nas estradas ruins brasileiras!",
    explanation: "Parabéns! Você alcançou o prêmio máximo e sobreviveu a todos os desafios da geografia brasileira! Embora as rodovias confiram alta capilaridade de entrega porta a porta, elas representam um modal altamente oneroso e poluente que encarece o preço final dos alimentos básicos e matérias-primas nacionais."
  },
  {
    id: 20,
    stageName: "Rodada 10.5: Cartola Terminal (Desafio do Diretor)",
    stageIcon: "Target",
    topic: "Sistemas de Transportes",
    type: "typed",
    questionText: "No âmbito do transporte por águas (mar ou rios), qual a nítida diferença conceitual descrita no livro de geografia entre a navegação de 'Cabotagem' e a modalidade 'Hidroviária Fluvial'?",
    hint: "Defina cabotagem como navegação marítima restrita ao litoral/costa marítima do país, e fluvial como transporte terrestre fluvial de interior em canais de rios de doce água. (Palavras chave: mar/costa/litoral, rio/fluvial/interior, navegacao/transporte/porto)",
    explanation: "Magnífico desafio cumprido! A Cabotagem representa a navegação mercantil de cabina ou navio de carga costeira que percorre os portos do oceano/mar, enquanto o trajeto Hidroviário Fluvial utiliza barcaças de rio navegável no âmago interiorano do território.",
    typedKeywordsRequired: [
      ["mar", "costa", "litoral", "oceano", "maritimo"],
      ["rio", "fluvial", "interior", "doce"],
      ["porto", "pais", "nacion", "naveg", "modal"]
    ],
    typedFeedbackInstructions: [
      { missingGroupIndex: 0, feedback: "Conceitue o espaço físico da cabotagem: mencione que ocorre pelo 'mar', 'litoral' ou 'costa' marítima." },
      { missingGroupIndex: 1, feedback: "Conceitue o espaço da hidrovia convencional nacional: indique que corre por meio de 'rios' ou canais 'fluviais'." },
      { missingGroupIndex: 2, feedback: "Mencione a integração comercial, usando palavras como 'porto', 'país' ou os verbos de 'navegação'." }
    ]
  }
];

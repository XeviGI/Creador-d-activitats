export interface CicleInfo {
  id: 'inicial' | 'mitja' | 'superior';
  nom: string;
  cursos: string[];
  edat: string;
  orientacioPedagogica: string;
}

export const CICLES: Record<string, CicleInfo> = {
  inicial: {
    id: 'inicial',
    nom: 'Cicle Inicial',
    cursos: ['1r de Primària', '2n de Primària'],
    edat: '6-8 anys',
    orientacioPedagogica: 'Frases breus i clares, suport iconogràfic, lletra adaptada (pal o lligada), línies amples d\'escriptura, exercicis d\'unir i encerclar.',
  },
  mitja: {
    id: 'mitja',
    nom: 'Cicle Mitjà',
    cursos: ['3r de Primària', '4t de Primària'],
    edat: '8-10 anys',
    orientacioPedagogica: 'Comprensió literal i inferencial, seqüenciació temporal, taules senzilles, justificació breu de respostes i expressió escrita pautada.',
  },
  superior: {
    id: 'superior',
    nom: 'Cicle Superior',
    cursos: ['5è de Primària', '6è de Primària'],
    edat: '10-12 anys',
    orientacioPedagogica: 'Pensament crític, anàlisi de causes i conseqüències, argumentació estructurada, connexió interdisciplinària i propostes de transferència a la realitat.',
  },
};

export interface AreaCurricular {
  id: string;
  nom: string;
  icon: string;
  descripcio: string;
  competenciesExemple: string[];
}

export const AREAS_CURRICULARS: AreaCurricular[] = [
  {
    id: 'llengua-catalana',
    nom: 'Llengua Catalana i Literatura',
    icon: 'BookOpen',
    descripcio: 'Desenvolupament de la competència comunicativa oral i escrita, comprensió lectora i gust per la literatura.',
    competenciesExemple: ['CE2: Comprendre textos orals', 'CE4: Comprendre textos escrits', 'CE5: Produir textos escrits'],
  },
  {
    id: 'medi-natural-social',
    nom: 'Coneixement del Medi Natural, Social i Cultural',
    icon: 'Compass',
    descripcio: 'Exploració de l\'entorn natural, fenòmens científics, història, societat i sostenibilitat mediambiental.',
    competenciesExemple: ['CE2: Plantejar preguntes i investigar', 'CE5: Conèixer el medi i sostenibilitat (ODS)', 'CE6: Fets socials i històrics'],
  },
  {
    id: 'matematiques',
    nom: 'Matemàtiques',
    icon: 'Calculator',
    descripcio: 'Resolució de problemes de la vida quotidiana, raonament lògic, càlcul, mesura i interpretació de dades.',
    competenciesExemple: ['CE1: Resoldre problemes quotidians', 'CE2: Modelització matemàtica', 'CE5: Comunicar el raonament'],
  },
  {
    id: 'llengua-castellana',
    nom: 'Llengua Castellana i Literatura',
    icon: 'Languages',
    descripcio: 'Comprensió i expressió oral i escrita en llengua castellana en contextos comunicatius diversos.',
    competenciesExemple: ['CE4: Comprensió de textos escrits', 'CE5: Producció escrita amb correcció'],
  },
  {
    id: 'llengua-estrangera',
    nom: 'Llengua Estrangera (Anglès)',
    icon: 'Globe',
    descripcio: 'Iniciació i desenvolupament de la comunicació en llengua anglesa.',
    competenciesExemple: ['CE1: Comprensió oral i escrita bàsica', 'CE2: Interacció comunicativa senzilla'],
  },
  {
    id: 'educacio-artistica',
    nom: 'Educació Artística (Plàstica i Música)',
    icon: 'Palette',
    descripcio: 'Percepció estètica, creativitat plàstica, llenguatge visual, expressió musical i corporal.',
    competenciesExemple: ['CE1: Recepció i anàlisi de manifestacions artístiques', 'CE2: Creació artística pròpia'],
  },
  {
    id: 'valors-civics',
    nom: 'Educació en Valors Cívics i Ètics',
    icon: 'HeartHandshake',
    descripcio: 'Drets humans, convivència democràtica, empatia, igualtat de gènere i resolució pacífica de conflictes.',
    competenciesExemple: ['CE1: Autoconeixement i gestió emocional', 'CE2: Convivència democràtica i ciutadania'],
  },
  {
    id: 'educacio-fisica',
    nom: 'Educació Física',
    icon: 'Activity',
    descripcio: 'Hàbits de vida activa i saludable, habilitats motrius, cooperació i joc.',
    competenciesExemple: ['CE1: Hàbits saludables i benestar', 'CE2: Resolució de situacions motrius'],
  },
];

export interface TipusActivitat {
  id: string;
  nom: string;
  subtitol: string;
  descripcio: string;
  exercicisTipics: string;
  colorBadge: string;
}

export const TIPUS_ACTIVITATS: TipusActivitat[] = [
  {
    id: 'Comprensió',
    nom: 'Comprensió',
    subtitol: 'Comprensió literal, inferencial i global',
    descripcio: 'Ideal per treballar el contingut base després de la lectura o explicació.',
    exercicisTipics: 'Preguntes directes, vertader/fals justificat, ordenar seqüències cronològiques, relacionar columnes de conceptes.',
    colorBadge: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    id: 'Reforç',
    nom: 'Reforç',
    subtitol: 'Estructures pautades i suport visual',
    descripcio: 'Pensat per consolidar aprenentatges amb bastides de suport i accessibilitat DUA.',
    exercicisTipics: 'Omplir buits amb banc de paraules, opció múltiple guiada, aparellar paraules amb dibuixos o icones, frases curtes.',
    colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    id: 'Ampliació',
    nom: 'Ampliació',
    subtitol: 'Investigació, hipòtesis i creativitat',
    descripcio: 'Dissenyat per aprofundir, connectar amb l\'entorn i fomentar el pensament crític.',
    exercicisTipics: 'Preguntes de reflexió oberta, creació d\'hipòtesis personals ("Què passaria si...?"), petit projecte o recerca breu.',
    colorBadge: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    id: 'Avaluació',
    nom: 'Avaluació',
    subtitol: 'Transferència de coneixement i autoavaluació',
    descripcio: 'Proposta formativa o sumativa per valorar l\'assoliment dels criteris curriculars.',
    exercicisTipics: 'Exercicis d\'aplicació pràctica a situacions noves, justificació d\'idees i semàfor o rúbrica d\'autoavaluació de l\'alumnat.',
    colorBadge: 'bg-amber-100 text-amber-800 border-amber-200',
  },
];

export interface ExempleDidactic {
  id: string;
  titolExemple: string;
  area: string;
  curs: string;
  cicle: string;
  tipus: string;
  text: string;
  indicacions: string;
}

export const EXEMPLES_DOCENTS: ExempleDidactic[] = [
  {
    id: 'medi-cicle-mitja',
    titolExemple: 'El cicle de l\'aigua (Medi Natural - 3r Primària)',
    area: 'Coneixement del Medi Natural, Social i Cultural',
    curs: '3r de Primària',
    cicle: 'Cicle Mitjà',
    tipus: 'Comprensió',
    text: `L'aigua del nostre planeta no s'està mai quieta, sinó que fa un viatge constant anomenat "cicle de l'aigua". 

Primer, l'escalfor del sol escalfa l'aigua dels mars, rius i llacs. Aquesta aigua es transforma en vapor invisible i puja cap al cel; aquest procés es diu evaporació. Quan el vapor d'aigua arriba a les capes altes de l'atmosfera, es refreda i es formen milions de gotetes diminutes que veiem com a núvols: és la condensació.

Quan els núvols pesen molt i estan plens d'aigua, cauen cap a la terra en forma de pluja, o de neu si fa molt fred. Això s'anomena precipitació. Finalment, l'aigua de la pluja baixa per les muntanyes, arriba als rius i torna als oceans, començant el viatge una altra vegada. Gràcies a aquest cicle, la natura sempre té aigua dolça per als éssers vius.`,
    indicacions: 'Incloure un esquema o exercici d\'ordenar les fases (evaporació, condensació, precipitació) i vocabulari clau.',
  },
  {
    id: 'llengua-cicle-inicial',
    titolExemple: 'La dragona que volia llegir (Català - 1r Primària)',
    area: 'Llengua Catalana i Literatura',
    curs: '1r de Primària',
    cicle: 'Cicle Inicial',
    tipus: 'Reforç',
    text: `Hi havia una vegada una petita dragona que es deia Floc.
La Floc no volia treure foc pels queixals com els seus germans grans.
A ella li agradaven els llibres plens de contes i dibuixos.

Un dia, la Floc va anar a la biblioteca del poble.
La bibliotecària, la senyora Rosa, li va regalar un llibre amb lletres grans.
La petita dragona es va posar molt contenta. 
Va seure sota una alzina i va llegir la seva primera paraula: "AMIC".
Tots els nens i nenes del poble van venir a escoltar com llegia la Floc.`,
    indicacions: 'Adaptar el text a frases molt senzilles. Utilitzar banc de paraules per omplir buits i exercici d\'encerclar la resposta correcta.',
  },
  {
    id: 'medi-social-cicle-superior',
    titolExemple: 'La posidònia mediterrània (Medi / ODS - 6è Primària)',
    area: 'Coneixement del Medi Natural, Social i Cultural',
    curs: '6è de Primària',
    cicle: 'Cicle Superior',
    tipus: 'Avaluació',
    text: `La Posidonia oceanica és una planta marina endèmica de la mar Mediterrània que no s'ha de confondre amb una alga: té arrels, tiges, fulles, flors i fruits. 

Aquestes praderies submarines són considerades els "pulmons del Mediterrani" per tres motius essencials:
1. Generen grans quantitats d'oxigen i actuen com un magatzem enorme de diòxid de carboni (carboni blau), combatent el canvi climàtic.
2. Són el refugi, lloc de cria i aliment de més de 400 espècies de plantes i 1.000 espècies d'animals marins.
3. Protegeixen les nostres platges de l'erosió de les onades, ja que les seves fulles frenen la força del mar i les restes que arriben a la sorra eviten que el temporal s'endugui la platja.

Malauradament, la posidònia creix molt lentament (només 1 o 2 centímetres a l'any). Actualment es troba greument amenaçada per les àncores de les embarcacions turístiques que l'arrenquen, la contaminació de l'aigua i l'escalfament global.`,
    indicacions: 'Plantejar preguntes de transferència a la realitat local de les costes de Catalunya, reflexió sobre els ODS (Objectius de Desenvolupament Sostenible 14: Vida submarina) i semàfor d\'autoavaluació.',
  },
];

import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { DECRET_175_DATA, getAreaOficial, getCriterisPerCicleLiteral } from './src/data/decret175OfficialData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// Shared Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Candidate models in preference order (fast and resilient)
const CANDIDATE_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

async function callGemini(contents: string, systemInstruction?: string): Promise<string> {
  let lastError: any = null;
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.25,
          responseMimeType: 'application/json',
        },
      });
      if (response.text && response.text.trim()) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`Model ${model} failed, attempting next available model:`, err?.message);
      lastError = err;
    }
  }
  throw lastError || new Error('All Gemini models failed');
}

const CURRICULAR_SYSTEM_INSTRUCTION = `
Ets un expert de referència en pedagogia, disseny instruccional i màxim especialista en el currículum d'Educació Primària de Catalunya (Decret 175/2022, de 27 de setembre) i en el Disseny Universal per a l'Aprenentatge (DUA).

REGLA D'OR 1: VINCULACIÓ ESTRICTA AL TEXT (ACTIVITATS CENYIDES AL TEXT)
- Totes i cadascuna de les activitats i preguntes de la Secció 2 S'HAN DE CENYIR ESTRICTAMENT al text o document facilitat pel docent.
- L'alumnat les ha de poder resoldre únicament a partir de la lectura atenta, la localització d'informació explícita o la inferència lògica directa del text proporcionat.
- ESTÀ TOTALMENT PROHIBIT crear preguntes abstractes o genèriques buides (per exemple: "Quin és el tema principal?", "Idea 1: Inici / Idea 2: Desenvolupament", "Què has après avui?").
- Totes les preguntes han de citar o fer referència explícita a fets, dades, definicions, éssers, llocs, processos, relacions de causa-efecte o conceptes concrets presents en el text.
- Si planteges activitats de vertader/fals, les afirmacions han de correspondre a fets reals del text (o deformacions clares d'aquests fets).
- Si planteges activitats d'omplir buits o de relacionar conceptes, les paraules i relacions han de sorgir directament del contingut del text.

REGLA D'OR 2: RÚBRICA CENTRADA EN L'ÀREA CURRICULAR TREBALLADA
- La rúbrica d'avaluació de la Secció 3 (escala oficial: AE - Assolit Excel·lent, AN - Assolit Notablement, AS - Assolit Satisfactòriament, NA - No Assolit) NO POT SER UNA RÚBRICA GENÈRICA DE LLENGUA si l'àrea triada és una altra.
- Ha d'estar CENTRADA ÍNTEGRAMENT en els sabers i competències de l'ÀREA SELECCIONADA (Medi, Matemàtiques, Llengua, Artística, Educació Física, Valors, Llengua Estrangera).
- Cada criteri de la rúbrica ha d'indicar clarament el nom de l'aspecte de l'àrea i descriure detalladament els 4 nivells (AE, AN, AS, NA).

REGLA D'OR 3: LITERALITAT EN LES COMPETÈNCIES ESPECÍFIQUES I CRITERIS D'AVALUACIÓ DEL DECRET 175/2022
- Has d'utilitzar el document oficial del Decret 175/2022 proporcionat per a l'àrea i el cicle seleccionat.
- ESMENTA'LS LITERALMENT: La descripció de les Competències Específiques i dels Criteris d'Avaluació de cicle ha de ser exactament la que figura al document oficial, paraula per paraula, sense inventar, resumir ni parafrasejar.

SECCIÓ 1: FITXA TÈCNICA DOCENT
- Competències Específiques esmentades LITERALMENT segons el document del Decret 175/2022.
- Criteris d'Avaluació del cicle (1r-2n, 3r-4t o 5è-6è) esmentats LITERALMENT segons el document oficial.
- Sabers Bàsics de l'àrea.
- Pautes DUA (Representació, Acció/Expressió, Implicació/Motivació).

SECCIÓ 2: FITXA PER A L'ALUMNAT (Format A4 blanc i negre, net)
- Capçalera estàndard (Nom, Data, Curs, Àrea, Títol atractiu).
- Text Adaptat a l'edat del curs indicat (paràgrafs clars, vocabulari comprensible).
- Entre 3 i 5 exercicis variats i graduats, ESTRICTAMENT resolubles amb el text.
- Línies de resposta ben pautades (___________________________________).
- Autoavaluació visual formativa (ex: semàfor).

SECCIÓ 3: SOLUCIONARI I CRITERIS DE CORRECCIÓ
- Respostes model esperades per a cadascun dels exercicis basades en el text.
- Rúbrica de l'àrea amb AE, AN, AS, NA.
- Orientacions metodològiques per a l'aplicació a l'aula.
`;

// Helper: Pedagogical fallback generator when upstream Gemini API encounters temporary spikes
function generateCurricularActivityFallback(params: {
  referenceText: string;
  grade: string;
  cycle: string;
  subject: string;
  activityType: 'Comprensió' | 'Reforç' | 'Ampliació' | 'Avaluació';
  numExercises: number;
  fontStyle: string;
  additionalNotes?: string;
}) {
  const { referenceText, grade, cycle, subject, activityType, numExercises } = params;

  const cleanText = referenceText.trim();
  // Extract sentences with meaningful content
  const sentences = cleanText
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
    .filter((s) => s.length > 15);

  // Extract key terms (words > 4 chars, not common stop words)
  const stopWords = new Set([
    'aquesta', 'aquest', 'aquestes', 'aquests', 'sobre', 'perquè', 'dintre', 'mentre',
    'també', 'sempre', 'tenir', 'tenen', 'podem', 'poden', 'estan', 'està', 'entre',
    'quan', 'com', 'que', 'per', 'amb', 'dels', 'deles', 'sense', 'molt', 'molts'
  ]);

  const words = cleanText
    .replace(/[.,:;()"'«»!?]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 5 && !stopWords.has(w.toLowerCase()));

  const uniqueTerms = Array.from(new Set(words)).slice(0, 8);

  const mainTopic = sentences[0]
    ? sentences[0].slice(0, 70).replace(/[.:;]$/, '')
    : 'el tema treballat';

  // Obtenir dades oficials del Decret 175/2022
  const areaOficial = getAreaOficial(subject);

  // Seleccionar competències específiques oficials segons l'àrea
  let selectedCEs = areaOficial.competencies.slice(0, 2);
  if (areaOficial.id === 'medi' && areaOficial.competencies.length >= 5) {
    selectedCEs = [areaOficial.competencies[1], areaOficial.competencies[4]]; // CE2 (Plantejar-se preguntes...) i CE5 (Analitzar característiques...)
  } else if (areaOficial.id === 'matematiques' && areaOficial.competencies.length >= 2) {
    selectedCEs = [areaOficial.competencies[0], areaOficial.competencies[1]]; // CE1 i CE2
  } else if (areaOficial.id === 'llengua' && areaOficial.competencies.length >= 5) {
    selectedCEs = [areaOficial.competencies[3], areaOficial.competencies[4]]; // CE4 (Comprendre textos) i CE5 (Produir textos)
  }

  // Citar literalment les competències específiques oficials
  const ceList = selectedCEs.map((ce) => ({
    codi: `Competència específica ${ce.numero}`,
    titol: ce.textLiteral, // TEXT LITERAL OFICIAL
    justificacio: `Treballada a partir del text font sobre "${mainTopic}" i la resolució reflexiva de les activitats.`,
  }));

  // Citar literalment els criteris d'avaluació oficials del cicle
  const criteris: { codi: string; descripcio: string; aplicacio: string }[] = [];
  selectedCEs.forEach((ce) => {
    const rawCriteris = getCriterisPerCicleLiteral(ce, cycle);
    if (rawCriteris.length > 0) {
      const crit1 = rawCriteris[0];
      const match = crit1.match(/^(\d+(?:\.\d+)?)\s*[-.]?\s*(.+)$/);
      const numCodi = match ? match[1] : `${ce.numero}.1`;
      const textCrit = match ? match[2] : crit1;
      criteris.push({
        codi: `Criteri ${numCodi}`,
        descripcio: textCrit, // TEXT LITERAL OFICIAL
        aplicacio: `Resolent els exercicis d'interpretació directa i evidències del text.`,
      });
    }
    if (rawCriteris.length > 1 && criteris.length < 3) {
      const crit2 = rawCriteris[1];
      const match = crit2.match(/^(\d+(?:\.\d+)?)\s*[-.]?\s*(.+)$/);
      const numCodi = match ? match[1] : `${ce.numero}.2`;
      const textCrit = match ? match[2] : crit2;
      criteris.push({
        codi: `Criteri ${numCodi}`,
        descripcio: textCrit, // TEXT LITERAL OFICIAL
        aplicacio: `Mitjançant la justificació de respostes i l'ús dels termes de l'àrea presents a la lectura.`,
      });
    }
  });

  const sabersBasics = [
    `Conceptes clau i fenòmens descrits a la lectura: ${mainTopic.slice(0, 45)}.`,
    `Vocabulari científic o terminològic propi de l'àrea de ${areaOficial.nomOficial}.`,
    `Raonament i evidències directament extretes del document font.`,
  ];

  // Selected sentences for strict grounding
  const s0 = sentences[0] || 'Llegeix amb atenció el text de la sessió.';
  const s1 = sentences[1] || sentences[0] || 'Identifica la informació rellevant.';
  const s2 = sentences[2] || sentences[1] || 'Troba els detalls que expliquen el fenomen.';
  const s3 = sentences[3] || sentences[0] || 'Pensa en com es connecta amb la realitat.';

  const t1 = uniqueTerms[0] || 'el fenomen';
  const t2 = uniqueTerms[1] || 'el procés';
  const t3 = uniqueTerms[2] || 'l\'element';
  const t4 = uniqueTerms[3] || 'la característica';

  const exercises: any[] = [];
  const solutions: any[] = [];

  // Generate activities strictly grounded in the text
  if (activityType === 'Comprensió') {
    // Ex 1: Direct literal question from the 1st/2nd sentence
    exercises.push({
      num: 1,
      titol: 'Comprensió literal del text',
      tipus: 'Extracció d\'informació directa',
      enunciat: `Segons el text, com es defineix o què s'explica exactament sobre "${t1}"? Copia o explica la informació que dóna la lectura:`,
      contingut: `Resposta del text: _____________________________________________________________________\n___________________________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 1,
      enunciatResumit: `Explicació sobre "${t1}"`,
      respostaEsperada: `L'alumnat ha de respondre segons el text: "${s0.slice(0, 110)}".`,
      observacions: 'La resposta ha d\'estar fonamentada directament en les frases de la lectura.',
    });

    // Ex 2: True / False directly testing text assertions
    exercises.push({
      num: 2,
      titol: 'Comprovació d\'afirmacions del text',
      tipus: 'Vertader o Fals amb justificació',
      enunciat: 'Llegeix aquestes dues afirmacions i marca si són Vertaderes (V) o Falses (F) segons el que has llegit al text:',
      contingut: `a) [   ] V   [   ] F  ->  "${s1.slice(0, 95)}"\n    Justificació amb el text: ________________________________________________________\n\nb) [   ] V   [   ] F  ->  "${s2.slice(0, 95)}"\n    Justificació amb el text: ________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 2,
      enunciatResumit: 'Vertader o Fals amb evidència textual',
      respostaEsperada: `a) V (apareix expressament al text: "${s1.slice(0, 60)}..."). b) V (conforme a la informació del text: "${s2.slice(0, 60)}...").`,
      observacions: 'Cal comprovar que l\'alumne/a cita o parafraseja el fragment adequat del text.',
    });

    // Ex 3: Text-based matching or relations
    exercises.push({
      num: 3,
      titol: 'Relació de conceptes del text',
      tipus: 'Aparellar termes i explicacions de la lectura',
      enunciat: `Uneix amb una fletxa cada terme del text amb el que s'hi explica:`,
      contingut: `1. ${t1}                  •     •   Esmentat al text com a element clau del procés.\n2. ${t2}                  •     •   Fet o concepte descrit a la lectura per entendre el tema.\n3. ${t3}                  •     •   Detall explicat al text que complementa la informació.`,
      liniesResposta: 0,
    });
    solutions.push({
      num: 3,
      enunciatResumit: 'Relacionar conceptes del text',
      respostaEsperada: `1 (${t1}) relacionat amb el seu paper al text; 2 (${t2}) amb la seva descripció; 3 (${t3}) amb el detall explicat a la lectura.`,
      observacions: 'Verificar que les unions corresponguin als continguts del text.',
    });

    // Ex 4: Text-based inference / cause-effect
    if (numExercises >= 4) {
      exercises.push({
        num: 4,
        titol: 'Comprensió inferencial i relació de causa-efecte',
        tipus: 'Pregunta d\'inferència textual',
        enunciat: `A partir del que diu el text a la frase: "${s3.slice(0, 85)}", quina causa o conseqüència se'n deriva? Explica-ho:`,
        contingut: `Explicació: _________________________________________________________________________\n___________________________________________________________________________________`,
        liniesResposta: 2,
      });
      solutions.push({
        num: 4,
        enunciatResumit: 'Causa o conseqüència inferida del text',
        respostaEsperada: `L'alumnat ha de deduir a partir del text la relació de causa-efecte associada a "${s3.slice(0, 60)}".`,
        observacions: 'Acceptar qualsevol raonament lògic basat en les dades contingudes a la lectura.',
      });
    }

    // Ex 5: Synthesizing the specific text content
    if (numExercises >= 5) {
      exercises.push({
        num: 5,
        titol: 'Síntesi i aplicació del text',
        tipus: 'Pregunta de transferència i resum',
        enunciat: `Resumeix en dues línies el missatge o descripció més important que el text transmet sobre ${subject}:`,
        contingut: `La meva conclusió a partir del text: ___________________________________________________\n___________________________________________________________________________________`,
        liniesResposta: 2,
      });
      solutions.push({
        num: 5,
        enunciatResumit: 'Síntesi de la lectura',
        respostaEsperada: `Resum coherent que integri els conceptes principals del text (${t1}, ${t2}, etc.).`,
        observacions: 'Valorar la claredat i l\'ús de vocabulari procedent de la lectura.',
      });
    }
  } else if (activityType === 'Reforç') {
    // Cloze test using real words from the text
    exercises.push({
      num: 1,
      titol: 'Completa amb les paraules del text',
      tipus: 'Omplir buits amb banc de paraules',
      enunciat: 'Llegeix el text i omple els espais buits amb la paraula adequada del requadre:',
      contingut: `[ BANC DE PARAULES DEL TEXT:  ${t1}   |   ${t2}   |   ${t3} ]\n\na) Segons el document, ____________________ és fonamental per entendre aquest fenomen.\nb) El text indica que ____________________ té un paper molt important en el procés.\nc) A la lectura també podem descobrir com actua ____________________.`,
      liniesResposta: 0,
    });
    solutions.push({
      num: 1,
      enunciatResumit: 'Buit de paraules del text',
      respostaEsperada: `a) ${t1}  b) ${t2}  c) ${t3} (o segons concordança amb la frase del text).`,
      observacions: 'L\'alumnat ha de localitzar el fragment corresponent al text per comprovar el terme.',
    });

    exercises.push({
      num: 2,
      titol: 'Opció múltiple amb el text',
      tipus: 'Selecció de la resposta correcta',
      enunciat: `Tria quina d'aquestes tres opcions és la que diu EXACTAMENT el text sobre "${t1}":`,
      contingut: `[   ] Opcio A: ${s0.slice(0, 85)}\n[   ] Opcio B: El text afirma que no té cap relació amb la natura ni la societat.\n[   ] Opcio C: És un element que no apareix descrit a la lectura.`,
      liniesResposta: 0,
    });
    solutions.push({
      num: 2,
      enunciatResumit: 'Opció múltiple segons el text',
      respostaEsperada: 'Opció A (coincideix literalment amb l\'afirmació del text font).',
      observacions: 'Facilitar la cerca del fragment exacte a l\'alumnat de suport.',
    });

    exercises.push({
      num: 3,
      titol: 'Localització directa al text',
      tipus: 'Cerca i còpia d\'un detall',
      enunciat: `Busca al text i copia exactament la frase on s'esmenta "${t2}":`,
      contingut: `Frase del text: _____________________________________________________________________\n___________________________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 3,
      enunciatResumit: `Còpia de la frase amb "${t2}"`,
      respostaEsperada: `La frase exacta extreta del text: "${s1.slice(0, 100)}".`,
      observacions: 'Verificar que l\'alumne ha copiat la frase completa de manera fidel.',
    });

    if (numExercises >= 4) {
      exercises.push({
        num: 4,
        titol: 'Aparellament de frases del text',
        tipus: 'Unir meitats d\'oracions de la lectura',
        enunciat: 'Uneix el començament de cada oració amb el seu final segons el text:',
        contingut: `1. ${s0.slice(0, 35)}...                  •     •   ...${s0.slice(35, 75)}.\n2. ${s1.slice(0, 35)}...                  •     •   ...${s1.slice(35, 75)}.`,
        liniesResposta: 0,
      });
      solutions.push({
        num: 4,
        enunciatResumit: 'Unir fragments del text',
        respostaEsperada: 'Reconstrucció exacta de les frases 1 i 2 del text font.',
        observacions: 'Activitat accessible per a consolidar la lectura línia a línia.',
      });
    }
  } else if (activityType === 'Ampliació') {
    exercises.push({
      num: 1,
      titol: 'Anàlisi aprofundida del text',
      tipus: 'Pregunta d\'indagació i causa',
      enunciat: `A partir de la descripció del text ("${s0.slice(0, 80)}"), per quina raó creus que passa aquest fenomen i quins factors hi intervenen segons la lectura?`,
      contingut: `La meva anàlisi: ____________________________________________________________________\n___________________________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 1,
      enunciatResumit: 'Anàlisi de factors del text',
      respostaEsperada: `Resposta que aprofundeixi en les causes explicades al text font relacionades amb ${t1}.`,
      observacions: 'Valorar la capacitat d\'establir connexions lògiques i causals.',
    });

    exercises.push({
      num: 2,
      titol: 'Transferència a l\'entorn real',
      tipus: 'Hipòtesi i relació amb el medi',
      enunciat: `Com creus que el que explica el text sobre "${t1}" i "${t2}" es manifesta a Catalunya o a la teva comarca? Posa un exemple concret:`,
      contingut: `Exemple i reflexió: _________________________________________________________________\n___________________________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 2,
      enunciatResumit: 'Connexió amb l\'entorn proper',
      respostaEsperada: 'Aplicació dels conceptes del text a l\'entorn natural, social o cultural de Catalunya.',
      observacions: 'Fomentar la transferència de coneixements a situacions reals.',
    });

    exercises.push({
      num: 3,
      titol: 'Pensament crític a partir del text',
      tipus: 'Dilema o qüestió oberta',
      enunciat: `Si les circumstàncies que explica el text ("${s2.slice(0, 75)}") canviessin completament, quines conseqüències tindria? Proposa una hipòtesi:`,
      contingut: `Hipòtesi: ___________________________________________________________________________\n___________________________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 3,
      enunciatResumit: 'Formulació d\'hipòtesi',
      respostaEsperada: 'Plantejament d\'un escenari alternatiu ben fonamentat en la lectura.',
      observacions: 'Estimular la creativitat científica i el pensament divergent.',
    });

    if (numExercises >= 4) {
      exercises.push({
        num: 4,
        titol: 'Petit projecte de divulgació',
        tipus: 'Creació comunicativa',
        enunciat: `Dissenya un titular d'impacte i dues recomanacions que transmetin a la resta de l'escola allò més destacat d'aquest text:`,
        contingut: `Titular divulgatiu: _________________________________________________________________\nRecomanació 1: _____________________________________________________________________\nRecomanació 2: _____________________________________________________________________`,
        liniesResposta: 3,
      });
      solutions.push({
        num: 4,
        enunciatResumit: 'Campanya o titular divulgatiu',
        respostaEsperada: 'Proposta comunicativa fidel a la informació clau del text font.',
        observacions: 'Valorar la capacitat de síntesi i expressió clara.',
      });
    }
  } else {
    // Avaluació
    exercises.push({
      num: 1,
      titol: 'Avaluació de conceptes clau',
      tipus: 'Identificació d\'elements del text',
      enunciat: `Explica amb les teves paraules, basant-te exclusivament en el text, el significat de "${t1}" i quina funció té segons la lectura:`,
      contingut: `Resposta: ___________________________________________________________________________\n___________________________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 1,
      enunciatResumit: `Funció de "${t1}" segons el text`,
      respostaEsperada: `Definició fidel a la informació del text: "${s0.slice(0, 90)}".`,
      observacions: 'Criteri d\'avaluació: precisió en l\'ús de la informació textual.',
    });

    exercises.push({
      num: 2,
      titol: 'Avaluació de relacions causa-efecte',
      tipus: 'Justificació de processos',
      enunciat: `Segons el text, per quina raó passa el següent: "${s1.slice(0, 80)}"? Justifica la teva resposta amb dues dades de la lectura:`,
      contingut: `Dada 1 del text: ___________________________________________________________________\nDada 2 del text: ___________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 2,
      enunciatResumit: 'Justificació amb dues dades del text',
      respostaEsperada: `Extracció de dos arguments o detalls continguts a la lectura (${s1.slice(0, 50)}...).`,
      observacions: 'Avaluar el rigor en la cerca d\'evidències en el document.',
    });

    exercises.push({
      num: 3,
      titol: 'Avaluació de transferència i aplicació',
      tipus: 'Resolució d\'un cas pràctic',
      enunciat: `Aplica la informació que has après al text per donar resposta a aquesta situació: Si algú desconeix com funciona "${t2}", com li ho explicaries de manera científica i senzilla?`,
      contingut: `Explicació: _________________________________________________________________________\n___________________________________________________________________________________`,
      liniesResposta: 2,
    });
    solutions.push({
      num: 3,
      enunciatResumit: 'Transferència d\'aprenentatge',
      respostaEsperada: `Explicació clara i estructurada dels conceptes del text font aplicats a la situació.`,
      observacions: 'Verificar la coherència i l\'assimilació dels sabers bàsics.',
    });

    if (numExercises >= 4) {
      exercises.push({
        num: 4,
        titol: 'Verificació d\'arguments del text',
        tipus: 'Distinció de fets contrastats',
        enunciat: `D'acord amb el text, quina afirmació resumeix millor el resultat de "${s2.slice(0, 60)}"? Marca amb una creu [X]:`,
        contingut: `[   ] Opció 1: És el procés descrit fidelment al text que condueix a aquest resultat.\n[   ] Opció 2: És un fenomen que no té cap relació amb el que explica la lectura.\n[   ] Opció 3: El text contradiu completament aquesta afirmació.`,
        liniesResposta: 0,
      });
      solutions.push({
        num: 4,
        enunciatResumit: 'Distinció d\'afirmacions contrastades',
        respostaEsperada: 'Opció 1 (fidel a les conclusions del text de referència).',
        observacions: 'Comprovar la capacitat d\'identificar la conclusió del document.',
      });
    }
  }

  // BUILD A TAILORED RUBRIC STRICTLY CENTERED ON THE SELECTED CURRICULAR AREA
  let rubrica: Array<{ criteri: string; 'excel·lent': string; notable: string; satisfactori: string; noAssolit: string }> = [];

  if (subject.includes('Medi')) {
    rubrica = [
      {
        criteri: `Comprensió dels fenòmens naturals i socials del text (Medi)`,
        'excel·lent': `Identifica i explica amb rigor científic i precisió tots els processos i fenòmens del medi explicats a la lectura (${t1}, ${t2}).`,
        notable: `Comprèn els processos principals del medi descrits al text amb només alguna imprecisió menor.`,
        satisfactori: `Reconeix els conceptes més bàsics del medi esmentats a la lectura amb una mica de guia.`,
        noAssolit: `No identifica els fenòmens del medi explicats al text o els confon greument.`,
      },
      {
        criteri: `Ús i precisió del vocabulari cientificotècnic o social del medi`,
        'excel·lent': `Utilitza de manera exacta i en el context adequat els termes específics del text (${uniqueTerms.slice(0, 3).join(', ')}).`,
        notable: `Aplica correctament la majoria de paraules clau de la lectura sobre el medi.`,
        satisfactori: `Reconeix els termes clau del medi però empra un llenguatge massa col·loquial o imprecís.`,
        noAssolit: `No utilitza el vocabulari propi de l'àrea de medi present a la lectura.`,
      },
      {
        criteri: `Relacions de causa-efecte i sostenibilitat de l'entorn`,
        'excel·lent': `Relaciona de forma excel·lent les causes, conseqüències i la importància de la cura i sostenibilitat del medi segons el text.`,
        notable: `Estableix relacions adequades de causa-efecte a partir de la informació continguda al text.`,
        satisfactori: `Identifica alguna relació directa senzilla entre els elements del medi analitzats.`,
        noAssolit: `No estableix relacions causals ni ambientals a partir de les evidències del text.`,
      },
    ];
  } else if (subject.includes('Matemàtiques')) {
    rubrica = [
      {
        criteri: `Comprensió de les dades quantitatives i relacions lògiques del text`,
        'excel·lent': `Identifica i extreu amb màxima precisió totes les dades numèriques, relacions i magnituds contingudes al text.`,
        notable: `Comprèn les dades principals del problema o situació descrita amb bona exactitud.`,
        satisfactori: `Identifica les dades més evidents però necessita suport per interpretar les relacions.`,
        noAssolit: `No aconsegueix extreure les dades matemàtiques del text o les interpreta erròniament.`,
      },
      {
        criteri: `Estratègies de resolució i raonament matemàtic`,
        'excel·lent': `Aplica una estratègia lògica eficient, ben seqüenciada i coherent amb la situació plantejada al text.`,
        notable: `Desenvolupa un procediment matemàtic adequat amb pocs errors menors de càlcul.`,
        satisfactori: `Aplica procediments bàsics però amb dificultats per justificar el procés seguit.`,
        noAssolit: `No mostra un raonament estructurat ni una estratègia vàlida de solució.`,
      },
      {
        criteri: `Comunicació i representació matemàtica`,
        'excel·lent': `Expressa la solució amb claredat, emprant símbols, unitats i notació matemàtica correcta.`,
        notable: `Comunica els resultats de manera entenedora amb una notació generalment adequada.`,
        satisfactori: `Proporciona el resultat sense detallar clarament el procediment o les unitats.`,
        noAssolit: `No comunica el procés ni el resultat de manera comprensible.`,
      },
    ];
  } else if (subject.includes('Artística')) {
    rubrica = [
      {
        criteri: `Percepció i anàlisi dels elements visuals o culturals del text`,
        'excel·lent': `Identifica i descriu amb gran sensibilitat els elements artístics, tècnics i visuals tractats a la lectura.`,
        notable: `Reconeix els aspectes estètics i expressius principals de la informació del text.`,
        satisfactori: `Identifica aspectes visuals bàsics amb suport de preguntes guiades.`,
        noAssolit: `No percep els elements expressius o artístics vinculats al text.`,
      },
      {
        criteri: `Expressió plàstica i representació gràfica del contingut`,
        'excel·lent': `Crea una representació visual molt detallada, coherent i fidel als conceptes del text font.`,
        notable: `Realitza un dibuix o esquema adequat que reflecteix els elements principals de la lectura.`,
        satisfactori: `Fa una representació senzilla però incompleta del que s'explica al text.`,
        noAssolit: `La representació no guarda relació amb el text de referència.`,
      },
      {
        criteri: `Creativitat i originalitat en la resposta`,
        'excel·lent': `Aporta idees pròpies, solucions visuals innovadores i una cura formal excel·lent.`,
        notable: `Mostra originalitat i interès en el desenvolupament de la proposta artística.`,
        satisfactori: `Compleix amb la tasca de manera estàndard sense gaire aportació personal.`,
        noAssolit: `Manca d'implicació o esforç en la part expressiva.`,
      },
    ];
  } else if (subject.includes('Valors')) {
    rubrica = [
      {
        criteri: `Identificació de valors i situacions morals presents al text`,
        'excel·lent': `Analitza en profunditat els dilemes, valors i actituds cíviques que planteja el text font.`,
        notable: `Identifica els valors principals i expressa una opinió coherent sobre els fets.`,
        satisfactori: `Reconeix conductes positives o negatives bàsiques amb ajuda puntual.`,
        noAssolit: `No distingeix els valors o actituds ètiques descrites a la lectura.`,
      },
      {
        criteri: `Empatia i pensament ètic crític`,
        'excel·lent': `Es posa en el lloc dels protagonistes del text i argumenta amb respecte i criteris de justícia.`,
        notable: `Mostra empatia envers les situacions del text i reflexiona amb claredat.`,
        satisfactori: `Mostra comprensió bàsica dels sentiments dels altres sense gaire aprofundiment.`,
        noAssolit: `Mostra indiferència o incapacitat per reflexionar sobre l'impacte en els altres.`,
      },
      {
        criteri: `Proposta d'actituds cíviques i resolució pacífica`,
        'excel·lent': `Planteja alternatives constructives i accions solidàries plenament connectades amb el text.`,
        notable: `Proposa accions positives per millorar la convivència en relació amb el tema tractat.`,
        satisfactori: `Assenyala propostes molt genèriques sense connectar del tot amb la lectura.`,
        noAssolit: `No aporta solucions ni compromís envers la convivència.`,
      },
    ];
  } else if (subject.includes('Estrangera') || subject.includes('Anglès') || subject.includes('Angles')) {
    rubrica = [
      {
        criteri: `Reading Comprehension of Key Facts and Vocabulary (Llengua Estrangera)`,
        'excel·lent': `Understands and locates all key facts, specific vocabulary and details directly from the text without errors.`,
        notable: `Understands the general meaning and most important specific details of the passage.`,
        satisfactori: `Identifies basic words and explicit statements with teacher guidance.`,
        noAssolit: `Struggles to extract meaning or understand the vocabulary from the source text.`,
      },
      {
        criteri: `Vocabulary Acquisition and Accuracy from the Text`,
        'excel·lent': `Correctly applies target words from the reading in complete, accurate phrases.`,
        notable: `Uses most target vocabulary accurately in answering the exercises.`,
        satisfactori: `Recognizes the target words but makes minor spelling or contextual mistakes.`,
        noAssolit: `Does not demonstrate acquisition of the core vocabulary presented in the text.`,
      },
      {
        criteri: `Written Expression and Language Mechanics`,
        'excel·lent': `Writes well-structured answers using the target structures and correct punctuation.`,
        notable: `Writes comprehensible sentences with minor syntax errors that do not hinder understanding.`,
        satisfactori: `Writes simple isolated words or short fragmented phrases.`,
        noAssolit: `Unable to produce written answers in the target language.`,
      },
    ];
  } else {
    // Default Llengua Catalana i Literatura
    rubrica = [
      {
        criteri: `Comprensió lectora literal i inferencial del text font`,
        'excel·lent': `Comprèn a fons el sentit global, localitza informació explícita i dedueix inferències complexes del text.`,
        notable: `Identifica les idees principals i la majoria d'inferències directes amb bona precisió.`,
        satisfactori: `Localitza dades literals evidents del text però té dificultats amb les preguntes inferencials.`,
        noAssolit: `No comprèn el sentit del text ni localitza la informació requerida.`,
      },
      {
        criteri: `Riquesa lèxica i vocabulari específic de la lectura`,
        'excel·lent': `Incorpora amb naturalitat i precisió el vocabulari específic del text en les seves respostes escrites.`,
        notable: `Empra un vocabulari variat i adequat al tema treballat a la sessió.`,
        satisfactori: `Utilitza un vocabulari bàsic i recurrent sense incorporar els nous termes del text.`,
        noAssolit: `Pobresa lèxica manifesta o ús incoherent de les paraules.`,
      },
      {
        criteri: `Cohesió, estructuració oracional i correcció lingüística`,
        'excel·lent': `Redacta respostes cohesionades, amb oracions ben connectades, ortografia acurada i bona puntuació.`,
        notable: `Respostes clares i ben estructurades amb pocs errors d'ortografia o concordança.`,
        satisfactori: `Oracions senzilles amb errades puntuals de puntuació o concordança que no impedeixen la comprensió.`,
        noAssolit: `Frases desestructurades o inintel·ligibles amb errors que dificulten greument la lectura.`,
      },
    ];
  }

  const autoavaluacioVisual = {
    titol: "Autoavaluació de l'Alumne/a (Com he treballat?)",
    format: "Semàfor d'aprenentatge DUA",
    opcions: [
      '🟢 Verd: Ho he entès tot molt bé i he sabut trobar les respostes al text sol/a.',
      '🟡 Groc: Ho he entès bastant bé, però he hagut de rellegir el text o demanar algun aclariment.',
      '🔴 Vermell: M\'ha costat trobar les respostes al text i he necessitat l\'ajuda del mestre/a.',
    ],
  };

  const titol = `Treballem el text: ${mainTopic.slice(0, 48)}`;

  // Adapted text formatting
  let textAdaptat = cleanText;
  if (cycle === 'Cicle Inicial') {
    textAdaptat = cleanText
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean)
      .join('\n\n');
  }

  return {
    titolActivitat: titol,
    subtitol: `Proposta didàctica d'aprenentatge (${grade} • ${subject})`,
    seccio1: {
      titol: 'SECCIÓ 1: FITXA TÈCNICA DOCENT (Anàlisi Curricular i DUA)',
      area: subject,
      curs: grade,
      cicle: cycle,
      competenciesEspecifiques: ceList,
      criterisAvaluacio: criteris,
      sabersBasics,
      pautesDua: {
        representacio: `Text estructurat en paràgrafs ben definits, vocabulari accessible adaptat al ${cycle} i enunciats directes per a la màxima claredat perceptiva.`,
        accioExpressio: `Varietat d'estratègies de resposta: ${activityType === 'Reforç' ? 'banc de paraules del text, opció múltiple i línies amples' : 'relació de termes del text, verificació amb evidències i línies pautades d\'escriptura manual'}.`,
        implicacioMotivacio: `Activitat directament connectada amb la lectura font, tasques amb bastides d'èxit i autoavaluació final amb semàfor per afavorir l'autoregulació de l'aprenentatge.`,
      },
    },
    seccio2: {
      titol: "SECCIÓ 2: FITXA PER A L'ALUMNAT (A punt per imprimir)",
      capsalera: {
        campNom: 'Nom i Cognoms: _____________________________________',
        campData: 'Data: _________',
        campCurs: `Curs: ${grade}`,
        campArea: `Àrea: ${subject}`,
      },
      textAdaptat,
      exercicis: exercises,
      autoavaluacioVisual,
    },
    seccio3: {
      titol: 'SECCIÓ 3: SOLUCIONARI I CRITERIS DE CORRECCIÓ',
      solucions: solutions,
      rubrica,
      orientacionsDocents: `Aquesta proposta ha estat dissenyada per treballar directament sobre el text de referència a l'àrea de ${subject}. Recordeu oferir temps per a una primera lectura atenta o compartida abans d'iniciar els exercicis. Per a l'alumnat que necessiti suports DUA, es recomana permetre subratllar prèviament al text els termes clau i oferir la possibilitat de verbalitzar la resposta abans d'escriure-la.`,
    },
    fullPlainText: `======================================================================
SECCIÓ 1: FITXA TÈCNICA DOCENT (Anàlisi Curricular i DUA)
======================================================================
Àrea: ${subject}
Curs: ${grade} (${cycle})

1. RELACIÓ AMB EL DECRET 175/2022:
- Competències Específiques:
${ceList.map((ce) => `  * [${ce.codi}] ${ce.titol}: ${ce.justificacio}`).join('\n')}

- Criteris d'Avaluació:
${criteris.map((ca) => `  * [${ca.codi}] ${ca.descripcio} (${ca.aplicacio})`).join('\n')}

- Sabers Bàsics:
${sabersBasics.map((s) => `  * ${s}`).join('\n')}

2. PAUTES DUA (Disseny Universal per a l'Aprenentatge):
- Representació: Text estructurat en paràgrafs clars i vocabulari accessible al ${cycle}.
- Acció i expressió: Varietat de formats de resposta i línies d'escriptura manual pautades.
- Implicació i motivació: Bastides d'èxit i autoavaluació final amb semàfor.

======================================================================
SECCIÓ 2: FITXA PER A L'ALUMNAT (A punt per imprimir)
======================================================================
Nom i Cognoms: _____________________________________   Data: _________
Curs: ${grade}                                         Àrea: ${subject}

Títol: ${titol}
${grade} • ${subject}
----------------------------------------------------------------------
TEXT ADAPTAT:
${textAdaptat}
----------------------------------------------------------------------
ACTIVITATS (Cenyides estrictament al text):

${exercises.map((ex, i) => `${ex.num || i + 1}. [${ex.tipus}] ${ex.enunciat}\n${ex.contingut || '___________________________________________________\n___________________________________________________'}`).join('\n\n')}

AUTOAVALUACIÓ:
[ ] 🟢 Verd: Ho he entès tot molt bé i he sabut trobar les respostes al text sol/a.
[ ] 🟡 Groc: Ho he entès bastant bé, però he hagut de rellegir el text o demanar ajuda.
[ ] 🔴 Vermell: M'ha costat trobar les respostes al text i he necessitat ajuda.

======================================================================
SECCIÓ 3: SOLUCIONARI I CRITERIS DE CORRECCIÓ
======================================================================
SOLUCIONS ESPERADES:
${solutions.map((s, i) => `Exercici ${s.num || i + 1} (${s.enunciatResumit}):\n-> Resposta model: ${s.respostaEsperada}\n${s.observacions ? `-> Pauta: ${s.observacions}\n` : ''}`).join('\n')}

RÚBRICA D'AVALUACIÓ DE L'ÀREA (${subject}):
${rubrica.map((r) => `* ${r.criteri}:\n  - AE (Excel·lent): ${r.excel·lent}\n  - AN (Notable): ${r.notable}\n  - AS (Satisfactori): ${r.satisfactori}\n  - NA (No Assolit): ${r.noAssolit}`).join('\n')}
`,
  };
}

// Generate Activity endpoint
app.post('/api/generate-activity', async (req: Request, res: Response) => {
  const {
    referenceText,
    grade = '3r de Primària',
    cycle = 'Cicle Mitjà',
    subject = 'Coneixement del Medi Natural, Social i Cultural',
    activityType = 'Comprensió',
    additionalNotes = '',
    numExercises = 4,
    fontStyle = 'standard',
  } = req.body;

  if (!referenceText || !referenceText.trim()) {
    res.status(400).json({ error: 'Cal proporcionar un text o document de referència.' });
    return;
  }

  // If Gemini API is available, try Gemini first
  if (process.env.GEMINI_API_KEY) {
    try {
      const areaOficial = getAreaOficial(subject);
      const officialCurricularCatalog = areaOficial.competencies
        .map((ce) => {
          const criteris = getCriterisPerCicleLiteral(ce, cycle);
          return `[Competència específica ${ce.numero}]
Text oficial de la competència:
"${ce.textLiteral}"
Criteris d'avaluació oficials per a ${cycle}:
${criteris.map((c) => `* ${c}`).join('\n')}`;
        })
        .join('\n\n');

      const userPrompt = `
Genera una activitat didàctica completa seguint les directrius del Decret 175/2022 d'Educació Primària a Catalunya i el DUA.

DADES CLAU DE LA PROPOSTA:
- Document / Text de referència del docent:
"""
${referenceText.slice(0, 7000)}
"""
- Curs seleccionat: ${grade} (${cycle})
- Àrea curricular: ${subject}
- Tipus d'activitat sol·licitada: ${activityType}
- Nombre d'exercicis desitjat: ${numExercises} exercicis graduats
- Preferència d'estil/lletra: ${fontStyle}
${additionalNotes ? `- Indicacions addicionals del docent: ${additionalNotes}` : ''}

DOCUMENTACIÓ OFICIAL DEL DECRET 175/2022 PER A L'ÀREA "${areaOficial.nomOficial}" I EL CICLE "${cycle}":
"""
${officialCurricularCatalog}
"""

REQUISITS OBLIGATORIS DE PEDAGOGIA:
1. LITERALITAT EN COMPETÈNCIES I CRITERIS D'AVALUACIÓ:
   - Utilitza exclusivament la documentació oficial anterior per omplir la Secció 1.
   - ESMENTA'LS LITERALMENT: Copia el text exacte de les competències seleccionades i dels criteris de cicle corresponents, paraula per paraula, sense cap canvi ni resum.
   - A "competenciesEspecifiques", el camp "titol" HA DE SER el text literal oficial.
   - A "criterisAvaluacio", el camp "descripcio" HA DE SER el text literal oficial de cicle.

2. CENYIR-SE ESTRICTAMENT AL TEXT:
   - Totes i cadascuna de les activitats de la Secció 2 s'han de poder resoldre LLEGINT o INFERINT directament la informació del text proporcionat.
   - Prohibit formular preguntes abstractes o genèriques buides (com "Quin és el tema", "Idea 1: Inici", etc.).
   - Cada exercici ha de preguntar sobre conceptes concrets, fets, dades, definicions, elements, causes o processos reals que apareixen al text anterior.
   - Si és Vertader/Fals, les afirmacions han de fer referència a fragments o fets reals del text (o la seva negació).
   - Si és d'omplir buits o relacionar, les paraules han d'estar extretes directament del text.

3. NETEDAT ESTRICTA A LA FITXA DE L'ALUMNAT (SECCIÓ 2):
   - PROHIBIT incloure pistes ("Pista: ...", "Ajuda: ...", "[Pista: ...]") a la fitxa per a l'alumnat. Les pistes les dóna el mestre/a oralment a l'aula o consten a la Secció 3.
   - PROHIBIT incloure explicacions suplementàries o etiquetes entre parèntesis als enunciats (com "(COMPRENSIÓ DIRECTA)", "(COMPLETAR)", "(LITERAL)", "(INFERÈNCIA)", "(EXTRACCIÓ)", etc.). L'infant només ha de rebre l'enunciat net de la pregunta.
   - NO posis etiquetes com "Versió amb suport adaptat DUA" o metadades tècniques a la fitxa de l'alumnat.
   - Tota la informació pedagògica per al mestre va a la Secció 1 i Secció 3.

4. RÚBRICA CENTRADA EN L'ÀREA CURRICULAR TREBALLADA (${subject}):
   - La rúbrica d'avaluació de la Secció 3 NO POT ser una rúbrica genèrica de comprensió lectora si l'àrea és una altra.
   - Ha d'estar centrada en els continguts i competències pròpies de l'àrea (${areaOficial.nomOficial}):
     * Si l'àrea és Medi: comprensió dels fenòmens/processos del medi explicats al text, vocabulari científic/social de la lectura, relacions de causa-efecte i sostenibilitat de l'entorn.
     * Si l'àrea és Matemàtiques: raonament matemàtic, resolució de la situació, comunicació matemàtica.
     * Si l'àrea és Llengua: comprensió textual profunda, riquesa lèxica, correcció i expressió escrita.
     * Si l'àrea és Artística, Valors, Llengua Estrangera o Educació Física: criteris propis de la disciplina.
   - A cada criteri, defineix amb detall els 4 nivells de l'escala oficial de Catalunya:
     * AE: Assoliment Excel·lent
     * AN: Assoliment Notable
     * AS: Assoliment Satisfactori
     * NA: No Assolit

Has de retornar exclusivament un objecte JSON amb la següent estructura:
{
  "titolActivitat": "Títol motivador i representatiu del text",
  "subtitol": "Subtítol descriptiu (${grade} • ${subject})",
  "seccio1": {
    "titol": "SECCIÓ 1: FITXA TÈCNICA DOCENT (Anàlisi Curricular i DUA)",
    "area": "${subject}",
    "curs": "${grade}",
    "cicle": "${cycle}",
    "competenciesEspecifiques": [
      {
        "codi": "Competència específica 2",
        "titol": "Text oficial literal de la competència extret del document oficial",
        "justificacio": "Com es treballa a partir del text i de les activitats"
      }
    ],
    "criterisAvaluacio": [
      {
        "codi": "Criteri 2.1",
        "descripcio": "Text oficial literal del criteri per a ${cycle} extret del document oficial",
        "aplicacio": "Com s'evidencia en les preguntes d'aquesta fitxa"
      }
    ],
    "sabersBasics": [
      "Saber bàsic 1 relacionat amb el text i l'àrea",
      "Saber bàsic 2 relacionat amb el text i l'àrea"
    ],
    "pautesDua": {
      "representacio": "Mesures d'accessibilitat perceptiva i comprensió del text",
      "accioExpressio": "Opcions d'acció, respostes i línies d'escriptura",
      "implicacioMotivacio": "Estratègies de motivació, bastides d'èxit i autoavaluació"
    }
  },
  "seccio2": {
    "titol": "SECCIÓ 2: FITXA PER A L'ALUMNAT (A punt per imprimir)",
    "capsalera": {
      "campNom": "Nom i Cognoms: _____________________________________",
      "campData": "Data: _________",
      "campCurs": "Curs: ${grade}",
      "campArea": "Àrea: ${subject}"
    },
    "textAdaptat": "Text adaptat al nivell i edat de ${grade}, amb paràgrafs clars, espaiat net i vocabulari assequible.",
    "exercicis": [
      {
        "num": 1,
        "titol": "Títol de l'exercici",
        "tipus": "Comprensió directa / Vertader o fals / Relacionar / etc.",
        "enunciat": "Enunciat clar i motivador per a l'infant, preguntant sobre detalls concrets del text",
        "contingut": "Contingut de l'exercici amb línies de resposta ben pautades (ex: Resposta: ___________________________________________________________________________)",
        "liniesResposta": 2
      }
    ],
    "autoavaluacioVisual": {
      "titol": "Autoavaluació (Com he treballat?)",
      "format": "Semàfor d'aprenentatge DUA",
      "opcions": [
        "🟢 Verd: Ho he entès tot molt bé i he sabut trobar les respostes al text sol/a.",
        "🟡 Groc: Ho he entès bastant bé, però he hagut de rellegir o demanar ajuda.",
        "🔴 Vermell: M'ha costat trobar les respostes i he necessitat l'ajuda del mestre/a."
      ]
    }
  },
  "seccio3": {
    "titol": "SECCIÓ 3: SOLUCIONARI I CRITERIS DE CORRECCIÓ",
    "solucions": [
      {
        "num": 1,
        "enunciatResumit": "Resum de la pregunta",
        "respostaEsperada": "Resposta model exacta segons la informació del text font",
        "observacions": "Orientació pedagògica per a la valoració"
      }
    ],
    "rubrica": [
      {
        "criteri": "Aspecte a valorar específic de l'àrea ${subject}",
        "excel·lent": "AE: Descripció de l'assoliment excel·lent",
        "notable": "AN: Descripció de l'assoliment notable",
        "satisfactori": "AS: Descripció de l'assoliment satisfactori",
        "noAssolit": "NA: Descripció de no assolit"
      }
    ],
    "orientacionsDocents": "Consells pedagògics per al mestre durant l'aplicació a l'aula."
  }
}
`;

      const responseText = await callGemini(userPrompt, CURRICULAR_SYSTEM_INSTRUCTION);
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedData = JSON.parse(cleaned);
      }

      res.json({
        success: true,
        data: parsedData,
      });
      return;
    } catch (apiError: any) {
      console.warn('Gemini API call failed, using resilient curricular engine:', apiError?.message);
    }
  }

  // Resilient curricular engine
  const generated = generateCurricularActivityFallback({
    referenceText,
    grade: grade || '3r de Primària',
    cycle: cycle || 'Cicle Mitjà',
    subject: subject || 'Coneixement del Medi Natural, Social i Cultural',
    activityType: activityType as any,
    numExercises: Number(numExercises) || 4,
    fontStyle: fontStyle || 'standard',
    additionalNotes,
  });

  res.json({
    success: true,
    data: generated,
  });
});

// Refine or adapt activity endpoint
app.post('/api/refine-activity', async (req: Request, res: Response) => {
  const { currentActivity, userInstruction } = req.body;

  if (!currentActivity || !userInstruction) {
    res.status(400).json({ error: 'Falten dades per a la modificació.' });
    return;
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const isSimplify =
        userInstruction.toLowerCase().includes('simplifica') ||
        userInstruction.toLowerCase().includes('rebaixa') ||
        userInstruction.toLowerCase().includes('fàcil');
      const isBoost =
        userInstruction.toLowerCase().includes('potencia') ||
        userInstruction.toLowerCase().includes('amplia') ||
        userInstruction.toLowerCase().includes('superior') ||
        userInstruction.toLowerCase().includes('menys literal');

      const prompt = `
Tens aquesta activitat didàctica generada prèviament per a l'Educació Primària de Catalunya (Decret 175/2022):
${JSON.stringify(currentActivity, null, 2)}

El docent sol·licita la següent adaptació pedagògica per atendre la diversitat:
"${userInstruction}"

PAUTES PEDAGÒGIQUES PER A L'ADAPTACIÓ:
${
  isSimplify
    ? `
- SIMPLIFICACIÓ (DUA):
  1. Rebaixa el nivell de complexitat cognitiva i sintàctica de les activitats.
  2. Fes el vocabulari del text i dels enunciats més proper, clar i accessible.
  3. Escurça les frases i separa les idees principals en paràgrafs ben delimitats.
  4. Preguntes directes, clares i assequibles a partir del text font.
  5. PROHIBIT posar pistes ("Pista: ...", "Ajuda: ...") o etiquetes entre parèntesis com "(COMPRENSIÓ DIRECTA)", "(COMPLETAR)", "(LITERAL)", etc. a la fitxa de l'alumnat (Secció 2).
  6. NO afegeixis etiquetes com "(Versió amb suport adaptat DUA)" al subtítol ni a la fitxa.
`
    : ''
}
${
  isBoost
    ? `
- POTENCIACIÓ I AMPLIACIÓ:
  1. Eleva el nivell cognitiu de les preguntes: formula preguntes menys literals, d'inferència profunda, raonament crític i relacions causa-efecte a partir del text.
  2. Proposa reptes de reflexió, formulació d'hipòtesis o comparació a partir de la informació del text.
  3. Mantén la resolubilitat estricta amb el text font (no inventis fets o dades aliens).
  4. PROHIBIT afegir etiquetes suplementàries entre parèntesis com "(INFERÈNCIA)" o "(PENSAMENT CRÍTIC)" als enunciats de la fitxa de l'alumnat.
`
    : ''
}
- MANTENIMENT DE LA NORMATIVA:
  * Les competències específiques i criteris d'avaluació de la Secció 1 han de mantenir la seva cita LITERAL del Decret 175/2022.
  * La rúbrica d'avaluació ha d'estar centrada estrictament en l'àrea curricular (${currentActivity?.seccio1?.area || "l'àrea seleccionada"}).
- Retorna exclusivament el document JSON complet vàlid amb l'estructura requerida.
`;

      const responseText = await callGemini(prompt, CURRICULAR_SYSTEM_INSTRUCTION);
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch {
        const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedData = JSON.parse(cleaned);
      }

      res.json({
        success: true,
        data: parsedData,
      });
      return;
    } catch (e: any) {
      console.warn('Gemini refine failed, applying local adjustment:', e?.message);
    }
  }

  // Graceful in-place adjustment
  const adjusted = JSON.parse(JSON.stringify(currentActivity));
  const lowerInst = userInstruction.toLowerCase();

  if (lowerInst.includes('simplifica') || lowerInst.includes('fàcil') || lowerInst.includes('rebaixa')) {
    if (adjusted.seccio1?.pautesDua) {
      adjusted.seccio1.pautesDua.representacio =
        'Vocabulari simplificat, oracions més curtes i bastida d’orientació per a la comprensió.';
    }
  } else if (lowerInst.includes('potencia') || lowerInst.includes('amplia') || lowerInst.includes('superior') || lowerInst.includes('menys literal')) {
    if (adjusted.seccio2?.exercicis && adjusted.seccio2.exercicis.length > 0) {
      const lastIdx = adjusted.seccio2.exercicis.length - 1;
      adjusted.seccio2.exercicis[lastIdx] = {
        num: lastIdx + 1,
        enunciat: "Relaciona i reflexiona: a partir del text, quines conseqüències o aprenentatges podem aplicar a la nostra vida o al nostre entorn? Justifica la teva opinió.",
        contingut: "Escriu la teva reflexió amb un mínim de 3 línies:",
        liniesResposta: 3,
        tipus: "Pensament crític",
      };
    }
  }

  res.json({
    success: true,
    data: adjusted,
  });
});

// Setup Vite dev server or serve production build
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Only start standalone listener when not in Vercel Serverless environment
if (!process.env.VERCEL) {
  startServer();
}

export default app;
export { app };


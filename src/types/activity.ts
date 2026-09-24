export interface CompetenciaEspecífica {
  codi: string;
  titol: string;
  justificacio: string;
}

export interface CriteriAvaluacio {
  codi: string;
  descripcio: string;
  aplicacio: string;
}

export interface PautesDua {
  representacio: string;
  accioExpressio: string;
  implicacioMotivacio: string;
}

export interface Seccio1Data {
  titol: string;
  area: string;
  curs: string;
  cicle: string;
  competenciesEspecifiques: CompetenciaEspecífica[];
  criterisAvaluacio: CriteriAvaluacio[];
  sabersBasics: string[];
  pautesDua: PautesDua;
}

export interface ExerciciAlumne {
  num: number;
  titol: string;
  tipus: string;
  enunciat: string;
  contingut: string;
  liniesResposta?: number;
}

export interface AutoavaluacioVisual {
  titol: string;
  format: string;
  opcions: string[];
}

export interface Seccio2Data {
  titol: string;
  capsalera: {
    campNom: string;
    campData: string;
    campCurs: string;
    campArea: string;
  };
  textAdaptat: string;
  exercicis: ExerciciAlumne[];
  autoavaluacioVisual: AutoavaluacioVisual;
}

export interface SolucioExercici {
  num: number;
  enunciatResumit: string;
  respostaEsperada: string;
  observacions?: string;
}

export interface RubricaFila {
  criteri: string;
  excel·lent: string;
  notable: string;
  satisfactori: string;
  noAssolit: string;
}

export interface Seccio3Data {
  titol: string;
  solucions: SolucioExercici[];
  rubrica: RubricaFila[];
  orientacionsDocents: string;
}

export interface GeneratedActivityData {
  id?: string;
  createdAt?: string;
  titolActivitat: string;
  subtitol?: string;
  seccio1: Seccio1Data;
  seccio2: Seccio2Data;
  seccio3: Seccio3Data;
  fullPlainText: string;
  fontStyle?: 'standard' | 'school' | 'cursive' | 'pal';
}

export interface ActivityFormInput {
  referenceText: string;
  grade: string;
  cycle: string;
  subject: string;
  activityType: 'Comprensió' | 'Reforç' | 'Ampliació' | 'Avaluació';
  additionalNotes: string;
  numExercises: number;
  fontStyle: 'standard' | 'school' | 'cursive' | 'pal';
}

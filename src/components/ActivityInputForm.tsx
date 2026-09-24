import React, { useState, useRef } from 'react';
import {
  FileText,
  Sparkles,
  BookOpen,
  Compass,
  Calculator,
  Languages,
  Globe,
  Palette,
  HeartHandshake,
  Activity,
  Upload,
  Layers,
  Sliders,
  CheckCircle,
  HelpCircle,
  Type,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  AREAS_CURRICULARS,
  CICLES,
  TIPUS_ACTIVITATS,
  EXEMPLES_DOCENTS,
  ExempleDidactic,
} from '../data/curriculumCatalunya';
import { ActivityFormInput } from '../types/activity';

interface ActivityInputFormProps {
  onSubmit: (formData: ActivityFormInput) => void;
  isLoading: boolean;
}

export const ActivityInputForm: React.FC<ActivityInputFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [referenceText, setReferenceText] = useState('');
  const [grade, setGrade] = useState('3r de Primària');
  const [cycle, setCycle] = useState('Cicle Mitjà');
  const [subject, setSubject] = useState('Coneixement del Medi Natural, Social i Cultural');
  const [activityType, setActivityType] = useState<'Comprensió' | 'Reforç' | 'Ampliació' | 'Avaluació'>('Comprensió');
  const [numExercises, setNumExercises] = useState(4);
  const [fontStyle, setFontStyle] = useState<'standard' | 'school' | 'cursive' | 'pal'>('standard');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update cycle when grade changes
  const handleGradeChange = (newGrade: string) => {
    setGrade(newGrade);
    if (newGrade === '1r de Primària' || newGrade === '2n de Primària') {
      setCycle('Cicle Inicial');
      // If 1st grade, default font can be pal or school
      if (newGrade === '1r de Primària' && fontStyle === 'standard') {
        setFontStyle('school');
      }
    } else if (newGrade === '3r de Primària' || newGrade === '4t de Primària') {
      setCycle('Cicle Mitjà');
    } else {
      setCycle('Cicle Superior');
    }
  };

  // Load a preset example
  const handleLoadExample = (example: ExempleDidactic) => {
    setReferenceText(example.text);
    setSubject(example.area);
    handleGradeChange(example.curs);
    setActivityType(example.tipus as any);
    setAdditionalNotes(example.indicacions);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setReferenceText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceText.trim()) return;

    onSubmit({
      referenceText,
      grade,
      cycle,
      subject,
      activityType,
      additionalNotes,
      numExercises,
      fontStyle,
    });
  };

  const wordCount = referenceText.trim() ? referenceText.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Banner / Instructions */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white p-5 sm:p-7">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-100 border border-white/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Disseny Instruccional & Pedagogia Primària</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2">
            Generador d'Activitats Didàctiques A4
          </h1>
          <p className="text-indigo-100/90 text-xs sm:text-sm leading-relaxed">
            Introdueix el text font o tema de la teva sessió. L'eina analitzarà el contingut, el connectarà amb el <strong>Decret 175/2022 de Catalunya</strong>, aplicarà <strong>mesures DUA</strong> i produirà la <strong>Fitxa Tècnica</strong>, la <strong>Fitxa de l'Alumnat a punt per imprimir</strong> i el <strong>Solucionari amb rúbrica</strong>.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
              Exemples ràpids per provar en 1 clic:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {EXEMPLES_DOCENTS.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleLoadExample(ex)}
                className="text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 transition-all text-xs text-white flex flex-col justify-between"
              >
                <span className="font-semibold text-white/95 line-clamp-1">{ex.titolExemple}</span>
                <span className="text-[11px] text-indigo-200 mt-1">
                  {ex.curs} • {ex.tipus}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-7">
        {/* 1. TEXT DE REFERÈNCIA */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>1. Text o Document de referència *</span>
            </label>
            <div className="flex items-center space-x-2 text-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center space-x-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Pujar fitxer (.txt / .md)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="text-slate-400">|</span>
              <span className="text-slate-500 font-mono">{wordCount} paraules</span>
            </div>
          </div>
          <textarea
            required
            rows={6}
            value={referenceText}
            onChange={(e) => setReferenceText(e.target.value)}
            placeholder="Enganxa aquí el text de lectura, article, explicació del tema, fragment de llibre o resum que vols transformar en activitat didàctica..."
            className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400 font-normal leading-relaxed transition-all shadow-2xs"
          />
          <div className="mt-2 flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50/80 border border-emerald-200/70 rounded-lg px-3 py-1.5 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              <strong>Fidelitat al text:</strong> Els exercicis estaran estrictament cenyits al contingut d'aquest document (resolubles per lectura o inferència) i la rúbrica avaluarà l'àrea curricular triada.
            </span>
          </div>
        </div>

        {/* 2. CURS I CICLE */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="block text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>2. Curs i Cicle d'Educació Primària *</span>
            </label>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {cycle}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {[
              { val: '1r de Primària', label: '1r Primària', cicle: 'Cicle Inicial' },
              { val: '2n de Primària', label: '2n Primària', cicle: 'Cicle Inicial' },
              { val: '3r de Primària', label: '3r Primària', cicle: 'Cicle Mitjà' },
              { val: '4t de Primària', label: '4t Primària', cicle: 'Cicle Mitjà' },
              { val: '5è de Primària', label: '5è Primària', cicle: 'Cicle Superior' },
              { val: '6è de Primària', label: '6è Primària', cicle: 'Cicle Superior' },
            ].map((c) => {
              const isSelected = grade === c.val;
              return (
                <button
                  key={c.val}
                  type="button"
                  onClick={() => handleGradeChange(c.val)}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 text-slate-700 font-medium'
                  }`}
                >
                  <span className="text-sm">{c.label}</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-0.5">{c.cicle}</span>
                </button>
              );
            })}
          </div>

          {/* Context tip based on cycle */}
          <div className="mt-2.5 text-xs text-slate-600 bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex items-start space-x-2">
            <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              {cycle === 'Cicle Inicial' && (
                <span>
                  <strong>Cicle Inicial (6-8 anys):</strong> S'adaptarà el text amb frases curtes i sintaxi simple. L'alumnat tindrà suports visuals, opcions d'encerclar/unir i línies d'escriptura àmplies.
                </span>
              )}
              {cycle === 'Cicle Mitjà' && (
                <span>
                  <strong>Cicle Mitjà (8-10 anys):</strong> Treball de comprensió literal i inferencial, seqüències cronològiques, taules i preguntes per redactar respostes breus i justificades.
                </span>
              )}
              {cycle === 'Cicle Superior' && (
                <span>
                  <strong>Cicle Superior (10-12 anys):</strong> Foment del pensament crític, causes i conseqüències, argumentació, preguntes de transferència a la realitat i reflexió ètica o ambiental.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3. ÀREA CURRICULAR */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2.5 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>3. Àrea Curricular (Decret 175/2022) *</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {AREAS_CURRICULARS.map((a) => {
              const isSelected = subject === a.nom;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setSubject(a.nom)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start space-x-2.5 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {a.id === 'llengua-catalana' && <BookOpen className="w-4 h-4" />}
                    {a.id === 'medi-natural-social' && <Compass className="w-4 h-4" />}
                    {a.id === 'matematiques' && <Calculator className="w-4 h-4" />}
                    {a.id === 'llengua-castellana' && <Languages className="w-4 h-4" />}
                    {a.id === 'llengua-estrangera' && <Globe className="w-4 h-4" />}
                    {a.id === 'educacio-artistica' && <Palette className="w-4 h-4" />}
                    {a.id === 'valors-civics' && <HeartHandshake className="w-4 h-4" />}
                    {a.id === 'educacio-fisica' && <Activity className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm block leading-snug line-clamp-2">{a.nom}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. TIPUS D'ACTIVITAT */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2.5 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>4. Tipus d'activitat *</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TIPUS_ACTIVITATS.map((t) => {
              const isSelected = activityType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActivityType(t.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900 text-sm">{t.nom}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${t.colorBadge}`}
                      >
                        {t.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-2">{t.subtitol}</p>
                    <p className="text-[11px] text-slate-600 leading-normal">{t.descripcio}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <strong>Exercicis:</strong> {t.exercicisTipics}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. OPCIONS PEDAGÒGIQUES I DUA AVANÇADES */}
        <div className="pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <Type className="w-4 h-4 text-indigo-600" />
              <span>Opcions d'Accessibilitat DUA, Tipografia i Exercicis</span>
            </span>
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre d'exercicis */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nombre d'exercicis graduats a la fitxa:
                  </label>
                  <div className="flex items-center space-x-2">
                    {[3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setNumExercises(num)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
                          numExercises === num
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num} exercicis
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tipografia de la fitxa per a l'alumne */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Estil de lletra de la fitxa (per imprimir):
                  </label>
                  <select
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs bg-white text-slate-800 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                  >
                    <option value="standard">Impremta neta (Sans-serif - Cicles Mitjà i Superior)</option>
                    <option value="school">Lletra Escolar arrodonida (Comic Neue - Recomanada Primària)</option>
                    <option value="pal">Lletra de pal (MAJÚSCULES - Molt recomanada per a 1r de Primària)</option>
                    <option value="cursive">Lletra lligada / cursiva escolar (Schoolbell)</option>
                  </select>
                </div>
              </div>

              {/* Indicacions addicionals */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Indicacions pedagògiques addicionals (Opcional):
                </label>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Ex: Emfatitzar el vocabulari de ciència; afegir exercici de relacionar amb fletxes; alumne amb NESE..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white text-slate-800 placeholder:text-slate-400 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !referenceText.trim()}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base shadow-sm transition-all flex items-center justify-center space-x-2.5 ${
              isLoading || !referenceText.trim()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-md cursor-pointer active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analitzant currículum i generant activitat DUA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generar Activitat Didàctica (Decret 175/2022)</span>
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-400 mt-2">
            La resposta inclourà la Fitxa Tècnica Curricular, la Fitxa de l'Alumnat en format blanc i negre per a A4 i el Solucionari amb rúbrica docent.
          </p>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  Download,
  Edit3,
  Sparkles,
  BookOpen,
  FileText,
  Type,
  BookmarkCheck,
  Bookmark,
  Share2,
  RefreshCw,
  Send,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  FileDown,
  ExternalLink,
  Info,
} from 'lucide-react';
import { GeneratedActivityData } from '../types/activity';
import { PrintableSheet } from './PrintableSheet';
import { TeacherDossier } from './TeacherDossier';
import { DifferentiationToolbar } from './DifferentiationToolbar';
import { executePrint, downloadPrintableFile, openInNewTabForPrint } from '../utils/printManager';

interface ActivityViewerProps {
  activity: GeneratedActivityData;
  onUpdateActivity: (updated: GeneratedActivityData) => void;
  onSaveActivity: (activity: GeneratedActivityData) => void;
  isSaved: boolean;
  onBackToForm: () => void;
  onRefineWithAI: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

type TabType = 'alumne' | 'tot' | 'docent' | 'textpla';
type PrintMode = 'alumne' | 'docent' | 'tot';

export const ActivityViewer: React.FC<ActivityViewerProps> = ({
  activity,
  onUpdateActivity,
  onSaveActivity,
  isSaved,
  onBackToForm,
  onRefineWithAI,
  isRefining,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('alumne');
  const [printMode, setPrintMode] = useState<PrintMode>('alumne');
  const [fontStyle, setFontStyle] = useState<'standard' | 'school' | 'cursive' | 'pal'>('school');
  const [isEditable, setIsEditable] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [showRefineInput, setShowRefineInput] = useState(false);

  // Trigger print reliably with isolated A4 frame and fallback
  const handlePrint = (mode: PrintMode) => {
    setPrintMode(mode);
    executePrint(activity, mode, fontStyle);
  };

  const handleDownload = (mode: PrintMode) => {
    downloadPrintableFile(activity, mode, fontStyle);
  };

  // Copy helpers
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Generate plain text formatted version
  const getFullPlainText = () => {
    if (activity.fullPlainText && activity.fullPlainText.trim().length > 50) {
      return activity.fullPlainText;
    }

    // Fallback generator
    const { seccio1, seccio2, seccio3 } = activity;
    return `======================================================================
SECCIÓ 1: FITXA TÈCNICA DOCENT (Anàlisi Curricular i DUA)
======================================================================
Àrea: ${seccio1?.area || ''}
Curs: ${seccio1?.curs || ''} (${seccio1?.cicle || ''})

1. RELACIÓ AMB EL DECRET 175/2022:
- Competències Específiques:
${seccio1?.competenciesEspecifiques?.map((ce) => `  * [${ce.codi}] ${ce.titol}: ${ce.justificacio}`).join('\n') || ''}

- Criteris d'Avaluació:
${seccio1?.criterisAvaluacio?.map((ca) => `  * [${ca.codi}] ${ca.descripcio} (${ca.aplicacio})`).join('\n') || ''}

- Sabers Bàsics:
${seccio1?.sabersBasics?.map((s) => `  * ${s}`).join('\n') || ''}

2. PAUTES DUA (Disseny Universal per a l'Aprenentatge):
- Representació: ${seccio1?.pautesDua?.representacio || ''}
- Acció i expressió: ${seccio1?.pautesDua?.accioExpressio || ''}
- Implicació i motivació: ${seccio1?.pautesDua?.implicacioMotivacio || ''}

======================================================================
SECCIÓ 2: FITXA PER A L'ALUMNAT (A punt per imprimir)
======================================================================
Nom i Cognoms: _____________________________________   Data: _________
Curs: ${seccio1?.curs || ''}                              Àrea: ${seccio1?.area || ''}

Títol: ${activity.titolActivitat || ''}
${activity.subtitol ? `${activity.subtitol}\n` : ''}
----------------------------------------------------------------------
TEXT ADAPTAT:
${seccio2?.textAdaptat || ''}
----------------------------------------------------------------------
ACTIVITATS:

${seccio2?.exercicis?.map((ex, i) => `${ex.num || i + 1}. ${ex.enunciat}\n${ex.contingut || '___________________________________________________\n___________________________________________________'}`).join('\n\n') || ''}

AUTOAVALUACIÓ:
[ ] 🟢 Verd: Ho he entès molt bé i ho he sabut fer sol/a.
[ ] 🟡 Groc: Ho he entès bastant bé, però he tingut algun dubte.
[ ] 🔴 Vermell: M'ha costat una mica i he necessitat ajuda.

======================================================================
SECCIÓ 3: SOLUCIONARI I CRITERIS DE CORRECCIÓ
======================================================================
SOLUCIONS ESPERADES:
${seccio3?.solucions?.map((s, i) => `Exercici ${s.num || i + 1} (${s.enunciatResumit}):\n-> Resposta model: ${s.respostaEsperada}\n${s.observacions ? `-> Pauta: ${s.observacions}\n` : ''}`).join('\n') || ''}

RÚBRICA SIMPLIFICADA (AE / AN / AS / NA):
${seccio3?.rubrica?.map((r) => `* ${r.criteri}:\n  - AE: ${r.excel·lent}\n  - AN: ${r.notable}\n  - AS: ${r.satisfactori}\n  - NA: ${r.noAssolit}`).join('\n') || ''}

ORIENTACIONS DOCENTS:
${seccio3?.orientacionsDocents || ''}
`;
  };

  const handleDownloadTxt = () => {
    const text = getFullPlainText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Activitat-${activity.titolActivitat?.replace(/\s+/g, '_') || 'Didactica'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinePrompt.trim() || isRefining) return;
    await onRefineWithAI(refinePrompt.trim());
    setRefinePrompt('');
    setShowRefineInput(false);
  };

  return (
    <div className="space-y-6">
      {/* Top action toolbar (no-print) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs no-print flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: Back & Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToForm}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center space-x-1 text-xs font-semibold"
          >
            <span>← Crear nova</span>
          </button>
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
              {activity.titolActivitat}
            </h2>
            <p className="text-xs text-slate-500">
              {activity.seccio1?.area} • {activity.seccio1?.curs} ({activity.seccio1?.cicle})
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* AI Refine toggle button */}
          <button
            onClick={() => setShowRefineInput(!showRefineInput)}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Ajustar lliurement</span>
          </button>

          {/* Save to library */}
          <button
            onClick={() => onSaveActivity(activity)}
            className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              isSaved
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-slate-400" />}
            <span>{isSaved ? 'Desat' : 'Desar'}</span>
          </button>

          {/* Print Dropdown / Primary Print */}
          <div className="relative group">
            <button
              onClick={() => handlePrint('alumne')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-black text-white shadow-sm transition-all cursor-pointer"
              title="Obre el diàleg d'impressió directe en format A4 blanc i negre"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Fitxa (A4)</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in duration-100">
              <button
                onClick={() => openInNewTabForPrint(activity, 'alumne', fontStyle)}
                className="w-full text-left px-3.5 py-2 text-xs text-indigo-700 hover:bg-indigo-50 font-semibold flex items-center justify-between cursor-pointer"
              >
                <span>🌐 Obrir pestanya nova per imprimir</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-medium">Sense bloqueig</span>
              </button>
              <button
                onClick={() => handlePrint('alumne')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-800 hover:bg-indigo-50 hover:text-indigo-900 font-medium flex items-center justify-between cursor-pointer"
              >
                <span>🖨️ Diàleg directe d'impressió</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">A4</span>
              </button>
              <button
                onClick={() => handleDownload('alumne')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-800 hover:bg-indigo-50 hover:text-indigo-900 font-medium flex items-center justify-between cursor-pointer"
              >
                <span>📥 Descarregar Fitxa A4 (.html)</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded">Desar</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => handlePrint('docent')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
              >
                Imprimir Fitxa Tècnica + Solucionari
              </button>
              <button
                onClick={() => handlePrint('tot')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
              >
                Imprimir Dossier Complet (3 Seccions)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Differentiation & DUA Quick Adaptation Toolbar */}
      <DifferentiationToolbar
        onRefine={onRefineWithAI}
        isRefining={isRefining}
      />

      {/* AI Refine Dialog / Input Box (no-print) */}
      {showRefineInput && (
        <form
          onSubmit={handleSendRefine}
          className="bg-indigo-900 text-white rounded-2xl p-4 shadow-md no-print space-y-3 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center space-x-2 text-indigo-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ajustar l'activitat amb l'assistent curricular</span>
            </span>
            <button
              type="button"
              onClick={() => setShowRefineInput(false)}
              className="text-xs text-indigo-300 hover:text-white"
            >
              Tancar
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              placeholder="Ex: Fes el vocabulari més senzill; canvia l'exercici 2 per un vertader o fals; afegeix un dibuix..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              type="submit"
              disabled={isRefining || !refinePrompt.trim()}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shrink-0 disabled:opacity-50"
            >
              {isRefining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Aplicar</span>
            </button>
          </div>
        </form>
      )}

      {/* Tabs & View Customization (no-print) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3 no-print">
        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-slate-200/60 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('alumne')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'alumne'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fitxa Alumne (A4)
          </button>
          <button
            onClick={() => setActiveTab('tot')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tot'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Les 3 Seccions
          </button>
          <button
            onClick={() => setActiveTab('docent')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'docent'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Docent & Solucionari
          </button>
          <button
            onClick={() => setActiveTab('textpla')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'textpla'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Text Pla Net
          </button>
        </div>

        {/* Font switcher and edit toggle */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value as any)}
              className="bg-transparent font-medium text-slate-700 focus:outline-none text-xs cursor-pointer"
            >
              <option value="school">Lletra Escolar (Comic)</option>
              <option value="standard">Lletra d'Impremta (Sans)</option>
              <option value="pal">Lletra de Pal (MAJÚSCULES)</option>
              <option value="cursive">Lletra Lligada (Cursiva)</option>
            </select>
          </div>

          <button
            onClick={() => setIsEditable(!isEditable)}
            className={`px-2.5 py-1 rounded-xl border text-xs font-semibold transition-colors flex items-center space-x-1 ${
              isEditable
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Activa per poder retocar o personalitzar el text i preguntes abans d'imprimir"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditable ? 'Editant' : 'Editar text'}</span>
          </button>
        </div>
      </div>

      {/* VIEWPORT PRESENTATION (no-print) */}
      <div className="no-print space-y-6">
        {/* 1. FITXA PER A L'ALUMNAT ONLY */}
        {activeTab === 'alumne' && (
          <div className="space-y-4">
            {/* BARRA D'IMPRESSIÓ DEDICADA PER A LA FITXA DE L'ALUMNAT */}
            <div className="bg-white border-2 border-indigo-100 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700">
                    <Printer className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Fitxa per a l'Alumnat (A4 blanc i negre)
                  </h3>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    A punt per imprimir
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Format net i oficial sense pistes ni etiquetes, llest per a impressió o fotocopiadora.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Botó principal d'impressió directe */}
                <button
                  onClick={() => handlePrint('alumne')}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
                  title="Imprimeix o obre la fitxa fora del marc"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir fitxa</span>
                </button>

                {/* Obrir en pestanya nova */}
                <button
                  onClick={() => openInNewTabForPrint(activity, 'alumne', fontStyle)}
                  className="px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Obre la fitxa en una pestanya neta del navegador fora del marc per imprimir a l'instant"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Obrir en pestanya nova</span>
                </button>

                {/* Descarregar fitxer A4 autònom */}
                <button
                  onClick={() => handleDownload('alumne')}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Descarrega el document A4 al teu ordinador per guardar o imprimir"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Descarregar HTML A4</span>
                </button>

                {/* Tipografia */}
                <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
                  <Type className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value as any)}
                    className="bg-transparent font-medium text-slate-700 focus:outline-none text-xs cursor-pointer"
                  >
                    <option value="school">Lletra Escolar</option>
                    <option value="standard">Lletra d'Impremta</option>
                    <option value="pal">Lletra de Pal</option>
                    <option value="cursive">Lletra Lligada</option>
                  </select>
                </div>

                {/* Edició */}
                <button
                  onClick={() => setIsEditable(!isEditable)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors flex items-center space-x-1 ${
                    isEditable
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Activa per poder retocar el text i preguntes abans d'imprimir"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditable ? 'Editant' : 'Editar text'}</span>
                </button>

                {/* Copiar text */}
                <button
                  onClick={() => handleCopy(activity.seccio2?.textAdaptat || '', 'textAdaptat')}
                  className="p-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 text-xs transition-colors"
                  title="Copiar el text adaptat"
                >
                  {copiedKey === 'textAdaptat' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* AVÍS I SOLUCIÓ PER A LA IMPRESSIÓ EN PREVIEW */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3 text-xs text-amber-900 flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Com imprimir des de la previsualització (Preview):</strong> Com que l'entorn de prova s'executa dins d'un marc protegit (<em>iframe</em>), el navegador pot bloquejar el diàleg d'impressió directe.
                Per imprimir sense cap problema, fes clic a <strong>«Obrir en pestanya nova»</strong> (s'obre directament fora del marc per prémer <kbd className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-mono text-[11px]">Ctrl+P</kbd>) o bé a <strong>«Descarregar HTML A4»</strong> per desar el fitxer al teu ordinador o enviar-lo a la impressora.
              </div>
            </div>

            <PrintableSheet
              activity={activity}
              fontStyle={fontStyle}
              isEditable={isEditable}
              onUpdateActivity={onUpdateActivity}
            />
          </div>
        )}

        {/* 2. TOTES LES 3 SECCIONS */}
        {activeTab === 'tot' && (
          <div className="space-y-8">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-900 flex items-center justify-between">
              <span>
                📚 <strong>Dossier Pedagògic Complet:</strong> Inclou l'anàlisi curricular del Decret 175/2022, les mesures DUA, la fitxa de treball de l'estudiant i el solucionari amb rúbrica per al mestre.
              </span>
              <button
                onClick={() => handleCopy(getFullPlainText(), 'tot')}
                className="px-2.5 py-1 bg-white hover:bg-indigo-100 rounded-lg text-indigo-950 font-bold border border-indigo-300 transition-colors flex items-center space-x-1 text-xs shrink-0 ml-3"
              >
                {copiedKey === 'tot' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'tot' ? 'Copiat!' : 'Copiar tot'}</span>
              </button>
            </div>

            {/* Section 1 */}
            <TeacherDossier activity={activity} />

            {/* Section 2 */}
            <div className="pt-6 border-t-2 border-slate-300">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  SECCIÓ 2 • FITXA PER A L'ALUMNAT
                </span>
                <button
                  onClick={() => handlePrint('alumne')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir aquesta fitxa</span>
                </button>
              </div>
              <PrintableSheet
                activity={activity}
                fontStyle={fontStyle}
                isEditable={isEditable}
                onUpdateActivity={onUpdateActivity}
              />
            </div>
          </div>
        )}

        {/* 3. DOCENT & SOLUCIONARI */}
        {activeTab === 'docent' && (
          <div className="space-y-4">
            <TeacherDossier activity={activity} />
          </div>
        )}

        {/* 4. TEXT PLA NET */}
        {activeTab === 'textpla' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Format Text Pla Net (Llesta per copiar a Word o Google Docs)
                </h3>
                <p className="text-xs text-slate-500">
                  Text net amb les 3 seccions ben delimitades i línies d'escriptura.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownloadTxt}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descarregar .txt</span>
                </button>
                <button
                  onClick={() => handleCopy(getFullPlainText(), 'fullText')}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
                >
                  {copiedKey === 'fullText' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'fullText' ? 'Copiat!' : 'Copiar tot el text'}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[70vh] border border-slate-800">
              {getFullPlainText()}
            </pre>
          </div>
        )}
      </div>

      {/* PRINT-ONLY CONTAINER (Shown exclusively during window.print()) */}
      <div className="print-only">
        {printMode === 'alumne' && (
          <PrintableSheet
            activity={activity}
            fontStyle={fontStyle}
            isEditable={false}
          />
        )}

        {printMode === 'docent' && (
          <TeacherDossier activity={activity} />
        )}

        {printMode === 'tot' && (
          <div className="space-y-8">
            <TeacherDossier activity={activity} />
            <div className="print-page-break" />
            <PrintableSheet
              activity={activity}
              fontStyle={fontStyle}
              isEditable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

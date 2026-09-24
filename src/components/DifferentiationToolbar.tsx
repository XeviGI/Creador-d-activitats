import React, { useState } from 'react';
import {
  Sparkles,
  ArrowDownCircle,
  ArrowUpCircle,
  BookOpen,
  CheckSquare,
  HelpCircle,
  ListPlus,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Edit2,
  Wand2,
} from 'lucide-react';

interface DifferentiationToolbarProps {
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export const DifferentiationToolbar: React.FC<DifferentiationToolbarProps> = ({
  onRefine,
  isRefining,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleQuickAction = async (instruction: string) => {
    if (isRefining) return;
    setIsDropdownOpen(false);
    setShowCustomInput(false);
    await onRefine(instruction);
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim() || isRefining) return;
    await onRefine(customPrompt.trim());
    setCustomPrompt('');
    setShowCustomInput(false);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-indigo-800/80 no-print">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-indigo-800/60">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-amber-300 border border-indigo-400/30">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Atenció a la Diversitat (Pautes DUA)</span>
              <span className="text-[10px] font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                1 Clic
              </span>
            </h3>
            <p className="text-xs text-indigo-200/80">
              Adapta el nivell de complexitat i el format de la fitxa per respondre als diferents ritmes d'aprenentatge.
            </p>
          </div>
        </div>

        {/* Loading Indicator */}
        {isRefining && (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-500/30 border border-indigo-400/40 text-amber-300 text-xs font-semibold animate-pulse self-start sm:self-auto">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Adaptant pedagògicament...</span>
          </div>
        )}
      </div>

      {/* Buttons & Actions */}
      <div className="pt-3.5 flex flex-wrap items-center gap-2.5">
        {/* 1. Simplificar Fitxa */}
        <button
          onClick={() =>
            handleQuickAction(
              "Simplifica aquesta fitxa per atendre la diversitat: rebaixa el nivell de dificultat de les activitats, fes servir un vocabulari més senzill i proper a l'alumnat, utilitza frases més curtes i directes, i afegeix bastides de suport com ara un banc de paraules o pistes d'ajuda, mantenint la fidelitat estricta al text de referència."
            )
          }
          disabled={isRefining}
          className="group relative flex-1 min-w-[200px] flex items-center justify-between p-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/60 hover:border-emerald-500 transition-all text-left disabled:opacity-50 cursor-pointer shadow-sm"
          title="Rebaixa el nivell i simplifica el vocabulari"
        >
          <div className="flex items-start space-x-2.5">
            <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-300 mt-0.5">
              <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-100 flex items-center space-x-1.5">
                <span>Simplificar fitxa</span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded font-mono">
                  Reforç
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 line-clamp-1">
                Rebaixa dificultat, vocabulari planer i bastides DUA
              </p>
            </div>
          </div>
        </button>

        {/* 2. Potenciar Fitxa (Ampliació) */}
        <button
          onClick={() =>
            handleQuickAction(
              "Potencia aquesta fitxa per a un nivell superior o d'ampliació: formula preguntes menys literals, que exigeixin inferències profundes a partir del text, interpretació, relacions causa-efecte i pensament crític de major complexitat cognitiva, sense inventar fets aliens al text de referència."
            )
          }
          disabled={isRefining}
          className="group relative flex-1 min-w-[200px] flex items-center justify-between p-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-600/60 hover:border-purple-500 transition-all text-left disabled:opacity-50 cursor-pointer shadow-sm"
          title="Preguntes menys literals i de nivell superior"
        >
          <div className="flex items-start space-x-2.5">
            <div className="p-1 rounded-lg bg-purple-500/20 text-purple-300 mt-0.5">
              <ArrowUpCircle className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-purple-100 flex items-center space-x-1.5">
                <span>Potenciar fitxa</span>
                <span className="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.2 rounded font-mono">
                  Ampliació
                </span>
              </div>
              <p className="text-[11px] text-purple-300/80 line-clamp-1">
                Preguntes menys literals, inferències i pensament crític
              </p>
            </div>
          </div>
        </button>

        {/* 3. Desplegable DUA amb més opcions */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={isRefining}
            className="h-full px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-white flex items-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-300" />
            <span>Més opcions DUA</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-indigo-700/80 rounded-xl shadow-xl p-1.5 z-40 space-y-1 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                Mesures d'Accessibilitat DUA
              </div>

              <button
                onClick={() =>
                  handleQuickAction(
                    "Adapta el text a format de Lectura Fàcil: utilitza frases molt curtes, vocabulari completament accessible, estructura visual en paràgrafs independents i exercicis amb suport directe."
                  )
                }
                className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-indigo-950/80 text-slate-200 hover:text-white flex items-center space-x-2.5 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <div className="font-semibold">Versió Lectura Fàcil</div>
                  <div className="text-[10px] text-slate-400">Frases curtes i estructura visual espaiada</div>
                </div>
              </button>

              <button
                onClick={() =>
                  handleQuickAction(
                    "Canvia els exercicis oberts per un format més guiat: combina Vertader/Fals justificat, ordenar seqüències i elecció d'opcions múltiples, per facilitar la resolució a l'alumnat amb dificultats en l'escriptura."
                  )
                }
                className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-indigo-950/80 text-slate-200 hover:text-white flex items-center space-x-2.5 transition-colors"
              >
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold">Format Vertader/Fals & Opcions</div>
                  <div className="text-[10px] text-slate-400">Minimitza l'escriptura llarga manual</div>
                </div>
              </button>

              <button
                onClick={() =>
                  handleQuickAction(
                    "Afegeix a la fitxa de l'alumnat un 'Banc de Paraules Clau' amb suport lèxic del text per ajudar l'alumnat a completar les respostes amb autonomia."
                  )
                }
                className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-indigo-950/80 text-slate-200 hover:text-white flex items-center space-x-2.5 transition-colors"
              >
                <ListPlus className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-semibold">Afegir Banc de Paraules</div>
                  <div className="text-[10px] text-slate-400">Bastida lèxica de suport visual</div>
                </div>
              </button>

              <button
                onClick={() =>
                  handleQuickAction(
                    "Afegeix una pregunta de transferència i pensament creatiu: demana a l'alumnat que apliqui el contingut del text a una situació quotidiana o que imagini una solució a un problema relacionat."
                  )
                }
                className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-indigo-950/80 text-slate-200 hover:text-white flex items-center space-x-2.5 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <div className="font-semibold">Pregunta de Transferència & Vida Real</div>
                  <div className="text-[10px] text-slate-400">Connexió competencial amb el món real</div>
                </div>
              </button>

              <div className="border-t border-indigo-800/60 my-1" />

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  setShowCustomInput(true);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-indigo-950/80 text-amber-300 font-semibold flex items-center space-x-2 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Escriure instrucció pròpia...</span>
              </button>
            </div>
          )}
        </div>

        {/* 4. Botó personalitzat */}
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          disabled={isRefining}
          className="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-medium text-indigo-200 hover:text-white flex items-center space-x-1.5 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Wand2 className="w-3.5 h-3.5 text-indigo-300" />
          <span>Ajust lliure</span>
        </button>
      </div>

      {/* Custom Input Box if open */}
      {showCustomInput && (
        <form
          onSubmit={handleCustomSubmit}
          className="mt-3.5 pt-3.5 border-t border-indigo-800/60 flex flex-col sm:flex-row gap-2 animate-in fade-in duration-100"
        >
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ex: Fes que l'exercici 3 sigui un dibuix explicat; afegeix 2 preguntes d'inferència..."
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-indigo-200/50 focus:outline-none focus:ring-2 focus:ring-amber-300"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isRefining || !customPrompt.trim()}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shrink-0 disabled:opacity-50"
            >
              {isRefining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Aplicar adaptació</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCustomInput(false)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-xs rounded-xl transition-colors text-slate-300"
            >
              Cancel·lar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

import React from 'react';
import { X, BookCheck, ShieldAlert, Award, FileSpreadsheet, Eye, Sparkles } from 'lucide-react';
import { CICLES } from '../data/curriculumCatalunya';

interface CurriculumGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumGuideModal: React.FC<CurriculumGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80 rounded-t-2xl">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Guia Pedagògica: Decret 175/2022 i DUA
              </h2>
              <p className="text-xs text-slate-500">
                Departament d'Educació de la Generalitat de Catalunya
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Decret 175/2022 Overview */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4">
            <h3 className="font-bold text-indigo-950 flex items-center space-x-2 text-base mb-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>Què és el Decret 175/2022?</span>
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm">
              El <strong>Decret 175/2022, de 27 de setembre</strong>, estableix l'ordenació dels ensenyaments de l'educació bàsica a Catalunya. Substitueix els models basats únicament en continguts teòrics per un <strong>enfocament competencial holístic</strong>, on l'alumnat aprèn a resoldre situacions del món real mobilitzant coneixements, destreses i actituds.
            </p>
          </div>

          {/* Els Cicles a Primària */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
              <span>Estructura de Cicles i Graduació Pedagògica</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.values(CICLES).map((cicle) => (
                <div key={cicle.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-white border border-slate-300 text-slate-800 mb-1.5">
                      {cicle.nom}
                    </span>
                    <p className="text-xs font-semibold text-slate-600 mb-2">
                      {cicle.cursos.join(' i ')} ({cicle.edat})
                    </p>
                    <p className="text-xs text-slate-600 leading-normal">
                      {cicle.orientacioPedagogica}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DUA Principles */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>Pautes DUA (Disseny Universal per a l'Aprenentatge - CAST)</span>
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <span className="font-bold text-emerald-900 block text-xs mb-1">
                  1. Múltiples formes de representació (El "què" de l'aprenentatge)
                </span>
                <p className="text-xs text-slate-700">
                  Adaptació de la llargada del text, vocabulari de suport explicat, enunciats directes, icones visuals i contrast net per facilitar la descodificació lectora.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/50">
                <span className="font-bold text-blue-900 block text-xs mb-1">
                  2. Múltiples formes d'acció i expressió (El "com" de l'aprenentatge)
                </span>
                <p className="text-xs text-slate-700">
                  Exercicis graduats que permeten diferents canals de resposta: relacionar amb fletxes, encerclar, omplir buits amb banc de paraules i línies d'escriptura àmplies.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50">
                <span className="font-bold text-amber-900 block text-xs mb-1">
                  3. Múltiples formes de motivació i implicació (El "per què" de l'aprenentatge)
                </span>
                <p className="text-xs text-slate-700">
                  Contextualització en temes d'interès, preguntes assequibles que generen èxit i una secció final d'autoavaluació visual (semàfor) que desenvolupa l'autoregulació de l'infant.
                </p>
              </div>
            </div>
          </div>

          {/* Avaluació Formativa */}
          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600">
            <span className="font-bold text-slate-800 block mb-1">
              Escala de qualificació de l'Educació Primària (Catalunya):
            </span>
            <ul className="list-disc list-inside space-y-0.5 ml-1">
              <li><strong>AE (Assolit Excel·lent):</strong> Mostra un domini complet i autònom de la competència.</li>
              <li><strong>AN (Assolit Notablement):</strong> Domini sòlid amb resolució satisfactòria.</li>
              <li><strong>AS (Assolit Satisfactòriament):</strong> Aconsegueix els criteris bàsics de la competència.</li>
              <li><strong>NA (No Assolit):</strong> Requereix suport addicional o adaptació curricular per assolir la competència.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/80 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            D'acord, torna a l'aplicació
          </button>
        </div>
      </div>
    </div>
  );
};

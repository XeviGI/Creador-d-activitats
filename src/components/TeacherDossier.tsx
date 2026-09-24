import React from 'react';
import {
  Award,
  CheckCircle2,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileCheck,
  Eye,
  Sliders,
  Scale,
  Lightbulb,
} from 'lucide-react';
import { GeneratedActivityData } from '../types/activity';

interface TeacherDossierProps {
  activity: GeneratedActivityData;
}

export const TeacherDossier: React.FC<TeacherDossierProps> = ({ activity }) => {
  const { seccio1, seccio3 } = activity;

  return (
    <div className="space-y-8">
      {/* SECCIÓ 1: FITXA TÈCNICA DOCENT (ANÀLISI CURRICULAR I DUA) */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block mb-1">
              SECCIÓ 1 • PERFIL COMPETENCIAL I ATENCIÓ A LA DIVERSITAT
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Fitxa Tècnica Docent (Decret 175/2022 & DUA)</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 font-medium">
              {seccio1?.area}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-400/30">
              {seccio1?.curs} ({seccio1?.cicle})
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Competències Específiques */}
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>1. Competències Específiques Mobilitzades (Decret 175/2022)</span>
              </h3>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Redactat oficial literal
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3.5">
              {seccio1?.competenciesEspecifiques?.map((ce, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-indigo-600 text-white shrink-0">
                      {ce.codi}
                    </span>
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                      Text Literal Oficial
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed pl-1 border-l-2 border-indigo-400">
                    «{ce.titol}»
                  </p>
                  {ce.justificacio && (
                    <div className="text-xs text-slate-600 bg-white/70 p-2.5 rounded-lg border border-indigo-100/60 mt-2">
                      <span className="font-bold text-indigo-950 block text-[11px] mb-0.5">
                        Vinculació amb el text i les activitats:
                      </span>
                      <span>{ce.justificacio}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Criteris d'Avaluació */}
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>2. Criteris d'Avaluació de Cicle ({seccio1?.cicle})</span>
              </h3>
              <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                Criteris de cicle literals
              </span>
            </div>
            <div className="space-y-3">
              {seccio1?.criterisAvaluacio?.map((ca, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-md shrink-0">
                      {ca.codi}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Descripció literal de cicle
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed pl-1 border-l-2 border-blue-400">
                    {ca.descripcio}
                  </p>
                  {ca.aplicacio && (
                    <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-slate-200/80 mt-1">
                      <span className="font-bold text-slate-700 block text-[11px] mb-0.5">
                        Aplicació a l'activitat:
                      </span>
                      <span>{ca.aplicacio}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sabers Bàsics */}
          {seccio1?.sabersBasics && seccio1.sabersBasics.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>3. Sabers Bàsics Connectats</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {seccio1.sabersBasics.map((saber, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                  >
                    • {saber}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pautes DUA (Disseny Universal per a l'Aprenentatge) */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>4. Pautes DUA Aplicades (Accessibilitat i Inclusió)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <span className="text-xs font-bold text-emerald-900 block mb-1">
                  Múltiples formes de representació
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {seccio1?.pautesDua?.representacio || 'Format adaptat, suport de vocabulari i lectura assequible.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
                <span className="text-xs font-bold text-blue-900 block mb-1">
                  Múltiples formes d'acció i expressió
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {seccio1?.pautesDua?.accioExpressio || 'Diversitat de tasques (encerclar, relacionar, línies amples).'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  Múltiples formes de motivació
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {seccio1?.pautesDua?.implicacioMotivacio || 'Format visual, context d\'èxit i autoavaluació formativa.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓ 3: SOLUCIONARI I CRITERIS DE CORRECCIÓ */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block mb-1">
              SECCIÓ 3 • AVALUACIÓ FORMATIVA I RETROACCIÓ
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <span>Solucionari i Criteris de Correcció</span>
            </h2>
          </div>
          <span className="text-xs text-slate-300">
            Escala oficial: AE • AN • AS • NA
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Respostes esperades */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Respostes Model Esperades</span>
            </h3>
            <div className="space-y-3">
              {seccio3?.solucions?.map((sol, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60"
                >
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-emerald-600 text-white">
                      Exercici {sol.num || idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {sol.enunciatResumit}
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 mt-2 font-medium leading-relaxed">
                    <strong>Resposta model: </strong>
                    <span>{sol.respostaEsperada}</span>
                  </div>
                  {sol.observacions && (
                    <p className="text-[11px] text-slate-500 italic mt-1.5">
                      Pauta: {sol.observacions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rúbrica Simplificada */}
          {seccio3?.rubrica && seccio3.rubrica.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  <span>Rúbrica d'Avaluació Específica de l'Àrea</span>
                </h3>
                {seccio1?.area && (
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <span>Àrea avaluada:</span>
                    <span className="text-indigo-900 font-extrabold">{seccio1.area}</span>
                  </span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-slate-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <th className="p-2.5">Criteri / Aspecte de l'Àrea</th>
                      <th className="p-2.5 bg-emerald-50 text-emerald-900">AE (Excel·lent)</th>
                      <th className="p-2.5 bg-blue-50 text-blue-900">AN (Notable)</th>
                      <th className="p-2.5 bg-amber-50 text-amber-900">AS (Satisfactori)</th>
                      <th className="p-2.5 bg-rose-50 text-rose-900">NA (No Assolit)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {seccio3.rubrica.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/70">
                        <td className="p-2.5 font-bold text-slate-900 align-top">
                          {row.criteri}
                        </td>
                        <td className="p-2.5 align-top bg-emerald-50/20">{row.excel·lent}</td>
                        <td className="p-2.5 align-top bg-blue-50/20">{row.notable}</td>
                        <td className="p-2.5 align-top bg-amber-50/20">{row.satisfactori}</td>
                        <td className="p-2.5 align-top bg-rose-50/20">{row.noAssolit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orientacions Docents */}
          {seccio3?.orientacionsDocents && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-amber-900 block mb-0.5">
                  Orientacions Metodològiques per a l'Aula
                </span>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {seccio3.orientacionsDocents}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

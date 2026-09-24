import React from 'react';
import { GeneratedActivityData } from '../types/activity';
import { cleanStudentExerciseText, cleanStudentWorksheetTitle } from '../utils/studentTextCleaner';

interface PrintableSheetProps {
  activity: GeneratedActivityData;
  fontStyle?: 'standard' | 'school' | 'cursive' | 'pal';
  isEditable?: boolean;
  onUpdateActivity?: (updated: GeneratedActivityData) => void;
  showTeacherHeader?: boolean;
}

export const PrintableSheet: React.FC<PrintableSheetProps> = ({
  activity,
  fontStyle = 'standard',
  isEditable = false,
  onUpdateActivity,
}) => {
  const { seccio2 } = activity;

  const getFontClass = () => {
    switch (fontStyle) {
      case 'school':
        return 'font-school';
      case 'cursive':
        return 'font-cursive';
      case 'pal':
        return 'font-pal';
      default:
        return 'font-sans';
    }
  };

  const handleTextChange = (field: 'textAdaptat', value: string) => {
    if (!onUpdateActivity) return;
    onUpdateActivity({
      ...activity,
      seccio2: {
        ...activity.seccio2,
        [field]: value,
      },
    });
  };

  const handleExerciseChange = (index: number, field: string, value: string) => {
    if (!onUpdateActivity) return;
    const updatedExercises = [...activity.seccio2.exercicis];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };
    onUpdateActivity({
      ...activity,
      seccio2: {
        ...activity.seccio2,
        exercicis: updatedExercises,
      },
    });
  };

  return (
    <div
      className={`print-container bg-white text-black p-6 sm:p-10 max-w-4xl mx-auto border border-slate-300 rounded-xl shadow-xs print:border-none print:shadow-none print:p-0 ${getFontClass()}`}
    >
      {/* CAPÇALERA D'IMPRESSIÓ NETA PER A L'ALUMNAT */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium gap-2 sm:gap-4">
          <div className="flex-1">
            <span>Nom i Cognoms: </span>
            <span className="inline-block border-b border-black w-44 sm:w-64"></span>
          </div>
          <div>
            <span>Data: </span>
            <span className="inline-block border-b border-black w-24 sm:w-28"></span>
          </div>
          <div>
            <span>Curs: </span>
            <span className="inline-block border-b border-black w-16 sm:w-20"></span>
          </div>
        </div>

        {/* Títol net de l'activitat per a l'alumnat */}
        <div className="text-center mt-5">
          <h1 className="text-lg sm:text-2xl font-black tracking-tight uppercase">
            {cleanStudentWorksheetTitle(activity.titolActivitat || 'ACTIVITAT DE TREBALL')}
          </h1>
        </div>
      </div>

      {/* TEXT O MATERIAL ADAPTAT */}
      {seccio2?.textAdaptat && (
        <div className="mb-6 border-l-4 border-black pl-4 py-2 bg-slate-50/50 print:bg-transparent">
          <span className="text-[11px] font-bold uppercase tracking-wider block text-slate-600 print:text-black mb-1.5">
            Llegeix amb atenció el text següent:
          </span>
          {isEditable ? (
            <textarea
              rows={5}
              value={seccio2.textAdaptat}
              onChange={(e) => handleTextChange('textAdaptat', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded text-sm text-black"
            />
          ) : (
            <div className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-black">
              {seccio2.textAdaptat}
            </div>
          )}
        </div>
      )}

      {/* ACTIVITATS GRADUADES */}
      <div className="space-y-6">
        {seccio2?.exercicis?.map((ex, index) => {
          const rawEnunciat = ex.enunciat || '';
          const cleanedEnunciat = cleanStudentExerciseText(rawEnunciat);
          const rawContingut = ex.contingut || '';
          const cleanedContingut = cleanStudentExerciseText(rawContingut);

          return (
            <div key={index} className="avoid-break pt-2">
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-sm sm:text-base">{ex.num || index + 1}.</span>
                <div className="flex-1">
                  {isEditable ? (
                    <input
                      type="text"
                      value={ex.enunciat}
                      onChange={(e) => handleExerciseChange(index, 'enunciat', e.target.value)}
                      className="w-full p-1.5 border border-slate-300 rounded text-sm font-semibold"
                    />
                  ) : (
                    <span className="font-bold text-sm sm:text-base text-black">
                      {cleanedEnunciat}
                    </span>
                  )}
                </div>
              </div>

              {/* Exercici contingut (preguntes, opcions o buits) */}
              {cleanedContingut && (
                <div className="mt-2.5 pl-5 sm:pl-6 text-sm text-black whitespace-pre-line leading-loose">
                  {cleanedContingut}
                </div>
              )}

              {/* Línies pautades d'escriptura per facilitar la resposta manual si cal */}
              {(!cleanedContingut || !cleanedContingut.includes('______')) && (
                <div className="mt-3 pl-5 sm:pl-6 space-y-3">
                  {Array.from({ length: ex.liniesResposta || 2 }).map((_, lineIdx) => (
                    <div
                      key={lineIdx}
                      className="border-b border-black/80 w-full h-4"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AUTOAVALUACIÓ VISUAL DE L'ALUMNAT (DUA) */}
      {seccio2?.autoavaluacioVisual && (
        <div className="avoid-break mt-8 pt-4 border-t-2 border-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              {seccio2.autoavaluacioVisual.titol || 'Autoavaluació: Com he treballat avui?'}
            </span>
            <span className="text-[11px] text-slate-600 print:text-black italic">
              Encercla la teva resposta
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {seccio2.autoavaluacioVisual.opcions?.map((opt, oIdx) => (
              <div
                key={oIdx}
                className="p-2 border border-black rounded-lg flex items-center space-x-2 bg-white"
              >
                <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center shrink-0">
                  <span className="text-[10px]">{oIdx === 0 ? '🟢' : oIdx === 1 ? '🟡' : '🔴'}</span>
                </div>
                <span className="text-[11px] text-black leading-tight">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER INFORMAL AMB CRÈDITS */}
      <div className="mt-8 pt-2 text-[10px] text-slate-400 print:text-black flex justify-between border-t border-slate-200 print:border-black/30">
        <span>DidactiCat • Currículum Educació Primària de Catalunya (Decret 175/2022)</span>
        <span>Pàgina 1 de 1</span>
      </div>
    </div>
  );
};

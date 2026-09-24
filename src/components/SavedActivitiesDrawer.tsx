import React from 'react';
import { X, Trash2, Calendar, BookOpen, Printer, ArrowRight, FileCheck } from 'lucide-react';
import { GeneratedActivityData } from '../types/activity';

interface SavedActivitiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedActivities: GeneratedActivityData[];
  onSelectActivity: (activity: GeneratedActivityData) => void;
  onDeleteActivity: (id: string, e: React.MouseEvent) => void;
}

export const SavedActivitiesDrawer: React.FC<SavedActivitiesDrawerProps> = ({
  isOpen,
  onClose,
  savedActivities,
  onSelectActivity,
  onDeleteActivity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Historial de Fitxes</h2>
              <p className="text-xs text-slate-500">Materials desats al teu navegador</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedActivities.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <BookOpen className="w-12 h-12 mb-3 stroke-1 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No tens fitxes desades</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Quan generis una activitat curricular, prem "Desar als meus materials" per guardar-la aquí.
              </p>
            </div>
          ) : (
            savedActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => {
                  onSelectActivity(act);
                  onClose();
                }}
                className="group relative p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all bg-white cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {act.titolActivitat || 'Sense títol'}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (act.id) onDeleteActivity(act.id, e);
                    }}
                    className="p-1 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    title="Eliminar fitxa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {act.seccio1?.area} • {act.seccio1?.curs} ({act.seccio1?.cicle})
                </p>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{act.createdAt ? new Date(act.createdAt).toLocaleDateString('ca-ES') : 'Recent'}</span>
                  </span>
                  <span className="flex items-center space-x-0.5 text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Obrir</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

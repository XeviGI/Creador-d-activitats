import React from 'react';
import { BookOpen, Sparkles, FolderArchive, HelpCircle, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onOpenHistory: () => void;
  onOpenCurriculumGuide: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  onOpenCurriculumGuide,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">DidactiCat</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Decret 175/2022
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  DUA
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Generador d'activitats didàctiques per a Primària • Catalunya
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenCurriculumGuide}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              title="Guia sobre el Decret 175/2022 i Pautes DUA"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              <span className="hidden sm:inline">Guia Curricular & DUA</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <FolderArchive className="w-4 h-4 text-slate-500" />
              <span>Historial</span>
              {savedCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold bg-indigo-600 text-white rounded-full min-w-4 h-4">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

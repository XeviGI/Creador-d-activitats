import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ActivityInputForm } from './components/ActivityInputForm';
import { ActivityViewer } from './components/ActivityViewer';
import { SavedActivitiesDrawer } from './components/SavedActivitiesDrawer';
import { CurriculumGuideModal } from './components/CurriculumGuideModal';
import { ActivityFormInput, GeneratedActivityData } from './types/activity';
import { Sparkles, AlertCircle, CheckCircle2, BookOpen, GraduationCap } from 'lucide-react';

const STORAGE_KEY = 'didacticat_saved_activities_v1';

export default function App() {
  const [currentActivity, setCurrentActivity] = useState<GeneratedActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedActivities, setSavedActivities] = useState<GeneratedActivityData[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Load saved activities from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedActivities(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved activities:', e);
    }
  }, []);

  // Save activities to localStorage
  const saveToLocalStorage = (activities: GeneratedActivityData[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
      setSavedActivities(activities);
    } catch (e) {
      console.error('Failed to persist activities:', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Generate Activity
  const handleGenerateActivity = async (formData: ActivityFormInput) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error en la generació de l\'activitat didàctica.');
      }

      const newActivity: GeneratedActivityData = {
        ...data.data,
        id: `act_${Date.now()}`,
        createdAt: new Date().toISOString(),
        fontStyle: formData.fontStyle,
      };

      setCurrentActivity(newActivity);
      showToast('Activitat curricular generada amb èxit!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error in handleGenerateActivity:', err);
      setErrorMessage(
        err.message || 'No s\'ha pogut connectar amb el servidor. Si us plau, revisa la configuració.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Refine Activity with AI
  const handleRefineWithAI = async (instruction: string) => {
    if (!currentActivity) return;
    setIsRefining(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/refine-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentActivity,
          userInstruction: instruction,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error en modificar l\'activitat.');
      }

      const updatedActivity: GeneratedActivityData = {
        ...data.data,
        id: currentActivity.id,
        createdAt: currentActivity.createdAt,
        fontStyle: currentActivity.fontStyle,
      };

      setCurrentActivity(updatedActivity);
      showToast('Activitat actualitzada amb les noves indicacions!');
    } catch (err: any) {
      console.error('Error refining activity:', err);
      showToast(err.message || 'Error en modificar l\'activitat.');
    } finally {
      setIsRefining(false);
    }
  };

  // Save current activity
  const handleSaveActivity = (activity: GeneratedActivityData) => {
    const exists = savedActivities.find((a) => a.id === activity.id);
    let updated: GeneratedActivityData[];

    if (exists) {
      updated = savedActivities.map((a) => (a.id === activity.id ? activity : a));
      showToast('Fitxa actualitzada al teu historial!');
    } else {
      updated = [activity, ...savedActivities];
      showToast('Fitxa desada correctament als teus materials!');
    }

    saveToLocalStorage(updated);
  };

  // Delete saved activity
  const handleDeleteActivity = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedActivities.filter((a) => a.id !== id);
    saveToLocalStorage(updated);
    showToast('Fitxa eliminada de l\'historial.');
  };

  const isCurrentSaved = Boolean(
    currentActivity?.id && savedActivities.some((a) => a.id === currentActivity.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenCurriculumGuide={() => setIsGuideOpen(true)}
        savedCount={savedActivities.length}
      />

      {/* Error Alert */}
      {errorMessage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 w-full no-print">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">S'ha produït un error</h4>
                <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold text-rose-600 hover:text-rose-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {currentActivity ? (
          <ActivityViewer
            activity={currentActivity}
            onUpdateActivity={setCurrentActivity}
            onSaveActivity={handleSaveActivity}
            isSaved={isCurrentSaved}
            onBackToForm={() => setCurrentActivity(null)}
            onRefineWithAI={handleRefineWithAI}
            isRefining={isRefining}
          />
        ) : (
          <ActivityInputForm
            onSubmit={handleGenerateActivity}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">DidactiCat</span>
            <span>— Assistent de Pedagogia i Disseny Curricular</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Alineat amb el Decret 175/2022 de la Generalitat de Catalunya i les pautes DUA.
          </p>
        </div>
      </footer>

      {/* Drawers & Modals */}
      <SavedActivitiesDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedActivities={savedActivities}
        onSelectActivity={(act) => setCurrentActivity(act)}
        onDeleteActivity={handleDeleteActivity}
      />

      <CurriculumGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}


import React, { useState } from 'react';
import type { StudyPlan } from './types';
import { generateStudyPlanForVerse } from './services/geminiService';
import VerseInput from './components/VerseInput';
import StudyPlanDisplay from './components/StudyPlanDisplay';
import { BookOpenIcon } from './components/icons';

const App: React.FC = () => {
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async (surah: string, ayah: string) => {
    setIsLoading(true);
    setError(null);
    setStudyPlan(null);
    try {
      const plan = await generateStudyPlanForVerse(surah, ayah);
      setStudyPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-950 text-primary-100">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-500 mb-2">
            🌙 Qur'an Master Memory System
          </h1>
          <p className="text-lg text-primary-300">
            Understand, memorize, and live by the Qur’an using a structured, neuroscience-backed learning plan.
          </p>
        </header>

        <VerseInput onGenerate={handleGeneratePlan} isLoading={isLoading} />

        {error && (
          <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
            <p className="font-bold">Error Generating Plan</p>
            <p>{error}</p>
          </div>
        )}

        {studyPlan ? (
          <StudyPlanDisplay plan={studyPlan} />
        ) : (
          !isLoading && (
            <div className="mt-12 text-center text-primary-400 p-8 border-2 border-dashed border-primary-800 rounded-lg">
              <BookOpenIcon className="mx-auto h-12 w-12 text-primary-700 mb-4" />
              <h2 className="text-2xl font-semibold text-primary-200">Your Study Plan Awaits</h2>
              <p>Enter a Surah and Ayah number to begin your personalized learning journey.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default App;

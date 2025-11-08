
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface VerseInputProps {
  onGenerate: (surah: string, ayah: string) => void;
  isLoading: boolean;
}

const VerseInput: React.FC<VerseInputProps> = ({ onGenerate, isLoading }) => {
  const [surah, setSurah] = useState('Al-Fatiha');
  const [ayah, setAyah] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (surah.trim() && ayah.trim() && !isLoading) {
      onGenerate(surah, ayah);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-primary-900/50 p-6 rounded-xl shadow-lg border border-primary-800">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/2">
          <label htmlFor="surah" className="block text-sm font-medium text-primary-300 mb-1">
            Surah
          </label>
          <input
            id="surah"
            type="text"
            value={surah}
            onChange={(e) => setSurah(e.target.value)}
            placeholder="e.g., Al-Baqarah"
            className="w-full bg-primary-900 border border-primary-700 rounded-md px-3 py-2 text-primary-100 focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition"
            required
          />
        </div>
        <div className="w-full sm:w-1/4">
          <label htmlFor="ayah" className="block text-sm font-medium text-primary-300 mb-1">
            Ayah
          </label>
          <input
            id="ayah"
            type="number"
            value={ayah}
            onChange={(e) => setAyah(e.target.value)}
            placeholder="e.g., 255"
            min="1"
            className="w-full bg-primary-900 border border-primary-700 rounded-md px-3 py-2 text-primary-100 focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition"
            required
          />
        </div>
        <div className="w-full sm:w-auto sm:self-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[42px] flex items-center justify-center bg-secondary-500 hover:bg-secondary-400 disabled:bg-secondary-800 disabled:text-secondary-400 disabled:cursor-not-allowed text-primary-950 font-bold py-2 px-6 rounded-md transition-colors duration-300 shadow-md"
          >
            {isLoading ? <LoadingSpinner /> : 'Generate Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerseInput;

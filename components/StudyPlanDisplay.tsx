
import React, { useState } from 'react';
import type { StudyPlan } from '../types';
import Accordion from './Accordion';
import { BookOpenIcon, SparklesIcon, HeartIcon, RefreshIcon, ScaleIcon, PencilAltIcon, CollectionIcon } from './icons';

interface StudyPlanDisplayProps {
  plan: StudyPlan;
}

const StudyPlanDisplay: React.FC<StudyPlanDisplayProps> = ({ plan }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('foundations');

  const {
    foundations,
    storyIntegration,
    appliedFaith,
    memoryReview,
    sevenBySevenSystem,
    journalingFramework,
    weeklyConsolidation
  } = plan;

  return (
    <div className="mt-10 space-y-4">
      {foundations && (
        <Accordion title="Module 1: Foundations of Understanding" icon={<BookOpenIcon />} id="foundations" openId={openAccordion} setOpenId={setOpenAccordion}>
          <div className="bg-primary-900 p-4 rounded-lg text-center mb-6 border border-primary-700">
            <p className="text-3xl font-serif text-secondary-200 mb-2">{foundations.verseInfo.arabic}</p>
            <p className="italic text-primary-300 mb-2">{foundations.verseInfo.transliteration}</p>
            <p className="text-primary-100">"{foundations.verseInfo.translation}"</p>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-secondary-400">Tafsir & Context</h4>
              <p className="text-primary-300 whitespace-pre-wrap">{foundations.tafsir}</p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-400">Word Analysis</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {foundations.wordAnalysis.map((word, i) => (
                  <li key={i} className="bg-primary-900 p-3 rounded-md border border-primary-800">
                    <p className="font-bold text-lg text-secondary-200">{word.word}</p>
                    <p className="text-sm text-primary-300">Root: {word.root}</p>
                    <p className="text-primary-200">{word.meaning}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-400">Moral Lessons & Application</h4>
              <ul className="list-disc list-inside text-primary-300 pl-2 mt-1">
                {foundations.moralLessons.map((lesson, i) => <li key={i}>{lesson}</li>)}
              </ul>
               <p className="mt-2 bg-primary-900 p-3 rounded-md border border-primary-800"><span className="font-bold text-secondary-300">Life Application:</span> {foundations.lifeApplication}</p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-400">Memory Story</h4>
              <div className="bg-primary-900 p-3 rounded-md border border-primary-800 mt-1">
                <p><span className="font-bold text-secondary-300">Scene:</span> {foundations.memoryStory.scene}</p>
                <p><span className="font-bold text-secondary-300">Mnemonic:</span> {foundations.memoryStory.mnemonic}</p>
                <p><span className="font-bold text-secondary-300">Keywords:</span> {foundations.memoryStory.keywords.join(', ')}</p>
              </div>
            </div>
          </div>
        </Accordion>
      )}

      {storyIntegration && (
        <Accordion title="Module 2: Story & Lesson Integration" icon={<SparklesIcon />} id="story" openId={openAccordion} setOpenId={setOpenAccordion}>
          <div className="space-y-3">
            <p><span className="font-semibold text-secondary-400">Summary: </span>{storyIntegration.storySummary}</p>
            <p><span className="font-semibold text-secondary-400">Moral Themes: </span>{storyIntegration.moralThemes.join(', ')}</p>
            <p><span className="font-semibold text-secondary-400">Modern Analogy: </span>{storyIntegration.modernAnalogy}</p>
            <p><span className="font-semibold text-secondary-400">Mental Movie Scene: </span>{storyIntegration.mentalMovieScene}</p>
            <p><span className="font-semibold text-secondary-400">Mnemonic Phrase: </span>"{storyIntegration.mnemonicPhrase}"</p>
          </div>
        </Accordion>
      )}

      <Accordion title="Module 3: Applied Faith & Character Development" icon={<HeartIcon />} id="faith" openId={openAccordion} setOpenId={setOpenAccordion}>
        <div className="space-y-3">
            <p><span className="font-semibold text-secondary-400">Verse Theme: </span>{appliedFaith.verseTheme}</p>
            <p><span className="font-semibold text-secondary-400">Emotional Tone: </span>{appliedFaith.tafsirEmotionalTone}</p>
            <p><span className="font-semibold text-secondary-400">Personal Challenge: </span>{appliedFaith.personalChallenge}</p>
            <p><span className="font-semibold text-secondary-400">Daily Micro-Action: </span>{appliedFaith.dailyMicroAction}</p>
            <p><span className="font-semibold text-secondary-400">Journal Prompt: </span>{appliedFaith.journalPrompt}</p>
            <p><span className="font-semibold text-secondary-400">Visualization Cue: </span>{appliedFaith.visualizationCue}</p>
            <p><span className="font-semibold text-secondary-400">Recitation Trigger: </span>{appliedFaith.recitationTrigger}</p>
        </div>
      </Accordion>
      
      <Accordion title="Module 4: Memory Review Cycles" icon={<RefreshIcon />} id="review" openId={openAccordion} setOpenId={setOpenAccordion}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-primary-700">
              <tr>
                <th className="p-2 text-secondary-400 font-semibold">Review Type</th>
                <th className="p-2 text-secondary-400 font-semibold">Schedule</th>
                <th className="p-2 text-secondary-400 font-semibold">Method</th>
              </tr>
            </thead>
            <tbody>
              {memoryReview.cycles.map((cycle, i) => (
                <tr key={i} className="border-b border-primary-800">
                  <td className="p-2 font-bold">{cycle.type}</td>
                  <td className="p-2">{cycle.schedule}</td>
                  <td className="p-2">{cycle.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="Module 5: The “7x7x7 System”" icon={<ScaleIcon />} id="system" openId={openAccordion} setOpenId={setOpenAccordion}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-primary-700">
              <tr>
                <th className="p-2 text-secondary-400 font-semibold">Phase</th>
                <th className="p-2 text-secondary-400 font-semibold">Focus</th>
                <th className="p-2 text-secondary-400 font-semibold">Practice</th>
              </tr>
            </thead>
            <tbody>
              {sevenBySevenSystem.map((phase) => (
                <tr key={phase.phase} className="border-b border-primary-800">
                  <td className="p-2 font-bold">{phase.phase}</td>
                  <td className="p-2">{phase.focus}</td>
                  <td className="p-2">{phase.practice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="Module 6: Reflection Journaling Framework" icon={<PencilAltIcon />} id="journal" openId={openAccordion} setOpenId={setOpenAccordion}>
        <ul className="list-decimal list-inside space-y-2">
            {journalingFramework.prompts.map((prompt, i) => <li key={i}>{prompt}</li>)}
        </ul>
      </Accordion>
      
      <Accordion title="Module 7: Weekly Consolidation" icon={<CollectionIcon />} id="consolidation" openId={openAccordion} setOpenId={setOpenAccordion}>
          <h4 className="font-semibold text-secondary-400">End of Week Tasks:</h4>
          <ul className="list-decimal list-inside space-y-2 mt-2">
            {weeklyConsolidation.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ul>
           <p className="mt-4 bg-primary-900 p-3 rounded-md border border-primary-800"><span className="font-bold text-secondary-300">Focus Verse Prompt:</span> {weeklyConsolidation.focusVersePrompt}</p>
      </Accordion>
    </div>
  );
};

export default StudyPlanDisplay;

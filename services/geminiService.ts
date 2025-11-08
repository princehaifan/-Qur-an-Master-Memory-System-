
import { GoogleGenAI, Type } from '@google/genai';
import type { StudyPlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error('API_KEY environment variable is not set');
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const studyPlanSchema = {
    type: Type.OBJECT,
    properties: {
        foundations: {
            type: Type.OBJECT,
            properties: {
                verseInfo: {
                    type: Type.OBJECT,
                    properties: {
                        arabic: { type: Type.STRING },
                        transliteration: { type: Type.STRING },
                        translation: { type: Type.STRING },
                    },
                    required: ["arabic", "transliteration", "translation"]
                },
                tafsir: { type: Type.STRING, description: "Explore meaning, historical context (Asbāb al-Nuzūl)" },
                wordAnalysis: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            word: { type: Type.STRING },
                            root: { type: Type.STRING },
                            meaning: { type: Type.STRING },
                        },
                         required: ["word", "root", "meaning"]
                    }
                },
                moralLessons: { type: Type.ARRAY, items: { type: Type.STRING } },
                lifeApplication: { type: Type.STRING },
                reflectionPrompt: { type: Type.STRING },
                memoryStory: {
                    type: Type.OBJECT,
                    properties: {
                        scene: { type: Type.STRING },
                        mnemonic: { type: Type.STRING },
                        keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                     required: ["scene", "mnemonic", "keywords"]
                },
            },
             required: ["verseInfo", "tafsir", "wordAnalysis", "moralLessons", "lifeApplication", "reflectionPrompt", "memoryStory"]
        },
        storyIntegration: {
            type: Type.OBJECT,
            nullable: true,
            properties: {
                storySummary: { type: Type.STRING },
                moralThemes: { type: Type.ARRAY, items: { type: Type.STRING } },
                modernAnalogy: { type: Type.STRING },
                mentalMovieScene: { type: Type.STRING },
                mnemonicPhrase: { type: Type.STRING },
            },
            required: ["storySummary", "moralThemes", "modernAnalogy", "mentalMovieScene", "mnemonicPhrase"]
        },
        appliedFaith: {
            type: Type.OBJECT,
            properties: {
                verseTheme: { type: Type.STRING },
                tafsirEmotionalTone: { type: Type.STRING },
                personalChallenge: { type: Type.STRING },
                dailyMicroAction: { type: Type.STRING },
                journalPrompt: { type: Type.STRING },
                visualizationCue: { type: Type.STRING },
                recitationTrigger: { type: Type.STRING },
            },
            required: ["verseTheme", "tafsirEmotionalTone", "personalChallenge", "dailyMicroAction", "journalPrompt", "visualizationCue", "recitationTrigger"]
        },
        memoryReview: {
            type: Type.OBJECT,
            properties: {
                cycles: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING },
                            schedule: { type: Type.STRING },
                            method: { type: Type.STRING },
                        },
                        required: ["type", "schedule", "method"]
                    }
                }
            },
            required: ["cycles"]
        },
        sevenBySevenSystem: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    phase: { type: Type.NUMBER },
                    focus: { type: Type.STRING },
                    practice: { type: Type.STRING },
                },
                required: ["phase", "focus", "practice"]
            }
        },
        journalingFramework: {
            type: Type.OBJECT,
            properties: {
                prompts: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["prompts"]
        },
        weeklyConsolidation: {
            type: Type.OBJECT,
            properties: {
                steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                focusVersePrompt: { type: Type.STRING }
            },
            required: ["steps", "focusVersePrompt"]
        }
    },
    required: ["foundations", "appliedFaith", "memoryReview", "sevenBySevenSystem", "journalingFramework", "weeklyConsolidation"]
};

export async function generateStudyPlanForVerse(surah: string, ayah: string): Promise<StudyPlan> {
    const prompt = `
    You are an expert Islamic scholar and a memory science specialist. Your task is to create a detailed, structured study plan for a specific Qur'anic verse.

    The verse is Surah ${surah}, Ayah ${ayah}.

    Generate a comprehensive study plan based on the following 7 modules. Populate all fields with rich, insightful, and actionable content.
    If the verse is not part of a story, return null for the 'storyIntegration' field.

    Module 1 - Foundations of Understanding:
    - verseInfo: Arabic text, transliteration, and English translation.
    - tafsir: A concise tafsir and historical context (Asbāb al-Nuzūl).
    - wordAnalysis: 5-7 key Arabic words with root and meaning.
    - moralLessons: 3 moral principles.
    - lifeApplication: One practical application.
    - reflectionPrompt: A question "How can I live this verse today?".
    - memoryStory: A vivid mental scene, a mnemonic, and anchor keywords.

    Module 2 - Story & Lesson Integration (if applicable):
    - Summarize the story.
    - Extract moral themes.
    - Link to a modern analogy.
    - Describe a mental movie scene.
    - Create a mnemonic phrase.

    Module 3 - Applied Faith & Character Development:
    - Identify the verse's theme on character (e.g., honesty).
    - Explain tafsir and emotional tone.
    - Identify a related personal challenge.
    - Design a daily micro-action.
    - Write a nightly journal prompt.
    - Create a visualization cue.
    - Suggest a habit trigger for recitation.

    Module 4 - Memory Review Cycles:
    - Provide the 5 review cycles (Quick, Deep, Active, Reflection, Long-Term) with schedule and method.

    Module 5 - The "7x7x7 System":
    - List the 7 phases (Read, Understand, Visualize, Anchor, Apply, Recite, Review) with their practices.

    Module 6 - Reflection Journaling Framework:
    - Provide the 4 daily journal prompts.

    Module 7 - Weekly Consolidation:
    - List the 5 weekly consolidation steps.
    - Provide the prompt for choosing a focus verse.

    Your entire response MUST be a single, valid JSON object conforming to the provided schema. Do not include any text, markdown, or code block fences before or after the JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: studyPlanSchema,
            }
        });

        const jsonString = response.text;
        const parsedPlan: StudyPlan = JSON.parse(jsonString);
        return parsedPlan;
    } catch (error) {
        console.error("Error generating study plan:", error);
        throw new Error("Failed to generate study plan from AI. Please check the console for details.");
    }
}

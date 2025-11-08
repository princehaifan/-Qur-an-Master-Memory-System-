
export interface VerseInfo {
    arabic: string;
    transliteration: string;
    translation: string;
}

export interface WordAnalysis {
    word: string;
    root: string;
    meaning: string;
}

export interface MemoryStory {
    scene: string;
    mnemonic: string;
    keywords: string[];
}

export interface FoundationModule {
    verseInfo: VerseInfo;
    tafsir: string;
    wordAnalysis: WordAnalysis[];
    moralLessons: string[];
    lifeApplication: string;
    reflectionPrompt: string;
    memoryStory: MemoryStory;
}

export interface StoryIntegrationModule {
    storySummary: string;
    moralThemes: string[];
    modernAnalogy: string;
    mentalMovieScene: string;
    mnemonicPhrase: string;
}

export interface AppliedFaithModule {
    verseTheme: string;
    tafsirEmotionalTone: string;
    personalChallenge: string;
    dailyMicroAction: string;
    journalPrompt: string;
    visualizationCue: string;
    recitationTrigger: string;
}

export interface ReviewItem {
    type: string;
    schedule: string;
    method: string;
}

export interface MemoryReviewModule {
    cycles: ReviewItem[];
}

export interface SevenSystemPhase {
    phase: number;
    focus: string;
    practice: string;
}

export interface JournalingFramework {
    prompts: string[];
}

export interface WeeklyConsolidation {
    steps: string[];
    focusVersePrompt: string;
}

export interface StudyPlan {
    foundations: FoundationModule;
    storyIntegration?: StoryIntegrationModule;
    appliedFaith: AppliedFaithModule;
    memoryReview: MemoryReviewModule;
    sevenBySevenSystem: SevenSystemPhase[];
    journalingFramework: JournalingFramework;
    weeklyConsolidation: WeeklyConsolidation;
}

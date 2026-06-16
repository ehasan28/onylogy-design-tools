/**
 * Flesch Reading Ease and Flesch–Kincaid Grade Level for a block of text.
 * Syllable counting is heuristic (good enough for editorial guidance).
 */

export interface ReadingEase {
  words: number;
  sentences: number;
  syllables: number;
  ease: number; // 0–100, higher = easier
  grade: number; // US grade level
  label: string;
}

export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const cleaned = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");
  const matches = cleaned.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function analyzeReadingEase(text: string): ReadingEase {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    : [];
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  if (wordCount === 0) {
    return {
      words: 0,
      sentences: 0,
      syllables: 0,
      ease: 0,
      grade: 0,
      label: "No text",
    };
  }

  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = syllables / wordCount;

  const ease =
    206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
  const grade =
    0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;

  return {
    words: wordCount,
    sentences: sentenceCount,
    syllables,
    ease: Math.round(Math.max(0, Math.min(100, ease)) * 10) / 10,
    grade: Math.round(Math.max(0, grade) * 10) / 10,
    label: easeLabel(ease),
  };
}

function easeLabel(ease: number): string {
  if (ease >= 90) return "Very easy (5th grade)";
  if (ease >= 80) return "Easy (6th grade)";
  if (ease >= 70) return "Fairly easy (7th grade)";
  if (ease >= 60) return "Plain English (8–9th grade)";
  if (ease >= 50) return "Fairly difficult (10–12th grade)";
  if (ease >= 30) return "Difficult (college)";
  return "Very difficult (graduate)";
}

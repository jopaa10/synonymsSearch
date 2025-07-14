import { synonymsMap } from "@/lib/synonymsMap";

/**
 * Helper to add synonym relation
 */
export function addSynonym(word1: string, word2: string) {
  if (!synonymsMap.has(word1)) {
    synonymsMap.set(word1, new Set());
  }
  synonymsMap.get(word1)!.add(word2);
}

/**
 * Implements transitive rule:
 * e.g. A ↔ B, B ↔ C ⇒ A ↔ C
 */
export function handleTransitiveRule(word: string) {
  const directSynonyms = synonymsMap.get(word);
  if (!directSynonyms) return;

  for (const synonym of directSynonyms) {
    const synonymSynonyms = synonymsMap.get(synonym);
    if (synonymSynonyms) {
      for (const transitive of synonymSynonyms) {
        if (transitive !== word) {
          addSynonym(word, transitive);
          addSynonym(transitive, word);
        }
      }
    }
  }
}

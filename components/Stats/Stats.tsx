"use client";

import { WordSynonyms } from "@/types/synonyms";
import styles from "./Stats.module.scss";
import { useQuery } from "@tanstack/react-query";

const Stats = () => {
  // Fetch the entire dictionary using React Query.
  // WHY:
  // - handles caching and re-fetching automatically
  // - allows easy handling of loading and error states
  const { data, isLoading, error } = useQuery<{ words: WordSynonyms[] }>({
    queryKey: ["dictionary"],
    queryFn: async () => {
      const res = await fetch("/api/words/all");
      if (!res.ok) throw new Error("Failed to fetch dictionary");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading stats...</p>;
  if (error) return <p>Failed to load stats.</p>;

  /**
   * Build an undirected graph from all words and synonyms in the dictionary.
   *
   * WHY:
   * - Helps identify unique words (graph nodes) without duplicates.
   * - Tracks all synonym relationships as edges between words.
   * - Counts the number of unique words and total synonym relationships.
   *
   * Note:
   * - Each relationship is stored bidirectionally (e.g. A → B and B → A).
   * - So we divide the total number of edges by 2 to avoid double-counting.
   */

  const graph = new Map<string, Set<string>>();

  if (data?.words) {
    data.words.forEach(({ word, synonyms }) => {
      const w = word.toLowerCase();
      if (!graph.has(w)) graph.set(w, new Set());

      synonyms.forEach((syn) => {
        const s = syn.toLowerCase();
        if (!graph.has(s)) graph.set(s, new Set());

        graph.get(w)!.add(s);
        graph.get(s)!.add(w);
      });
    });
  }

  const uniqueWordsCount = graph.size;

  let edgeCount = 0;
  for (const neighbors of graph.values()) {
    edgeCount += neighbors.size;
  }
  const synonymRelationshipsCount = edgeCount / 2;

  return (
    <dl className={styles.stats} aria-labelledby="stats-heading">
      <dt>Unique words</dt>
      <dd>
        <strong>{uniqueWordsCount}</strong> unique words
      </dd>

      <dt>Synonym relationships</dt>
      <dd>
        <strong>{synonymRelationshipsCount}</strong> synonym relationships
      </dd>
    </dl>
  );
};

export default Stats;

"use client";

import styles from "./Stats.module.scss";
import { useQuery } from "@tanstack/react-query";

type WordSynonyms = {
  word: string;
  synonyms: string[];
};

const Stats = () => {
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

  // Map where ključ je riječ, vrijednost je set sinonima
  const graph = new Map<string, Set<string>>();

  if (data?.words) {
    // Popuni graf dvosmjernim vezama (neusmjereni graf)
    data.words.forEach(({ word, synonyms }) => {
      const w = word.toLowerCase();
      if (!graph.has(w)) graph.set(w, new Set());

      synonyms.forEach((syn) => {
        const s = syn.toLowerCase();
        if (!graph.has(s)) graph.set(s, new Set());

        // Dvostrano poveži w i s
        graph.get(w)!.add(s);
        graph.get(s)!.add(w);
      });
    });
  }

  // Broj jedinstvenih riječi = broj čvorova u grafu
  const uniqueWordsCount = graph.size;

  // Broj sinonimskih relacija = broj svih bridova / 2 (jer su dvostruke veze)
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

"use client";
import styles from "./Stats.module.scss";
import { useQuery } from "@tanstack/react-query";

const Stats = () => {
  const { data } = useQuery({
    queryKey: ["dictionary"],
    queryFn: async () => {
      const res = await fetch("/api/words/all");
      if (!res.ok) throw new Error("Failed to fetch dictionary");
      return res.json();
    },
  });

  let totalWords = 0;
  let totalSynonyms = 0;

  if (data?.words?.length) {
    totalWords = data.words.length;

    const synonymSet = new Set<string>();
    data.words.forEach((item: { word: string; synonyms: string[] }) => {
      item.synonyms.forEach((syn) => synonymSet.add(syn));
    });

    totalSynonyms = synonymSet.size;
  }

  return (
    <dl className={styles.stats} aria-labelledby="stats-heading">
      <dt>Unique words</dt>
      <dd>
        <strong>{totalWords}</strong> unique words
      </dd>

      <dt>Synonym relationships</dt>
      <dd>
        <strong>{totalSynonyms}</strong> synonym relationships
      </dd>
    </dl>
  );
};

export default Stats;

"use client";

import { useRef } from "react";
import GlassCard from "../common/GlassCard";
import styles from "./SynonymCard.module.scss";
import Dictionary from "../Dictionary/Dictionary";
import AddSynonymCard from "./AddSynonymCard";
import SearchSynonymCard from "./SearchSynonymCard";

/**
 * SynonymCard is the main interactive UI component for:
 * - Adding new synonym relationships (bidirectional)
 * - Searching for synonyms of a given word
 * - Displaying a dictionary of existing synonyms
 *
 * REASONING:
 * - We use custom hooks (`useAddSynonym`, `useSearchSynonyms`) to manage data logic cleanly via React Query.
 * - We animate successful additions using `animateFlyToDictionary` for a visual connection between action and result.
 * - The layout is structured using reusable `GlassCard` and `GlassButton` components for a consistent UI.
 */

const SynonymCard = () => {
  const dictionaryCardRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.mainContent}>
      <AddSynonymCard styles={styles} dictionaryCardRef={dictionaryCardRef} />

      <SearchSynonymCard styles={styles} />

      <GlassCard
        icon="📚"
        title="Dictionary"
        description="Browse all words and their synonym relationships"
      >
        <div ref={dictionaryCardRef}>
          <Dictionary />
        </div>
      </GlassCard>
    </div>
  );
};

export default SynonymCard;

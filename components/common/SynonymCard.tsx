"use client";

import { useState, useRef } from "react";
import GlassCard from "../common/GlassCard";
import styles from "./SynonymCard.module.scss";
import GlassButton from "../common/GlassButton";
import Dictionary from "../Dictionary/Dictionary";
import SynonymInput from "./SynonymInput";
import { animateFlyToDictionary } from "@/utils/animateFlyToDictionary";
import { useAddSynonym } from "@/hooks/useAddSynonyms";
import { useSearchSynonyms } from "@/hooks/useSearchSynonyms";

const SynonymCard = () => {
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const dictionaryCardRef = useRef<HTMLDivElement>(null);

  // Add synonyms state and mutation
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [addStatus, setAddStatus] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({
    text: "Enter two words to create a synonym pair",
    type: "",
  });

  const onAddSuccess = () => {
    setAddStatus({
      text: `✓ Connected "${word1.toLowerCase()}" ↔ "${word2.toLowerCase()}"`,
      type: "success",
    });
    setWord1("");
    setWord2("");

    animateFlyToDictionary(
      addButtonRef,
      dictionaryCardRef,
      `${word1.toLowerCase()} ↔ ${word2.toLowerCase()}`
    );
  };

  const { mutate: mutateAdd } = useAddSynonym(onAddSuccess);

  // Search synonyms state and logic
  const {
    searchWord,
    setSearchWord,
    searchStatus,
    handleSearch,
    setSearchStatus,
  } = useSearchSynonyms();

  const handleAdd = () => {
    const w1 = word1.trim().toLowerCase();
    const synonymsArray = word2
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (!w1 || synonymsArray.length === 0) {
      setAddStatus({ text: "Please enter both words", type: "error" });
      return;
    }

    if (synonymsArray.includes(w1)) {
      setAddStatus({ text: "Words must be different", type: "error" });
      return;
    }

    setAddStatus({ text: "", type: "" }); // clear previous status
    mutateAdd({ word: w1, synonyms: synonymsArray });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    isSearch?: boolean
  ) => {
    if (e.key === "Enter") {
      if (isSearch) {
        handleSearch();
      } else {
        handleAdd();
      }
    }
  };

  return (
    <div className={styles.mainContent}>
      <GlassCard
        icon="➕"
        title="Add Synonyms"
        description="Create bidirectional word relationships that work both ways."
      >
        <div className={styles.inputGroup}>
          <SynonymInput
            value={word1}
            placeholder="First word"
            onChange={(val) => {
              setWord1(val);
              setAddStatus({
                text: "Enter two words to create a synonym pair",
                type: "",
              });
            }}
            onKeyDown={(e) => handleKeyDown(e)}
            ariaLabel="First word"
          />

          <SynonymInput
            value={word2}
            placeholder="Synonym"
            onChange={setWord2}
            onKeyDown={(e) => handleKeyDown(e)}
            ariaLabel="Synonym word"
          />

          <GlassButton
            label="Add"
            btnRef={addButtonRef}
            onClick={handleAdd}
            cls={addStatus.type === "success" ? styles.flashButton : ""}
          />
        </div>
        <div className={styles.results}>
          {!!addStatus.text && (
            <div
              className={`${styles.resultsContent} ${
                addStatus.type === "success"
                  ? styles.successMessage
                  : addStatus.type === "error"
                  ? styles.errorMessage
                  : ""
              }`}
            >
              {addStatus.text}
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard
        icon="🔍"
        title="Find Synonyms"
        description="Search any word to discover all its synonyms instantly."
      >
        <div className={styles.inputGroup}>
          <SynonymInput
            value={searchWord}
            placeholder="Search for word"
            onChange={(val) => {
              setSearchWord(val);

              setSearchStatus({
                synonyms: [],
                word: "",
                type: "",
                message: "Enter a word to find its synonyms",
              });
            }}
            onKeyDown={(e) => handleKeyDown(e, true)}
            ariaLabel="Search word"
          />
          <GlassButton label="Search" onClick={handleSearch} />
        </div>

        <div className={styles.results}>
          {searchStatus.type === "success" && (
            <div
              className={`${styles.resultsContent} ${styles.successMessage}`}
            >
              <div style={{ marginBottom: 12, fontWeight: 600 }}>
                Synonyms for{" "}
                <span
                  style={{ color: "#a78bfa" }}
                >{`"${searchStatus.word}"`}</span>
                :
              </div>
              {searchStatus.synonyms.map((syn) => (
                <span key={syn} className={styles.synonymTag}>
                  {syn}
                </span>
              ))}
            </div>
          )}

          {searchStatus.type === "error" && (
            <div className={`${styles.resultsContent} ${styles.errorMessage}`}>
              {searchStatus.message}
            </div>
          )}

          {searchStatus.type === "" && (
            <div className={styles.resultsContent}>{searchStatus.message}</div>
          )}
        </div>
      </GlassCard>

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

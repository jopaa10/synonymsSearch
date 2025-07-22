import { useAddSynonym } from "@/hooks/useAddSynonyms";
import { animateFlyToDictionary } from "@/utils/animateFlyToDictionary";
import { useRef, useState } from "react";
import GlassCard from "./GlassCard";
import SynonymInput from "./SynonymInput";
import GlassButton from "./GlassButton";
import { AddSynonymCardProps } from "@/types/synonyms";

const AddSynonymCard = ({ styles, dictionaryCardRef }: AddSynonymCardProps) => {
  const addButtonRef = useRef<HTMLButtonElement>(null);

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

    setAddStatus({ text: "", type: "" });
    mutateAdd({ word: w1, synonyms: synonymsArray });
  };

  const { mutate: mutateAdd } = useAddSynonym(onAddSuccess);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
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
  );
};

export default AddSynonymCard;

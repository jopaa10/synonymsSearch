import { useSearchSynonyms } from "@/hooks/useSearchSynonyms";
import GlassButton from "./GlassButton";
import GlassCard from "./GlassCard";
import SynonymInput from "./SynonymInput";

const SearchSynonymCard = ({
  styles,
}: {
  styles: { [key: string]: string };
}) => {
  const {
    searchWord,
    setSearchWord,
    searchStatus,
    handleSearch,
    setSearchStatus,
  } = useSearchSynonyms();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
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
          onKeyDown={(e) => handleKeyDown(e)}
          ariaLabel="Search word"
        />
        <GlassButton label="Search" onClick={handleSearch} />
      </div>

      <div className={styles.results}>
        {searchStatus.type === "success" && (
          <div className={`${styles.resultsContent} ${styles.successMessage}`}>
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
  );
};

export default SearchSynonymCard;

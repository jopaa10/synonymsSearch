import { useQuery } from "@tanstack/react-query";
import styles from "./Dictionary.module.scss";

const Dictionary = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dictionary"],
    queryFn: async () => {
      const res = await fetch("/api/words/all");
      if (!res.ok) throw new Error("Failed to fetch dictionary");
      return res.json();
    },
  });

  return (
    <div className={styles.dictionaryContent} id="dictionary">
      <div className={styles.resultsContent}>
        {isLoading && <p>Dictionary will appear here as you add words.</p>}

        {error && (
          <p className={styles.errorMessage}>Failed to load dictionary.</p>
        )}

        {!isLoading && data?.words?.length === 0 && <p>No words added yet.</p>}

        {!isLoading && data?.words?.length > 0 && (
          <ul className={styles.wordList}>
            {data.words.map((item: { word: string; synonyms: string[] }) => (
              <li key={item.word} className={styles.wordItem}>
                <strong>{item.word}</strong>: {item.synonyms.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dictionary;

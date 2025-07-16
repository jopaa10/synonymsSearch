import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchStatus, SynonymsResponse } from "@/types/synonyms";

/**
 * Custom hook to handle searching for synonyms for a given word.
 *
 * Why React Query:
 * - Manages caching and deduplication of requests.
 * - Provides refetch capabilities for on-demand searches.
 * - Simplifies tracking of loading and error states.
 *
 * Why use controlled state:
 * - We keep `searchWord` in local state so the input field remains controlled.
 * - We store `searchStatus` separately so we can show helpful UI messages
 *   (e.g. success, error, or empty state feedback) based on search results.
 */

export const useSearchSynonyms = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchStatus, setSearchStatus] = useState<SearchStatus>({
    synonyms: [],
    word: "",
    type: "",
    message: "Enter a word to find its synonyms",
  });

  const fetchSynonyms = async (): Promise<SynonymsResponse> => {
    const res = await fetch(
      `/api/words?query=${encodeURIComponent(searchWord.toLowerCase())}`
    );
    if (!res.ok) throw new Error("Failed to fetch synonyms.");
    return res.json();
  };

  const { refetch } = useQuery<SynonymsResponse>({
    queryKey: ["synonyms", searchWord],
    queryFn: fetchSynonyms,
    enabled: false,
  });

  const handleSearch = async () => {
    const w = searchWord.trim().toLowerCase();
    if (!w) {
      setSearchStatus({
        synonyms: [],
        word: "",
        type: "error",
        message: "Please enter a word to search",
      });
      return;
    }

    try {
      const data = await refetch();
      const synonyms = data.data?.synonyms || [];

      if (synonyms.length === 0) {
        setSearchStatus({
          synonyms: [],
          word: w,
          type: "error",
          message: `No synonyms found for "${w}"`,
        });
      } else {
        setSearchStatus({
          synonyms,
          word: w,
          type: "success",
          message: `Found ${synonyms.length} synonyms for "${w}"`,
        });
      }

      setSearchWord("");
    } catch {
      setSearchStatus({
        synonyms: [],
        word: "",
        type: "error",
        message: "Failed to fetch synonyms",
      });
    }
  };

  return {
    searchWord,
    setSearchWord,
    searchStatus,
    handleSearch,
    setSearchStatus,
  };
};

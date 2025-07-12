import { AddSynonymArgs } from "@/types/synonyms";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSynonym = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const addSynonym = async ({ word, synonyms }: AddSynonymArgs) => {
    const res = await fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, synonyms }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to add synonym.");
    }
    return res.json();
  };

  return useMutation<unknown, Error, AddSynonymArgs>({
    mutationFn: addSynonym,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dictionary"] });
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};

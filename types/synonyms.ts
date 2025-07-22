export type SynonymCardProps = {
  icon: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export type GlassButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  cls?: string;
  btnRef?: React.Ref<HTMLButtonElement>;
  ariaLabel?: string;
  disabled?: boolean;
};

export type StatsProps = {
  word: number;
  synonym: number;
};

export type SynonymInputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
};

export type AddSynonymArgs = {
  word: string;
  synonyms: string[];
};

export type SynonymsResponse = {
  synonyms: string[];
};

export type SearchStatus = {
  synonyms: string[];
  word: string;
  type: "success" | "error" | "";
  message: string;
};

export type WordSynonyms = {
  word: string;
  synonyms: string[];
};

export type AddSynonymCardProps = {
  styles: { [key: string]: string };
  dictionaryCardRef: React.RefObject<HTMLDivElement | null>;
};

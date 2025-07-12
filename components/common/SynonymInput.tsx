import { SynonymInputProps } from "@/types/synonyms";
import styles from "./SynonymCard.module.scss";

const SynonymInput: React.FC<SynonymInputProps> = ({
  value,
  placeholder,
  onChange,
  onKeyDown,
  ariaLabel,
}) => {
  return (
    <input
      className={styles.inputText}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
    />
  );
};

export default SynonymInput;

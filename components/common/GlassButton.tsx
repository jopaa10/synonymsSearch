"use client";

import { GlassButtonProps } from "@/types/synonyms";
import styles from "./SynonymCard.module.scss";

const GlassButton = ({
  label,
  onClick,
  type = "button",
  cls,
  btnRef,
  ariaLabel,
}: GlassButtonProps) => {
  return (
    <button
      ref={btnRef}
      className={`${styles.btn} ${cls || ""}`}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
};

export default GlassButton;

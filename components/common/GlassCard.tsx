import { SynonymCardProps } from "@/types/synonyms";
import styles from "./GlassCard.module.scss";

const GlassCard = ({
  icon,
  title,
  description,
  children,
}: SynonymCardProps) => {
  return (
    <div className={styles.glassCard}>
      <div className={styles.cardIcon} aria-hidden="true">
        {icon}
      </div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default GlassCard;

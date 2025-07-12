import styles from "./Background.module.scss";

const Background = () => {
  return (
    <div className={styles.bgElements} aria-hidden={true}>
      <div className={styles.floatingCard}></div>
      <div className={styles.floatingCard}></div>
      <div className={styles.floatingCard}></div>
      <div className={styles.floatingCard}></div>
    </div>
  );
};

export default Background;

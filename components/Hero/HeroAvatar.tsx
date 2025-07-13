import styles from "./Hero.module.scss";

const HeroAvatar = () => {
  return (
    <div className={styles.heroAvatar}>
      <div className={styles.geometricAvatar}>
        <div className={`${styles.avatarLayer} ${styles.avatarLayer1}`}></div>
        <div className={`${styles.avatarLayer} ${styles.avatarLayer2}`}></div>

        {/* Synonym nodes */}
        <div className={`${styles.synonymNode} ${styles.synonymNode1}`}></div>
        <div className={`${styles.synonymNode} ${styles.synonymNode2}`}></div>
        <div className={`${styles.synonymNode} ${styles.synonymNode3}`}></div>
        <div className={`${styles.synonymNode} ${styles.synonymNode4}`}></div>

        {/* Connection lines */}
        <div className={`${styles.connectionLine} ${styles.connection1}`}></div>
        <div className={`${styles.connectionLine} ${styles.connection2}`}></div>
        <div className={`${styles.connectionLine} ${styles.connection3}`}></div>
        <div className={`${styles.connectionLine} ${styles.connection4}`}></div>

        {/* Bidirectional arrows */}
        <div className={`${styles.arrow} ${styles.arrow1}`}></div>
        <div className={`${styles.arrow} ${styles.arrow2}`}></div>
        <div className={`${styles.arrow} ${styles.arrow3}`}></div>
        <div className={`${styles.arrow} ${styles.arrow4}`}></div>

        <div className={styles.avatarParticles}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>
      </div>
    </div>
  );
};

export default HeroAvatar;

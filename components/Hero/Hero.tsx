import styles from "./Hero.module.scss";
import HeroAvatar from "./HeroAvatar";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>
          Smart
          <br />
          Synonyms
        </h1>
        <p>
          Build and explore bidirectional synonym relationships with
          lightning-fast search capabilities.
        </p>
      </div>
      <HeroAvatar />
    </div>
  );
};

export default Hero;

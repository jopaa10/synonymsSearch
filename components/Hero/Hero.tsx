import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
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
  );
};

export default Hero;

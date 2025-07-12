import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.footerContent}>
        <section className={styles.footerSection}>
          <h2>Synonyms Tool</h2>
          <p>Fast, bidirectional synonym search with modern design.</p>
        </section>
        <nav className={styles.footerSection} aria-label="Footer navigation">
          <h3>Features</h3>
          <ul>
            <li>Add word pairs</li>
            <li>Bidirectional search</li>
            <li>Multiple synonyms</li>
            <li>Real-time results</li>
          </ul>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2025 Synonyms Tool</p>
      </div>
    </footer>
  );
};

export default Footer;

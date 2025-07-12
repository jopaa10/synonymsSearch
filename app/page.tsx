import SynonymCard from "@/components/common/SynonymCard";
import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section id="hero" aria-label="Introduction">
          <Hero />
        </section>
        <section id="words" aria-label="Add and find synonyms">
          <SynonymCard />
        </section>
        <section className={styles.stats} aria-label="Dictionary statistics">
          <Stats />
        </section>
      </main>
      <Footer />
    </div>
  );
}

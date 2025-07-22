import SynonymCard from "@/components/common/SynonymCard";
import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.container}>
        <section id="home" aria-label="Introduction">
          <Hero />
        </section>
        <section id="synonym-tools" aria-label="Add and find synonyms">
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

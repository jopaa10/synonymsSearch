"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

const sections = ["hero", "words"];

export default function Navbar() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;

          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveId(id);
            if (id === "hero") {
              history.replaceState(null, "", "/");
            } else {
              history.replaceState(null, "", `/#${id}`);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (id === "home") {
        history.replaceState(null, "", "/");
      } else {
        history.replaceState(null, "", `/#${id}`);
      }
      setActiveId(id);
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li
          className={
            activeId === "hero"
              ? `${styles.list} ${styles.active}`
              : styles.list
          }
          onClick={() => handleClick("hero")}
        >
          <a href="#hero">
            <span className={styles.title}>Synonym Tools</span>
          </a>
        </li>
        <li
          className={
            activeId === "words"
              ? `${styles.list} ${styles.active}`
              : styles.list
          }
          onClick={() => handleClick("words")}
        >
          <a href="#words">
            <span className={styles.title}>Words</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

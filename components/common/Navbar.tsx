"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

const sections = ["hero", "words", "stats"];

export default function Navbar() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const firstId = entry.target.id;
            setActiveId(firstId);

            if (firstId === "hero") {
              history.replaceState(null, "", "/");
            } else {
              history.replaceState(null, "", `/#${firstId}`);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link
            href="#hero"
            className={activeId === "hero" ? styles.active : ""}
          >
            Synonyms Tool
          </Link>
        </li>
        <li>
          <Link
            href="#words"
            className={activeId === "words" ? styles.active : ""}
          >
            Words
          </Link>
        </li>
        <li>
          <Link
            href="#stats"
            className={activeId === "stats" ? styles.active : ""}
          >
            Stats
          </Link>
        </li>
      </ul>
    </nav>
  );
}

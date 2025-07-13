"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

const sections = ["hero", "words"];

export default function Navbar() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          const topmostId = visibleSections[0].target.id;
          setActiveId(topmostId);

          if (topmostId === "hero") {
            history.replaceState(null, "", "/");
          } else {
            history.replaceState(null, "", `/#${topmostId}`);
          }
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
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
      </ul>
    </nav>
  );
}

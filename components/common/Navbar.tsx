"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

const sections = ["home", "synonym-tools"];

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            const newUrl = id === "home" ? "/" : `/#${id}`;
            history.replaceState(null, "", newUrl);
          }
        });
      },
      {
        // these margins determine how much of the section must be visible
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
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
        {sections.map((id: string) => (
          <li
            key={id}
            className={`${styles.list} ${activeId === id ? styles.active : ""}`}
          >
            <Link href={`#${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

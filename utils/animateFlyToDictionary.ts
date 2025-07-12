import { RefObject } from "react";

export const animateFlyToDictionary = (
  addButtonRef: RefObject<HTMLButtonElement | null>,
  dictionaryCardRef: RefObject<HTMLDivElement | null>,
  text: string
) => {
  const btn = addButtonRef.current;
  const dictionaryCard = dictionaryCardRef.current;

  if (!btn || !dictionaryCard) return;

  const btnRect = btn.getBoundingClientRect();
  const dictRect = dictionaryCard.getBoundingClientRect();

  const flyElement = document.createElement("div");
  flyElement.textContent = text;

  flyElement.style.position = "fixed";
  flyElement.style.padding = "6px 12px";
  flyElement.style.fontSize = "14px";
  flyElement.style.fontWeight = "bold";
  flyElement.style.color = "#fff";
  flyElement.style.background = "linear-gradient(135deg, #7c3aed, #a78bfa)";
  flyElement.style.borderRadius = "12px";
  flyElement.style.pointerEvents = "none";
  flyElement.style.whiteSpace = "nowrap";
  flyElement.style.left = `${btnRect.left + btnRect.width / 2}px`;
  flyElement.style.top = `${btnRect.top + btnRect.height / 2}px`;
  flyElement.style.zIndex = "9999";
  flyElement.style.transform = "translate(-50%, -50%) scale(1)";
  flyElement.style.opacity = "1";
  flyElement.style.transition = "all 0.7s cubic-bezier(0.65, 0, 0.35, 1)";

  document.body.appendChild(flyElement);

  requestAnimationFrame(() => {
    flyElement.style.left = `${dictRect.left + dictRect.width / 2}px`;
    flyElement.style.top = `${dictRect.top + dictRect.height / 2}px`;
    flyElement.style.transform = "translate(-50%, -50%) scale(0.3)";
    flyElement.style.opacity = "0";
  });

  setTimeout(() => {
    flyElement.remove();
  }, 700);
};

import css from "../../styles/nepalicalender.css?inline";

const STYLE_ID = "nepali-calendar-react-styles";

/**
 * Adds the calendar CSS to the page once. Does nothing on a server
 * (Next.js, Remix, etc.) where there is no document.
 */
export const injectStyles = () => {
  if (typeof document === "undefined") return;

  const existing = document.getElementById(STYLE_ID);
  if (existing) {
    if (existing.textContent !== css) existing.textContent = css;
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
};

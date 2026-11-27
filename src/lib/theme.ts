export const THEME_STORAGE_KEY = "rcs-theme";

/** Light and dark browser UI colors (light page background and its inverted value). */
export const themeColors = [
  { media: "(prefers-color-scheme: light)", color: "#f8f8f4" },
  { media: "(prefers-color-scheme: dark)", color: "#0b0b07" },
];

/** Runs before first paint: stored choice first, otherwise the system preference. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t}catch(e){}})();`;

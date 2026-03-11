export {};

declare global {
  interface Window {
    __setSiteLang?: (lang: "en" | "hi" | "hing") => void;
    __getSiteLang?: () => "en" | "hi" | "hing";
  }
}

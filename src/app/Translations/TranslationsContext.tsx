import React, { createContext, useContext, useState } from "react";

// Reuse types
export type SupportedLanguages = "en" | "pt-BR" | "es" | "zh" | "hi";

interface TranslationContextType {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
}

// Default context (this avoids undefined errors)
const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
});

// Provider component
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguages>("en");

  return <TranslationContext.Provider value={{ language, setLanguage }}>{children}</TranslationContext.Provider>;
};

// Hook for easy usage
export const useTranslation = () => useContext(TranslationContext);

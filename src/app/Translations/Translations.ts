// Define allowed languages
export type SupportedLanguage = "en" | "pt-BR" | "es" | "zh" | "hi";

// Define allowed translation keys
export type TranslationKey =
  | "Select folder to edit"
  | "Switch Language"
  | "Expand all folders"
  | "Collapse all folders"
  | "File Operations"
  | "Start"
  | "Select files from the directory tree to configure operations";

export const translations: Record<TranslationKey, Record<SupportedLanguage, string>> = {
  "Select folder to edit": {
    en: "Select folder to edit",
    "pt-BR": "Selecionar pasta para editar",
    es: "Seleccionar carpeta para editar",
    zh: "选择要编辑的文件夹",
    hi: "संपादन के लिए फ़ोल्डर चुनें",
  },
  "Switch Language": {
    en: "Switch Language",
    "pt-BR": "Trocar Idioma",
    es: "Cambiar idioma",
    zh: "切换语言",
    hi: "भाषा बदलें",
  },
  "Expand all folders": {
    en: "Expand all folders",
    "pt-BR": "Expandir todas as pastas",
    es: "Expandir todas las carpetas",
    zh: "展开所有文件夹",
    hi: "सभी फ़ोल्डर खोलें",
  },
  "Collapse all folders": {
    en: "Collapse all folders",
    "pt-BR": "Recolher todas as pastas",
    es: "Colapsar todas las carpetas",
    zh: "折叠所有文件夹",
    hi: "सभी फ़ोल्डर संक्षिप्त करें",
  },
  "File Operations": {
    en: "File Operations",
    "pt-BR": "Operações de Arquivo",
    es: "Operaciones de archivo",
    zh: "文件操作",
    hi: "फ़ाइल संचालन",
  },
  "Start": {
    en: "Start",
    "pt-BR": "Iniciar",
    es: "Iniciar",
    zh: "开始",
    hi: "शुरू",
  },
  "Select files from the directory tree to configure operations": {
    en: "Select files from the directory tree to configure operations",
    "pt-BR": "Selecione arquivos da árvore de diretórios para configurar operações",
    es: "Seleccione archivos del árbol de directorios para configurar operaciones",
    zh: "从目录树中选择文件以配置操作",
    hi: "ऑपरेशन कॉन्फ़िगर करने के लिए निर्देशिका ट्री से फ़ाइलें चुनें",
  },
  // Add more phrases as needed
};

export function translate(key: TranslationKey, language: SupportedLanguage): string {
  return translations[key]?.[language] ?? translations[key]?.["en"] ?? key;
}

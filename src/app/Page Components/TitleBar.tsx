import React from "react";
import "./TitleBar.scss";
import { Root, Trigger, Portal, Content, Item } from "@radix-ui/react-select";
import LanguageIcon from "../../../public/switch-keyboard-language-svgrepo-com.svg";
import { TooltipButton } from "../UI Elements/StyledComponents";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTranslation } from "../Translations/TranslationsContext";
import { SupportedLanguage } from "../Translations/Translations";

export const TitleBar: React.FC = () => {
  const titleBarRef = React.useRef<HTMLDivElement>(null);
  const [theme, setTheme] = React.useState<"theme-light" | "theme-dark">("theme-light");
  const { language, setLanguage } = useTranslation();

  React.useEffect(() => {
    // Apply theme class when it changes
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "theme-light" ? "theme-dark" : "theme-light"));
  };

  return (
    <div className="title-wrapper" ref={titleBarRef}>
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        {/* Language Switch */}
        <Root onValueChange={(v: SupportedLanguage) => setLanguage(v)} defaultValue={language}>
          <Trigger asChild>
            <TooltipButton tooltip="Switch Language">
              <LanguageIcon
                width={"2em"}
                height={"2em"}
                style={{ backgroundColor: "white", borderRadius: "50%" }}
                fill="black"
              />
            </TooltipButton>
          </Trigger>
          <Portal container={titleBarRef.current}>
            <Content side="bottom" align="start" className="select-dropdown" sideOffset={4}>
              <Item value="en" style={{ cursor: "pointer" }}>
                English
              </Item>
              <Item value="zh" style={{ cursor: "pointer" }}>
                中文
              </Item>
              <Item value="hi" style={{ cursor: "pointer" }}>
                हिन्दी
              </Item>
              <Item value="es" style={{ cursor: "pointer" }}>
                Español
              </Item>
              <Item value="pt-BR" style={{ cursor: "pointer" }}>
                Português
              </Item>
            </Content>
          </Portal>
        </Root>

        {/* Theme Toggle Button */}
        <TooltipButton
          tooltip={theme === "theme-light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          onClick={toggleTheme}
        >
          {theme === "theme-light" ? (
            <MoonIcon width={"2em"} height={"2em"} />
          ) : (
            <SunIcon width={"2em"} height={"2em"} />
          )}
        </TooltipButton>
      </div>

      <h1 style={{ width: "100%", textAlign: "center" }}>Disk Tamer App</h1>
    </div>
  );
};

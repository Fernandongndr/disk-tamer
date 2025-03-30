import React from "react";
import "./TitleBar.scss";
import { Root, Trigger, Portal, Content, Item } from "@radix-ui/react-select";
import LanguageIcon from "../../../public/switch-keyboard-language-svgrepo-com.svg";

interface TitleBarProps {
  language: string;
  setLanguage: (language: string) => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ language, setLanguage }) => {
  const titleBarRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="title-wrapper" ref={titleBarRef} style={{ backgroundColor: "lightgray" }}>
      <Root onValueChange={(v) => setLanguage(v)} defaultValue={language}>
        <Trigger asChild>
          <LanguageIcon
            width={"5em"}
            height={"5em"}
            style={{ backgroundColor: "white", marginTop: "0.5em", marginLeft: "0.5em" }}
            fill="black"
          />
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
      <h1 style={{ width: "100%", textAlign: "center" }}>Disk Tamer App</h1>
    </div>
  );
};

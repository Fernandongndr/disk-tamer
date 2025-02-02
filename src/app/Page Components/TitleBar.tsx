import React from "react";
import "./TitleBar.scss";

interface TitleBarProps {
  language: string;
  setLanguage: (language: string) => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ language, setLanguage }) => {
  return (
    <div className="title-wrapper">
      <select onChange={(e) => setLanguage(e.target.value)} defaultValue={language}>
        <option value="en">English</option>
        <option value="zh">Chinese (Mandarin)</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
      </select>
      <h1>Disk Tamer App</h1>
    </div>
  );
};

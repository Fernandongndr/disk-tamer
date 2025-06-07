import React from "react";
import { StyledButton } from "../UI Elements/StyledComponents";
import { useTranslation } from "../Translations/TranslationsContext";
import { translate } from "../Translations/Translations";
import "./Actions.scss";

type ActionsProps = Record<string, never>;

export const Actions: React.FC<ActionsProps> = () => {
  const { language } = useTranslation();

  const handleStart = () => {
    // TODO: Implement start functionality
    console.log("Start button clicked");
  };

  return (
    <div className="actions-container">
      <div className="actions-header">
        <h2>{translate("File Operations", language)}</h2>
        <StyledButton onClick={handleStart} className="start-button">
          {translate("Start", language)}
        </StyledButton>
      </div>

      <div className="actions-cards">
        {/* TODO: Action cards will be added here */}
        <div className="placeholder-text">
          {translate("Select files from the directory tree to configure operations", language)}
        </div>
      </div>
    </div>
  );
};

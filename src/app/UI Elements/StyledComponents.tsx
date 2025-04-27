import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import styles from "./StyledComponents.module.scss";

export const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <button {...props} className={styles["styled-button"]}>
      {children}
    </button>
  );
};

export const TooltipButton: React.FC<
  {
    tooltip: string;
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ tooltip, children, ...props }) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <StyledButton {...props}>{children}</StyledButton>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles["styled-tooltip"]} sideOffset={5}>
            {tooltip}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

import * as Dialog from "@radix-ui/react-dialog";
import React, { useCallback } from "react";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogPortal,
  AlertDialogOverlay,
} from "@radix-ui/react-alert-dialog";

export class ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: (toEditor: string) => string;
  toEditor?: string;

  constructor() {
    this.isOpen = false;
    this.onClose = () => {};
    this.onConfirm = () => {};
    this.title = "";
    this.message = () => "";
  }
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  toEditor,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Trigger asChild />
      <Dialog.Portal>
        <Dialog.Overlay className="overlay-styles">
          <Dialog.Content className="confirm-dialog" style={{ whiteSpace: "pre-line" }}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{message(toEditor ?? "")}</Dialog.Description>
            <div className="actions">
              <button onClick={onConfirm}>Confirm</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export class PromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inputValue: string) => void;
  title: string;
  message: (toEditor: string) => string;
  toEditor?: string;
  defaultValue?: string;
  inputValue?: string;
  setInputValue?: (inputValue: string) => void;

  constructor() {
    this.isOpen = false;
    this.onClose = () => {};
    this.onConfirm = () => {};
    this.title = "";
    this.message = () => "";
    this.defaultValue = "";
    this.inputValue = "";
    this.setInputValue = () => {};
  }
}

interface UseConfirmDialogReturn {
  openConfirmDialog: (options: Omit<ConfirmDialogProps, "isOpen" | "onClose">) => void;
  closeConfirmDialog: () => void;
  ConfirmDialogComponent: React.ReactElement;
}

export const useConfirmDialog = (): UseConfirmDialogReturn => {
  const [dialogProps, setDialogProps] = React.useState<ConfirmDialogProps>(new ConfirmDialogProps());

  const closeConfirmDialog = useCallback(() => {
    setDialogProps((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openConfirmDialog = React.useCallback(
    (options: Omit<ConfirmDialogProps, "isOpen" | "onClose">) => {
      setDialogProps({
        ...options,
        isOpen: true,
        onClose: closeConfirmDialog,
        onConfirm: () => {
          if (options.onConfirm) {
            options.onConfirm();
          }
          closeConfirmDialog(); // Ensure dialog closes after confirm
        },
      });
    },
    [closeConfirmDialog]
  );

  const ConfirmDialogComponent = <ConfirmDialog {...dialogProps} />;

  return { openConfirmDialog, closeConfirmDialog, ConfirmDialogComponent };
};

export const PromptDialog: React.FC<PromptDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  toEditor,
  inputValue,
  setInputValue,
}) => {
  const handleConfirm = () => {
    onConfirm(inputValue ?? "");
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action to avoid submitting the form
      handleConfirm();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Trigger asChild />
      <Dialog.Portal>
        <Dialog.Overlay className="overlay-styles">
          <Dialog.Content className="prompt-dialog" style={{ whiteSpace: "pre-line" }}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{message(toEditor ?? "")}</Dialog.Description>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => (setInputValue ? setInputValue(e.target.value) : () => {})}
              onKeyPress={handleKeyPress}
              //onChange={onInputChange}
              className="input-field"
            />
            <div className="actions">
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface UsePromptDialogReturn {
  openPromptDialog: (options: Omit<PromptDialogProps, "isOpen" | "onClose"> & { defaultValue?: string }) => void;
  closePromptDialog: () => void;
  PromptDialogComponent: React.ReactElement;
}

export const usePromptDialog = (): UsePromptDialogReturn => {
  const [dialogProps, setDialogProps] = React.useState<PromptDialogProps>(new PromptDialogProps());
  const [inputValue, setInputValue] = React.useState<string>("");

  const closePromptDialog = useCallback(() => {
    setDialogProps((prev) => ({ ...prev, isOpen: false }));
    setInputValue(""); // Reset input value on close
  }, []);

  const openPromptDialog = useCallback(
    (options: Omit<PromptDialogProps, "isOpen" | "onClose" | "defaultValue"> & { defaultValue?: string }) => {
      setDialogProps({
        ...options,
        isOpen: true,
        onClose: closePromptDialog,
        onConfirm: (inputValue) => {
          if (options.onConfirm) {
            options.onConfirm(inputValue);
          }
          closePromptDialog();
        },
        defaultValue: options.defaultValue ?? "",
      });
      setInputValue(options.defaultValue ?? "");
    },
    [closePromptDialog]
  );

  const handleConfirm = () => {
    dialogProps.onConfirm(inputValue);
  };

  const PromptDialogComponent = (
    <PromptDialog
      {...dialogProps}
      onClose={closePromptDialog}
      onConfirm={handleConfirm}
      defaultValue={inputValue}
      inputValue={inputValue}
      setInputValue={setInputValue}
    />
  );

  return { openPromptDialog, closePromptDialog, PromptDialogComponent };
};

export class AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onOpenChange: (isOpen: boolean) => void; // Added line

  constructor() {
    this.isOpen = false;
    this.title = "";
    this.message = "";
    this.onOpenChange = () => {}; // Adjusted from onClose to onOpenChange
  }
}

export const AlertDialogPrompt: React.FC<AlertDialogProps> = ({ isOpen, onOpenChange, title, message }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={() => onOpenChange(false)}>
      <AlertDialogPortal>
        <AlertDialogOverlay className="AlertDialogOverlay">
          <AlertDialogContent className="AlertDialogContent">
            <div className="AlertDialogBox">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{message}</AlertDialogDescription>
              <AlertDialogCancel asChild>
                <button className="Button mauve">OK</button>
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

interface UseAlertDialogReturn {
  openAlertDialog: (options: Omit<AlertDialogProps, "isOpen" | "onOpenChange">) => void;
  closeAlertDialog: () => void;
  AlertDialogComponent: React.ReactElement;
}

export const useAlertDialog = (): UseAlertDialogReturn => {
  const [dialogProps, setDialogProps] = React.useState<AlertDialogProps>(new AlertDialogProps());

  const closeAlertDialog = useCallback(() => {
    setDialogProps((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openAlertDialog = React.useCallback(
    (options: Omit<AlertDialogProps, "isOpen" | "onOpenChange">) => {
      setDialogProps({
        ...options,
        isOpen: true,
        onOpenChange: closeAlertDialog,
      });
    },
    [closeAlertDialog]
  );

  const AlertDialogComponent = <AlertDialogPrompt {...dialogProps} />;

  return { openAlertDialog, closeAlertDialog, AlertDialogComponent };
};

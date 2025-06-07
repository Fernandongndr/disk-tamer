import React, { useState } from "react";
import { DirectorySelector } from "../File Tree/FileTree";
import { Actions } from "./Actions";
import { ContentRect } from "../typings";
import "./Body.scss";

interface AppContext {
  dirHandle?: FileSystemDirectoryHandle;
  setDirHandle: (dirHandle: FileSystemDirectoryHandle) => void;
}

const ContextInitialState: AppContext = {
  dirHandle: undefined,
  setDirHandle: () => {},
};

export const AppContext = React.createContext(ContextInitialState);

interface BodyProps {
  dimensions: ContentRect | undefined;
}

export const Body: React.FC<BodyProps> = ({ dimensions }) => {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle | undefined>(undefined);

  // Calculate dimensions for the two panels
  const treeWidth = 400; // Fixed width for the directory tree
  const actionsWidth = dimensions?.bounds?.width ? dimensions.bounds.width - treeWidth : undefined;
  const treeDimensions = dimensions
    ? {
        ...dimensions,
        bounds: dimensions.bounds
          ? {
              ...dimensions.bounds,
              width: treeWidth,
              height: dimensions.bounds.height ?? 500,
            }
          : {
              width: treeWidth,
              height: 500,
              top: 0,
              left: 0,
              bottom: 500,
              right: treeWidth,
            },
      }
    : undefined;

  return (
    <AppContext.Provider value={{ dirHandle, setDirHandle }}>
      <div className="body-layout">
        <div className="directory-panel">
          <DirectorySelector dimensions={treeDimensions} />
        </div>
        <div className="actions-panel" style={{ width: actionsWidth }}>
          <Actions />
        </div>
      </div>
    </AppContext.Provider>
  );
};

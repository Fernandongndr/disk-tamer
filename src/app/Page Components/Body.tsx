import React, { useState } from "react";
import { DirectorySelector } from "../File Tree/FileTree";
import { ContentRect } from "../typings";

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

  return (
    <AppContext.Provider value={{ dirHandle, setDirHandle }}>
      <DirectorySelector dimensions={dimensions} />
    </AppContext.Provider>
  );
};

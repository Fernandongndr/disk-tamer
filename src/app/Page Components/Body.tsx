import React, { useState } from "react";

interface AppContext {
  dirHandle?: FileSystemDirectoryHandle;
  setDirHandle: (dirHandle: FileSystemDirectoryHandle) => void;
}

const ContextInitialState: AppContext = {
  dirHandle: undefined,
  setDirHandle: () => {},
};

export const AppContext = React.createContext(ContextInitialState);

export const Body: React.FC = () => {
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle | undefined>(undefined);

  return (
    <AppContext.Provider value={{ dirHandle, setDirHandle }}>
      <div>
        <h1>Disk Tamer App</h1>
      </div>
    </AppContext.Provider>
  );
};

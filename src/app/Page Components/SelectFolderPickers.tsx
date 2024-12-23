import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { OpenMap } from "react-arborist/dist/main/state/open-slice";
import createTreeFromDirectory, { ArboristNode } from "../File Tree/CreateTreeFromDirectory";
import { TreeApi } from "react-arborist";
import { AppContext } from "../Page Components/Body";
import { ArchiveIcon } from "@radix-ui/react-icons";

interface SelectFolderPickerProps {
  openNodes: OpenMap;
  treeRef: React.RefObject<TreeApi<ArboristNode> | null>;
  setData: React.Dispatch<React.SetStateAction<ArboristNode>>;
}

export const SelectFolderPicker: React.FC<SelectFolderPickerProps> = ({ openNodes, treeRef, setData }) => {
  const [folders, setFolders] = React.useState<Array<{ folderName: string; handle: FileSystemDirectoryHandle }>>([]);
  const { dirHandle, setDirHandle } = React.useContext(AppContext);

  // Closes all nodes and updates it's map to reflect the changes
  const closeAllNodes = () => {
    for (const nodeId in openNodes) {
      if (openNodes.hasOwnProperty(nodeId)) {
        openNodes[nodeId] = false;
        if (treeRef.current) {
          treeRef.current.close(nodeId);
        }
      }
    }
  };

  React.useEffect(() => {
    if (dirHandle) setDirHandle(dirHandle);
  }, [dirHandle, setDirHandle]);

  const handleChangeFolder = async () => {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      if (directoryHandle) {
        setDirHandle(directoryHandle);
        closeAllNodes();
        await handleSelectDirectory(setData, directoryHandle);
        setFolders([...folders, { folderName: directoryHandle.name, handle: directoryHandle }]);
      }
    } catch (error) {
      console.error("An error occurred during folder selection: ", error);
    }
  };

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            id="edit-from-new-folder"
            className="invisible-button"
            onClick={() => {
              handleChangeFolder();
            }}
          >
            <ArchiveIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            Select folder to edit
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

// Function to present the folder picker to the user and request permission to read/write from it
export async function handleSelectDirectory(
  setData: React.Dispatch<React.SetStateAction<ArboristNode>>,
  dirHandle: FileSystemDirectoryHandle
) {
  if ((await dirHandle.requestPermission({ mode: "readwrite" })) !== "granted") {
    return alert("Access to folder needed to read and write files.");
  }

  const treeDataObject: { node: ArboristNode } = await createTreeFromDirectory(dirHandle);
  const treeData = treeDataObject.node;
  setData(treeData);
}

import * as React from "react";
import { OpenMap } from "react-arborist/dist/main/state/open-slice";
import createTreeFromDirectory, { ArboristNode } from "../File Tree/CreateTreeFromDirectory";
import { TreeApi } from "react-arborist";
import { AppContext } from "../Page Components/Body";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { TooltipButton } from "../UI Elements/StyledComponents";
import { useTranslation } from "../Translations/TranslationsContext";
import { translate } from "../Translations/Translations";

interface SelectFolderPickerProps {
  openNodes: OpenMap;
  treeRef: React.RefObject<TreeApi<ArboristNode> | null>;
  setData: React.Dispatch<React.SetStateAction<ArboristNode>>;
}

export const SelectFolderPicker: React.FC<SelectFolderPickerProps> = ({ openNodes, treeRef, setData }) => {
  const [folders, setFolders] = React.useState<Array<{ folderName: string; handle: FileSystemDirectoryHandle }>>([]);
  const { dirHandle, setDirHandle } = React.useContext(AppContext);
  const { language } = useTranslation();

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
      if (error instanceof Error && error.name === "AbortError") {
        console.warn("Folder selection was aborted by the user.");
      } else {
      console.error("An error occurred during folder selection: ", error);
      }
    }
  };

  return (
    <TooltipButton
      tooltip={translate("Select folder to edit", language)}
      onClick={() => {
        handleChangeFolder();
      }}
    >
      <ArchiveIcon />
    </TooltipButton>
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

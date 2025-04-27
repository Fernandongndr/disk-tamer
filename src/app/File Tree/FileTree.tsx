import React, { useRef, useState } from "react";
import { Tree, TreeApi } from "react-arborist";
import { ArboristNode, emptyNode } from "./CreateTreeFromDirectory";
import { OpenMap } from "react-arborist/dist/main/state/open-slice";
import { Node } from "./TreeNode";
import { SelectFolderPicker } from "../Page Components/SelectFolderPickers";
import { ContentRect } from "../typings";
import { TooltipButton } from "../UI Elements/StyledComponents";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import "./FileTree.scss";

interface DirectorySelectorProps {
  dimensions: ContentRect | undefined;
}

// Directory selector component to read files from disk and load the editor
export const DirectorySelector: React.FC<DirectorySelectorProps> = ({ dimensions }) => {
  const treeRef = useRef<TreeApi<ArboristNode> | null>(null);
  const [data, setData] = useState<ArboristNode>(emptyNode);
  const [openNodes, setOpenNodes] = useState<OpenMap>({});

  // Stores expanded states in the tree
  const handleToggle = (id: string) => {
    const newOpenMap = { ...openNodes, [id]: !openNodes[id] };
    setOpenNodes(newOpenMap);
  };

  return (
    <>
      <div className="tree-controls">
        <SelectFolderPicker openNodes={openNodes} treeRef={treeRef} setData={setData} />

        {treeRef.current && (
          <>
            <TooltipButton tooltip="Expand all folders" onClick={() => treeRef.current?.openAll()}>
              <PlusIcon style={{ marginRight: "0.5em" }} />
            </TooltipButton>
            <TooltipButton tooltip="Collapse all folders" onClick={() => treeRef.current?.closeAll()}>
              <MinusIcon style={{ marginRight: "0.5em" }} />
            </TooltipButton>
          </>
        )}
      </div>
      {data !== emptyNode && (
        <div className="tree-wrapper">
          <div className="tree-content" style={{ width: dimensions?.bounds?.width }}>
            <Tree
              className="tree-root"
              width={dimensions?.bounds?.width}
              height={dimensions?.bounds?.height ?? 500 - 100}
              ref={treeRef}
              data={[data]}
              onActivate={() => {}}
              onToggle={handleToggle}
              initialOpenState={openNodes}
              openByDefault={false}
              //searchTerm={searchTerm}
              // searchMatch={(node, term) => {
              //   // Matches the provided string
              //   if (node.data.name.toLowerCase().includes(term.toLowerCase())) {
              //     return true;
              //   }
              //   // Matches language codes of parent document
              //   if (node.parent?.data?.name?.toLowerCase().includes(term.toLowerCase())) {
              //     return true;
              //   }
              //   return false;
              // }}
            >
              {Node()}
            </Tree>
          </div>
        </div>
      )}
    </>
  );
};

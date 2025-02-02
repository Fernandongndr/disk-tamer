import React, { useRef, useState } from "react";
import { Tree, TreeApi } from "react-arborist";
import { ArboristNode, emptyNode } from "./CreateTreeFromDirectory";
import { OpenMap } from "react-arborist/dist/main/state/open-slice";
import { Node } from "./TreeNode";
import { SelectFolderPicker } from "../Page Components/SelectFolderPickers";
import { ContentRect } from "../typings";
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
      <SelectFolderPicker openNodes={openNodes} treeRef={treeRef} setData={setData} />
      {data !== emptyNode && (
        <div className="tree-wrapper">
          <div className="tree-content" style={{ width: dimensions?.bounds?.width }}>
            <Tree
              className="tree-root"
              width={dimensions?.bounds?.width}
              height={dimensions?.bounds?.height}
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

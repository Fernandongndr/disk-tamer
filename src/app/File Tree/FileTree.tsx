import React, { useRef, useState } from "react";
import { Tree, TreeApi } from "react-arborist";
import { ArboristNode, emptyNode } from "./CreateTreeFromDirectory";
import { OpenMap } from "react-arborist/dist/main/state/open-slice";
import { Node } from "./TreeNode";
import { SelectFolderPicker } from "../Page Components/SelectFolderPickers";

// Directory selector component to read files from disk and load the editor
export const DirectorySelector: React.FC = () => {
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
      <Tree
        className="tree-root"
        ref={treeRef}
        height={500}
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
    </>
  );
};

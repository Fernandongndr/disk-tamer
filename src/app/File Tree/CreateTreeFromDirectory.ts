import { v4 as uuidv4 } from "uuid";

// Recursive function to create an object that react-arborist will be able to interpret as a file tree
// TODO: Filter the tree to remove translation files that are in the same level as the originals
export interface ArboristNode {
  id: string;
  name: string;
  children?: ArboristNode[];
  isFile: boolean;
  parent: ArboristNode | null;
}

export const emptyNode: ArboristNode = {
  id: "empty-node-id",
  name: "",
  isFile: false,
  parent: null,
};

async function createTreeFromDirectory(
  dirHandle: FileSystemDirectoryHandle,
  existingNode?: ArboristNode,
  parentNode?: ArboristNode,
  level?: number
): Promise<{ node: ArboristNode }> {
  if (!level) level = 0;
  const node: ArboristNode = {
    id: dirHandle.name + level.toString(),
    name: dirHandle.name,
    children: [],
    isFile: false,
    parent: parentNode ? parentNode : null,
  };
  const parentNodeTemp = { ...node, children: [] as ArboristNode[] };

  const iterator = dirHandle.values();

  const entriesArray: string[] = [];
  for await (const entry of iterator) {
    entriesArray.push(entry.name.toLowerCase());
  }

  const iterator2 = dirHandle.values();
  for await (const entry of iterator2) {
    if (entry.kind === "file") {
      //logger.debug('Processing file entry');
    } else if (entry.kind === "directory") {
      level++;
      const { node: childNode } = await createTreeFromDirectory(entry, existingNode, parentNodeTemp, level);
      level--;
      childNode.children?.filter((child) => {
        return child.children?.length && child.children?.length > 0;
      });
      if (childNode.name !== "Images") node.children?.push(childNode);
    }
  }

  //console.log(node);

  const childrenArray: { [key: string]: ArboristNode[] } = {};
  node.children?.map((child) => {
    if (child.children && child.isFile === false && child.name !== "New file.." && child.children.length > 0) {
      childrenArray[child.name] = child.children;
    }
  });

  if (node.children && !node.isFile) {
    node.children.unshift({ id: uuidv4(), name: "New file..", isFile: false, parent: parentNodeTemp });
  }
  return { node };
}

export default createTreeFromDirectory;

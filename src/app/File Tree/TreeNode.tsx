import React from "react";
//import * as Tooltip from "@radix-ui/react-tooltip";
import { ArboristNode } from "./CreateTreeFromDirectory";
import { NodeRendererProps, NodeApi } from "react-arborist";

// interface NodeProps {
//   setData: (data: ArboristNode) => void;
//   activeFilter: string[];
//   openConfirmDialog: (options: Omit<ConfirmDialogProps, "isOpen" | "onClose">) => void;
//   handleSelectFile: (node: NodeApi<ArboristNode>, editor: number) => void;
// }

// tips on customizing Node in https://blog.logrocket.com/using-react-arborist-create-tree-components/
export const Node = () => {
  const TreeNode = ({ node, style, dragHandle }: NodeRendererProps<ArboristNode>) => {
    //const [isChecked, setIsChecked] = React.useState(0);
    // State to track hover status
    //const [isHovered, setIsHovered] = useState(false);

    // Choose the appropriate icon based on whether the node is file, a folder or a language
    // https://symbl.cc/en/unicode/blocks/miscellaneous-symbols-and-pictographs/#subblock-1F5BF <- some symbols here
    const icon = node.data.isFile ? "📄" : node.isOpen ? "📂" : "📁";

    const caret = node.children ? (node.isOpen ? "▼" : "▶") : null;

    // Choose checkbox state dynamically
    /*     let checkbox;
    switch (node.data.isChecked) {
      case 0:
        checkbox = "☐";
        break;
      case 1:
        checkbox = "☑";
        break;
      case 2:
        checkbox = "◪";
        break;
      default:
        checkbox = "☐";
		} */

    const selectionStatus = getSelectionStatus(node);

    let checkboxIcon;
    switch (selectionStatus) {
      case 0:
        checkboxIcon = "☐";
        break;
      case 1:
        checkboxIcon = "☑";
        break;
      case 2:
        checkboxIcon = "◪";
        break;
    }

    return (
      <div
        className="filetree-node-container"
        style={{ ...style, display: "flex", justifyContent: "space-between", alignItems: "center" }}
        ref={dragHandle}
        onMouseDown={(e) => {
          // Bloqueia a seleção padrão do Arborist ao clicar em qualquer parte do node
          e.preventDefault();
        }}
        onClick={(e) => {
          // Permite apenas toggle de expansão quando clicado fora da checkbox
          e.stopPropagation();
          if (node.isInternal) {
            node.toggle();
          }
        }}
        //onMouseEnter={handleMouseEnter}
        //onMouseLeave={handleMouseLeave}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {caret}
          <span
            onClick={(e) => {
              e.stopPropagation();

              const shouldSelect = getSelectionStatus(node) !== 1;

              expandAndSelectOptimized(node, shouldSelect);
              updateParentSelectionStatus(node.parent);
            }}
            style={{ marginRight: "5px", cursor: "pointer" }}
          >
            {checkboxIcon}
          </span>
          {icon} {node.data.name}
          {/* {node.data.name.endsWith("invalid") && (
            <Tooltip.Provider delayDuration={200}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span>&nbsp;⚠</span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="TooltipContent" sideOffset={5}>
                    Translation files must be located within the designated document folder
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          )} */}
        </div>
      </div>
    );
  };
  return TreeNode;
};

// function expandAndSelect(node: NodeApi<ArboristNode>, selected: boolean) {
//   if (!node.data.isFile && !node.isOpen) {
//     node.open(); // garante que os filhos sejam montados
//   }

//   if (selected) {
//     node.selectMulti();
//   } else {
//     node.deselect();
//   }

//   // Recursivamente trata os filhos
//   for (const child of node.children ?? []) {
//     expandAndSelect(child, selected);
//   }
// }

function getSelectionStatus(node: NodeApi<ArboristNode>): 0 | 1 | 2 {
  const children = node.children ?? [];

  if (children.length === 0) return node.isSelected ? 1 : 0;

  const statuses = children.map(getSelectionStatus);
  const allSame = statuses.every((s) => s === statuses[0]);

  return allSame ? statuses[0] : 2;
}

function updateParentSelectionStatus(node: NodeApi<ArboristNode> | null) {
  if (!node) return;

  const status = getSelectionStatus(node);

  if (status === 1) node.selectMulti();
  else if (status === 0) node.deselect();
  // If status === 2, don't change selection,
  // only visuals "◪"

  updateParentSelectionStatus(node.parent);
}

function expandAndSelectOptimized(node: NodeApi<ArboristNode>, selected: boolean) {
  if (!node.data.isFile && !node.isOpen) {
    node.open();
  }

  if (selected && !node.isSelected) {
    node.selectMulti();
  } else if (!selected && node.isSelected) {
    node.deselect();
  }

  for (const child of node.children ?? []) {
    expandAndSelectOptimized(child, selected);
  }
}

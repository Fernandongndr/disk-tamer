import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ArboristNode } from "./CreateTreeFromDirectory";
import { NodeRendererProps } from "react-arborist";

// interface NodeProps {
//   setData: (data: ArboristNode) => void;
//   activeFilter: string[];
//   openConfirmDialog: (options: Omit<ConfirmDialogProps, "isOpen" | "onClose">) => void;
//   handleSelectFile: (node: NodeApi<ArboristNode>, editor: number) => void;
// }

// tips on customizing Node in https://blog.logrocket.com/using-react-arborist-create-tree-components/
export const Node = () => {
  const TreeNode = ({ node, style, dragHandle }: NodeRendererProps<ArboristNode>) => {
    // State to track hover status
    //const [isHovered, setIsHovered] = useState(false);

    // Choose the appropriate icon based on whether the node is file, a folder or a language
    // https://symbl.cc/en/unicode/blocks/miscellaneous-symbols-and-pictographs/#subblock-1F5BF <- some symbols here
    let icon: string;
    if (node.data.isFile) {
      icon = "🗎";
    } else if (node.children && !node.isOpen) {
      //icon = '🗀'
      icon = "📁";
    } else if (node.children && node.isOpen) {
      icon = "📂";
    } else if (node.data.name === "New file..") {
      icon = "✏️";
    } else {
      icon = "🌐";
    }

    let caret;
    if (node.children && !node.isOpen) {
      //icon = '🗀'
      caret = "▶";
    } else if (node.children && node.isOpen) {
      caret = "▼";
    }

    // Handlers for mouse enter and leave
    //const handleMouseEnter = () => setIsHovered(true);
    //const handleMouseLeave = () => setIsHovered(false);

    return (
      <div
        className="filetree-node-container"
        style={{ ...style, display: "flex", justifyContent: "space-between", alignItems: "center" }}
        ref={dragHandle}
        onClick={() => node.isInternal && node.toggle()}
        //onMouseEnter={handleMouseEnter}
        //onMouseLeave={handleMouseLeave}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {caret} {icon} {node.data.name}
          {node.data.name.endsWith("invalid") && (
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
          )}
        </div>
      </div>
    );
  };
  return TreeNode;
};

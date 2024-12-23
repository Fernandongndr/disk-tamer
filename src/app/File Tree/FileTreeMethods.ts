import { NodeApi } from 'react-arborist';
import { ArboristNode } from './CreateTreeFromDirectory';

// Function to get the path to the selected file using the node from the tree
export function getPath(node: NodeApi<ArboristNode>, isTranslation: boolean) {
	// Initializes the path array
	let pathArray: string[] = [];

	// Recursive function to populate the path
	const traverseParent = (n: NodeApi<ArboristNode>, skipFirst = isTranslation) => {
		if (n.parent) {
			if (!skipFirst && !n.parent.data.isFile) {
				pathArray.unshift(n.parent.data.name);
			}
			// Recursively check for more parents, disable skip for subsequent parents
			traverseParent(n.parent, false);
		}
	};

	// Start the traversal from the initial node
	traverseParent(node);

	// Removes the 'parent' of the root folder that doesn't have a 'name' attribute, so it returns undefined
	pathArray.shift();

	// Removes the root folder, not needed for a relative path
	pathArray.shift();

	return pathArray;
}
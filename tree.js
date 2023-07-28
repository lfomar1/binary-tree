import Node from "./node.js";
class Tree {
  constructor(value) {
    this.root = this.buildTree(value);
  }

  sortArray(array) {
    const newSortArray = [...new Set(array)].sort((a, b) => a - b);
    return newSortArray;
  }
  buildTree(value) {
    const newSortTree = this.sortArray(value);
    return this.constructTreeFromSortedArray(newSortTree);
  }

  constructTreeFromSortedArray(sortedArray) {
    if (sortedArray.length === 0) {
      return null;
    }

    const arrayHalf = Math.floor(sortedArray.length / 2);
    const rootValue = sortedArray[arrayHalf];

    const root = new Node(rootValue);
    root.left = this.constructTreeFromSortedArray(
      sortedArray.slice(0, arrayHalf)
    );
    root.right = this.constructTreeFromSortedArray(
      sortedArray.slice(arrayHalf + 1)
    );

    return root;
  }
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }
    this.insertRecursive(this.root, value);
  }
  insertRecursive(node, value) {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this.insertRecursive(node.left, value);
      }
    }
    if (value > node.value) {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this.insertRecursive(node.right, value);
      }
    }
  }
  delete(value) {
    this.root = this.deleteRecursive(this.root, value);
  }
  deleteRecursive(root, value) {
    if (!root) {
      return null;
    }

    if (value < root.value) {
      root.left = this.deleteRecursive(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteRecursive(root.right, value);
    } else {
      // Node with only one child or no child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // Node with two children: Get the in-order successor (smallest in the right subtree)
      root.value = this.findMinValue(root.right);

      // Delete the in-order successor from the right subtree
      root.right = this.deleteRecursive(root.right, root.value);
    }

    return root;
  }

  findMinValue(root) {
    while (root.left) {
      root = root.left;
    }
    return root.value;
  }
  find(value) {
    return this.findRecursive(this.root, value);
  }

  findRecursive(node, value) {
    if (!node) {
      return false; // Value not found
    }

    if (value === node.value) {
      return true; // Value found
    } else if (value < node.value) {
      return this.findRecursive(node.left, value);
    } else {
      return this.findRecursive(node.right, value);
    }
  }
  levelOrder(fn) {
    if (!this.root) {
      return; // Empty tree, nothing to traverse
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      fn(node.value);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  inorder(fn) {
    const result = [];
    this.inorderRecursive(this.root, fn || ((value) => result.push(value)));
    return result;
  }

  inorderRecursive(node, fn) {
    if (!node) {
      return;
    }

    this.inorderRecursive(node.left, fn);
    fn(node.value);
    this.inorderRecursive(node.right, fn);
  }

  preorder(fn) {
    const result = [];
    this.preorderRecursive(this.root, fn || ((value) => result.push(value)));
    return result;
  }

  preorderRecursive(node, fn) {
    if (!node) {
      return;
    }

    fn(node.value);
    this.preorderRecursive(node.left, fn);
    this.preorderRecursive(node.right, fn);
  }

  postorder(fn) {
    const result = [];
    this.postorderRecursive(this.root, fn || ((value) => result.push(value)));
    return result;
  }

  postorderRecursive(node, fn) {
    if (!node) {
      return;
    }

    this.postorderRecursive(node.left, fn);
    this.postorderRecursive(node.right, fn);
    fn(node.value);
  }
  height(node) {
    if (!node) {
      return -1; // Height of null node is -1 (no edges)
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node) {
    if (!node) {
      return -1; // Depth of null node is -1 (no edges)
    }

    return this.depthRecursive(node, this.root, 0);
  }

  depthRecursive(node, current, depthCount) {
    if (!current) {
      return -1; // Depth of null node is -1 (no edges)
    }

    if (current === node) {
      return depthCount; // Return the depth when the target node is found
    }

    // Continue searching in the left and right subtrees
    const leftDepth = this.depthRecursive(node, current.left, depthCount + 1);
    if (leftDepth !== -1) {
      return leftDepth;
    }

    const rightDepth = this.depthRecursive(node, current.right, depthCount + 1);
    return rightDepth;
  }
  isBalancedRecursive(node) {
    if (!node) {
      return 0; // Height of null node is 0
    }

    const leftHeight = this.isBalancedRecursive(node.left);
    if (leftHeight === -1) {
      return -1; // Left subtree is unbalanced, propagate the unbalance
    }

    const rightHeight = this.isBalancedRecursive(node.right);
    if (rightHeight === -1) {
      return -1; // Right subtree is unbalanced, propagate the unbalance
    }

    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) {
      return -1; // Tree is unbalanced, propagate the unbalance
    }

    return Math.max(leftHeight, rightHeight) + 1; // Return the height of the current node
  }
  rebalance() {
    const sortedValues = this.inorder(); // Use any traversal method you prefer
    this.root = this.buildTree(sortedValues);
  }
}

// const newTree = new Tree([1, 2, 3, 4]);
// newTree.insert(5);
// newTree.delete(4);
// console.log(newTree);
// console.log(`Is it ${newTree.find(2)}, it found the number inside`);
// function printValue(value) {
//   console.log(value);
// }

// newTree.levelOrder(printValue);
export default Tree;

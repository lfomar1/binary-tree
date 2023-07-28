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
    const arrayHalf = parseInt(newSortTree.length / 2);
    const root = newSortTree[arrayHalf];
    const arrayLeft = newSortTree.slice(0, arrayHalf);
    const arrayRight = newSortTree.slice(arrayHalf + 1);
    const arrayLeftMaxNum = Math.max(...arrayLeft);
    const arrayRightMinNum = Math.min(...arrayRight);

    const newTree = new Node(root);
    newTree.left = arrayLeftMaxNum;
    newTree.right = arrayRightMinNum;
    return newTree;
  }
}

const newTree = new Tree([1, 2, 3, 4]);
console.log(newTree);
export default Tree;

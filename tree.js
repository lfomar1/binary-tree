import Node from "./node.js";
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  #sortArray(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return sortedArray;
  }

  buildTree(array) {
    let sortedArray = this.#sortArray(array);
    if (sortedArray.length === 0) return;

    // We need to basically split half, of the array that we passed.
    const midArray = parseInt(sortedArray.length / 2);

    // And we need to create a sorted
    const root = new Node(
      sortedArray[midArray],
      this.buildTree(sortedArray.slice(0, midArray)),
      this.buildTree(sortedArray.slice(midArray + 1))
    );
    return root;
  }

  //Insert new values
  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    if (root.key < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    return root;
  }
}

const newTree = new Tree([1, 2, 3, 4]);
newTree.insert(5);
console.log(newTree);
export default Tree;

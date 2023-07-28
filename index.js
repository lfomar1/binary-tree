import Tree from "./tree.js";

const newTree = new Tree([1, 2, 3, 4]);
newTree.insert(5);
newTree.delete(4);
console.log(newTree);
console.log(`Is it ${newTree.find(2)}, it found the number inside`);
function printValue(value) {
  console.log(value);
}

newTree.levelOrder(printValue);

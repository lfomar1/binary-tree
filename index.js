function sortedArray(array) {
  const sortedArray = [...new Set(array)].sort((a, b) => a - b);
  return sortedArray;
}

const newArray = sortedArray([4, 1, 5, 2, 3, 2, 5, 8, 8]);
const mid = parseInt(newArray.length / 2);

console.log(newArray.slice(0, mid));
console.log(newArray.slice(mid + 1));

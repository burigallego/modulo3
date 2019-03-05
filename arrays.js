// let n = 4;

// let arr = Array(n);

// arr[0] = "4 6 -1 5".split(" ").map(arrTemp => parseInt(arrTemp, 10));
// arr[1] = "7 2 4 7".split(" ").map(arrTemp => parseInt(arrTemp, 10));
// arr[2] = "10 4 3 3".split(" ").map(arrTemp => parseInt(arrTemp, 10));
// arr[3] = "10 4 3 -5".split(" ").map(arrTemp => parseInt(arrTemp, 10));

// function diagonalDifference(arr) {
//   let sum = arr.reduce((total, current, index) => {
//     return total + current[index];
//   }, 0);
//   let rest = arr.reduce((total, current, index) => {
//     return total + current[arr.length - 1 - index];
//   }, 0);
//   return sum - rest;
// }

// console.log(diagonalDifference(arr));

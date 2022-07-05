/**
 * 建立連續的數字陣列
 */

const arr = [...Array(10).keys()];
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const brr = Array.from(Array(10), (item, index) => index);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

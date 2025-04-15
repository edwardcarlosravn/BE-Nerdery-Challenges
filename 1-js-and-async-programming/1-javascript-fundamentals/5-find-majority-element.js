/* 
Challenge: "Find Majority Element";

The function findMajorityElement accepts an array of numbers and returns the majority element if it exists, otherwise returns null. The majority element is the element that appears more than n/2 times in the array.

Requirements:
- The function should handle arrays of any length.
- The function should return the majority element if it exists, otherwise return null.
- The function should be efficient and handle large arrays.
- The function should not modify the original array.

Example:
findMajorityElement([1, 2, 3, 1, 1]); // Expected output: 1
findMajorityElement([1, 2, 3, 4]); // Expected output: null
findMajorityElement([1, 1, 2, 2, 2]); // Expected output: 2
findMajorityElement([1, 2, 2, 3, 3, 3]); // Expected output: null
findMajorityElement([1, 2, 3, 4, 5]); // Expected output: null


*/

const findMajorityElement = (arr) => {
    if(arr.length < 1) return null;
    if(arr.length === 1) return arr[0];
    let candidate = null;
    let count = 0; 
    for(num of arr){
        if(count === 0){
            candidate = num;
            count = 1;
        } else if(candidate === num){
            count++
        }else{
            count--;
        }
    }
    count = arr.filter(num => num === candidate).length;
    return (count > arr.length/2) ? candidate : null;
};

module.exports = findMajorityElement;

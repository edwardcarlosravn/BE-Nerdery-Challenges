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
    const arraysorter = arr.sort();
    let acc = 0;
    const midterm = arr[Math.floor(arraysorter.length/2)];
    for(let i = 0 ; i <= arraysorter.length ; i++){
        if(arraysorter[i] === midterm){
            acc++;
        }
    }
    return acc >= arraysorter.length/2 ? midterm : null;
};

module.exports = findMajorityElement;
/*
Challenge 1

"Time difference calculator"

The function timeDifference accepts two positive numbers representing time in seconds. You should modify the function to return the difference between the two times in a human-readable format HH:MM:SS.

Requirements:
- The function should accept two positive numbers representing time in seconds.
- The function should return the absolute difference between the two times.
- The result should be formatted as HH:MM:SS.

Example:

timeDifference(7200, 3400); // Expected output: "01:03:20"

*/

const timeDifference = (a, b) => {
    if( a < 0 || b < 0) throw new Error('');
    if( a === 0 && b === 0) return '00:00:00';
    const differenceInSeconds = Math.abs(a - b);
    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor(differenceInSeconds / 60) % 60;
    const seconds = differenceInSeconds % 60;
    const padWidthZero = String(num).padStart(2, '0')
    return `${padWidthZero(hours)}:${padWidthZero(minutes)}:${padWidthZero(seconds)}`;
};

module.exports = timeDifference;

/**
 * Challenge: Create a deep clone function
 *
 * Create a function that takes an object and returns a deep clone of that object. The function should handle nested objects, arrays, and primitive types.
 *
 * Requirements:
 * - The function should accept an object of any type.
 * - It should return a new object that is a deep clone of the original object.
 * - The function should handle nested objects and arrays.
 * - It should handle primitive types (strings, numbers, booleans, null, undefined).
 * - The function should not use any external libraries
 */

//? implement the function  here
export function deepClone<T>(value: T): T {
    if(value === null || value === undefined) return value;
    if(typeof value !== 'object') return value;
    if(value instanceof Date) return new Date(value.getTime()) as T;
    if(value instanceof RegExp) return new RegExp(value.source, value.flags) as T;
    if(Array.isArray(value)){
        return value.map(item => deepClone(item)) as T;
    }
    if(value instanceof Map){
        const clonedMap = new Map();
        value.forEach((val, key) => {
            clonedMap.set(deepClone(key), deepClone(val));
        })
        return clonedMap as T;
    }
    if(value instanceof Set){
        const clonedSet = new Set();
        value.forEach(val => {
            clonedSet.add(deepClone(val));
        })
        return clonedSet as T;
    }
    const cloneObject = {} as T;
    for(const key in value){
        if(Object.prototype.hasOwnProperty.call(value,key)){
            cloneObject[key] = deepClone(value[key]);
        }
    }
    return cloneObject

}
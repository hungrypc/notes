# Arrays

## Find Maximum in Sliding Window
Given a large array of integers and a window of size w, find the current maximum value in the window as the window slides through the entire array.

```js
// findMaxSlidingWindow([1,2,3,4,3,2,1,2,5] returns [4,4,4,4,3,5]
function findMaxSlidingWindow(arr, num) {
    const windowArr = []
    const result = []
    for (let i = 0; i < num; i++) {
        windowArr.push(arr[i])
    }
    result.push(Math.max(...windowArr))
    for (let i = num; i < arr.length; i++) {
        windowArr.shift()
        windowArr.push(arr[i])
        result.push(Math.max(...windowArr))
    }
    return result
};
```

## Rotate an Array by N Elements
Given an array of integers, rotate the array by N elements where N is an integer:

- For positive values of NN, perform a right rotation.
- For negative values of NN, perform a left rotation.
Make sure you make changes to the original array.

```js
function rotateArray(arr, n) {
    const length = arr.length

    if (n < 0) {
        // calc postive rotations
        n += length
    }

    let temp = []
    for (let i = 0; i < n; i++) {
        // copy last N elements of arr into temp
        temp[i] = arr[length - n + i]
    }

    // shift original arr
    for (let i = length - 1; i >= n; i--) {
        arr[i] = arr[i - n]
    }

    // copy temp into arr
    for (let i = 0; i < n; i++) {
        arr[i] = temp[i]
    }
};
```

## Search a Rotated Array

Search for a given number in a sorted array, with unique elements, that has been rotated by some arbitrary number. Return -1 if the number does not exist.

Linear search is not an acceptable solution. Solve using binary search.

```js
function binarySearchRotated(arr, key) {
    let left = 0
    let right = arr.length - 1
    let start
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (arr[mid] > arr[right]) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    start = left
    left = 0
    right = arr.length - 1
    if (key >= arr[start] && key <= arr[right]) {
        left = start
    } else {
        right = start
    }

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (arr[mid] === key) return mid
        if (arr[mid] > key) right = mid - 1
        else left = mid + 1
    }

    return -1
};
```

## Move All Zeroes to the Beginning of the Array

Given an integer array, move all elements that are 0 to the left while maintaining the order of other elements in the array. The array has to be modified in-place.

```js
function moveZeroesToLeft(arr) {
    let readIndex = arr.length - 1
    let writeIndex = arr.length - 1

    while (readIndex >= 0) {
        if (arr[readIndex] !== 0) {
            arr[writeIndex] = arr[readIndex]
            writeIndex--
        }
        readIndex--
    }

    while (writeIndex >= 0) {
        arr[writeIndex] = 0
        writeIndex--
    }

    return arr 
}
```

## Find the Smallest Common Number
Given three integer arrays sorted in ascending order, return the smallest number that is common in all three arrays.

```js
function findSmallestCommonNumber(arr1, arr2, arr3) {
    let i = 0
    let j = 0
    let k = 0

    while (i < arr1.length && j < arr2.length && k < arr3.length) {
        if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) return arr1[i]

        if (arr1[i] <= arr2[j] && arr1[i] <= arr3[k]) i++
        else if (arr2[j] <= arr1[i] && arr2[j] <= arr3[k]) j++
        else if (arr3[k] <= arr1[i] && arr3[k] <= arr2[j]) k++
    }

    return -1
}
```


























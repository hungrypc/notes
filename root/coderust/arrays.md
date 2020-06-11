# Arrays

## Find Maximum in Sliding Window
Given a large array of integers and a window of size ww, find the current maximum value in the window as the window slides through the entire array.

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
Given an array of integers, rotate the array by NN elements where NN is an integer:

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
        arr[i] = temp[i - n]
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

## Find Longest Subarray by Sum

Given an array and a number `n`, return the indices of the longest subarray that sum to `n`.

```js
function findLongestSubarrayBySum(arr, n) {
    let left = 0
    let right = 0
    let sum = 0
    let result = [0, 0]

    while (right < arr.length) {
        sum += arr[right]
        while (left < right && sum > n) {
            sum -= arr[left++]
        }
        if (sum === n && result[1] - result[0] < left - right) {
            result = [left, right]
        }
        right++
    }
    return result
}
const array = [ 8, 6, 4, 3, 2, 6, 4, 2, 3, 1, 5, 6]
findLongestSubarrayBySum(array, 15) // [6, 10]
```

## Maximum Subarray
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

```js
function maxSubArray(nums) {
    let maxSum = nums[0]
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] > 0) nums[i] += nums[i - 1]
        maxSum = Math.max(nums[i], maxSum)
    }
    return maxSum
}
```

























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

## Find the First Duplicate in an Array
Given an array a that contains only numbers in the range from 1 to a.length, find the first duplicate number for which the second occurrence has the minimal index. In other words, if there are more than 1 duplicated numbers, return the number for which the second occurrence has a smaller index than the second occurrence of the other number does. If there are no such elements, return -1.

Constraints: O(n) time and O(1) space

```js
function firstDuplicate(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[Math.abs(a[i]) - 1] < 0) return Math.abs(arr[i])
        arr[Math.abs(a[i]) - 1] = -arr[Math.abs(a[i]) - 1] 
    }
    return -1
}
```

## Find Minumum in Rotated Sorted Array
Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

Find the minimum element.

You may assume no duplicate exists in the array.

Constraints: O(log n) time complexity

```js
function findMin(arr) {
    let left = 0
    let right = arr.length - 1

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2)

        if (mid > 0 && arr[mid] < arr[mid - 1]) {
            return arr[mid]
        } else if (arr[mid] >= arr[right] && arr[mid] >= arr[left]) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return arr[left]
}
```

## Merge Intervals
Given a collection of intervals, merge all overlapping intervals.

```js
// Input: [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals

    const sorted = intervals.sort((a, b) => a - b)
    let merged = [sorted[0]]

    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i]
        let lastMerged = merged[merged.length - 1]

        if (lastMerged[1] >= current[0]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1])
        } else {
            merged.push(current)
        }
    }
    return merged
};
```

## Longest Palindrome Substring (not array, but worth keeping note of)
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

```js
// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.

function longestPalindrome(s) {
    if (!s || s.length === 0) return ""
    
    let start = 0
    let end = 0
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandFromMiddle(s, i, i)
        const len2 = expandFromMiddle(s, i, i + 1)
        const len = Math.max(len1, len2)
        if (len > end - start) {
            start = i - ((len - 1) / 2)
            end =  i + (len / 2)
        }
    }
    
    return s.substring(Math.round(start), end + 1)
    
};

function expandFromMiddle(str, left, right) {
    if (!str || left > right) return 0
    
    while (left >= 0 && right < str.length && str.charAt(left) === str.charAt(right)) {
        left--
        right++
    }
    
    return right - left - 1
}
```






















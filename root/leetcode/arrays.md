# Arrays

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

    const sorted = intervals.sort((a, b) => a[0] - b[0])
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

## [Shortest Unsorted Continuous Subarray](https://leetcode.com/problems/shortest-unsorted-continuous-subarray/)
Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.

You need to find the shortest such subarray and output its length.
```js
// Input: [2, 6, 4, 8, 10, 9, 15]
// Output: 5
// Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.

function findUnsortedSubarray(nums) {
    const sorted = nums.slice().sort((a, b) => a - b)
    let left = 0
    let right = nums.length - 1

    for (let i = 0; i < nums.length && left < right; i++) {
        if (sorted[left] === nums[right]) left++
        if (sorted[right] === nums[right]) right--
    }

    return left === right ? 0 : right - left + 1
}
```


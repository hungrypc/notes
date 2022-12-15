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

## [Two Sum IV (input is a bst)](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/)
Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that their sum is equal to the given target.

```js
// Input: 
//     5
//    / \
//   3   6
//  / \   \
// 2   4   7

// Target = 9

// Output: True

function findTarget(root, k) {
    const arr = inOrder(root, [])
    let left = 0
    let right = arr.length - 1

    while (left < right) {
        const sum = arr[left] + arr[right]
        if (sum === k) return true
        if (sum < k) left++
        else right--
    }

    return true
}

function inOrder(root, list) {
    if (!root) return null

    if (root.left) inOrder(root.left, list)
    list.push(root.val)
    if (root.right) inOrder(root.right, list)

    return list
}
```

## [122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
```js
/* Solution 1:
  Brute force.
  Go through all possible sets of transactions and compare to find the maximum profit.
  Noticed that when we pick a set, the same procedure can be done on the remainder
  of the array, meaning we can use recursion.

  Time: O(n^n)
  Space: O(n)
*/
const maxProfit = prices => {
  const calculatePotentialProfit = startIndex => {
    if (startIndex >= prices.length) return 0

    let potentialProfit = 0

    for (let i = startIndex; i < prices.length; i++) { // from this position
      for (let j = i + 1; j < prices.length; j++) { // go thru rest of array to
        if (prices[j] > prices[i]) { // check if a potential profit can be made
          // and add that to potential profit calc on the remainder of the array
          const earnings = prices[j] - prices[i] + calculatePotentialProfit(j + 1)
          potentialProfit = earnings > potentialProfit ? earnings : potentialProfit
        }
      }
    }

    return potentialProfit
  }

  return calculatePotentialProfit(0)
}

/* Solution 2:
  One pass.
  If we were to plot the values on a graph, we'd be able to see the peaks and valleys.
  Mathmatically, you can obtain the total profit by subtracting the sum of valleys from the sum of peaks.

  Determine what's considered a peak and a valley.
  Also important to note that you can also buy and sell on the same day (which is why
  we check peak based on what's behind).

  Time: O(n)
  Space: O(1) constant space
*/
const maxProfit = prices => {
  let valleySum = 0
  let peakSum = 0

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < prices[i + 1]) { // found a valley
      valleySum += prices[i]
    }

    // because we can also buy and sell on the same day, dont use `else`
    if (prices[i] > prices [i - 1]) { // found a peak
      peakSum += prices[i]
    }
  }

  return peakSum - valleySum
}

/*  Solution 3:
  One pass.
  Noticed that we can skip finding the valley sum. It's worth taking profit as soon as you can
  rather than holding to try and get a higher profit. 
  We only care about the increase, which the same day buy sell condition benefits from.
  eg. [1, 2, 20] 
    => (2 - 1) + (20 - 2) = 19
    => 20 - 1 = 19
  
  Time: O(n)
  Space: O(1)
*/

const maxProfit = prices => {
  let profit = 0

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices [i - 1]) { // check if profit can be made
      profit += prices[i] - prices[i - 1] // add difference to final profit
    }
  }

  return profit
}
```

## 189. [Rotate Array](https://leetcode.com/problems/rotate-array/)
```js
/*  Solution 1:
  Simple

  Time: O(n)
  Space: O(n)
*/

var rotate = function(nums, k) {
  const copy = [...nums]
  
  for (let i = 0; i < copy.length; i++) {
    let shift = i + k // find shift position
    while (shift >= copy.length) { // remove length until shift position is feasible
      shift = shift - copy.length
    }
    nums[shift] = copy[i]
  }
};


/*  Solution 2:

  Time: O(n)
  Space: O(1)
 */
const reverse  = (nums, leftIndex, rightIndex) => {
  while(leftIndex < rightIndex) {
    [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]]
    leftIndex++
    rightIndex--
  }
}

var rotate = function(nums, k) {
  const mid = k % nums.length
  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, mid - 1)
  reverse(nums, mid, nums.length - 1)
};
```

## 217. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate)
```js
/*  Solution 1:
  Simple

  Time: O(n)
  Space: O(n)
*/
var containsDuplicate = function(nums) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = (map[nums[i]] ?? 0) + 1
  }

  for (const key in map) {
    if (map[key] > 1) {
      return true
    }
  }
  return false
};

// improved
var containsDuplicate = function(nums) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      return true
    } else {
      map[nums[i]] = 1
    }
  }
  return false
};

// improved(?)
var containsDuplicate = function(nums) {
  const map = {}
  let left = 0
  let right = nums.length - 1
  
  while (left <= right) {
    if (left === right) {
      if (map[nums[left]]) {
        return true
      }
    } else {
      if (map[nums[left]]) {
        return true
      } else {
        map[nums[left]] = 1
      }
      
      if (map[nums[right]]) {
        return true
      } else {
        map[nums[right]] = 1
      }
    }
    left++
    right--
  }

  return false
};
```

## 218. [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/)
```js
/*
  Rather than going building to building, we can essentially "draw" the skyline by
  plotting and storing the building's x and y positions, marking the start
  of the building with [x1, h] and the end of the building as [x2, -h] (negative 
  height so we can compare easily).
  Sort all the points by x ascending, and if equal we want the highest height to
  take precedence.
  The reason we wanted to note the end of the building is so that we can track the
  skyline's "active" height.
  We can track the active height by using an array and adding to it whenever we 
  "start" a new building", sorting it in ascending order because the tallest will
  always be the current active height of the skyline.
  When a building ends, we remove it from the heights array.

  We also keep track of the previous height for cases when we have the same height
  as a previous entry, where instead of adding to the result we simply skip.
*/
var getSkyline = function(buildings) {
  const data = []
  for (const [x1, x2, h] of buildings) {
    data.push([x1, h], [x2, -h])
  }

  data.sort(([x1, h1], [x2, h2]) => x1 - x2 || h2 - h1)

  const result = []
  const heights = []
  let previousHeight = 0
  
  for (const [x, h] of data) {
    if (h > 0) {
      heights.push(h)
      heights.sort((a, b) => a - b)
    } else {
      const index = heights.indexOf(h * -1)
      heights.splice(index, 1)
    }
    
    const activeHeight = heights[heights.length - 1] || 0
    if (activeHeight !== previousHeight) {
      result.push([x, activeHeight])      
    }
    previousHeight = activeHeight
  }
  
  return result
};

// can sort height faster
let left = 0
let right = heights.length - 1

while (left <= right) {
  const mid = Math.floor((left + right) / 2)
  if (heights[mid] >= h) {
    right = mid - 1
  } else {
    left = mid + 1
  }
}

// add
heights.splice(left, 0, h)

// remove
heights.splice(left, 1)
```

## 350. [Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/)
```js
/*  Solution 1:

*/
var intersect = function(nums1, nums2) {
  const map = {}
  for (const num of nums1) {
    map[num] = (map[num] || 0) + 1
  }
  
  const res = []
  for (const num of nums2) {
    if (map[num]) {
      res.push(num)
      map[num]--
    }
  }
  return res
};

/*  
```

## 283. [Move Zeroes](https://leetcode.com/problems/move-zeroes/)
```js
/*  Solution 1:

    Time: O(n^2)
    Space: O(1)

*/
var moveZeroes = function(nums) {
  let count = 0
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      count++
      nums.splice(i, 1)
      i--
    }
  }

  while (count > 0) {
    nums.push(0)
    count--
  }
};

/*  Solution 2:

    Time: O(n)
    Space: O(1)
*/
var moveZeroes = function(nums) {
  let nonZeroIndex = 0
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i]
      nonZeroIndex++
    }
  }

  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0
  }
};

/*  Solution 3:
    
    Time: O(n)
    Space: O(1)
*/
var moveZeroes = function(nums) {
  let nonZeroIndex = 0
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[i]
      nums[i] = nums[nonZeroIndex]
      nums[nonZeroIndex] = temp
      nonZeroIndex++
    }
  }
};

```

## [1. Two Sum](https://leetcode.com/problems/two-sum/)
```js
/*  Solution 1:

    Time: O(n^2)
    Space: O(1)
*/
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
};

/*  Solution 2:
    Time: O(n)
    Space: O(n)
*/
var twoSum = function(nums, target) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if (map[target - num] >= 0) {
      return [map[target - num], i]
    } else {
      map[num] = i
    }
  }
};
```

## [36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)
```js
const getBlockColumn = (i) => {
  if (0 <= i && i < 3) {
    return 0
  } else if (i >= 3 && i < 6) {
    return 1
  } else {
    return 2
  }
}

const getBlockRow = (count) => {
  if (0 <= count && count < 3) {
    return 0
  } else if (count >= 3 && count < 6) {
    return 3
  } else {
    return 6
  }
}

var isValidSudoku = function(board) {
  let count = 0
  let blockMap = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
  }
  let verticalMap = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
  }
  
  while (count < 9) {
    let horizontalMap = {}
    
    for (let i = 0; i < 9; i++) {
      const squareVal = board[count][i]
      const block = getBlockRow(count) + getBlockColumn(i)
      
      if (squareVal !== '.') {
        if (horizontalMap[squareVal]) {
          return false
        } else {
          horizontalMap[squareVal] = 1  
        }

        if (verticalMap[i][squareVal]) { // i = column
          return false
        } else {
          verticalMap[i][squareVal] = 1  
        }
        
        if (blockMap[block][squareVal]) {
          return false
        } else {
          blockMap[block][squareVal] = 1
        }
      }
    }

    count++
  }

  return true
};
```

## [48. Rotate Image](https://leetcode.com/problems/rotate-image/)
```js
/*  Solution 1:

    Time: O(logn)
    Space: O(1)
*/
var rotate = function(matrix) {
  let left = 0
  let right = matrix.length - 1
  
  const shift = (x, y, newValue) => {
    matrix[y][x] = newValue
  }

  while (left < right) {
    for (let i = 0; i < right - left; i++) {
      let [prevRight, prevDown, prevLeft, prevUp] = [
        matrix[left][left + i],
        matrix[left + i][right],
        matrix[right][right - i],
        matrix[right - i][left],
      ]
      shift(left + i, left, prevUp)
      shift(right, left + i, prevRight)
      shift(right - i, right, prevDown)
      shift(left, right - i, prevLeft)
    }
    left++
    right--
  }
};
```






















# Trees

## Balanced Binary Tree
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:
> a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

```js
function isBalanced(root) {
    function dfs(node) {
        if (!node) return 0

        const left = 1 + dfs(node.left)
        const right = 1 + dfs(node.right)
        if (Math.abs(right - left) > 1) return Infinity
        return Math.max(left, right)
    }

    return dfs(root) === Infinity ? false : true
}
```

## [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
```js
/*  Solution 1:
    Iterative, BFS

    Time: O(n)
    Space: O(n)
*/
var isSymmetric = function(root) {
  const bfsLeft = (node) => {
    const data = []
    const queue = [node]

    while (queue.length) {
      const e = queue.shift()

      if (!e) {
        data.push(undefined)
      } else {
        data.push(e.val)
        queue.push(e.left ? e.left : undefined)
        queue.push(e.right ? e.right : undefined)
      }
    }
    
    return data
  }
  
  const bfsRight = (node) => {
    const data = []
    const queue = [node]
    
    while (queue.length) {
      const e = queue.shift()

      if (!e) {
        data.push(undefined)
      } else {
        data.push(e.val)
        queue.push(e.right ? e.right : undefined)
        queue.push(e.left ? e.left : undefined)
      }
    }
    
    return data
  }
  
  const left = bfsLeft(root.left)
  const right = bfsRight(root.right)
  
  if (left.length !== right.length) return false
  
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) return false
  }
  
  return true
};

/*  Solution 2:
    Recursive

    Time: O(n)
    Space: O(1)
*/


function isSymmetric(root) {
  return isMirror(root, root)
}

function isMirror(n1, n2) {
  if (!n1 && !n2) return true
  if (!n1 || !n2) return false

  return (n1.val === n2.val) 
    && isMirror(n1.left, n2.right) 
    && isMirror(n1.right, n2.left);
}
```

## [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
```js
/*  Solution 1:

    Time: O(n)
    Space: O(1)
*/
const traverse = (node, depth) => {
  if (!node) return depth - 1
  
  return Math.max(traverse(node.left, depth + 1), traverse(node.right, depth + 1))
}

var maxDepth = function(root) {
  if (!root) return null
  
  return traverse(root, 1)
};
```

## [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
```js
/*  Solution 1:
    Depth first search, in order.

    Time: O(n)
    Space: O(n)
*/
var isValidBST = function(root) {
  if (!root) return null
  const data = []
  
  const traverseInOrder = (node) => {
    node.left && traverseInOrder(node.left)
    data.push(node.val)
    node.right && traverseInOrder(node.right)
  }
  
  traverseInOrder(root)
  
  for (let i = 1; i < data.length; i++) {
    if (data[i] <= data[i - 1]) return false
  }
  
  return true
};

/*  Solution 2:
    

    Time: O(n)
    Space: O(1)
*/
var isValidBST = function(root, lower = -Infinity, upper = Infinity) {
  if (root === null) return true
  
  if (lower >= root.val) return false
  if (upper <= root.val) return false

  return isValidBST(root.left, lower, root.val) && isValidBST(root.right, root.val, upper)
};
```

## [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal)
```js
/*  Solution 1:
    Iterative

    Time: O(n)
    Space: O(n)
*/
var levelOrder = function(root) {
  const queue = []
  const data = []
  
  root && queue.push([0, root])
  
  while (queue.length) {
    const [level, node] = queue.shift()
    
    if (!data[level]) {
      data.push([])
    }

    data[level].push(node.val)  
    
    if (node.left) {
      queue.push([level + 1, node.left])
    }  
        
    if (node.right) {
      queue.push([level + 1, node.right])
    }
  }
  return data
};

/*  Solution 2:
    Recursive

    Time: O(n)
    Space: O(n)
*/
var levelOrder = function(root) {
  const data = []
  
  const traverse = (level, node) => {
    if (!node) return

    if (!data[level]) {
      data.push([])
    }

    data[level].push(node.val)

    traverse(level + 1, node.left)
    traverse(level + 1, node.right)
  }

  return data
};
```

## [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)
```js
/*  Solution 1:

    Time: O(n)
    Space: O(n)?
*/
var sortedArrayToBST = function(nums) {
  if (!arr.length) return null
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  
  let rootVal
  if (left.length > right.length) {
    rootVal = left.pop()
  } else {
    rootVal = right.shift()
  }
  
  return new TreeNode(rootVal, sortedArrayToBST(left), sortedArrayToBST(right))
};

/*  Solution 2:

    Time: O(n)
    Space: O(n)
*/
var sortedArrayToBST = function(nums) {
  const buildTree = (start, end) => {
    if (start > end) return null
    const mid = Math.floor((start + end) / 2)

    return new TreeNode(nums[mid], buildTree(start, mid - 1), buildTree(mid + 1, end))
  }
  return buildTree(0, nums.length - 1)
}
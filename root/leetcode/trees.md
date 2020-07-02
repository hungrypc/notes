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
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree `[1,2,2,3,4,4,3]` is symmetric:
```js
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3

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

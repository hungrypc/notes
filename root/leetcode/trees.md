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
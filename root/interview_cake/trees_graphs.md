# Trees and Graphs

## Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).

A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.

Here's a sample binary tree node class:

```js
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
};
```

Solution:

```js
function isBalanced(treeRoot) {
// tree with no nodes = superbalaned, no leaves
  if (!treeRoot) {
    return true
  }

  const depths = []   // keep track of depths here. if > 2, shortcircuit

  const nodes = []    // stack containing pairs of node and node's depth
  nodes.push([treeRoot, 0]) // like this

  while (nodes.length) {
    const nodePair = nodes.pop()  // pop a node and its depth from the stack
    const node = nodePair[0]
    const depth = nodePair[1]

    // if no left or right, we hit a leaf
    if (!node.left && !node.right) {
      if (depths.indexOf(depth) < 0) {
        // if this depth isnt in our depths array, add it
        depths.push(depth)

        // two ways we might have an unbalanced tree:
        // 1. more than 2 different leaf depths
        // 2. 2 leaf depths are more than 1 apart
        if (
          (depths.length > 2)
          || (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)
        ) {
          return false
        }
      }
    } else {
      // keep stepping down
      if (node.left) {
        nodes.push([node.left], depth + 1)
      }
      if (node.right) {
        nodes.push([node.right, depth + 1])
      }
    }
  }

  return true
};
```

## Write a function to check that a binary tree ↴ is a valid binary search tree.

Solution:

```js
function isBinarySearchTree(treeRoot) {

  const stack = []
  // checking a node against its parent isn't enough to prove that it's in the right place
  // we need to keep track of the bounds that the children nodes must fall within
  stack.push({
    node: treeRoot,
    lowerBound: Number.NEGATIVE_INFINITY,
    upperBound: Number.POSITIVE_INFINITY,
  })

  while (stack.length) {
    const { node, lowerBound, upperBound } = stack.pop()

    // so if a child node breaks those bounds, our tree is invalid
    if (node.value <= lowerBound || node.value >= upperBound) return false

    if (node.left) {
      stack.push({
        node: node.left,
        lowerBound,
        upperBound: node.value,
      })
    }
    if (node.right) {
      stack.push({
        node: node.right,
        lowerBound: node.value,
        upperBound,
      })
    }
  }

  return true
}
```

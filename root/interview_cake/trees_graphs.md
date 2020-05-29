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

## Write a function to find the 2nd largest element in a binary search tree.

Solution:

```js
// helper function
function findLargest(rootNode) {
  let current = rootNode
  while (current) {
    if (!current.right) return current.value
    current = current.right
  }
}

function findSecondLargest(treeRoot) {
  if (!treeRoot || (!treeRoot.left && !treeRoot.right)) {
    throw new Error('no')
  }

  let current = treeRoot

  while (current) {
    // case: current is largest and has a left subtree
    // so 2nd largest is in that subtree
    if (current.left && !current.right) {
      return findLargest(current.left)
    }

    // case: current is parent of largest, and largest has no children
    // so current is 2nd largest
    if (
      current.right
      && !current.right.left
      && !current.right.right
    ) {
      return current.value
    }

    // otherwise, keep moving
    current = current.right
  }
}
```
Time complexity: O(log n) if the tree is balanced, O(n) otherwise
Space complexity: O(1)


## You wrote a trendy new messaging app, MeshMessage, to get around flaky cell phone coverage.

Instead of routing texts through cell towers, your app sends messages via the phones of nearby users, passing each message along from one phone to the next until it reaches the intended recipient. (Don't worry—the messages are encrypted while they're in transit.)

Some friends have been using your service, and they're complaining that it takes a long time for messages to get delivered. After some preliminary debugging, you suspect messages might not be taking the most direct route from the sender to the recipient.

Given information about active users on the network, find the shortest route for a message from one user (the sender) to another (the recipient). Return an array of users that make up this route.

There might be a few shortest delivery routes, all with the same length. For now, let's just return any shortest route.

Your network information takes the form of an object where keys are usernames and values are arrays of other users nearby:

```js
const network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
  ...
};

// For the network above, a message from Jayden to Adam should have this route:
// ['Jayden', 'Amelia', 'Adam']
```

Solutions:

```js
class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }

  enqueue(item) {
    this.queue.unshift(item);
    this.size += 1;
  }

  dequeue() {
    this.size -= 1;
    return this.queue.pop();
  }
}

function reconstructPath(howWeReachedNodes, startNode, endNode) {

  const shortestPath = []

  // because our map gives us the node that got us to a specific node
  // we start from the endNode and work backwards
  let currentNode = endNode

  while (currentNode !== null) {
    shortestPath.push(currentNode)
    currentNode = howWeReachedNodes[currentNode]
  }

  // reverse because we went backwards
  return shortestPath.reverse()
}

function getPath(graph, startNode, endNode) {
  if (!graph.hasOwnProperty(startNode)) {
    throw new Error('Start node not in graph')
  }
  if (!graph.hasOwnProperty(endNode)) {
    throw new Error('End node not in graph')
  }

  // queue
  const nodesToVisit = new Queue()
  nodesToVisit.enqueue(startNode)

  // map of how we got to each node
  // also helps us keep track of nodes we've seen
  const map = {}
  map[startNode] = null

  while (nodesToVisit.size > 0) {
    const current = nodesToVisit.dequeue()

    if (current === endNode) {
      return reconstructPath(map, startNode, endNode)
    }

    graph[current].forEach(neighbor => {
      if (!map.hasOwnProperty(neighbor)) {
        // add to queue
        nodesToVisit.enqueue(neighbor)

        // keep track and map how we got there
        map[neighbor] = current
      }
    })
  }

  return null;
};
```

Time complexity: O(n + m)

- n being the nodes
- m being neighbors

Space complexity: O(n)















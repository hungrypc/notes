# Heap (Priority Queue)

# refresher

> **MaxBinaryHeap**: Prioritize maximum value. Parent node > child node.
> 
> **MinBinaryHeap**: Prioritize minimum value. Parent node < child node.

we can use an array to represent the heap.

- parent index: `n`
  + left child index: `2n + 1`
  + right child index: `2n + 2`

given a child index `m`, we can find its parent's index with `Math.floor((m - 1) / 2)`

```js
class MaxHeap {
  heap = []

  enqueue(val) {  // insert
    this.heap.push(val)
    this.bubbleUp(this.heap.length - 1)
  }

  bubbleUp(index) {
    const node = this.heap[index]

    while(index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.heap[parentIndex]

      if (node <= parent) break;

      this.heap[parentIndex] = node
      this.heap[index] = parent
      index = parentIndex
    }
  }

  dequeue() {   // extract max
    const max = this.heap[0]
    const endNode = this.heap.pop()

    if (this.heap.length > 0) {
      this.heap[0] = endNode
      this.bubbleDown(0)
    }

    return max
  }

  bubbleDown(index) {   // restore heap property after node removal
    const node = this.heap[index]

    while (true) {
      const leftIndex = 2 * index + 1
      const rightIndex = 2 * index + 2

      let leftChild, rightChild
      let swapIndex = null

      if (leftIndex < this.heap.length) {
        leftChild = this.heap[leftIndex]

        if (leftChild > node) {
          swapIndex = leftChild
        }
      }

      if (rightIndex < this.heap.length) {
        rightChild = this.heap[rightIndex]

        if (!swapIndex && (rightChild > node || rightChild > leftChild)) {
          swapIndex = rightIndex
        }
      }

      if (!swapIndex) break;
      this.heap[index] = this.heap[swapIndex]
      this.heap[swapIndex] = node
      index = swapIndex
    }
  }
}

class MinHeap {
  heap = []

  enqueue(val) {
    this.heap.push(val)
    this.bubbleUp(this.heap.length - 1)
  }

  bubbleUp(index) {
    const node = this.heap[index]

    while(index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.heap[parentIndex]

      if (node >= parent) break;

      this.heap[parentIndex] = node
      this.heap[index] = parent
      index = parentIndex
    }
  }

  dequeue() {
    const min = this.heap[0]
    const endNode = this.heap.pop()

    if (this.heap.length > 0) {
      this.heap[0] = endNode
      this.bubbleDown(0)
    }

    return min
  }

  bubbleDown(index) {
    const node = this.heap[index]

    while (true) {
      const leftIndex = 2 * index + 1
      const rightIndex = 2 * index + 2

      let leftChild, rightChild
      let swapIndex = null

      if (leftIndex < this.heap.length) {
        leftChild = this.heap[leftIndex]

        if (leftChild < node) {
          swapIndex = leftIndex
        }
      }

      if (rightIndex < this.heap.length) {
        rightChild = this.heap[rightIndex]

        if (!swapIndex && (rightChild < node || rightChild < leftChild)) {
          swapIndex = rightIndex
        }
      }

      if (!swapIndex) break;
      this.heap[index] = this.heap[swapIndex]
      this.heap[swapIndex] = node
      index = swapIndex
    }
  }
}
```

## [295. Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream)
```js
/*  Solution 1:

    Time:
    Space:
*/
class MedianFinder {
  data = []

  addNum(num) {
    let left = 0
    let right = this.data.length - 1
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      if (this.data[mid] <= num) {
        left = mid + 1
      } else if (this.data[mid] > num) {
        right = mid - 1
      }
    }
    
    this.data.splice(left, 0, num)
  }

  findMedian() {
    const mid = Math.floor(this.data.length / 2)
    if (this.data.length % 2 === 0) {
      return (this.data[mid - 1] + this.data[mid]) / 2
    } else {
      return this.data[mid]
    }
  }
}
```
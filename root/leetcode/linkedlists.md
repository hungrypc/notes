# Linked Lists

## Sort List
Sort a linked list in O(n log n) time using constant space complexity.

```js
function sortList(head) {
    if (!head || !head.next) {
        return head
    }

    let temp = head
    let slow = head
    let fast = head

    while (fast && fast.next) {
        temp = slow
        slow = slow.next
        fast = fast.next.next
    }

    temp.next = null

    const left = sortList(head)
    const right = sortList(slow)

    return merge(left, right)
}

function merge(left, right) {
    const head = new ListNode(0)
    let current = head

    while (left && right) {
        if (left.val < right.val) {
            current.next = left
            left = left.next
        } else {
            current.next = right
            right = right.next
        }
        current = current.next
    }

    if (left) {
        current.next = left
    }

    if (right) {
        current.next = right
    }

    return head.next
}
```

## 234. [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

```js
/*  Solution 1 
    
    Time: O(n)
    Space: O(1) constant space
*/

var isPalindrome = function(head) {
    let fastNode = head
    const passedNodes = []
    
    while (fastNode.next && fastNode.next.next) {
      passedNodes.push(head.val)

      head = head.next
      fastNode = fastNode.next.next
    }
  
    if (fastNode.next) { // even number of items in list
      passedNodes.push(head.val)
    } 
      
    for (let i = passedNodes.length - 1; i >= 0; i--) {
      head = head.next
      if (passedNodes[i] !== head.val) {
        return false
      }
    }
  
    return true
};
```

## 206. [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
```js
/*  Solution 1:
    Iterative

    Time: O(n)
    Space: O(1) constant space
*/

var reverseList = function(head) {
  let current = head
  let prev = null
  
  while (current) {
    let temp = current.next
    current.next = prev
    prev = current
    current = temp
  }
  
  return prev
};

/*  Solution 2:
    Recursive.

    Time: O(n)
    Space: O(n)
*/

var reverseList = function(head) {
  if (!head || !head.next) return head

  let current = head
  let store = reverseList(head.next)
  current.next = null
  let temp = store
  
  while (temp.next) {
    temp = temp.next
  }
  
  temp.next = current
  
  return store
};

/*  Solution 3:
    Recursive.

    Time: O(n)
    Space: O(n)
*/

const helper = (head, prevNode) => {
  if (!head) return head

  let temp = head.next
  head.next = prevNode
  
  return temp ? helper(temp, head) : head
}

var reverseList = function(head) {
  return helper(head, null)
};
```

## 21. [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
```js
/*  Solution 1:
    Iterative.

    Time: O(n)
    Space: O(1)
*/
var mergeTwoLists = function(list1, list2) {
  if (!list1 || !list2) {
    return list1 ? list1 : list2
  }
      
  let current = list1
  const head = current

  let left = list1.next
  let right = list2
  
  while (left && right) {
    if (left.val < right.val) { 
      current.next = left
      left = left.next
    } else {
      current.next = right
      right = right.next
    }
    current = current.next
  }
  
  if (left) {
    current.next = left
  }
  
  if (right) {
    current.next = right
  }
  
  return head
};

/*  Solution 2:
    Recursive.

    Time: O(n)
    Space: O(n)
*/
var mergeTwoLists = function(list1, list2) {
  if (!list1) {
    return list2
  } else if (!list2) {
    return list1
  }
      
  if (list1.val < list2.val) {
    const temp = list1.next
    list1.next = mergeTwoLists(temp, list2)
    return list1
  } else {
    const temp = list2.next
    list2.next = mergeTwoLists(list1, temp)
    return list2
  }
};
```

## [237. Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/)
```js
/*  Solution 1:

    Time: O(n)
    Space: O(1)
*/
var deleteNode = function(node) {
  while (node) {
    let temp = node.next
    node.val = temp.val
    if (!temp.next) {
      node.next = null
    }
    node = node.next
  }
};
```

## [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
```js
/*  Solution 1:

    Time: O(n)
    Space: O(n)
*/
var removeNthFromEnd = function(head, n) {
  if (!head.next) return null
  
  const arr = []
  let point = head

  while (point) {
    arr.push(point)
    point = point.next
  }
  
  const index = arr.length - n
  
  if (index - 1 >= 0) {
    arr[index - 1].next = arr[index + 1] ? arr[index + 1] : null
  } else {
    return arr[index + 1]
  }
  
  return head
};
```

## [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
```js
/*  Solution 1:

    Time: O(n)
    Space: O(1)
*/

var hasCycle = function(head) {
  let fast = head
  let slow = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      return true
    }
  }
  
  return false
};
```






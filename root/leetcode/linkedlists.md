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
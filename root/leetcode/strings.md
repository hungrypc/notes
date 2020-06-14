# Strings

## Longest Palindrome Substring
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

```js
// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.

function longestPalindrome(s) {
    if (!s || s.length === 0) return ""
    
    let start = 0
    let end = 0
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandFromMiddle(s, i, i)
        const len2 = expandFromMiddle(s, i, i + 1)
        const len = Math.max(len1, len2)
        if (len > end - start) {
            start = i - ((len - 1) / 2)
            end =  i + (len / 2)
        }
    }
    
    return s.substring(Math.round(start), end + 1)
    
};

function expandFromMiddle(str, left, right) {
    if (!str || left > right) return 0
    
    while (left >= 0 && right < str.length && str.charAt(left) === str.charAt(right)) {
        left--
        right++
    }
    
    return right - left - 1
}
```

## Partition Labels
A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

```js
// Input: S = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

function partitionLabels(str) {
    const indexs = []
    const res = []

    for (let i = 0; i < str.length; i++) {
        indexs[str[i]] = i 
    }

    let bound = 0
    let len = 0
    for (let j = 0; j < str.length; j++) {
        bound = Math.max(bound, index[str[j]])
        if (bound === j) {
            res.push(j - len + 1)
            len = j + 1
        }
    }
    return res
}
```






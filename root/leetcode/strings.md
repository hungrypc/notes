# Strings

## Longest Palindrome Substring (not array, but worth keeping note of)
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
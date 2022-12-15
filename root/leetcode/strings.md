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

## [334. Reverse String](https://leetcode.com/problems/reverse-string/)
```js
/*  Solution 1:
    
    Time: O(logn)
    Space: O(1)
*/
var reverseString = function(s) {
  let left = 0
  let right = s.length - 1
  
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]]
    left++
    right--
  }
};
```

## [387. First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/)
```js
/*  Solution 1:

    Time: O(n)
    Space: O(n)
*/
var firstUniqChar = function(s) {
  const letterMap = {}

  for (let i = 0; i < s.length ; i++) {
    const letter = s[i]
    letterMap[letter] = (letterMap[letter] || 0) + 1
  }
  
  for (let i = 0; i < s.length; i++) {
    const letter = s[i]
    if (letterMap[letter] === 1) return i
  }
  
  return -1
};
```

## 242. [Valid Anagram](https://leetcode.com/problems/valid-anagram/)
```js
/*  Solution 1:

    Time: O(n)
    Space: O(n)
*/
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false
  
  const map1 = {}
  const map2 = {}
  
  for (let i = 0; i < s.length; i++) {
    map1[s[i]] = (map1[s[i]] || 0) + 1
    map2[t[i]] = (map2[t[i]] || 0) + 1
  }
  
  for (const letter in map1) {
    if (map1[letter] !== map2[letter]) return false
  }

  return true
};
```

## [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
```js
/*  Solution 1:

    Time: O(n) from regex parse?
    Space: O(n)
*/
var isPalindrome = function(s) {
  const parsed = s.replace(/[^a-zA-Z0-9]/g, '')
  let left = 0
  let right = parsed.length - 1
  
  while (left < right) {
    if (parsed[left].toLowerCase() !== parsed[right].toLowerCase()) return false
    left++
    right--
  }
  
  return true
};
```

## [28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/)
```js
/*  Solution 1:

    Time: 
    Space:
*/
var strStr = function(haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      let count = 1
      let found = true

      while (count < needle.length) {
        if (haystack[i + count] === needle[count]) {
          count++
        } else {
          found = false
          break
        }
      }
      
      if (found) return i
    }
  }
  
  return -1
};
```

## [14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)
```js
/*  Solution 1:

    Time:
    Space: O(1)
*/
var longestCommonPrefix = function(strs) {
  let prefix = ''
  let index = 0
  let process = true
  
  while (process) {
    const letter = strs[0][index]
    for (const word of strs) {
      if (word[index] !== letter || !word[index]) {
        process = false
        break
      }
    }
    
    if (process) {
      prefix += letter
      index++ 
    }
  }
  
  return prefix
};
```

## [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
```js
/*  Solution 1:

    Time: O(n^2)
    Space: O(n)
*/
var lengthOfLongestSubstring = function(s) {
  let output = 0
  
  for (let i = 0; i < s.length; i++) {
    const set = new Set()
    let count = 0
    
    for (let j = i; j < s.length; j++) {
      const letter = s[j]
      if (set.has(letter)) {
        break
      } else {
        set.add(letter)
        count++
      }
    }
    
    output = Math.max(output, count)
  }
  
  return output
};

/*  Solution 2:

    Time: O(n)
    Space: O(n)
*/
var lengthOfLongestSubstring = function(s) {
  const set = new Set()
  let output = 0
  let start = 0
  let end = 0
  
  while (end < s.length) {
    if (set.has(s[end])) {
      set.delete(s[start])
      start++
    } else {
      set.add(s[end])
      end++
      output = Math.max(output, set.size)
    }
  }

  return output
};
```






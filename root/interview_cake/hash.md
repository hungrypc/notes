# Hashing and Hash Tables

## You've built an inflight entertainment system with on-demand movie streaming.

Users on longer flights like to start a second movie right when their first one ends, but they complain that the plane usually lands before they can see the ending. So you're building a feature for choosing two movies whose total runtimes will equal the exact flight length.

Write a function that takes an integer flightLength (in minutes) and an array of integers movieLengths (in minutes) and returns a boolean indicating whether there are two numbers in movieLengths whose sum equals flightLength.

When building your function:

- Assume your users will watch exactly two movies
- Don't make your users watch the same movie twice
- Optimize for runtime over memory

Solution:

```js
function canTwoMoviesFillFlight(movieLengths, flightLength) {
  let set = new Set();
  for (const movie of movieLengths) {
    if (set.has(flightLength - movie)) return true
    else set.add(movie)
  }
  return false;
}
```

## Write an efficient function that checks whether any permutation ↴ of an input string is a palindrome. ↴

You can assume the input string only contains lowercase letters.

Examples:

- "civic" should return true
- "ivicc" should return true
- "civil" should return false
- "livci" should return false

"But 'ivicc' isn't a palindrome!"

If you had this thought, read the question again carefully. We're asking if any permutation of the string is a palindrome. Spend some extra time ensuring you fully understand the question before starting. Jumping in with a flawed understanding of the problem doesn't look good in an interview.

Solution:

```js
function hasPalindromePermutation(theString) {

  // Track characters we've seen an odd number of times
  const unpairedCharacters = new Set();

  for (let char of theString) {
    if (unpairedCharacters.has(char)) {
      unpairedCharacters.delete(char);
    } else {
      unpairedCharacters.add(char);
    }
  }

  // The string has a palindrome permutation if it
  // has one or zero characters without a pair
  return unpairedCharacters.size <= 1;
}
```

## You want to build a word cloud, an infographic where the size of a word corresponds to how often it appears in the body of text.

































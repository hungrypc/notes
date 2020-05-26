# Sorting, Searching, and Logarithms

## I want to learn some big words so people think I'm smart.

I opened up a dictionary to a page in the middle and started flipping through, looking for words I didn't know. I put each word I didn't know at increasing indices in a huge array I created in memory. When I reached the end of the dictionary, I started from the beginning and did the same thing until I reached the page I started at.

Now I have an array of words that are mostly alphabetical, except they start somewhere in the middle of the alphabet, reach the end, and then start from the beginning of the alphabet. In other words, this is an alphabetically ordered array that has been "rotated." For example:

```js
const words = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',  // <-- rotates here!
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];
```

Write a function for finding the index of the "rotation point," which is where I started working from the beginning of the dictionary. This array is huge (there are lots of words I don't know) so we want to be efficient here.

Solution:

```js
function findRotationPoint(words) {
  let firstWord = words[0]
  let left = 0
  let right = words.length - 1

  while (left < right) {
    let middle = Math.floor(left + ((right - left) / 2))

    // if our middle word is larger, the rotation point must be ahead of middle, so we set left at middle
    if (words[middle] >= firstWord) {
      left = middle
    } else {
      // otherwise, the rotation point must be behind middle, so we set right at middle
      right = middle
    }

    // when we hit this case, we're at the rotation point
    if (left + 1 === right) break;

  }

  return right;
}
```

## Find a duplicate, Space Edition™.

We have an array of integers, where:

1. The integers are in the range 1..n1..n
2. The array has a length of n+1n+1
It follows that our array has at least one integer which appears at least twice. But it may have several duplicates, and each duplicate may appear more than twice.

Write a function which finds an integer that appears more than once in our array. (If there are multiple duplicates, you only need to find one of them.)

We're going to run this function on our new, super-hip MacBook Pro With Retina Display™. Thing is, the damn thing came with the RAM soldered right to the motherboard, so we can't upgrade our RAM. So we need to optimize for space!

Solution:

```js
function findRepeat(numbers) {
  let start = 1
  let end = numbers.length - 1

  while (start < end) {
    const middle = Math.floor(start + ((end - start) / 2))

    // cut the array into subarrays, an upper an lower range of 1..n
    const lowerStart = start
    const lowerEnd = middle
    const upperStart = middle + 1
    const upperEnd = end

    // this represents the number of integers that SHOULD be in our lower range
    const possibleIntegersInLower = lowerEnd - lowerStart + 1

    // count the number of integers that fall in our lower range
    let itemsInLower = 0
    for (const num of numbers) {
      if (num >= lowerStart && num <= lowerEnd) itemsInLower++
    }

    // if the number of ints that fall in the lower range is GREATER than the number of ints that SHOULD be in our lower range
    // then the lower range contains the duplicate
    if  (itemsInLower > possibleIntegersInLower) {
      // so we reset the total range to our lower range and do this again
      start = lowerStart
      end = lowerEnd
    } else {
      start = upperStart
      end = upperEnd
    }
  }

  // eventually, we'll get to a point where start and end converge, and we have our answer
  return start
};
```

## You created a game that is more popular than Angry Birds.

Each round, players receive a score between 0 and 100, which you use to rank them from highest to lowest. So far you're using an algorithm that sorts in O(n\lg{n})O(nlgn) time, but players are complaining that their rankings aren't updated fast enough. You need a faster sorting algorithm.

Write a function that takes:

1. an array of unsortedScores
2. the highestPossibleScore in the game
and returns a sorted array of scores in less than O(n\lg{n})O(nlgn) time.

For example:

```js
const unsortedScores = [37, 89, 41, 65, 91, 53];
const HIGHEST_POSSIBLE_SCORE = 100;

sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE);
// returns [91, 89, 65, 53, 41, 37]
```
We’re defining nn as the number of unsortedScores because we’re expecting the number of players to keep climbing.

And, we'll treat highestPossibleScore as a constant instead of factoring it into our big O time and space costs because the highest possible score isn’t going to change. Even if we do redesign the game a little, the scores will stay around the same order of magnitude.

```js
function sortScores(unorderedScores, highestPossibleScore) {


  // create an array of 0s with indices 0..highsestPossibleScore
  const scoreCounts = new Array(highestPossibleScore + 1).fill(0)

  // for each score in unordereScores, increment the value where scoreCount index = score
  unorderedScores.forEach(score => {
    scoreCounts[score]++
  });

  const sortedScores = []

  // work backwards so we get the highest score first
  for (let i = highestPossibleScore; i >= 0; i--) {
    // get the value at inddex i,
    // which tells us the count of that number appearing in unorderedScores
    const count = scoreCounts[i]

    for (let j = 0; j < count; j++) {
      // push the index as many times as it's appeared
      // remember, we're using the index as the score
      // and the count is as many times as it's appeared so if the value is 0, this won't push
      sortedScores.push(i)
    }
  }

  return sortedScores
};
```
This is O(n) time AND O(n) space.

























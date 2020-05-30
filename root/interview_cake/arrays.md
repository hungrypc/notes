# Arrays

## Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.

To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as objects ↴ with integer properties startTime and endTime. These integers represent the number of 30-minute blocks past 9:00am.

For example:

```js
{ startTime: 2, endTime: 3 }  // meeting from 10:00 – 10:30 am
{ startTime: 6, endTime: 9 }  // meeting from 12:00 – 1:30 pm
```
Write a function mergeRanges() that takes an array of multiple meeting time ranges and returns an array of condensed ranges.

For example, given:

```js
[
  { startTime: 0,  endTime: 1 },
  { startTime: 3,  endTime: 5 },
  { startTime: 4,  endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9,  endTime: 10 },
]

// returns:

[
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 8 },
  { startTime: 9, endTime: 12 },
]
```

Do not assume the meetings are in order. The meeting times are coming from multiple teams.

Write a solution that's efficient even when we can't put a nice upper bound on the numbers representing our time ranges. Here we've simplified our times down to the number of 30-minute slots past 9:00 am. But we want the function to work even for very large numbers, like Unix timestamps. In any case, the spirit of the challenge is to merge meetings where startTime and endTime don't have an upper bound.

Solution:

```js
function mergeRanges(meetings) {
  // sort meetings by start time so that any meetings that could be merged will always be adjacent
  const sorted = meetings.sort((a, b) => a.startTime - b.startTime);
  // start with the first meeting in sorted sine this is undoubtedly where we'll start
  const mergedMeetings = [sorted[0]];

  // i = 1 because we will be comparing it to the previous meeting at i = 0
  for (let i = 1; i < meetings.length; i++) {
    const currentMeeting = sorted[i];
    const lastMergedMeeting = mergedMeetings[mergedMeetings[i - 1]];

    // a meeting will overlap if the current meeting's start time overlaps with the last meetings end time
    if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
      // if this is the case, we merge the meetings by taking the larger end time and set that as the merged meeting's end time
      lastMergedMeeting.endTime = Math.max(currentMeeting.endTime, lastMergedMeeting.endTime);
    } else {
      // otherwise, push the current meeting into mergedMeetings
      mergedMeetings.push(currentMeeting);
    }
  }

  return mergedMeetings;
}
```

## Write a function that takes an array of characters and reverses the letters in place

Solution:

```js
function reverse(arr) {
  let i = 0;
  let j = arr.length - 1;

  while (i <= j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}
```

## You're working on a secret team solving coded transmissions.

Your team is scrambling to decipher a recent message, worried it's a plot to break into a major European National Cake Vault. The message has been mostly deciphered, but all the words are backward! Your colleagues have handed off the last step to you.

Write a function reverseWords() that takes a message as an array of characters and reverses the order of the words in place.

For example:

```js
const message = [ 'c', 'a', 'k', 'e', ' ',
                'p', 'o', 'u', 'n', 'd', ' ',
                's', 't', 'e', 'a', 'l' ];

reverseWords(message);

console.log(message.join(''));
// Prints: 'steal pound cake'
```

When writing your function, assume the message contains only letters and spaces, and all words are separated by one space.

Solution:

```js
// My solution:
function reverseWords(message) {
  message.push(' ')
  let end = message.length - 1;
  let count = end + 1;

  for (let i = end; i >= 0; i--) {
    if (message[i] === " ") {
      count = message.length
    }
    message.splice(count, 0, message[i])
  }

  message.splice(0, end + 1)
  message.pop()

  return message
}


// Interview Cake solution:
function reverseWords(message) {

  // First we reverse all the characters in the entire message
  reverseCharacters(message, 0, message.length - 1);
  // This gives us the right word order
  // but with each word backward

  // Now we'll make the words forward again
  // by reversing each word's characters

  // We hold the index of the *start* of the current word
  // as we look for the *end* of the current word
  let currentWordStartIndex = 0;
  for (let i = 0; i <= message.length; i++) {

    // Found the end of the current word!
    if (i === message.length || message[i] === ' ') {

      // If we haven't exhausted the string our
      // next word's start is one character ahead
      reverseCharacters(message, currentWordStartIndex, i - 1);
      currentWordStartIndex = i + 1;
    }
  }
}

function reverseCharacters(message, leftIndex, rightIndex) {

  // Walk towards the middle, from both sides
  while (leftIndex < rightIndex) {

    // Swap the left char and right char
    const temp = message[leftIndex];
    message[leftIndex] = message[rightIndex];
    message[rightIndex] = temp;
    leftIndex++;
    rightIndex--;
  }
}
```

## In order to win the prize for most cookies sold, my friend Alice and I are going to merge our Girl Scout Cookies orders and enter as one unit.

Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

For example:

```js
const myArray = [3, 4, 6, 10, 11, 15];
const alicesArray = [1, 5, 8, 12, 14, 19];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
```

Solution:

```js
// My solution:
function mergeArrays(arr1, arr2) {
  let result = []
  let i = 0
  let j = 0

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i])
      i++
    } else {
      result.push(arr2[j])
      j++
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i])
    i++
  }

  while (j < arr2.length) {
    result.push(arr2[j])
    j++
  }

  return result;
}


// Interview Cake solution:
function mergeArrays(myArray, alicesArray) {

  // Set up our mergedArray
  const mergedArray = [];

  let currentIndexAlices = 0;
  let currentIndexMine = 0;
  let currentIndexMerged = 0;

  while (currentIndexMerged < (myArray.length + alicesArray.length)) {

    const isMyArrayExhausted = currentIndexMine >= myArray.length;
    const isAlicesArrayExhausted = currentIndexAlices >= alicesArray.length;

    // Case: next comes from my array
    // My array must not be exhausted, and EITHER:
    // 1) Alice's array IS exhausted, or
    // 2) The current element in my array is less
    //    than the current element in Alice's array
    if (!isMyArrayExhausted && (isAlicesArrayExhausted ||
      (myArray[currentIndexMine] < alicesArray[currentIndexAlices]))) {

      mergedArray[currentIndexMerged] = myArray[currentIndexMine];
      currentIndexMine++;

      // Case: next comes from Alice's array
    } else {
      mergedArray[currentIndexMerged] = alicesArray[currentIndexAlices];
      currentIndexAlices++;
    }

    currentIndexMerged++;
  }

  return mergedArray;
}
```

## My cake shop is so popular, I'm adding some tables and hiring wait staff so folks can have a cute sit-down cake-eating experience.

I have two registers: one for take-out orders, and the other for the other folks eating inside the cafe. All the customer orders get combined into one list for the kitchen, where they should be handled first-come, first-served.

Recently, some customers have been complaining that people who placed orders after them are getting their food first. Yikes—that's not good for business!

To investigate their claims, one afternoon I sat behind the registers with my laptop and recorded:
- The take-out orders as they were entered into the system and given to the kitchen. (takeOutOrders)
- The dine-in orders as they were entered into the system and given to the kitchen. (dineInOrders)
- Each customer order (from either register) as it was finished by the kitchen. (servedOrders)

Given all three arrays, write a function to check that my service is first-come, first-served. All food should come out in the same order customers requested it.

We'll represent each customer order as a unique integer.

As an example,

```js
Take Out Orders: [1, 3, 5]
 Dine In Orders: [2, 4, 6]
  Served Orders: [1, 2, 4, 6, 5, 3]
```
would not be first-come, first-served, since order 3 was requested before order 5 but order 5 was served first.

But,

```js
Take Out Orders: [17, 8, 24]
 Dine In Orders: [12, 19, 2]
  Served Orders: [17, 8, 12, 19, 24, 2]
```
would be first-come, first-served.

Note: Order numbers are arbitrary. They do not have to be in increasing order.

Solution:

```js
function isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders) {
  let i = 0;
  let j = 0;
  if (takeOutOrders.length + dineInOrders.length !== servedOrders.length) return false

  for (const order of servedOrders) {
    if (order === takeOutOrders[i]) i++;
    else if (order === dineInOrders[j]) j++;
    else return false;
  }

  return true;
}
```
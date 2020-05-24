# Greedy Algorithms

## Writing programming interview questions hasn't made me rich yet ... so I might give up and start trading Apple stocks all day instead.

First, I wanna know how much money I could have made yesterday if I'd been trading Apple stocks all day.

So I grabbed Apple's stock prices from yesterday and put them in an array called stockPrices, where:

- The indices are the time (in minutes) past trade opening time, which was 9:30am local time.
- The values are the price (in US dollars) of one share of Apple stock at that time.

So if the stock cost $500 at 10:30am, that means stockPrices[60] = 500.

Write an efficient function that takes stockPrices and returns the best profit I could have made from one purchase and one sale of one share of Apple stock yesterday.

For example:

```js
const stockPrices = [10, 7, 5, 8, 11, 9];

getMaxProfit(stockPrices);
// Returns 6 (buying for $5 and selling for $11)
```
No "shorting"—you need to buy before you can sell. Also, you can't buy and sell in the same time step—at least 1 minute has to pass.

Solution:

```js
function getMaxProfit(stockPrices) {
  let maxProfit = stockPrices[1] - stockPrices[0]   // to make it negative if prices only go down
  let minPrice = stockPrices[0]

  for (let i = 1; i < stockPrices.length; i++) {
    let current = stockPrices[i]
    let potentialProfit = current - minPrice

    minPrice = Math.min(minPrice, current)
    maxProfit = Math.max(maxProfit, potentialProfit)
  }

  return maxProfit;
};
```

## Given an array of integers, find the highest product you can get from three of the integers.

The input arrayOfInts will always have at least three integers.

Solution:

```js
function highestProductOf3(array) {
  let highest = Math.max(array[0], array[1])
  let lowest = Math.min(array[0], array[1])

  let highestProductOf2 = array[0] * array[1]
  let lowestProductOf2 = array[0] * array[1]

  let res = array[0] * array[1] * array[2]

  for (let i = 2; i < array.length; i++) {
    let current = array[i]

    res = Math.max(res, highestProductOf2 * current, lowestProductOf2 * current)
    // we start with this to avoid multiplying the current number by itself to get a faulty highestProductOf2

    highestProductOf2 = Math.max(highestProductOf2, current * highest, current * lowest)
    lowestProductOf2 = Math.min(lowestProductOf2, current * lowest, current * highest)

    highest = Math.max(highest, current)
    lowest = Math.min(lowest, current)
  }

  return res;
}
```

## You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

For example, given:

```js
getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]);
// returns [84, 12, 28, 21]
// because [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]
```
Here's the catch: You can't use division in your solution!

Solution:

```js
// My solution:
function getProductsOfAllIntsExceptAtIndex(intArray) {
  if (intArray.length <= 1) {
    throw new Error('no')
  }

  let res = []

  for (let i = 0; i < intArray.length; i++ ) {
    let temp = Array.from(intArray)
    temp.splice(i, 1)
    res.push(temp.reduce((a, b) => a * b, 1))
    // this actually might be incorrect since reduce is going through each int in temp to combine
    // so this wouldn't be O(n)
  }

  return res;
}

// Interview Cake solution:
function getProductsOfAllIntsExceptAtIndex(intArray) {
  if (intArray.length < 2) {
    throw new Error('Getting the product of numbers at other indices requires at least 2 numbers');
  }

  const productsOfAllIntsExceptAtIndex = [];

  // For each integer, we find the product of all the integers
  // before it, storing the total product so far each time
  let productSoFar = 1;
  for (let i = 0; i < intArray.length; i++) {
    productsOfAllIntsExceptAtIndex[i] = productSoFar;
    productSoFar *= intArray[i];
  }

  // For each integer, we find the product of all the integers
  // after it. since each index in products already has the
  // product of all the integers before it, now we're storing
  // the total product of all other integers
  productSoFar = 1;
  for (let j = intArray.length - 1; j >= 0; j--) {
    productsOfAllIntsExceptAtIndex[j] *= productSoFar;
    productSoFar *= intArray[j];
  }

  return productsOfAllIntsExceptAtIndex;
}
```

## Write a function for doing an in-place ↴ shuffle of an array.

The shuffle must be "uniform," meaning each item in the original array must have the same probability of ending up in each spot in the final array.

Assume that you have a function getRandom(floor, ceiling) for getting a random integer that is >= floor and <= ceiling.

Solution:

```js
function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = getRandom(i, array.length - 1)
    // picking a random number between i and array.length so that we're working
    // with items AFTER the current item because stuff before has already been placed

    if (i !== randomIndex) {
      const temp = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = temp
    }
  }
}
```
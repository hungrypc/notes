# Asyncrhonous JavaScript

Async is "data we don't have yet". It's telling js to go get data and when it's done come back and give us the data. The web browser and node allows us to use async code so that it can interact with things outside of the world of js. Async functions are functions that we can execute later. 

## Job Queue

So promises are relatively new to js and to accomodate this new addition, the event loop was changed. The event loop had the callback queue, which was also called the task queue. With promises, we have this natively. It wasn't really part of the web API, its part of js. ECMAscript said that we needed another queue for promises, so they made the job queue (also known as the microtask queue). It's similar to the callback queue but is smaller and has a higher priority than the callback queue. This means that the event loop checks the job queue first before moving on to the callback queue. 

So if we do something like this: 
```js
// callback queue
setTimeout(() => {console.log('1')}, 0)
setTimeout(() => {console.log('2')}, 10)

// job queue
Promise.resolve('hi').then((data) => console.log('3'))

console.log('4')

// '4'
// '3'
// '1'
// '2'
```

## Parallel, Sequence, and Race

Let's say we had three promises that we needed to handle. There are a few ways to manage this:
1. Parallel: execute all three promises in parallel all at the same time
2. Sequential: execute them one by one
3. Race: execute all three, whichever comes first just do that and ignore the rest

```js
const promisify = (item, delay) => 
	new Promise((resolve) => 
		setTimeout(() =>
			resolve(item), delay))

const a = () => promisify('a', 100)
const b = () => promisify('b', 5000)
const c = () => promisify('c', 3000)

// parallel
async function parallel() {
	const promises = [a(), b(), c()]
	const [output1, output2, output3] = await Promise.all(promises)
	return `parallel is done: ${output1} ${output2} ${output3}`
}
parallel().then(console.log)  // parallel is done: a b c


// sequence
async function sequence() {
	const output1 = await a()
	const output2 = await b()
	const output3 = await c()
	return `sequence is done: ${output1} ${output2} ${output3}`
}
sequence().then(console.log)  // sequence is done: a b c

// race 
async function race() {
	const promises = [a(), b(), c()]
	const output = await Promise.race(promises)
	return `race is done: ${output}`
}
race().then(console.log)  // race is done: a
```

## Threads, Concurrency, and Parallelism

We've already noted that js is a single threaded language. With aysnc ability, we're able to do things in the background, so even though js is just one thread we're able to do these complex things and still have websites and programs that perform well. With the async model, these requests that take a long time don't block the main thread. 

So where do they go? Tasks in a web browser or even in node are still executed in threads. This is hidden from us because they are often running on their own separate background thread outside of js. 

Eg whenever we open a new tab on our browser, it creates a new thread so that we have an entire js call stack and memory heap per tab. 

Sometimes, there are things that we need to do in the background and the browser has something called **web workers** that work in the background for us that we don't really need to know about. If there's something complicated that needs to happen that's outside of our control, these things take care of it. 

In the background, although the limitation of the v8 engine is this single threaded model with one call stack, we can pass things off to something like libuv to handle worker threads and multiple worker threads in the background for us. Same with the browser, where we also have this idea of a web worker - a js program running on a different thread in parallel to our main thread. 

How can we create something like that? 
```js
let worker = nwe Worker('worker.js')
// we can spawn a new web worker and assign it to `worker`

worker.postMessage('hello')

addEventListener('message')
```

Most of the time, we won't be working with these, this is just to show that we have them. The main takeaway is that web worker is a js program running on a different thread alongside our main thread. 

Keep in mind that these web workers communicate through these messages like the one above but they don't really have access to all the browser web API, but they do have some set abilities like `setTimeout`, `location` or navigator(?). Luckily, that's taken care of for us on the browser, we don't need to worry about different threads working on something else. 
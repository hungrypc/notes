# Error Handling

## Errors in JS

In js, we have a native error contructor function `new Error()`. We also have the `throw` keyword, which stops executing the script that's currently running. 

Error gives us three properties:
1. name
2. message
3. stack trace - where the error happened

What if we want to handle errors inside of our programs? When throw statements are encountered, the function stops and sometimes we might want to catch the error instead of stopping the entire program. In js, the system for errors go like this:

- Error
- Is there a catch?
- Is there a catch?
- Runtime catch: `onerror()` (browser)
- `process.on('uncaughtException')` (node)

As soon as an error happens on the call stack, we go to the execution context underneath and ask if there's a catch (something to handle this error). If, all the way through the callstack, there's nothing handling it then we're going to get this `onerror` function that runs inside the browser. So the runtime handles the error if nothing in our program catches this. The power of errors is in the fact that we can create hurdles along the call stack to catch these exceptions, because when we do we can do things to address the problem so that our program doesn't stop running. How do we create these hurdles?

## `try {} catch {}`
```js
function fail() {
	try {
		// try this
	} catch (error) {
		// if theres an error, do this
	} finally {
		// no matter what happens, we finish off here
	}
}
```

This type of error handling can be used to catch any type of synchronous errors. It can be used in different ways, eg nesting try catch blocks. 

We actually can also use `async await` in try catch blocks.

```js
async function a() {
	try {
		await Promise.reject('oops')
	} catch (err) {
		console.log(err)
	}
}
```

## `.catch()`

We can't always just use try catch when we have async functions - if an error occurs in async, our script would have continued with our execution so that by the time it returns with an error the script would be done. So the way we handle async errors is via `.catch()`.

If we don't catch this, it does what we call a silent fail - dangerous because we would have no idea that the error even happened. 

We can actually keep chaining these:
```js
Promise.resolve('asyncfail')
	.then(res => {
		throw new Error('fail')
		return res
	})
	.catch(err => {
		return err
	})
	.then(res => {
		console.log(res.message)	// 'fail'
	})
```

When working with node and we forget to catch, we actually get an unhandled promise rejection warning error. 
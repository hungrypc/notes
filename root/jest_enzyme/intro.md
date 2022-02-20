# Intro to Jest, Enzyme, and TDD

[Enzyme API](https://enzymejs.github.io/enzyme/docs/api/)
[Jest API](https://jestjs.io/docs/en/api)

Why enzyme? 
- Creates a virtual DOM for testing
- Allows testing without a browser
- Has better toolkit
	+ Able to search through DOM
		- jQuery style selectors
	+ Simulate simple events

Has concept of **shallow rendering**, where you can render components only one level deep. If you render parent, it uses placeholders for children. Finally, it provides access to component props and state, so you can manipulate the props as well as examine them.

```
npm i --save-dev enzyme jest-enzyme enzyme-adapter-react-17
```

Simple test:
```js
// App.test.js
import React from 'react'
import Enzyme. { Shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-17'

import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders App', () => {
	const wrapper = shallow(<App />)
	console.log(wrapper.debug())  // logs component as string
})
```
## Types of tests

- **Unit tests**: Tests one piece of code (usually one function)
- **Integration tests**: Tests how multiple units work together
- **Acceptance / End-to-end (E2E) tests**: Tests how a user would interact with app

## data-test Attributes

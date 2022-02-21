# Solidity Notes

[freeCodeCamp Youtube Tutorial](https://www.youtube.com/watch?v=M576WGiDBdQ)

## Basics

### Variable Types

Some basic [types](https://docs.soliditylang.org/en/v0.8.12/types.html)

```solidity
	uint someUnsignedNumber; // unsigned integer
	uint256 someOtherNumber; // 256bit integer
	int someSignedNumber; // signed integer
	int256 someOtherSignedNumber;
	bool someBoolean;
	string someString;
	address someAddress; // eth address
	bytes32 someBytes; // 32 bytes in this variable
	// ... 
```

### Functions

```solidity
contract Coin {

	uint256 secretNumber;

	function store(uint256 _numberToStore) public {
		secretNumber = _numberToStore;
	}
}
```

#### View & Pure Functions

View and Pure are non-state changing functions.

```solidity
contract Coin {

	uint public someNumber;

	function retrieve() public view returns(uint256) {
		return someNumber;
	}

	function add(uint256 anotherNumber) public pure {
		someNumber + anotherNumber;
	}
}
```

`view` keyword indicates that we want to just read some state off the blockchain. Public variables are automatically `view` functions.

`pure` functions are methods that purely do some type of math (and that is all, no state change or anything). 

### Visibility

 - `public`: _can be called and accessed by all contracts_
 - `external`: _can't be called by the same contract, has to be called by an external contract_
 - `internal`: _can only be called within the contact_
 - `private`: _can be accessed only by authorized contracts, the contract they're defined in and not in derived contracts_

Default visibilty: `internal`.

### Structs

`struct`s are ways to define new types in solidity.

```solidity
struct People {
		uint256 age;
		string name;
	}

People public person = People({ age: 28, name: 'Bob' })
```

### Arrays

```solidity
// dynamic array
	string[] public colors = ['red', 'green', 'blue'];

// fixed array
string[1] public favoriteColor = ['black'];


function addColor(string color) public {
	colors.push(color);
}
```

### Memory & Storage

There's two ways to store information, in `memory` or `storage`.

Storing in `memory` means that it will only be stored during execution of the function. `storage` means that the data will persist even after execution.

```solidity
funtion addPerson(string memory _name, uint256 _age) public {
	people.push(People(_age, _name))
}
```

note: when you use a parameter thats going to be a string for one of your functions, you need to define it as `string memory` (like above)

### Mapping

`mapping` is a dictionary like data structure, with one value per key.

```solidity
mapping(key => value) public mapName

// eg
mapping(string => uint256) public nameToAge;

function addPerson(string memory _name, uint256 age) public {
	people.push(People(_age, _name));
	nameToAge[_name] = _age
}
```

### SPDX License

At the top of these contracts, we want to add an SPDX License identifier.

The Solidity and Eth community found out that trust a smart contract can be better established if source code is available.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0'

contract Coin {
	// ...
}
```

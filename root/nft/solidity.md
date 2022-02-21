# Solidity Notes

### Variable Types

Some basic [types](https://docs.soliditylang.org/en/v0.8.12/types.html)

```solidity
contract Coin {

	uint someUnsignedNumber; // unsigned integer
	uint256 someOtherNumber; // 256bit integer
	int someSignedNumber; // signed integer
	int256 someOtherSignedNumber;
	bool someBoolean;
	string someString;
	address someAddress; // eth address
	bytes32 someBytes; // 32 bytes in this variable
	// ... 

}
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

 - public: _can be called and accessed by all contracts_
 - external: _can't be called by the same contract, has to be called by an external contract_
 - internal: _can only be called within the contact_
 - private: _can be accessed only by authorized contracts, the contract they're defined in and not in derived contracts_

Default visibilty: `internal`.

### Structs

`struct`s are ways to define new types in solidity.

```solidity
struct People {
	
}
```


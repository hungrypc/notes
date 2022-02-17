# NFT web dev course

## Solidity

### Creating smart contracts in solidity

```solidity
contract Coin {

  // data types::
  uint public tokens = 400; // uint: unassigned integer
  address public minter; // address: self explanatory

  constructor() {
    minter = msg.sender; // msg.sender is a global var.
  }


}
```

#### Visibility
 - public: _can be accessed by all contracts_
 - external: _can be accessed externally only_
 - internal: _only visible internally_
 - private: _can be accessed only by authorized contracts_


#### Mapping
> mapping: acts like dictionary to store data
`mapping(key  => value) public mapName`

eg. write a public map that takes the key of an address to the value of an integer called balances
```solidity
mapping(address => uint) public balances
```

#### Events
> _events allow clients to react to specific contract changes taht you declare (oneway logging of transactions)_
types of events::
 - Sent
 - Transfer
 - Allow

```solidity
event Sent(address from, address to, uint amount) {}
```

#### Minting


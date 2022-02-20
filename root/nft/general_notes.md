# Notes

## Smart Contracts

> A smart contract is self-executing code that carries out a set of instructions (when certain conditions are met), which are then verified on the blockchain.

They are:
- **Trustless**: _trust in humans or institutions are not required for the system to work - happens without humans needing to interfere_
- **Autonomous**: _performed automatically_
- **Decentralized**: _supervision/decision-making is distributed amongst a network, rather than a central location/authority_
- **Transparent**: _transactions are completely open to be viewed_

Like traditional contracts, smart contracts are agreements between two or more parties where one party offers something of value to another and the offer is accepted **but instead of being on paper and handled manually, self-executing code carries out the terms of the agreement.** This code is sent to an address on a blockchain as a transaction, where it's verified by the blockchain's consensus mechanism (proof of work/stake/etc). Once this transaction is uncluded in a block, the smart contract is initiated and irreversible.


This removes need for intermediaries (self-executing) and contract enforcement (verified on blockchain). This reduces the cost and simplifies the contract negotiation process. 


## Proof of Work/Proof of Stake

> Consensus mechanism: process through which a distributed network reaches an agreement about information on the network (such as whether transactions are valid and in what order they occur).

### Proof of Work
Proof of work is a consensus mechanism where miners operate computer hardware to run network nodes that use computational power to algorithmically solve mathematical puzzles. This is done through the use of hashing functions, where miners will hash the block data (transactions) + nonce (+ a transaction on the block that pays out the miner) and do this over and over (incrementing nonce, plus other added info to add variation) until the hash hits a target set. This can be verified by all the other nodes when given the proof response.

### Proof of Stake
Similar to POW, but requires less work and energy. Instead of a race to validate a transaction, "validators" stake a specific amount of coins as collateral for a chance to be randomly selected to mine/validate the block. Blocks are validated by more than one validator, and when a specific number of validators verify that the block is accurate, it's finalized and closed. Staking coins keeps the network secure and validators honest because if they were to act maliciously/attempt to validate a wrong transaction, they lose their stake and access to the network through a process called "slashing". For malicious validators to be successful, they'd have to own 51% of the staked crypto AND be lucky to have their miners be selected, which is highly unlikely.

### Sharding
> Sharding: a mechanism used to partition a blockchain network or other type of computer network/database. Its purpose being to distribute the network's computational and storage workload across a broader set of devices/nodes, thereby increasing the throughput and transaction speed of the entire system.

Each node only maintains information related to its specific shard/partition, and since each node is only resposible for processing a fraction of the overall network's transactional load, the network's overall processing capabilities and resilience is vastly improved.

## Liquidity Pools

> Liquidity Pools are a mechanism by which users can pool their assets in a Decentralized Exchange's (DEX) *smart contracts* to provide asset liquidity for traders to swap between currencies

#### Why is this important?

low liquidity = not good.

> Slippage: _Difference between the expected price of a trade and the price at which it is executed_ 

Most common during periods of higher volatility, and can occur when a large order is executed but there isn't enough volume at the selected price to maintain the bid-ask spread (difference between buy and sell price on exchange).

Low liquidity can incur more slippage and the executed trading price can far exceed the original market order price.

Liq. Pools aim to solve prob;em of illiquid markets by incentivizing users themselves to provide crypto liquidity for a share of trading fees.

Trading with liquidity pool protocols like Bancor or Uniswap requires no buyer and seller matching => means that users can simply exchange their tokens and assets using liquidity that is provided by users and transacted through smart contracts.

#### How does it work

Earn trading fees and crypto rewards from the exchanges that users pool their tokens in.

User supplies => earn LP tokens. Find out what value LP tokens can provide you.

When pool facilitates a trade, a fractional fee is proportionally distributed amonst the LP token holders. For the liquidity provider to get back the liquidity they contributed (plus accrued fees from their portion), their LP tokens must be destroyed.

#### Yield Farming and Liq. Pools

To create a better trading experience, various protocols offer even more incentives => providing more tokens for particular "incentivized" pools.
> Liquidity mining: _Participating in these pools as a provider to get the maximum amount of LP tokens_

Liq. mining is how liq. providers can optimize their LP token earnings on a particular market/platform.

There are many markets/platforms/incentivized pools... So how do you choose where to place your funds? This is where *yield farming* comes into play. 

> Yield farming is the practice of *staking* or locking up cryptocurrencies within a blockchain protocol to generate tokenized rewards that help maximize earnings

This allows the provider to collect high returns for slightly higher risk as their funds are distributed to trading pairs and incentivized pools with the highest trading fee and LP token payouts across multiple platforms.

This type of liq. investing can automatiaclly put a user's funds into the highest yielding asset pairs. 



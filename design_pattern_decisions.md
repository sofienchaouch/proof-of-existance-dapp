# Design Pattern Decisions

Users can upload files content to IPFS, the hash link and the timestamp will be stored inside the smart contract. This pattern makes smart contracts cheaper, storing files inside a smart contract is too much expensive and not advised for confidential data due to the public blockchain transparency (GDPR).

* **Fail early and fast:** Using modifiers and requires (in the first lines of code) allows the contract to interrupt immediately an action before executing the rest of the code.

* **Ownable:** Some functions are restricted to be used only by the contract owner - [Ownable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)

* **Circuit Breaker:** The contract owner can lock/unlock the contract in case of emergency - [Pausable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol)

* **Mapping:** I preferred mappings over arrays, mappings allow to use less gas than arrays, lowering the probability of hitting the gas limit

* **OpenZeppelin:** I used this library due to its opensource nature, tested and community-audited code,

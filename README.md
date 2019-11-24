# Proof-Of-Existance Dapp

## Overview
Ethereum proof of existance dapp. Application frontend is developed in ReactJS, Smart Contracts are developed in Solidity. 
This application allows users to prove existence of some information by showing a time stamped picture/video.

Data could be stored in a database, but to make it truly decentralized consider storing pictures using something like IPFS. The hash of the data and any additional information is stored in a smart contract that can be referenced at a later date to verify the authenticity.

### User Stories:
A user logs into the web app. 
The app reads the user’s address and shows all of the data that they have previously uploaded.
The user can upload some data (pictures/video) to the app, as well as add a list of tags indicating the contents of the data.
Users can retrieve necessary reference data about their uploaded items to allow other people to verify the data authenticity.
Users can privide a proof of a document by storing its hash in the blockchain. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Requirements

What things you need to install the software and how to install them


| `nodejs` | v8.11.3 or higher |
| `npm` | v6.1.0 or higher |
| `MetaMask` |  browser extension |
| `Truffle` |  v4.1.13 or higher |
| `ganache-cli` |   |
| `Solidity` | v0.4.24 or higher  |
| `git` |   |


### Installation

A step by step series of examples that tell you how to get a development env running

Clone the project repository.


Go to the project directory

```
cd proof-of-existence-dapp
```

Install node modules

```
npm install
```

Compile Smart Contracts

```
truffle compile
```

Start a development blockchain network

```
ganache-cli
```

Mirgate smart contracts

```
truffle migrate [--reset]
```


Login to metamask with Ganache-cli seed phrases

```
copy ganache-cli seed phrase and login to metamask and select localhost
```

Start Dapp

```
npm run start
```

Start using Dapp

```
http://localhost:3000/
```


## Running the tests

This section explain how to run the automated tests for this application.

Go to project root directory

```
cd proof-of-existence-dapp
```

Run tests

```
truffle test
```

## Deployment

Follow the steps mentioned below to do testnet deployment.

1. Go to project directory and open truffle.js file
`cd proof-of-existence-dapp/truffle-config.js`

2. Open metamask and assign the seed phrase to seedWords variable
`seedWords = "memonic"`

3. Go to command prompt and run the truffle migrate command
`truffle migrate --network rinkeby` 






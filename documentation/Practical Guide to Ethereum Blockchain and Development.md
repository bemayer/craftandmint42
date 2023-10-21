1. Introduction
1.1. Background of Ethereum Blockchain
1.2. Importance of Ethereum in NFT Deployment
1.3. Overview of the Document

2. Getting Started
2.1. Setting Up Development Environment
- Visual Studio Code
- Hardhat
2.2. Basics of Solidity Language
- Syntax
- Data Types
- Functions and Control Structures

3. Ethereum Blockchain Basics
3.1. How Ethereum Blockchain Works
3.2. Transactions and Blocks
3.3. Ethereum Virtual Machine (EVM)
3.4. Gas and Fees

4. Smart Contracts
4.1. What Are Smart Contracts?
4.2. Creating a Smart Contract
4.3. Deploying and Interacting with Smart Contracts

5. NFT Deployment
5.1. What are NFTs?
5.2. Creating an NFT
5.3. Deploying an NFT on Ethereum

6. Testing and Debugging
6.1. Testing Smart Contracts
6.2. Debugging Techniques

7. Security Best Practices
7.1. Common Vulnerabilities
7.2. Security Audits

Conclusion

References and Further Reading


- First blockchain: bitcoin

- Store transactions in blocks

- Block are "chained" together: they store the hash of the previous block so it is not possible to modify a block without modifying all the blocks that come after it

-> Give more explanation of a blockchain data structure

- From the transactions we can compute the current value of each account

- Every transaction can be seen as a state transition

- Every transaction are actually a bit more that a plain transaction, there is a bit of code that is executed, written in Bitcoin script, a language that is not Turing complete
https://en.bitcoin.it/wiki/Script

- Ethereum goal was to generalise this idea of a blockchain as a state transition, see https://ethereum.org/en/whitepaper/

-> Give more explanation of the Ethereum whitepaper and the idea of a state transition and how the world state is stored in the blockchain, and the difference with Bitcoin

- Ethereum is a blockchain with a built-in Turing-complete programming language, Soldity, meaning that it can run any algorithm

-> Give more explanation of Solidity syntax

- Ethereum can then allowed complex transactions, smart-contracts, decentralized applications (dApps)

- Such as Bitcoin for which every transation cost a fees, Ethereum has a fees for every instruction executed, called gas

- Considering the amount of gas used by a program develop in Solidity is critical, and Solidty compiler will give you an estimation of the gas used by your program

- "Smart contracts" or "dApps" are actually just instances of class whose member functions and member attributes are stored in the blockchain and can be called using messages

- Ethereum is a distributed virtual machine, meaning that every node of the network execute the same code, and the state of the virtual machine is stored in the blockchain








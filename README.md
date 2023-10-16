# CraftAndMint42

## Overview
*CraftAndMint42* is a blockchain-based project created as part of the Tokenizer assignment at 42 school. The subject of this project was designed with insights from [BNB Chain](https://www.bnbchain.org/), the world's largest smart-contract blockchain. It aims to train students building a practical experience in blockchain technology by establishing their own token ecosystem.


## Project Name
The project is called *CraftAndMint42*, a name that blends the two main features. "Craft" refers to the use of the AI tool MemberStudio to create unique images from a prompt. "Mint" is about turning these images into unique, blockchain-based Non-Fungible Tokens (NFTs).

## Blockchain Platform
*CraftAndMint42* is developed on the Ethereum blockchain, owing to its robustness, large community, and extensive developer tools.

## Programming Language and Tools
- *Language*: Solidity
- *IDE*: Visual Studio Code
- *Development environment*: Harhat // Answer what it s a development environment and why this choice (use NodeJS, npm, TypeScript support, comprehensive framework etc.)

## Security Measures
Several security measures have been implemented to ensure the safe and reliable operation of the token:
Ownership controls for administrative tasks
Role-based access to limit privileges
Audited code to minimize vulnerabilities

## Smart Contract Address and Network
- *Smart Contract Address*: 0x123...
- *Network*: BNB Smart Chain Testnet

## Token Ticker
The ticker symbol for the token within the CraftAndMint42 ecosystem is CM42.

## Purpose and Use-Cases
The token serves several purposes within the MintAndCraft42 ecosystem:

## Documentation
In the documentation folder, you will find the following all my notes:
- Overview of the Ethereum blockchain, the ERC-721 standard, and the process of developing a smart contract
- Mathematical refreshers on cryptography and hashing
  - Public-Key Cryptography: Ethereum uses Elliptic Curve Digital Signature Algorithm (ECDSA) for generating public-private key pairs. This allows users to sign transactions and helps to verify the identity of the sender.
  - Hash Functions: Cryptographic hash functions like Keccak-256 are widely used in Ethereum. They take an input and return a fixed-size string of bytes, typically a digest that represents the data. They are used for data integrity checks and in the formation of Merkle Trees.



# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Ideas of table of content for the documentation

Document 1: General Overview Focused on Code
Table of Contents
Introduction

Brief explanation of what Ethereum is
Purpose of the document
Understanding Ethereum

Definition and Historical Background
How It Differs from Other Blockchains
Smart Contracts

Definition and Importance
Languages Used (Solidity, Vyper)
Ethereum Virtual Machine (EVM)

Role in Ethereum
How Smart Contracts are Executed
ERC-721 Standard

Introduction to Tokens
What Makes ERC-721 Unique
Real-World Use-Cases (e.g., NFTs)
Developing a Smart Contract

Setting up the Development Environment
Writing a Basic ERC-721 Smart Contract
Testing the Smart Contract
Deploying to Ethereum Network
NFTs and ERC-721

How NFTs Use ERC-721
Your School Project: An Overview
Tools and Libraries

Truffle, Hardhat, etc.
Web3.js and Ethers.js
Security Considerations

Common Pitfalls
How to Secure Your Smart Contracts
Conclusion

Summary
Further Resources
Appendices
Code Samples
Glossary
Document 2: Mathematical Concepts in Ethereum
Table of Contents
Introduction

Brief Explanation of Why Mathematics is Important in Ethereum
Purpose of the Document
Public-Key Cryptography

Historical Background
Elliptic Curve Digital Signature Algorithm (ECDSA)
Applications in Ethereum
Hash Functions

What is a Hash Function?
Properties of Cryptographic Hash Functions
Keccak-256 in Ethereum
Merkle Trees

Basics and Definitions
How Ethereum Utilizes Merkle Trees
Zero-Knowledge Proofs

Fundamentals
Applications in Ethereum Scaling and Privacy
Consensus Algorithms

Proof of Work (Mathematical Foundation)
Proof of Stake (Mathematical Foundation)
Formal Verification

Role in Smart Contracts
Mathematical Methods Used
Conclusion

Summary of Mathematical Concepts
Importance in Future Developments
Appendices

Mathematical Proofs
Glossary

$n^2$

$$
P \approx (\frac{q}{p})^n
$$

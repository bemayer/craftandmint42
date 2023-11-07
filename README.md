# CraftAndMint42

This project is a ERC-721 smart contract with a minimalist frontend interface using just vanilla HTML and Javascript, and the CSS from MVP.css to interact with it, to generate AI-generated images with Dreamstudio, save them to IPFS using Pinata and mint them as NFTs on the Ethereum blockchain.

## Overview
*CraftAndMint42* consists of an ERC-721 smart contract for minting NFTs, paired with a simple web interface created with basic HTML, JavaScript, and MVP.css for styling. It allows users to create AI-generated images using Dreamstudio, store them on IPFS via Pinata, and then mint these images as NFTs on the Ethereum blockchain.

This project was created as part of the Tokenizer assignment at 42 school. The subject was designed with insights from [BNB Chain](https://www.bnbchain.org/), the world's largest smart-contract blockchain. It aims to train students building a practical experience in blockchain technology by establishing their own token ecosystem.


## Project Name
The project is called *CraftAndMint42*, a name that blends the two main features. "Craft" refers to the use of the AI tool MemberStudio to create unique images from a prompt. "Mint" is about turning these images into unique, blockchain-based Non-Fungible Tokens (NFTs).

## Blockchain Platform
*CraftAndMint42* is developed on the Ethereum blockchain, owing to its robustness, large community, and extensive developer tools.

## Programming Language and Tools
- *Language*: Solidity
- *IDE*: Visual Studio Code
- *Development environment*: Hardhat

Hardhat was chosen for Solidity development because it works with Node.js and npm, tools I am already familiar with. It supports TypeScript for more robust coding, includes its own Ethereum testing environment, offers helpful debugging tools, and makes it easy to test and deploy smart contracts. This helps developers work more efficiently and create secure, reliable contracts.

## Security Measures
This project employs libraries such as Hardhat and OpenZeppelin that have undergone extensive testing and audits.
Testing of the smart contract is conducted using the testing framework integrated within Hardhat.
Additionally, GitHub Actions are implemented to systematically conduct tests upon each new code push to the repository.

## Smart Contract Address and Network
- *Smart Contract Address*: 0x123...
- *Network*: BNB Smart Chain Testnet

## Token Ticker
The ticker symbol for the token within the CraftAndMint42 ecosystem is CM42.

## Purpose and Use-Cases
The token serves several purposes within the MintAndCraft42 ecosystem:

## Documentation
In the documentation folder, you will find the following all my notes:
- Overview of the Ethereum blockchain, the token standards, and the process of developing a smart contract
- Mathematical refreshers on cryptography and hashing
  - Hash Functions: Cryptographic hash functions like Keccak-256 are widely used in Ethereum. They take an input and return a fixed-size string of bytes, typically a digest that represents the data. They are used for data integrity checks and in the formation of Merkle Trees.
  - Public-Key Cryptography: Ethereum uses Elliptic Curve Digital Signature Algorithm (ECDSA) for generating public-private key pairs. This allows users to sign transactions and helps to verify the identity of the sender.


## Interacting with the Smart Contract

This project demonstrates a basic Hardhat use case. It comes with a smart contract, a test for that contract, and a script that deploys that contract.

Run the following commands to try it out:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test # Estimation of cost by operation can be computed here https://www.cryptoneur.xyz/en/gas-fees-calculator/
npx hardhat node
npx hardhat run --network localhost scripts/deploy.ts
```

Now that you have a running Hardhat node and a deployed contract, you can interact with it via ethers.js.

```javascript
// Import ethers library
const { ethers } = require('ethers');

// This JSON should contain the ABI of the contract.
const abi = require('./deployment/abi.json');

// Set up the provider by connecting to the local node
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Create a wallet instance using a private key and connect it to the provider
const wallet = new ethers.Wallet('<YOUR_PRIVATE_KEY>', provider);

// Create a contract instance connected to the wallet
const contractAddress = '<CONTRACT_ADDRESS>';
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Function to mint a new token
async function mintToken(to, title, ipfsHash) {
  // Call the mint function of the contract
  const transaction = await contract.mint(to, title, ipfsHash);
  console.log(`Transaction hash: ${transaction.hash}`);

  // Wait for the transaction to be confirmed
  const receipt = await transaction.wait();
  console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
}

// Function to transfer a token
async function transferToken(to, tokenId) {
  // Call the transfer function of the contract
  const transaction = await contract.transfer(to, tokenId);
  console.log(`Transaction hash: ${transaction.hash}`);

  // Wait for the transaction to be confirmed
  const receipt = await transaction.wait();
  console.log(`Token ID ${tokenId} transferred to ${to}`);
}

// Function to get total number of NFTs minted
async function getTotalNFTs() {
  const totalNFTs = await contract.getTotalNFTs();
  console.log(`Total NFTs minted: ${totalNFTs}`);
}

// Function to get information about a specific NFT
async function getNFTInfo(tokenId) {
  const nftInfo = await contract.getNFTInfo(tokenId);
  console.log(`NFT Info: ${JSON.stringify(nftInfo, null, 2)}`);
}

// Example of calling the functions
(async () => {
  try {
    // Mint a new token
    await mintToken('<RECIPIENT_ADDRESS>', 'Artwork Title', '<IPFS_HASH_OF_ARTWORK>');

    // Transfer a token
    await transferToken('<RECIPIENT_ADDRESS>', '<TOKEN_ID>');

    // Get total number of NFTs
    await getTotalNFTs();

    // Get information about a specific NFT
    await getNFTInfo('<TOKEN_ID>');
  } catch (error) {
    console.error(error);
  }
})();
```

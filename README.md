# CraftAndMint42

https://github.com/bemayer/craftandmint42/assets/7115101/c080625e-c8d2-4013-9fc6-e53fa18fdb71

*CraftAndMint42* consists of an ERC-721 smart contract for minting NFTs, paired with a simple web interface created with basic HTML, JavaScript, and MVP.css for styling. It allows users to create AI-generated images using Dreamstudio, store them on IPFS via Pinata, and then mint these images as NFTs on the Ethereum blockchain.

The contract is deployed on the [Binance Smart Chain Testnet](https://testnet.bscscan.com/address/0x1f291314854B36957015Aa5005c15F14808DAdeC).

## Overview
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
- *Smart Contract Address*: `0x1f291314854B36957015Aa5005c15F14808DAdeC`
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
npm install
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test # Estimation of cost by operation can be computed here https://www.cryptoneur.xyz/en/gas-fees-calculator/
npx hardhat node
npx hardhat run --network localhost scripts/deploy.ts
```

Now that you have a running Hardhat node and a deployed contract, you can interact with it via ethers.js.

```javascript
// Import ethers library
const { ethers, JsonRpcProvider } = require('ethers');

const YOUR_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const RECIPIENT_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const TOKEN_TITLE = '<TOKEN_TITLE>';
const IPFS_HASH_OF_ARTWORK = '<IPFS_HASH_OF_ARTWORK>';
const TOKEN_ID = 0;

// This JSON should contain the ABI of the contract.
const abi = require('./deployment/abi.json');

// Set up the provider by connecting to the local node
const provider = new JsonRpcProvider('http://localhost:8545');

// Create a wallet instance using a private key and connect it to the provider
const wallet = new ethers.Wallet(YOUR_PRIVATE_KEY, provider);

// Create a contract instance connected to the wallet
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

// Function to mint a new token
async function mintToken(to, title, ipfsHash) {
	// Call the mint function of the contract
	const transaction = await contract.mint(to, title, ipfsHash);
	console.log(`Transaction hash: ${transaction.hash}`);

	// Wait for the transaction to be confirmed
	const receipt = await transaction.wait();
	console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
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
    await mintToken(RECIPIENT_ADDRESS, TOKEN_TITLE, IPFS_HASH_OF_ARTWORK);

    // Get total number of NFTs
    await getTotalNFTs();

    // Get information about a specific NFT
    await getNFTInfo(TOKEN_ID);
  } catch (error) {
    console.error(error);
  }
})();
```

## Useful Resources
For further reading and understanding, here are some valuable resources:

### Websites
- **Learn Ethereum**: A comprehensive resource for learning about Ethereum, covering everything from the basics to advanced concepts. [Learn Ethereum](https://ethereum.org/en/learn/)
- **Learn EVM (Ethereum Virtual Machine)**: To discover the advanced technical intricacies of the Ethereum Virtual Machine, the foundation of not only Ethereum but also Polygon, Binance, Avalanche, or Cardano. [LearnEVM](https://learnevm.com/)
- **Solidity Documentation**: The best resource for learning Solidity, including "Solidity by Example" with project examples and code snippets. [Solidity Docs](https://docs.soliditylang.org/en/)
- **OpenZeppelin**: The most used library of secure, community-vetted smart contract templates. Use the [OpenZeppelin Wizard](https://wizard.openzeppelin.com/) to create custom contracts from their templates. [OpenZeppelin](https://docs.openzeppelin.com/)
- **Ethereum Improvement Proposals (EIPs)**: Official standards defined by the Ethereum consortium, such as ERC-20 for standard tokens and ERC-721 for NFTs. [EIPs](https://eips.ethereum.org/all)
- **JSON-RPC**: The protocol used for interacting with EVM nodes. [Ethereum JSON-RPC Specification](https://ethereum.github.io/execution-apis/api-documentation/)
- **Alchemy**: A provider offering stable and fast access to Ethereum nodes with a robust free tier. The most complete documentation I could find. [Alchemy Docs](https://docs.alchemy.com/)
- **ethers.js**: The reference JavaScript library for interacting with an EVM blockchain. [ethers.js Documentation](https://docs.ethers.org/)
- **Hardhat**: A development environment for EVM with comprehensive tools and tutorials. [Hardhat](https://hardhat.org/docs)

### Books
- Bahga, A., & Madisetti, V. (2022). *Mastering Blockchain: A technical reference guide to the inner workings of blockchain, from cryptography to DeFi and NFTs* (4th ed.). Packt Publishing. ISBN 9781803241067. [Packt](https://www.packtpub.com/en-us/product/mastering-blockchain-9781803241067)
- Washington, L. C. (2012). *Elliptic Curves: Number Theory and Cryptography* (2nd ed.). CRC Press. ISBN 9781138088615. [Routledge](https://www.routledge.com/Elliptic-Curves-Number-Theory-and-Cryptography/Washington/p/book/9781138088615)
- Cohen, H., Frey, G., Avanzi, R., Doche, C., Lange, T., Nguyen, K., & Vercauteren, F. (2006). *Handbook of Elliptic and Hyperelliptic Curve Cryptography*. CRC Press. ISBN 9781584885184. [Routledge](https://www.routledge.com/Handbook-of-Elliptic-and-Hyperelliptic-Curve-Cryptography/Cohen-Frey-Avanzi-Doche-Lange-Nguyen-Vercauteren/p/book/9781584885184)

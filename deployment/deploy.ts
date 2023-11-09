import { ethers } from "hardhat";
import * as fs from 'fs';

/**
 * Deploys the contract and writes the ABI and contract address to the deployment folder.
 *
 * To redeploy to bnb testnet,
 *
 * 1. Add the network configuration to hardhat.config.ts:
 *
 * networks: {
 *   bsctestnet: {
 *     url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
 *     accounts: [process.env.PRIVATEKEY || ""],
 *   },
 * },
 * 2. Run `npx hardhat run deployment/deploy.ts --network bsctestnet`.
 */
async function main() {
  const craftAndMint42 = await ethers.deployContract("CraftAndMint42");

  await craftAndMint42.waitForDeployment();

  const abiPath = './artifacts/code/CraftAndMint42.sol/CraftAndMint42.json';
  const abiJSON = JSON.parse(fs.readFileSync(abiPath, 'utf8')).abi;
  fs.writeFileSync('./deployment/abi.json', JSON.stringify(abiJSON, null, 2));
  fs.writeFileSync('./deployment/contractAddress', JSON.stringify(craftAndMint42.target));


  console.log(
    `CraftAndMint42 deployed to ${JSON.stringify(craftAndMint42.target)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

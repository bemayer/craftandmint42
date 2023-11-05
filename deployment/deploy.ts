import { ethers } from "hardhat";
import * as fs from 'fs';

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

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

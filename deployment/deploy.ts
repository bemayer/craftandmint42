import { ethers } from "hardhat";

async function main() {
  const craftAndMint42 = await ethers.deployContract("CraftAndMint42");

  await craftAndMint42.waitForDeployment();

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

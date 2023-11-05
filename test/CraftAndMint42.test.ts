import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

const IPFS_HASH = "hash";
const TOKEN_FIRST_URI = `https://gateway.ipfs.io/ipfs/${IPFS_HASH}`;
const TOKEN_FIRST_TITLE = "First Token";

async function deploy() {
  const CraftAndMint42 = await ethers.getContractFactory("CraftAndMint42");
  const [admin, account1, account2] = await ethers.getSigners();
  const craftAndMint42 = await CraftAndMint42.deploy();

  await craftAndMint42.waitForDeployment();

  return { craftAndMint42, CraftAndMint42, admin, account1, account2 };
}

describe("Check deployment", () => {
  it("Should set the right admin", async () => {
    const { craftAndMint42, admin } = await loadFixture(deploy);

    expect(await craftAndMint42.admin()).to.equal(admin.address);
  });

  it("Should have correct name and symbol", async () => {
    const { craftAndMint42 } = await loadFixture(deploy);

    expect(await craftAndMint42.name()).to.equal("CraftAndMint42");
    expect(await craftAndMint42.symbol()).to.equal("CM42");
  });
});

describe("Minting", () => {
  it("Should not allow non-admin to mint a new token", async () => {
    const { craftAndMint42, account1 } = await loadFixture(deploy);

    await expect(
      craftAndMint42.connect(account1).mint(account1.address, TOKEN_FIRST_TITLE, IPFS_HASH)
    ).to.be.revertedWith("Not admin");
  });

  it("Should allow admin to mint a new token", async () => {
    const { craftAndMint42, admin, account1 } = await loadFixture(deploy);

    await craftAndMint42.connect(admin).mint(account1.address, TOKEN_FIRST_TITLE, IPFS_HASH);

    expect(await craftAndMint42.nextTokenId()).to.equal(1);
    expect(await craftAndMint42.ownerOf(0)).to.equal(account1.address);
    expect(await craftAndMint42.tokenURI(0)).to.equal(TOKEN_FIRST_URI);
    expect((await craftAndMint42.nftInfos(0)).title).to.equal(TOKEN_FIRST_TITLE);
  });
});

describe("Transferring", () => {
    it("Should not allow non-owner to transfer the token", async () => {
      const { craftAndMint42, admin, account1, account2 } = await loadFixture(deploy);

      await craftAndMint42.connect(admin).mint(account1.address, TOKEN_FIRST_TITLE, IPFS_HASH);
      await expect(
      craftAndMint42.connect(account2).transfer(account1.address, 0)
    ).to.be.revertedWith("Not token owner");
  });

  it("Should allow token owner to transfer the token", async () => {
    const { craftAndMint42, admin, account1, account2 } = await loadFixture(deploy);

    await craftAndMint42.connect(admin).mint(account1.address, TOKEN_FIRST_TITLE, IPFS_HASH);
    await craftAndMint42.connect(account1).transfer(account2.address, 0);
    expect(await craftAndMint42.ownerOf(0)).to.equal(account2.address);
  });

  it("Should allow new token owner to transfer back the token", async () => {
    const { craftAndMint42, admin, account1, account2 } = await loadFixture(deploy);

    await craftAndMint42.connect(admin).mint(account1.address, TOKEN_FIRST_TITLE, IPFS_HASH);
    await craftAndMint42.connect(account1).transfer(account2.address, 0);
    await craftAndMint42.connect(account2).transfer(account1.address, 0);
    expect(await craftAndMint42.ownerOf(0)).to.equal(account1.address);
  });
});

describe("Query Functions", () => {
  it("Should return the correct total number of NFTs", async () => {
    const { craftAndMint42, admin, account1 } = await loadFixture(deploy);

    expect(await craftAndMint42.getTotalNFTs()).to.equal(0);

    await craftAndMint42.connect(admin).mint(account1.address, TOKEN_FIRST_TITLE, IPFS_HASH);

    expect(await craftAndMint42.getTotalNFTs()).to.equal(1);
    expect((await craftAndMint42.getNFTInfo(0)).title).to.equal(TOKEN_FIRST_TITLE);
  });

  it("Should revert when getting info for non-existent token ID", async () => {
    const { craftAndMint42 } = await loadFixture(deploy);

    await expect(craftAndMint42.getNFTInfo(999)).to.be.revertedWith("Token ID does not exist");
  });
});

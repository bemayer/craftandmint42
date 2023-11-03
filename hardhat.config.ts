import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.21",
  paths: {
    sources: "./code",
  },
  mocha: {
    timeout: 600000,
  },
};

export default config;

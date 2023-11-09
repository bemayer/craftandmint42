import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();


const config: HardhatUserConfig = {
  solidity: "0.8.21",
  paths: {
    sources: "./code",
  },
  mocha: {
    timeout: 600000,
  },
  networks: {
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [process.env.PRIVATEKEY || ""],
    },
  },
};

export default config;

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")
// const { ProxyAgent, setGlobalDispatcher } = require("undici");
// const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
// setGlobalDispatcher(proxyAgent);

const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const MNEMONIC = process.env.MNEMONIC
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  solidity: "0.8.18",
  networks:{
    sepolia: {
      url: ALCHEMY_SEPOLIA_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 11155111,
    },
    mumbai: {
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 80001,
    },
  },

  // 开源验证合约
  etherscan:{
    apiKey:ETHERSCAN_API_KEY,
  },

  // gas 报告
  gasReporter: {
    enabled: true,
  }

};

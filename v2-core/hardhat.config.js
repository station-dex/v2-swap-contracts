require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config({ path: '../.env' })

const GWEI = 1000000000

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: { 
    version: '0.5.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 999_999
      }
    }
  },
  networks: {
    xLayerTestnet: {
      url: 'https://testrpc.xlayer.tech',
      chainId: 195,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 100 * GWEI,
      explorer: 'https://www.oklink.com/xlayer-test'
    },
    fantomTestnet: {
      url: 'https://rpc.testnet.fantom.network/',
      chainId: 4002,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 2 * GWEI,
      explorer: 'https://testnet.ftmscan.com/'
    },
    xLayerMainnet: {
      url: 'https://rpc.xlayer.tech',
      chainId: 196,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 9 * GWEI,
      explorer: 'https://www.oklink.com/xlayer'
    },
  },
  etherscan: {
    apiKey: {
      xLayerMainnet: process.env.EXPLORER_API_KEY,
      xLayerTestnet: process.env.EXPLORER_API_KEY,
      fantomTestnet: process.env.EXPLORER_API_KEY
    },
    customChains: [
      {
        network: "xLayerMainnet",
        chainId: 196,
        urls: {
          apiURL: "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER",
          browserURL: "https://www.oklink.com/xlayer"
        }
      },
      {
        network: "fantomTestnet",
        chainId: 4002,
        urls: {
          apiURL: 'https://api-testnet.ftmscan.com/api',
          browserURL: 'https://testnet.ftmscan.com'
        }
      },
      {
        network: "xLayerTestnet",
        chainId: 195,
        urls: {
          apiURL: "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET",
          browserURL: "https://www.oklink.com/xlayer-test"
        }
      }
    ]
  }
}

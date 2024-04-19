const { ethers } = require('hardhat')
const { formatEther } = require('ethers/lib/utils')

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

const deploy = async (name, ...params) => {
  const contract = await ethers.getContractFactory(name)

  const deployed = await contract.deploy(...params)
  return deployed
}

const start = async () => {
  const [owner] = await ethers.getSigners()
  const factory = process.env.FACTORY_V2
  const weth = process.env.WETH

  const previousBalance = await owner.getBalance()
  console.log('Deployer: %s. Balance: %s ETH', owner.address, formatEther(previousBalance))

  const router = await deploy('UniswapV2Router02', factory, weth)

  const instance = await router.deployed()
  console.log('Router Deployed: %s', router.address)

  const balance = await owner.getBalance()
  const cost = previousBalance.sub(balance)
  console.log('Cost: %s ETH. Balance: %s ETH', formatEther(cost), formatEther(balance))

  if (process.env.VERIFY_CONTRACTS === "true") { 
    await delay(20000)
    await run("verify:verify", {
      address: instance.address,
      constructorArguments: [factory, weth],
    });
  }
}

start()

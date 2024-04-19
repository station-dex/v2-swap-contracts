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
  const previousBalance = await owner.getBalance()
  
  console.log('Deployer: %s. Balance: %s ETH', owner.address, formatEther(previousBalance))

  const factory = await deploy('UniswapV2Factory', owner.address)
  const hash = await factory.INIT_CODE_HASH()

  console.log('Factory: %s / Init Code Hash: %s', factory.address, hash)

  if(process.env.FEE_TO) {
    await factory.setFeeTo(process.env.FEE_TO)
  }

  const instance = await factory.deployed()

  const balance = await owner.getBalance()
  const cost = previousBalance.sub(balance)
  console.log('Cost: %s ETH. Balance: %s ETH', formatEther(cost), formatEther(balance))


  if (process.env.VERIFY_CONTRACTS === "true") { 
    await delay(20000)
    await run("verify:verify", {
      address: instance.address,
      constructorArguments: [owner.address],
    });
  }
}

start()

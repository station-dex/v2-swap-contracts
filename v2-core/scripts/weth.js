const { ethers, run } = require('hardhat')

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
  console.log('Signer: %s', owner.address)

  const weth = await deploy('WETH')
  const instance = await weth.deployed()

  console.log('WETH: %s', instance.address)

  if (process.env.VERIFY_CONTRACTS === "true") { 
    await delay(20000)
    await run("verify:verify", {
      address: instance.address,
      constructorArguments: [],
    });
  }
}

start()

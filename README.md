# Deploy Contracts for Uniswap V3

## Pre-requisites:
- Setup `Volta` to manage Node.js versions
- Allow execute permissions to deploy script files 

```bash
chmod +x ./deploy-core.sh
chmod +x ./deploy-periphery.sh
chmod +x ./deploy-weth9.sh
```

## Setup
- Create a `.env` file
- Fill in the `.env` file with correct values, take reference from `.env.sample` file.
- Note that some environment variables will not be known at first, like the `V2_FACTORY` variable will only be available when `./deploy-core.sh` is run.
- Before running any shell script make sure you check and verify the values in the .env file

## Deploying WETH9

This is only necessary for testnet deployment since the deployment of WETH9 will already be available for mainnet by the blockchain maintainers.

```bash
./deploy-weth9.sh
```

## Deploying Factory

Take a look at `.env` file

```bash
./deploy-core.sh
```

- Take a note of the factory address and init code hash.

## Deploying Router

Take a look at `.env` file

Confirm `INIT_CODE_HASH` in `pairFor()` of `periphery/contracts/libraries/UniswapV2Library.sol` contract

```bash
./deploy-periphery.sh
```

- Take a note of the router address 

### For smart contract changes (v2)

- Update the init code hash in `pairFor()` of `periphery/contracts/libraries/UniswapV2Library.sol` contract

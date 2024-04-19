. .env

cd ./v2-core
yarn
npx hardhat run --network $HARDHAT_NETWORK ./scripts/weth.js

cd ..
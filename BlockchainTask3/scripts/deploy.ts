import { ethers } from "hardhat";

async function main() {
  let Messenger = await ethers.getContractFactory("Messenger");
  let messenger = await Messenger.deploy();

  await messenger.deployed();

  console.log(`BorisGamotaGram deployed to ${messenger.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

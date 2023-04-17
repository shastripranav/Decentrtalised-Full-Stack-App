
const hre = require("hardhat");

async function main() {

  const Add = await hre.ethers.getContractFactory("Add");
  const add = await Add.deploy();

  await add.deployed();

  console.log(
    `Add deployed to ${add.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

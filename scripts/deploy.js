// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  /* We get the contract to deploy Drones
  const Drones = await hre.ethers.getContractFactory("Drones");
  const drones = await Drones.deploy();
  await drones.deployed();
  console.log("Drones deployed to:", drones.address);

  //We get the contract to deploy Parcelas
  const Parcelas = await hre.ethers.getContractFactory("Parcelas");
  const parcelas = await Parcelas.deploy();
  await parcelas.deployed();
  console.log("Parcelas deployed to:", parcelas.address); */

  //We get the contract to deploy Token
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

  //We get the contract to deploy Token
  const Gestion = await hre.ethers.getContractFactory("Gestion");
  const gestion = await Gestion.deploy();
  await gestion.deployed();
  console.log("Gestion deployed to:", gestion.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

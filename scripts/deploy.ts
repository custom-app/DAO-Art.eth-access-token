// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Signer, BigNumber as BN } from "ethers";
// eslint-disable-next-line camelcase,node/no-missing-import
import { DaoArtAccessToken, DaoArtAccessToken__factory } from "../typechain";

async function main() {
  const accounts: Signer[] = await ethers.getSigners();
  let addressToPay: string;
  let startPrice: BN, step: BN, stepValue: BN, supply: BN;
  const network = process.env.HARDHAT_NETWORK;
  if (network === "mainnet") {
    addressToPay = process.env.DAO_ART_ACCESS_TOKEN_MAINNET_ADDRESS!;
    startPrice = BN.from(10).pow(BN.from(17));
    step = BN.from(33);
    stepValue = BN.from(10).pow(BN.from(17));
    supply = BN.from(1089);
  } else if (network === "mumbai") {
    addressToPay = process.env.DAO_ART_ACCESS_TOKEN_MUMBAI_ADDRESS!;
    startPrice = BN.from(5).mul(BN.from(10).pow(BN.from(16)));
    step = BN.from(50);
    stepValue = BN.from(5).mul(BN.from(10).pow(BN.from(16)));
    supply = BN.from(1000);
  } else {
    addressToPay = await accounts[1].getAddress();
    startPrice = BN.from(5).mul(BN.from(10).pow(BN.from(16)));
    step = BN.from(50);
    stepValue = BN.from(5).mul(BN.from(10).pow(BN.from(16)));
    supply = BN.from(1000);
  }
  console.log(addressToPay, startPrice, step, stepValue, supply);
  const factory = new DaoArtAccessToken__factory(accounts[0]);
  const instance: DaoArtAccessToken = await factory.deploy(
    "ipfs://bafkreia4z6pmjmwxrtkxrsjhklkgvuik24bi4wuodkcj3nhtjkjsumyzli",
    addressToPay,
    startPrice,
    step,
    stepValue,
    supply
  );

  await instance.deployed();

  console.log("DaoArtAccessToken deployed to:", instance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

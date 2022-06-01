const DaoArtAccessToken = artifacts.require('DaoArtAccessToken');

const BN = web3.utils.BN;

module.exports = async function(deployer, network, accounts) {
  let addressToPay;
  if (network === "mainnet") {
    addressToPay = process.env.DAO_ART_ACCESS_TOKEN_MAINNET_ADDRESS;
  } else if (network === "mumbai") {
    addressToPay = process.env.DAO_ART_ACCESS_TOKEN_MUMBAI_ADDRESS;
  } else {
    addressToPay = accounts[1];
  }
  await deployer.deploy(
    DaoArtAccessToken,
    "ipfs://bafkreihyivresqdpmjrqbte2i4kwqkj6a4hatvd3rzvhrezbqbw73a6i3a",
    addressToPay,
    new BN(5).mul(new BN(10).pow(new BN(16))),
    new BN("50"),
    new BN(5).mul(new BN(10).pow(new BN(16))),
    new BN("1000"),
  );
};

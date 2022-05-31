const truffleAssert = require("truffle-assertions");
const DaoArtAccessToken = artifacts.require('DaoArtAccessToken');

const BN = web3.utils.BN;

contract("DaoArtAccessToken", function (accounts) {
  it("buy should be successful", async() => {
    const instance = await DaoArtAccessToken.deployed();
    const balanceBefore = await web3.eth.getBalance(accounts[1]);
    await instance.buyToken("0", "", {from: accounts[0], value: new BN(5).mul(new BN(10).pow(new BN(16)))});
    const tokensCount = await instance.tokensCount();
    assert.equal(new BN(tokensCount).eq(new BN(1)), true);
    const owner = await instance.ownerOf(new BN(0));
    assert.equal(owner, accounts[0]);
    const balanceAfter = await web3.eth.getBalance(accounts[1]);
    assert.equal(new BN(balanceAfter).sub(new BN(balanceBefore)).eq(new BN(5).mul(new BN(10).pow(new BN(16)))), true);
  });

  it("buy second token should be successful", async () => {
    const instance = await DaoArtAccessToken.deployed();
    await instance.buyToken("1", "", {from: accounts[2], value: new BN(5).mul(new BN(10).pow(new BN(16)))});
  });

  it("buy second token for same owner should fail", async () => {
    const instance = await DaoArtAccessToken.deployed();
    await truffleAssert.reverts(
      instance.buyToken("2", "", {from: accounts[2], value: new BN(5).mul(new BN(10).pow(new BN(16)))}),
      "DaoArtToken: token already owned for this address");
  });

  it("buy token with wrong(too low) id should fail", async () => {
    const instance = await DaoArtAccessToken.deployed();
    await truffleAssert.reverts(
      instance.buyToken("0", "", {from: accounts[3], value: new BN(5).mul(new BN(10).pow(new BN(16)))}),
      "DaoArtToken: wrong new token id");
  });

  it("buy token with wrong(too high) id should fail", async () => {
    const instance = await DaoArtAccessToken.deployed();
    await truffleAssert.reverts(
      instance.buyToken("100", "", {from: accounts[3], value: new BN(5).mul(new BN(10).pow(new BN(16)))}),
      "DaoArtToken: wrong new token id");
  });

  it("buy should fail if not enough funds", async() => {
    const instance = await DaoArtAccessToken.deployed();
    await truffleAssert.reverts(
      instance.buyToken("2", "", {from: accounts[1], value: new BN(5).mul(new BN(10).pow(new BN(15)))}),
      "DaoArtToken: wrong transaction value");
  });

  it("set wallet should be successful", async () => {
    const instance = await DaoArtAccessToken.deployed();
    await instance.setWallet(accounts[2], {from: accounts[0]});
  });

  it("set token params should be successful", async () => {
    const instance = await DaoArtAccessToken.deployed();
    await instance.setTokenParams(
      new BN(5).mul(new BN(10).pow(new BN(16))),
      new BN("2"),
      new BN(5).mul(new BN(10).pow(new BN(16))),
      new BN("1000"),
      {from: accounts[2]})
  });

  it("buy token with increased price should be successful", async() => {
    const instance = await DaoArtAccessToken.deployed();
    await instance.buyToken("2", "", {from: accounts[4], value: new BN(10).mul(new BN(10).pow(new BN(16)))});
  });
});
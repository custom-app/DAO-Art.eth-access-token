import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, BigNumber as BN } from "ethers";
// eslint-disable-next-line camelcase,node/no-missing-import
import { DaoArtAccessToken, DaoArtAccessToken__factory } from "../typechain";

describe("DaoArtToken", async function () {
  let accounts: Signer[];
  let instance: DaoArtAccessToken;

  before(async function () {
    accounts = await ethers.getSigners();
    instance = await new DaoArtAccessToken__factory(accounts[0]).deploy(
      "ipfs://bafkreihyivresqdpmjrqbte2i4kwqkj6a4hatvd3rzvhrezbqbw73a6i3a",
      await accounts[1].getAddress(),
      BN.from(5).mul(BN.from(10).pow(BN.from(16))),
      BN.from(50),
      BN.from(5).mul(BN.from(10).pow(BN.from(16))),
      BN.from(1000)
    );
  });

  it("buy should be successful", async () => {
    const balanceBefore = await ethers.provider.getBalance(
      accounts[1].getAddress()
    );
    await instance.connect(accounts[0]).buyToken("0", "", {
      from: accounts[0].getAddress(),
      value: BN.from(5).mul(BN.from(10).pow(BN.from(16))),
    });
    const tokensCount = await instance.tokensCount();
    expect(tokensCount).eq(BN.from(1));
    const owner = await instance.ownerOf(BN.from(0));
    expect(owner).eq(await accounts[0].getAddress());
    const balanceAfter = await ethers.provider.getBalance(
      accounts[1].getAddress()
    );
    expect(balanceAfter.sub(BN.from(balanceBefore))).eq(
      BN.from(5).mul(BN.from(10).pow(BN.from(16)))
    );
  });

  it("transfer should fail", async () => {
    const tx = instance
      .connect(accounts[0])
      .transferFrom(
        await accounts[0].getAddress(),
        await accounts[1].getAddress(),
        BN.from(0)
      );
    expect(tx).revertedWith("DaoArtToken: transfer not allowed");
  });

  it("buy second token should be successful", async () => {
    await instance.connect(accounts[2]).buyToken("1", "", {
      from: await accounts[2].getAddress(),
      value: BN.from(5).mul(BN.from(10).pow(BN.from(16))),
    });
  });

  it("buy second token for same owner should fail", async () => {
    const tx = instance.connect(accounts[2]).buyToken("2", "", {
      from: accounts[2].getAddress(),
      value: BN.from(5).mul(BN.from(10).pow(BN.from(16))),
    });
    expect(tx).revertedWith(
      "DaoArtToken: token already owned for this address"
    );
  });

  it("buy token with wrong(too low) id should fail", async () => {
    const tx = instance.connect(accounts[3]).buyToken("0", "", {
      from: accounts[3].getAddress(),
      value: BN.from(5).mul(BN.from(10).pow(BN.from(16))),
    });
    expect(tx).revertedWith("DaoArtToken: wrong new token id");
  });

  it("buy token with wrong(too high) id should fail", async () => {
    const tx = instance.connect(accounts[3]).buyToken("100", "", {
      from: accounts[3].getAddress(),
      value: BN.from(5).mul(BN.from(10).pow(BN.from(16))),
    });
    expect(tx).revertedWith("DaoArtToken: wrong new token id");
  });

  it("buy should fail if not enough funds", async () => {
    const tx = instance.connect(accounts[1]).buyToken("2", "", {
      from: accounts[1].getAddress(),
      value: BN.from(5).mul(BN.from(10).pow(BN.from(15))),
    });
    expect(tx).revertedWith("DaoArtToken: wrong transaction value");
  });

  it("set wallet should be successful", async () => {
    await instance
      .connect(accounts[0])
      .setWallet(await accounts[2].getAddress(), {
        from: accounts[0].getAddress(),
      });
  });

  it("set token params should be successful", async () => {
    await instance
      .connect(accounts[2])
      .setTokenParams(
        BN.from(5).mul(BN.from(10).pow(BN.from(16))),
        BN.from("2"),
        BN.from(5).mul(BN.from(10).pow(BN.from(16))),
        BN.from("3"),
        { from: accounts[2].getAddress() }
      );
  });

  it("buy token with increased price should be successful", async () => {
    await instance.connect(accounts[4]).buyToken("2", "", {
      from: await accounts[4].getAddress(),
      value: BN.from(10).mul(BN.from(10).pow(BN.from(16))),
    });
  });

  it("buy token should fail if limit reached", async () => {
    const tx = instance.connect(accounts[5]).buyToken("3", "", {
      from: accounts[5].getAddress(),
      value: BN.from(10).mul(BN.from(10).pow(BN.from(16))),
    });
    expect(tx).revertedWith("DaoArtToken: all tokens sold");
  });
});

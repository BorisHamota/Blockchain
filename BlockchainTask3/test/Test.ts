import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { ethers, network, upgrades } from "hardhat";
import { BigNumber, BigNumberish} from "ethers";
import { Messenger } from "../typechain/Messenger";

async function skipDays(days: number) {
  ethers.provider.send("evm_increaseTime", [days * 86400]);
  ethers.provider.send("evm_mine", []);
}

async function sendEth(users: SignerWithAddress[]) {
  let signers = await ethers.getSigners();

  for (let i = 0; i < users.length; i++) {
    await signers[0].sendTransaction({
      to: users[i].address,
      value: parseEther("1.0")

    });
  }
}

describe("Unit contracts tests", () => {
  let boris: SignerWithAddress
  let nazar: SignerWithAddress
  let orest: SignerWithAddress

  let messenger: Messenger

  before (async function() {
    [boris, nazar, orest] = await ethers.getSigners();
  })

  beforeEach(async function() {

    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          enabled: true,
          jsonRpcUrl: process.env.MAINNET_FORKING_URL as string,
          //you can fork from last block by commenting next line
          // blockNumber: 42655252,
        },
      },],
    });

    let Messanger = await ethers.getContractFactory("Messenger");
    messenger = await Messanger.deploy();
  })

  it("Should send message", async () => {
    let message = "BORIS COME BACK ";
    await messenger.connect(boris).sendMessage(message, nazar.address);
    let result = await messenger.connect(nazar).receiveMessage();
    console.log(result);
  });
});
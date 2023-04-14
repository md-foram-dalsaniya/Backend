require("@nomiclabs/hardhat-waffle");
require ('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/uepbyWNTCY09d2d0NY8glZ16mtJf9aAX',
      accounts: [process.env.private_key]
    }
  }
};

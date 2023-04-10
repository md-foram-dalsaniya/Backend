

const { ethers } = require('ethers');

// Set up transfer parameters
const recipientAddress = "0x67F6c1fe2642004150bB622bDF322583DDc9C9b6";
const amount = ethers.utils.parseEther("1.0"); // 1.0 token

// Encode transfer function
const abi = ["function transfer(address recipient, uint256 amount)"];
const iface = new ethers.utils.Interface(abi);
const encodedData = iface.encodeFunctionData("transfer", [recipientAddress, amount]);

console.log("Encoded data:", encodedData);

// Decode transfer function
const decodedData = iface.decodeFunctionData("transfer", encodedData);
console.log("Decoded data:", decodedData);

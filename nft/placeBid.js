require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_API_KEY));

const contractAddress = "0xD833b26E2538FB7B85D1E53F9Eea24065287DeB6";
const contractABI =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nft",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_end",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "HighestBidIncreased",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "auctionEnd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionStart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestBidder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract IERC721",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

const senderAddress = process.env.sender;
const senderPrivateKey = process.env.private_key;
const recipientAddress = process.env.recipint;
const amount = '1000000000000000000'; // 1 ETH in wei

const sendTransaction = async () => {
    // Get the current gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Get the nonce for the sender address
    const nonce = await web3.eth.getTransactionCount(senderAddress);

    // Create the transaction object
    const tx = {
        from: senderAddress,
        to: contractAddress,
        gasPrice: gasPrice,
        gasLimit: 300000, // set the gas limit to a reasonable value
        nonce: nonce,
        data: contractInstance.methods.createNft('https://gateway.pinata.cloud/ipfs/QmZGvnzC7dNGQpyxGW1kw6FnmbHWapc62i4ZXfRfdax25A').encodeABI()
    };

    // Sign the transaction with the sender's private key
    const signedTx = await web3.eth.accounts.signTransaction(tx, senderPrivateKey);

    // Send the signed transaction to the network
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(receipt);
};


//sendTransaction();

async function placeBid(){
	
	try {
		const bidderAddress='0x008934505090c083A782aeAfEF966aA9B556346E';
		const bidderPrivateKey='e31a118b4241fa2d3a4c80471c087921f1f7431a28e675f89cbfaa668d24ef9d';

		const gasPrice = await web3.eth.getGasPrice();

		// Get the nonce for the sender address
		const nonce = await web3.eth.getTransactionCount(bidderAddress);
		const bidAmount = web3.utils.toWei('0.01', 'ether'); // replace with the value you want to bid with

		const tx = {
			from: bidderAddress,
			to: contractAddress,
			gasPrice: gasPrice,
			gasLimit: 500000,
			nonce: nonce,
			value:bidAmount,
			data: contractInstance.methods.bid().encodeABI()
		};
		// Sign the transaction with the sender's private key
		const signedTx = await web3.eth.accounts.signTransaction(tx, bidderPrivateKey);

		// Send the signed transaction to the network
		const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		console.log(receipt);
	} catch (err) {
		// console.log("this is error : ");
		console.log(err);
	}

}
placeBid();



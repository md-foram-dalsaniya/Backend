const pinataSDK = require('@pinata/sdk');
require('dotenv').config()
const fs = require('fs');

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);
const readableStreamForFile = fs.createReadStream('./img/OIP.jpg');

const options = {
    pinataMetadata: {
        name: "my-nft",
        keyvalues: {
            customkey: 'customValue',
            customkey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
const pinataFileToIPFS = ()=>{
     return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //handle results here
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}

const pinJSONToIPFS = (body)=>{
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });

}

const getMetadata = async ()=>{
    const imageUrl  = await pinataFileToIPFS()
    const body = {
        name : 'nft collection',
        description: "this is my nft collection",
        image: imageUrl
    };  
    const metadata = await pinJSONToIPFS(body)
    console.log(metadata)
}
getMetadata()

//nft token= https://gateway.pinata.cloud/ipfs/QmY5FFDv1zQoJv5SmprqPzXHwM1ta4hhuHRyqwNwno3Xyq

//   https://gateway.pinata.cloud/ipfs/QmZGvnzC7dNGQpyxGW1kw6FnmbHWapc62i4ZXfRfdax25A

// https://gateway.pinata.cloud/ipfs/QmXr7CSbxE5gmsV9fuNcCAzQzATpWaQmX1f2nVf6ArQprb

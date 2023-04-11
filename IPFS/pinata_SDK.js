
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/pinata-filesystem",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const FileSchema = mongoose.Schema({
  name: String,
  path: { type: String },
  cid: String,
  size: Number,
});

const File = new mongoose.model("pinata", FileSchema);

const pinata = new pinataSDK('1a0c707da0739418e853', '252afce1370a452b1a4e4f1a4004a1435434e0c4e51f774288bf97e9fd49ec7f');

const uploadFileToIPFS = async (file) => {
  try {
    const result = await pinata.pinFileToIPFS(fs.createReadStream(file), {
      pinataMetadata: {
        name: file // add the name parameter here
      }
    });
    console.log(`File uploaded successfully with IPFS hash ${result.IpfsHash}`);
    const fileData = {
      name: file,
      path: file,
      cid: result.IpfsHash,
      size: result.PinSize,
    };
    await File.create(fileData);
    console.log(`File metadata saved successfully in MongoDB`);
  } catch (error) {
    console.error(error);
  }
};


const file = 'foram.txt';
uploadFileToIPFS(file);


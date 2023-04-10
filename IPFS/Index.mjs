import { create } from 'ipfs-http-client'
import fs from 'fs'

async function ipfsClient(){
    const ipfs = await create(
        {
            host:"127.0.0.1",
            port: 5001,
            protocol: "http",
        }
    )
    return ipfs
  }
  const file = fs.readFileSync("D:/nodeANDmongo/IPFS/file.txt",(err)=>{
    console.log(err)
  });
 async function saveText(){
    
    let ipfs = await ipfsClient()
    let result = await ipfs.add(file)
    console.log(result)
  }
 saveText()


 


import Express from "express";
const app = Express();
app.use(Express.json())

// import { Router } from "express";
import { create } from "ipfs-http-client";
import fs from "fs";
import mongoose from "mongoose";



const port = 3000;
// DEV CREATED IPFS CLIENT FUNCTION 
async function ipfsclient(){
    let ipfs = create(
        {
        host: "127.0.0.1",
        port: 5001,
        protocol: "http",
        })
    return ipfs
}
    async function saveText(){
        let ipfs = await ipfsclient()
        let result = await ipfs.add(file)
        console.log(result)
        const hash = result.path;
        console.log(hash);
        return(hash);
    }

    const filename = "ex5.txt";
    const file = fs.readFileSync(filename, (err) => {
      console.log(err) 
    });
// async function saveText(_filename) {
//     const buffer = fs.readFileSync(_filename);
//     let result = await ipfs.add(buffer);
//     return result
// }
saveText();



// mongodb connection
mongoose.connect("mongodb://127.0.0.1/filesystem")
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));

  //Schema 
  const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    fileHash:{
      type : String,
      require : true
    },
   
    size: {
      type : Number,
      require : true
    },  
  })  
  

  // collection creation
  const Filecollection = new mongoose.model("Filecollection",FileSchema);



// API listen on port 3000 

// POST API 
app.post("/push", async (req, res) => {
    const result = await saveText(req.params.file);
    const object = {
        name: req.params.filename,
        // path: process.env.IPFS_BASE + result.path,
        cid: result.cid.toString(),
        size: result.size,
    };
    // const data = await postData(object);
    // console.log("Success")
    res.send(result);
})
app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

  app.get('/', (req, res) => {
    res.json({ message: "API is working" })
  })
  
  app.post('/upload',async (req, res) => {
    console.log("inside post function");
   
    const iddata = await Filecollection.countDocuments() 
    const data = new Filecollection({
      name :filename,
      fileHash : await saveText(),
      id : await (iddata+1)
    }); 
    const val = await data.save();
    res.json(val);
})

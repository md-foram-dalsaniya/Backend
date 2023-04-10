const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/foram", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connections successful...."))
    .catch((err) => console.log(err));
    
   
//create schema
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);


//insert

const createDocument = async () => {
    try{
        const newUser1 = new User({
            name: 'rina',
            email: 'rina@example.com',
            age: 10
        })
        const newUser2 = new User({
            name: 'rutvi',
            email: 'rutvi@example.com',
            age: 10
        })

        const result = await User.insertMany([newUser1,newUser2]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

//createDocument();

const getDocument = async ()=>{
    try{
        const result = await User.find({ age:10})
        .select({name:1})
        .limit(1);
    console.log(result);
    }catch(err){
        console.log(err);
    }
}

//getDocument();

//update 
const updateDocuments = async(_id)=>{
    try{
        const result = await User.findByIdAndUpdate({_id},{
            $set : {
                name : "Rama"
            }
        }, {
            new : true,
            userFindAndModify : false
        });

        console.log(result);
        }catch(err){
            console.log(err);
        }
    }

    //updateDocuments("641c5528143e9b93db275109");

    //delete
    const deleteDocument = async(_id)=>{
        try{
            const result= await User.findByIdAndDelete({_id});
            console.log(result);
        }catch(err){
            console.log(err);
        }
       

    }

deleteDocument("641c5907a9747688192bcd77");


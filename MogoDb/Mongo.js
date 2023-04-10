const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/foram", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connections successful..!!"))
    .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        type: Number,
        default: 0

    },
    tags: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Post = new mongoose.model('Post', postSchema)

//insert

const createDocument = async () => {
    try {
        const Post1 = new Post({
            title: "Post Title 1",
            body: "Body of post.",
            category: "News",
            likes: 1,
            tags: ["news", "events"],
            date: Date()
        })

        const Post2 = new Post({

            title: "Post Title 2",
            body: "Body of post.",
            category: "Event",
            likes: 2,
            tags: ["news", "events"],
            date: Date()
        })
        const Post3 = new Post({

            title: "Post Title 3",
            body: "Body of post.",
            category: "Technology",
            likes: 3,
            tags: ["news", "events"],
            date: Date()
        })
        const Post4 = new Post({

            title: "Post Title 4",
            body: "Body of post.",
            category: "Event",
            likes: 4,
            tags: ["news", "events"],
            date: Date()
        })

        const result = await Post.insertMany([Post1, Post2, Post3, Post4]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

//createDocument();

const getDocument = async ()=>{
    try{
        const result = await Post.find({category: "Event"})
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
        const result = await Post.findByIdAndUpdate({_id},{
            $set : {
                category: "Technology"
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

    //updateDocuments("641d7b6c28bf31f71447c8f4");

    //delete
    const deleteDocument = async(_id)=>{
        try{
            const result= await Post.findByIdAndDelete({_id});
            console.log(result);
        }catch(err){
            console.log(err);
        }
       

    }

deleteDocument("641d7b6c28bf31f71447c8f4");


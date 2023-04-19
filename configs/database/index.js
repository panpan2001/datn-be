const mongoose = require('mongoose')

async function connect(){
        await mongoose.connect("mongodb://localhost:27017/datn")
            .then(() => console.log("Database Connected!"))
            .catch((err) => console.error("Connected failed!", err))
    
    
}


module.exports= {connect}
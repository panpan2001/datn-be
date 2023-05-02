const mongoose = require('mongoose')

async function connect(){
        await mongoose.connect(process.env.DB_URL)
            .then(() => console.log("Database Connected!"))
            .catch((err) => console.error("Connected failed!", err))
    
    
}


module.exports= {connect}
const jwt = require('jsonwebtoken');

const middwareSDK={


    checkAuth:(req,res,next)=>{
        const token=req.headers.token;
        console.log("token",token)
        if (token) {
            const sdkToken = token.split(' ')[1]
            jwt.verify(sdkToken, process.env.SDK_TOKEN, (err, account) => {
                if (err) {
                    console.log(err)
                    return res.status(403).send("Token không hợp lệ ")
                }
                req.account = account
                next()
            }
            )
        }
        else{
            return res.status(401).json("Unauthorized verify token request")
        }
    }
}

module.exports= middwareSDK
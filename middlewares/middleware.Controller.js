const jwt = require('jsonwebtoken')


const middlewareController = {
    //verify token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.ACCESS_TOKEN,{clockTimestamp: new Date().getTime()}, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(403).send("Forbidden request")

                }
                req.user = user
                next()
            }
            )
        }
        else{
            res.status(401).json("Unauthorized request")
        }
    },

    verifyTokenAndAdminAuth:(req,res,next)=>{
        this.verifyToken(req,res,()=>{
            if(req.user.role_name!=="admin"||!req.user.role_name){
                return res.status(403).json("Can't delete other user")
            }
            next()
        })
    }
}

module.exports = middlewareController
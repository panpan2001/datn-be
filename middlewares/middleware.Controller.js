const jwt = require('jsonwebtoken')


const middlewareController = {
    //verify token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        // console.log("token",token)
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, account) => {
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
    },

    verifyTokenAndAdminAuth:(req,res,next)=>{
        middlewareController.verifyToken(req,res,()=>{
            console.log("req.params: ",req.params,typeof(req.params.account_id))
            console.log("req.account: ",req.account,typeof(req.account.id))
            console.log(req.account.id!==req.params.account_id)
            if(req.account.id==req.params.id||req.account.role_name=="admin"){
                next()

            }
            else res.status(403).json("Can't delete other user")

        })
    },
    verifyUserAndAdminAuth:(req,res,next)=>{
        middlewareController.verifyToken(req,res,()=>{
            console.log("req.headers.account_id: ",req.headers.account_id,typeof(req.headers.account_id))
            console.log("req.account: ",req.account,typeof(req.account.id))
            console.log(req.account.id!==req.headers.account_id)
            if(req.account.id==req.headers.account_id||req.account.role_name=="admin"){
                next()

            }
            else res.status(403).json("Bạn không thể thực hiện hành động này!")

        })
    }
}

module.exports = middlewareController
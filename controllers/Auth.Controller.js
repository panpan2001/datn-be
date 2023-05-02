const bcrypt= require('bcrypt')
const {Account}= require('../models/Account.Model')

const authorizationController={
    //register
    registerUser: async(req,res)=>{
        try {
            //hash password 
            const {email, password, phone_number,role_name}= req.body
            console.table(req.body)
            const salt= await bcrypt.genSalt(10)
            const hashedPassword= await bcrypt.hash(password,salt)

            // create new account
            const newAccount=  await new Account({
                email: email,
                password: hashedPassword,
                phone_number: phone_number,
                role_name: role_name
            })
            //save db
            const account= await newAccount.save()
            res.status(200).json(account)

        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    },
    loginUser: async(req,res)=>{
        try {
            console.log(req.body)
            const account= await Account.findOne({email: req.body.email})
            if(!account) { 
                res.status(404).send('Invalid email')
            }
            const isMatch= await bcrypt.compare(req.body.password,account.password)
            console.log(isMatch)
            if(!isMatch) {
                res.status(404).send('Invalid password')
            } 
            if(account && isMatch) {
                res.status(200).send(account)
            } 
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    }
}

module.exports=authorizationController
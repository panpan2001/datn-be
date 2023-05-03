const bcrypt = require('bcrypt')
const { Account } = require('../models/Account.Model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const ACCESS_TOKEN = process.env.ACCESS_TOKEN



const authorizationController = {
    //register
    registerUser: async (req, res) => {
        try {
            //hash password 
            const { role_name,
                full_name,
                date_of_birth,
                gender,
                address,
                email,
                phone_number,
                password } = req.body
            console.table(req.body)
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // create new account
            const newAccount = await new Account({
                role_name: role_name,
                full_name: full_name,
                date_of_birth: date_of_birth,
                gender: gender,
                address: address,
                email: email,
                password: hashedPassword,
                phone_number: phone_number,

            })
            //save db
            const account = await newAccount.save()
            res.status(200).json(account)

        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    },
    loginUser: async (req, res) => {
        try {
            console.log(req.body)
            const account = await Account.findOne({ email: req.body.email })
            if (!account) {
                res.status(404).send('Invalid email')
            }
            const isMatch = await bcrypt.compare(req.body.password, account.password)
            console.log(isMatch)
            if (!isMatch) {
                res.status(404).send('Invalid password')
            }
            if (account && isMatch) {
                const accessToken = jwt.sign(
                    {
                        id: account.id,
                        role_name: account.role_name
                    },
                    ACCESS_TOKEN,
                    { expiresIn: '1d' }
                    );
                    const {password,...others}= account._doc;

                res.status(200).json({ ...others, accessToken })

            }
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    }
}

module.exports = authorizationController
const bcrypt = require('bcrypt')
const { Account } = require('../models/Account.Model')
const jwt = require('jsonwebtoken')
const { Role } = require('../models/Role.Model')
require('dotenv').config()
require('cookie-parser')
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

let refreshTokens = []

const authController = {
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
            // const role_id= await Role.findOne({name:role_name})
            // console.log(role_id)
            res.status(200).json(account)

        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    },

    //generate access token
    generateAccessToken: (account) => {

        return jwt.sign(
            {
                id: account.id,
                role_name: account.role_name
            },
            ACCESS_TOKEN,
            { expiresIn: '1d' }
        );
    },

    // generate refresh token
    generateRefreshToken: (account) => {
        return jwt.sign(
            {
                id: account.id,
                role_name: account.role_name
            },
            REFRESH_TOKEN,
            { expiresIn: '365d' }
        );
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
                const accessToken = authController.generateAccessToken(account);
                const refreshToken = authController.generateRefreshToken(account);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: "strict"
                })
                const { password, ...others } = account._doc;
                res.status(200).json({ ...others, accessToken })

            }
        } catch (error) {
            res.status(500).send(error)
            console.log(error)
        }
    },

    //request refresh token
    requestRefreshToken: async(req, res) => {
        // console.log("refreshToken")
        const refreshToken = req.cookies.refreshToken;
        // console.log("refreshToken: ",refreshToken)
        if (!refreshToken) {
            return res.status(401).json("You're not authenticated")
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is invalid")
        }
        jwt.verify(refreshToken, REFRESH_TOKEN, (err, account) => {
            if (err) {
                res.status(403).json("Refresh token is invalid")
            }
            refreshTokens=refreshTokens.filter((token)=>token!==refreshToken)
            //create new access token, refresh token 
            const newAccessToken = authController.generateAccessToken(account);
            const newRefreshToken = authController.generateRefreshToken(account);
            refreshTokens.push(newRefreshToken)
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: "strict"
            })
            res.status(200).json({ accessToken: newAccessToken })
        })
    },

    //log out 
    logoutUser: async (req, res) => {
        res.clearCookie('refreshToken');
        refreshTokens=refreshTokens.filter((token)=>token!==req.cookies.refreshToken)
        res.status(200).json("User logged out successfully")
    }
}

module.exports = authController
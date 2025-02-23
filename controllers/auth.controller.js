const  User  = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { json } = require('express');
const saltRounds = 15;
const JWT_SECRET = process.env.JWT_SECRET; 

const signupHandler = async (req, res) => {
    console.log("req,biody-->",req.body)
    try {
        const data = req.body;
        //checking if user already exist;
        console.log("data")
        console.log("userExist")

        const userExist = await User.findOne({ email: data.email })
        console.log("userExist",userExist)
        if (userExist) {
            return res.status(404).json({ message: "user already exist" })
        }
        let encryptedPassword;
        console.log("inside encrypted password try block")

        try {
            encryptedPassword = await bcrypt.hash(data.password, saltRounds);
            console.log("encrypted passord", encryptedPassword);
        }
        catch (e) {
            res.status(500).json({ message: "Signup failed.Please try again later" })
        }
        const userCreated = new User({ ...data, password: encryptedPassword });
        console.log("userCreated",userCreated)
        try {
            await userCreated.save();
        }
        catch (e) {
            console.log("error",e)
            return res.status(500).json({
                message: "Signup failed.Please try  again later"
            })
        }

        const token = jwt.sign({ userId: userCreated._id, email: userCreated.email }, JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({
            token: token,
            id: userCreated._id,
            email: userCreated._id
        })
    }
    catch (e) {
        console.log("error",e)
        res.status(500).json({ message: "Signup failed.Please try again later" })
    }

}

const loginHandler = async (req, res) => {
    //steps taken to login

    //1.cheak whether user exists or not.If user doesnot exist throw error
    //2.if user exist check the password using bcrpt methosds.
    //3. if user password is wrong,Then check whether 
    let data = req.body;
    let userExist;
    try {
        userExist = await User.findOne({ email: data.email });

        if (!userExist) {
            return res.status(400).json({ message: "Worng useername" });
        }
        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(data.password, userExist.password);
        }
        catch (e) {
            return res.status(500).json({ message: "Login failed.Please try again later." })
        }

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid credentials.Please try again later"
            })
        }
        const token = jwt.sign({ userId: userExist._id, email: userExist.email }, JWT_SECRET, { expiresIn: "24h" });

        return res.status(200).json({
            message: "Login Successful",
            user: {
                token,
                id: userExist._id,
                email: userExist.email
            }
        })


    }
    catch (e) {
        res.status(500).json({ message: "Sign in failed.Please try again later" })
    }
}





module.exports = { signupHandler, loginHandler}

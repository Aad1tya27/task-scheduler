const jwt = require("jsonwebtoken")
const {User, Task} = require("../models/user");
const { default: mongoose } = require("mongoose");

async function userMiddleware(req,res,next){
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    // console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = await User.findOne({
            name: decoded.name,
            email: decoded.email
        })
        // console.log(userFound, decoded)
        if(userFound){
            next()
        }else{
            throw new Error("user not found")
        }
        

    } catch (error) {
        // console.log('error aagaya');
        res.status(401).json({
            msg: "error",
            ErrorMsg: error
        })
    }
}

module.exports={
    userMiddleware
}
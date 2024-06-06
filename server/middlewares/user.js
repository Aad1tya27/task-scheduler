const jwt = require("jsonwebtoken")
const {User, Task} = require("../models/user");
const { default: mongoose } = require("mongoose");

async function userMiddleware(req,res,next){
    const token = req.headers.Authorization && req.headers.Authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = mongoose.findOne({
            name: decoded.name,
            email:  decoded.email
        })

        if(userFound){
            next()
        }else{
            throw new Error("user not found")
        }

    } catch (error) {
        console.log('error aagaya');
        res.status(401).json({
            msg: "error aagaya",
            ErrorMsg: error
        })
    }
}

module.exports={
    userMiddleware
}
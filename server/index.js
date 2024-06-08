require("dotenv").config()
const express = require('express');
var cors = require("cors")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const port = process.env.PORT || 3000;
const app = express();
const z = require("zod")
const { createHmac } = require('node:crypto');
const { User } = require("./models/user")
const userRouter = require("./routes/user");
const { error } = require("node:console");
app.use(cors())
app.use(bodyParser.json());


app.get("/", (req, res) => {
	res.send("hello");
})

app.post("/signup", async (req, res) => {

	const existingUser = await User.findOne({
		email: req.body.email
	})
	console.log(existingUser)
	if (!existingUser) {
		const hash = createHmac('sha256', process.env.CRYPTO_SECRET)
			.update(req.body.password)
			.digest('hex');
		// console.log(hash);
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hash
		})
		await user.save();
		const token = jwt.sign({
			name: req.body.name,
			email: req.body.email
		}, process.env.JWT_SECRET);

		return res.status(201).json({
			token: `Bearer ${token}`,
			msg: "User created"
		})
	}
	res.status(404).json({
		msg: "User Already Exists"
	})

})

app.post("/signin", async (req, res) => {
	const hash = createHmac('sha256', process.env.CRYPTO_SECRET)
		.update(req.body.password)
		.digest('hex');
	const validUser = await User.findOne({
		email: req.body.email,
		password: hash
	})

	if (validUser) {
		console.log("hi")
		const token = jwt.sign({
			name: validUser.name,
			email: req.body.email
		}, process.env.JWT_SECRET);

		return res.status(201).json({
			token: `Bearer ${token}`,
			msg: "Signed in",
			name: validUser.name
		})
	}

	const  existingUser= await User.findOne({
		email: req.body.email
	})

	if(existingUser){
		return res.status(403).json({
			msg:"Invalid Credentials"
		})
	}


	res.status(404).json({
		msg: "User Not Found"
	})

})


app.use("/user", userRouter);




// app.get("*", (req, res) => {
// 	res.send("arey bhai pagal hai kya")
// })

app.use((error,req,res,next)=>{
	res.status(404).send("ohno")
})

app.listen(port, () => {
	console.log(`server listening on  http://localhost:${port}`)
})


module.exports = app;
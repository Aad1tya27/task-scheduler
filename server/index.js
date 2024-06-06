require("dotenv").config()
const express = require('express');
var cors = require("cors")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const port = process.env.PORT || 3000;
const app = express();
const z = require("zod")
const { User } = require("./models/user")
const userRouter = require("./routes/user")
app.use(cors())
app.use(bodyParser.json());



app.get("/", (req, res) => {
	res.send("hello");
})



app.get("/signup", async (req, res) => {

	const existingUser = await User.findOne({
		name: req.body.name,
		email: req.body.email
	})

	if (!existingUser) {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		await user.save();
		const token = jwt.sign({
			name: req.body.name,
			email: req.body.email
		}, process.env.JWT_SECRET);

		return res.status(201).json({
			token: "Bearer "+token,
			msg: "User created"
		})
	}
	res.status(404).json({
		msg: "User Already Signed Up"
	})

})

app.get("/signin", async (req, res) => {

	const existingUser = await User.findOne({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})

	if (existingUser) {
		const token = jwt.sign({
			name: req.body.name,
			email: req.body.email
		}, process.env.JWT_SECRET);

		return res.status(201).json({
			token: "Bearer "+token,
			msg: "Signed in "
		})
	}
	res.status(404).json({
		msg: "user Not Found"
	})

})


app.use("/user",userRouter);



app.get("*", (req, res) => {
	res.send("arey bhai pagal hai kya")
})

app.listen(port, () => {
	console.log(`server listening on  http://localhost:${port}`)
})


module.exports = app;
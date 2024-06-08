require("dotenv").config()
const { Router } = require('express');
const router = Router()
const { userMiddleware } = require("../middlewares/user")
const { User, Task } = require("../models/user")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
router.get('/todos', userMiddleware,async  (req, res) => {
	const userInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
	const user = await User.findOne({
		name: userInfo.name,
		email: userInfo.email
	}).populate('tasks')
	res.status(200).json({
		tasks: user.tasks
	})
})

router.post('/todos', userMiddleware, async(req, res) => {
	const userInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
	// console.log(req.body);
	const task = new Task({
		title: req.body.title,
		description: req.body.description,
		completed: false
	});	
	await task.save();
	// console.log(task._id.toString())
	const updatedTasks = await User.findOneAndUpdate({
		name: userInfo.name,
		email: userInfo.email
	},
		{ $push: { tasks: task._id.toString() } },
		{ new: true, useFindAndModify: false }
	);
	const user = await User.findOne({
		name: userInfo.name,
		email: userInfo.email
	}).populate('tasks')
	res.status(201).json({
		msg: "Received",
		tasks: user.tasks
	})
})


router.put('/todos/:id',userMiddleware ,async(req, res) => {
	const task = await Task.findById(req.params.id);
	if (task) {
		await Task.findByIdAndUpdate(req.params.id,{
			completed: !task.completed
		})
		res.status(200).send("Updated")
	} else {
		res.status(404).send("Task Not Found")
	}
})
router.delete('/todos/:id',userMiddleware, async(req, res) => {
	const userInfo = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
	try {
		await Task.findByIdAndDelete(req.params.id)
		await User.findOneAndUpdate({
			name: userInfo.name,
			email: userInfo.email
		},
			{ $pullAll: { tasks: [{_id: req.params.id}] } }
		);
		res.status(200).send("Deleted")
	} catch(err) {
		res.status(404).send("Not Found")
	}
})


module.exports = router;
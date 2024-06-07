require("dotenv").config()
const {Router} = require('express');
const router = Router()
const { userMiddleware } = require("./middlewares/user")
const { User, Task } = require("./models/user")

router.get('/todos', (req, res) => {
	res.status(200).send(todos)
})

router.post('/todos', (req, res) => {
	const todo = req.body;
	console.log(req.body);

	// todo["id"] = id;
	todo["completed"] = false;
	id++;
	console.log(todo)
	todos.push(todo)
	res.status(201).send("received")
})


router.put('/todos/:id', (req, res) => {
	const todo = todos.find((element) => element["id"] == req.params.id);
	if (todo) {
		var index = todos.indexOf(todo);
		console.log(todos[index].completed)
		todos[index].completed = !todos[index].completed
		res.status(200).send("Updated")
	} else {
		res.status(404).send("Not Found")
	}
})
router.delete('/todos/:id', (req, res) => {
	const todo = todos.find((element) => element["id"] == req.params.id);
	if (todo) {
		var index = todos.indexOf(todo);
		todos.splice(index, 1);
		res.status(200).send("Deleted")
	} else {
		res.status(404).send("Not Found")
	}
})


module.exports = router;
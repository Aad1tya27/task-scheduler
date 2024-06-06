require("dotenv").config()
const express = require('express');
var cors = require("cors")
const jwt = require("jsonwebtoken")
const port = 3000
const app = express();
const mongoose = require("mongoose")
const {userMiddleware} = require("./middlewares/user")


var id = 3;
app.use(cors())
app.use(express.json());
var todos = []

app.get("/",(req,res)=>{
	res.send("hello");
})

app.use(userMiddleware)

app.get('/todos', (req, res) => {
	res.status(200).send(todos)
})

app.post('/todos', (req, res) => {
	const todo = req.body;
	console.log(req.body);
	
	todo["id"] = id;
	todo["completed"] = false;
	id++;
	console.log(todo)
	todos.push(todo)
	res.status(201).send("received")
})


app.put('/todos/:id', (req, res) => {
	const todo = todos.find((element) => element["id"] == req.params.id);
	if (todo) {
		var index = todos.indexOf(todo);
		console.log(todos[index].completed)
		todos[index].completed=!todos[index].completed
		res.status(200).send("Updated")
	}else{
		res.status(404).send("Not Found")
	}
})
app.delete('/todos/:id', (req, res) => {
	const todo = todos.find((element) => element["id"] == req.params.id);
	if (todo) {
		var index = todos.indexOf(todo);
		todos.splice(index, 1);
		res.status(200).send("Deleted")
	}else{
		res.status(404).send("Not Found")
	}
})





app.get("*",(req,res)=>{
	res.send("arey bhai pagal hai kya")
})

app.listen(port, () => {
	console.log(`server listening on  http://localhost:${port}`)
})


module.exports = app;
const mongoose = require("mongoose")

// mongoose.connect(process.env.MONGO_URI).then(()=>{

// })
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("hello", mongoose.connection.db.namespace)
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks'
    }]
})
const taskSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
})

const User = mongoose.model('Users', userSchema)
const Task = mongoose.model('Tasks', taskSchema)


module.exports = {
    User,
    Task
}



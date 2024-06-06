const mongoose = require("mongoose")

try {
    main();
} catch (error) {
    console.log(error);
    
}
async function main(){
    await mongoose.connect(process.env.MONGO_URI);
    const userSchema = mongoose.Schema({
        name:String,
        email:String,
        password: String,
        tasks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'todos'
        }]
    })
    const taskSchema = mongoose.Schema({
        title:String,
        description: String,
        completed: Boolean
    })

    const User = mongoose.model('Users',userSchema)
    const Task = mongoose.model('Tasks',taskSchema)

    module.exports={
        User,
        Task
    }

}


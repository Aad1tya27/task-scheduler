import React from 'react'
import { useForm } from 'react-hook-form'
import Task from './Task'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const [tasks, setTasks] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setTasks([...tasks, {
            description: data.description,
            completed: false,
            _id: 1
        }])
        fetch(`${import.meta.env.VITE_SERVER_URI}/user/todos`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        }).then((response) => {
            response.json().then((jsonData) => {
                reset({
                    description: ''
                })
                setTasks(jsonData.tasks);
                console.log(jsonData.tasks)
                localStorage.setItem("tasks", JSON.stringify(jsonData.tasks));
            })
        }).catch(err => {
            console.log("Error occurred while Submitting your Task")
        }).finally(()=>{
            setIsSubmitting(false);
        })
    }
    useEffect(() => {
        async function fetchData() {
            let todosReq = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/todos`, {
                method: "GET",
                headers: {
                    'Content-type': "application/json",
                    'Authorization': localStorage.getItem("token")
                }
            })
            let todos = await todosReq.json();
            setTasks(todos.tasks);
            localStorage.setItem("tasks", JSON.stringify(todos.tasks))
        }
        if (!localStorage.getItem("token")) {
            // console.log("hi")
            navigate("/signup")
        } else if (localStorage.getItem("tasks")) {
            setTasks(JSON.parse(localStorage.getItem("tasks")));
            console.log("hi");
        } else {
            fetchData()
        }
    }, [])
    return (
        <>
            <div className='w-full h-[100vh] bg-gradient-to-b from-[#0c1015] from-5% to-[#1c2b34] relative z-0 flex flex-col lg:flex-row justify-center gap-5 lg:gap-0 lg:justify-center items-center'>
                <div className='w-[80%] md:w-[40%]'>
                    <form onSubmit={handleSubmit(onSubmit)} method="post" className='addNotes gap-5 flex flex-col  justify-center items-center'>
                        <div className='text-2xl md:text-3xl text-center text-shadow shadow-black text-white'>Add a Task</div>
                        {/* <input {...register("title", {
                            required: true
                        })} type="text" placeholder='Add Title' className='p-2 py-1 md:p-4 md:py-2 w-[70%] lg:w-[50%] rounded-md' name='title' id='title' /> */}
                        <input {...register("description", {
                            required: true
                        })} type="text" placeholder='Description' className='p-2 py-1 md:p-4 md:py-2 w-[70%] lg:w-[50%] rounded-md' name='description' id='description' />
                        <input disabled={isSubmitting} type="submit" className='bg-[#0a0e10] hover:bg-[#b0c0c9] hover:text-black  text-white p-5 py-2 rounded-md' value={isSubmitting?"Adding..." :"Add" } />
                    </form>
                </div>

                <div className="showNotes shadow-[0_0px_5px_-5px_rgba(0,0,0,0.3)] p-3  flex flex-col items-center justify-center text-white w-[80%] sm:[70%] lg:w-[50%] min-h-[40vh] lg:min-h-[20vh]">
                    <div className='text-2xl md:text-3xl m-2 lg:m-5 text-shadow shadow-black'>Your Tasks</div>
                    {/* <div className="content flex gap-5 justify-center flex-wrap overflow-auto max-h-[25vh] sm:max-h-[30vh] lg:max-h-[60vh]"> */}
                    <div className="content w-full  overflow-auto max-h-[50vh]">

                        {tasks && tasks.length > 0 ?
                            tasks.map((task) => {
                                return <Task key={task._id} tasks={[tasks, setTasks]} id={task._id} description={task.description} done={task.completed} />
                            })
                            :
                            <div className='text-center'>Add a Task</div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

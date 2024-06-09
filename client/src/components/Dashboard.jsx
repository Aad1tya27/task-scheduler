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
        formState: { errors, isSubmitting },
    } = useForm()
    const [tasks, setTasks] = useState([])
    const onSubmit = async (data) => {
        fetch(`${import.meta.env.VITE_SERVER_URI}/user/todos`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        }).then((response) => {
            // console.log("hello")
            response.json().then((jsonData) => {
                // console.log(jsonData.msg, jsonData.tasks);
                setTasks(jsonData.tasks);
            })
        }).catch(err => {
            console.log("Error occurred while Submitting your Task")
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
            });
            let todos = await todosReq.json()
            // console.log(todos.tasks, typeof (todos))
            setTasks(todos.tasks);
        }
        if (!localStorage.getItem("token")) {
            // console.log("hi")
            navigate("/signup")
        } else {
            fetchData()
        }
    }, [])
    return (
        <>
            <div className='w-full h-[88vh] bg-gradient-to-br from-[#132732] from-40% to-[#7a7573] relative  flex flex-col lg:flex-row justify-around items-center'>
                <div className='w-[80%] md:w-[40%]'>
                    <form onSubmit={handleSubmit(onSubmit)} method="post" className='addNotes gap-5 flex flex-col  justify-center items-center'>
                        <div className='text-2xl md:text-3xl text-center text-shadow shadow-black text-white'>Add a Task</div>
                        <input {...register("title", {
                            required: true
                        })} type="text" placeholder='Add Title' className='p-2 py-1 md:p-4 md:py-2 w-[70%] lg:w-[50%] rounded-md' name='title' id='title' />
                        <input {...register("description", {
                            required: true
                        })} type="text" placeholder='Add Description' className='p-2 py-1 md:p-4 md:py-2 w-[70%] lg:w-[50%] rounded-md' name='description' id='description' />
                        <input type="submit" className='bg-slate-900 hover:bg-slate-950 border border-slate-900 text-white p-5 py-2 rounded-md' value={"Add"} />
                    </form>
                </div>

                <div className="showNotes flex flex-col items-center justify-center text-white w-[80%] sm:[70%] lg:w-[50%] min-h-[40vh] lg:min-h-[20vh]">
                    <div className='text-2xl md:text-3xl m-2 lg:m-5 text-shadow shadow-black'>Your Tasks</div>
                    <div className="content flex gap-5 justify-center flex-wrap overflow-auto max-h-[25vh] sm:max-h-[30vh] lg:max-h-[60vh]">
                        {tasks ?
                            tasks.length > 0 ?
                                tasks.map((task) => {
                                    return <Task key={task._id} tasks={[tasks, setTasks]} id={task._id} title={task.title} description={task.description} done={task.completed} />
                                })
                                :
                                <div>Add a Task</div>
                            :
                            <div>Add a Task</div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

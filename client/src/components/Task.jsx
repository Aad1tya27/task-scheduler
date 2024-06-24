import React, { useState, memo } from 'react'
import { useEffect } from 'react';
import { AuthContext } from '../context/context';
const Task = memo((props) => {
    const [checked, setChecked] = useState(props.done)
    const onDelete = async() => {
        let newTasks = props.tasks[0].filter(task => {
            if (task._id != props.id) {
                return task
            }
        })
        localStorage.setItem("tasks",JSON.stringify(newTasks))
        console.log(newTasks)
        props.tasks[1](newTasks)
        fetch(`${import.meta.env.VITE_SERVER_URI}/user/todos/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then(response => {
            response.text().then(msg => {
                // console.log(msg)
                // console.log(props.tasks[0])

            })
        })
        // const msg = await response.text();

    }
    const handleChange = (e) => {
        // console.log(e.target.checked)
        setChecked(!checked);
        let oldTasks = JSON.parse(localStorage.getItem("tasks"));
        for (const task of oldTasks) {
            if(task._id == props.id){
                task.completed = !task.completed;
            }
        }
        localStorage.setItem("tasks",JSON.stringify(oldTasks));
        fetch(`${import.meta.env.VITE_SERVER_URI}/user/todos/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then((response) => {
            response.text().then((msg) => {
                console.log(msg);
                // console.log(props.tasks[0])
            })
        })
        // const msg = await response.text();
        // console.log(msg)
        // console.log(props.tasks[0])
    }

    return (
        <>
            <div className='taskRow mx-1 my-1 flex p-2 px-4 relative rounded-md border-[1px]  hover:shadow-[0_0px_2px_2px_rgba(256,256,256,0.5)]  border-opacity-10 border-[#ffffff] text-white items-center'>
                {/* <div className="status absolute scale-150 top-0 left-0 m-4"> */}
                    <input onChange={handleChange} type="checkbox" id="status" name="status" defaultChecked={checked} />
                {/* </div> */}
                {checked?
                <div className="description line-through p-2 px-3 w-[90%]   break-words">{props.description}</div>
                :
                <div className="description p-2 px-3 w-[90%]  break-words">{props.description}</div>
                }
                
                <button onClick={onDelete} className="delete absolute right-0 h-[37px] w-[20px] m-2"><img src="/icons8-trash.svg" alt="" /></button>
            </div>

        </>
    )
})

export default Task

import React, { useContext } from 'react'
import { useEffect } from 'react';
import { AuthContext } from '../context/context';
const Task = (props) => {
    // const user = useContext(AuthContext);
    const onDelete = () => {
        fetch(`${import.meta.env.VITE_SERVER_URI}/user/todos/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then(response => {
            response.text().then(msg => {
                console.log(msg)
                console.log(props.tasks[0])
                let newTasks = props.tasks[0].filter(task => {
                    if (task._id != props.id) {
                        return task
                    }
                })
                props.tasks[1](newTasks)
            })
        })
        // const msg = await response.text();

    }
    const handleChange = (e) => {
        console.log(e.target.checked)
        fetch(`${import.meta.env.VITE_SERVER_URI}/user/todos/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        }).then((response) => {
            response.text().then((msg) => {
                console.log(msg);
                console.log(props.tasks[0])
            })
        })
        // const msg = await response.text();
        // console.log(msg)
        // console.log(props.tasks[0])
    }

    return (
        <>
            <div className='taskRow overflow-auto relative w-[150px] h-[165px] sm:w-[200px] sm:h-[200px] justify-around rounded-md bg-slate-100  shadow-sm text-black flex flex-col items-center'>
                <div className="status absolute scale-150 top-0 left-0 m-4">
                    <input onChange={handleChange} type="checkbox" id="status" name="status" defaultChecked={props.done} />
                </div>
                <button onClick={onDelete} className="delete absolute top-0 right-0 h-[37px] w-[25px] m-2"><img src="/icons8-trash.svg" alt="" /></button>
                <div className="title text-xl absolute top-[35%]">{props.title}</div>
                <div className="description text-center absolute top-[50%]">{props.description}</div>
            </div>
        </>
    )
}

export default Task

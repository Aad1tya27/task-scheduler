import React from 'react'
import { useEffect } from 'react';
const Task = (props) => {
    const onDelete = async () => {

        // let res = await fetch("http://localhost:3000/todos",)
        const response = await fetch("http://localhost:3000/todos/"+(props.id).toString(), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const msg = await response.text();
        console.log(msg)
        console.log(props.tasks[0])
        let newTasks = props.tasks[0].filter(task=>{
            if(task.id != props.id){
                return task
            }
        })
        
        props.tasks[1](newTasks)
    }
    const handleChange = async (e) => {
        console.log(e.target.checked)
        const response = await fetch("http://localhost:3000/todos/"+(props.id).toString(), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const msg = await response.text();
        console.log(msg)
        console.log(props.tasks[0])
        let newTasks = props.tasks[0].map(task=>{
            if(task.id == props.id){
                task["completed"]=e.target.checked;
            }
            return task
        })
        
        props.tasks[1](newTasks)
    }
        
    return (
        <>
            <div className='taskRow overflow-hidden relative w-[150px] h-[165px] sm:w-[200px] sm:h-[200px] justify-center rounded-md bg-slate-100  shadow-sm text-black flex flex-col items-center'>
                <div className="status absolute scale-150 top-0 left-0 m-4">
                    <input onChange={handleChange} type="checkbox" id="status" name="status" defaultChecked={props.done} />
                </div>
                <button onClick={onDelete} className="delete absolute top-0 right-0 h-[37px] w-[25px] m-2"><img src="public/icons8-trash.svg" alt="" /></button>
                <div className="title">{props.title}</div>
                <div className="description text-center">{props.description}</div>
            </div>
        </>
    )
}

export default Task

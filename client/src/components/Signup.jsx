import React from 'react'
import { NavLink, Navigate , useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = (data) => {
    // console.log(data)
    fetch(`${import.meta.env.VITE_SERVER_URI}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((msg) => {
        // console.log(msg)
        if(!(msg.msg == "User Already Exists")){
          localStorage.setItem("token",msg.token)
          localStorage.setItem("name",data.name)
          localStorage.setItem("email",data.email)
          navigate("/")
        }else{
          setError("existingUser",{message: msg.msg})
        }
      })
    }).catch((err) => {
      console.log("login request failed")
    })
  }
  return (
    <>
      <div className='w-full h-[100vh] bg-gradient-to-br from-[#132732] from-40% to-[#7a7573]'>
        <div className="headings absolute w-full flex justify-center items-center h-[30vh]">
          <h1 className='m-5  text-[40px] text-white font-medium'>Task Scheduler</h1>
        </div>
        <div className="boxwrapper absolute w-full flex items-center justify-center h-full">
          <form onSubmit={handleSubmit(onSubmit)} className='box relative p-4 flex flex-col items-center justify-center gap-3 sm:gap-5  bg-slate-200 w-[80vw] min-h-[40vh] sm:w-[400px] sm:h-[400px] rounded-md'>
            <h1 className='text-2xl'>Sign Up</h1>
            <input {...register("name", {
              required: true
            })} className='mx-2 px-2 rounded border border-black bg-slate-50 p-2 w-[90%] sm:w-[80%]' type="text" name="name" id="name" placeholder='Enter your name' />
            <input {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email Address"
              }
            })} className='mx-2 px-2 rounded border border-black bg-slate-50 p-2 w-[90%] sm:w-[80%]' type="email" name="email" id="email" placeholder='Enter your email' />
            {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
            <input {...register("password", {
              required: true
            })} className='mx-2 px-2 rounded border border-black bg-slate-50 p-2 w-[90%] sm:w-[80%]' type="password" name="password" id="password" placeholder='Enter your password' />
            <button onClick={()=>clearErrors()} disabled={isSubmitting} className='text-xl bg-slate-800 text-white p-2 rounded px-4 w-[90%] sm:w-[80%]' type="submit">Sign Up</button>
            {errors.existingUser && <div className='text-red-500'>{errors.existingUser.message}</div>}
            <NavLink to={"/login"}>Already a user? Login</NavLink>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup

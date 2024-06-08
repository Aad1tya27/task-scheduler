import React, {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate()
  const onSubmit = () => {
    localStorage.clear()
    navigate("/signup")
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup")
    }
  }, []);
  return (
    <>
      <div className='w-full h-[88vh] text-white   bg-gradient-to-br from-[#132732] from-40% to-[#7a7573] relative  flex flex-col  justify-center gap-5 items-center'>
        <div className="name text-xl">{localStorage.getItem("name")}</div>
        <div className="email text-xl">{localStorage.getItem("email")}</div>
        <button onClick={onSubmit} className="px-4 p-2 rounded bg-slate-300 text-blue-950 text-lg" >Log Out</button>
      </div>
    </>
  )
}

export default Profile

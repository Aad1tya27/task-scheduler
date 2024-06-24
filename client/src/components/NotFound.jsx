import React from 'react'
import { NavLink } from 'react-router-dom'
const NotFound = () => {
    return (
        <>
            <div className='w-full h-[100vh] text-white   bg-gradient-to-b from-[#132732] from-20% to-[#7a7573] relative  flex flex-col  justify-center gap-5 items-center'>
                <div className="name text-xl">Page Not Found</div>
                <NavLink to={"/"}>Go to Dashboard</NavLink>
            </div>
        </>
    )
}

export default NotFound
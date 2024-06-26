import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='h-[12vh] p-4 relative top-0 z-10 w-full  flex items-center justify-between'>
                    <NavLink to={"/"}  className='px-7 flex justify-center sm:justify-normal items-center h-full  text-xl sm:text-3xl text-white  '>Task Scheduler <sub className='text-[17px] hidden sm:inline'>v2</sub> 
                        <img className='w-5 sm:w-8 m-3' src="/calendar.png" alt="" />
                    </NavLink>
                <NavLink to={"/profile"}  className='text-white px-5'><img className='w-[30px] sm:w-[40px]' src="/person_FILL0_wght400_GRAD0_opsz24.svg" alt="" /></NavLink>
            </div>
        </>
    )
}

export default Navbar

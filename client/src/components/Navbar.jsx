import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className='h-[12%] w-full bg-gradient-to-b from-black to-slate-900 flex items-center justify-between'>
                {/* <div className="left w-full h-full"> */}
                    <h1 className='px-7 flex justify-center sm:justify-normal items-center h-full  text-2xl sm:text-3xl text-white  '>Task Scheduler
                        <img className='w-5 sm:w-8 m-3' src="/public/calendar.png" alt="" />
                    </h1>
                {/* </div> */}
                <div className='text-white px-5'><img className='w-[30px] sm:w-[40px]' src="public/person_FILL0_wght400_GRAD0_opsz24.svg" alt="" /></div>
            </div>
        </>
    )
}

export default Navbar

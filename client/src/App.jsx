import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Dashboard/></>
    },
    {
      path:"/profile",
      element:<><Navbar/><Profile/></>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Login from './components/Login'
import NotFound from './components/NotFound'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><main className='bg-gradient-to-b from-[#0c1015] from-5% to-[#1c2b34]'><Navbar /><Dashboard /></main></>
    },
    {
      path: "/profile",
      element: <><main className='bg-gradient-to-b from-[#0c1015] from-5% to-[#1c2b34]'><Navbar /><Profile /></main></>
    }, {
      path: "/signup",
      element: <><Signup /></>
    }, {
      path: "/login",
      element: <><Login /></>
    }, {
      path: "*",
      element: <><NotFound/></>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

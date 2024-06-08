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
      element: <><Navbar /><Dashboard /></>
    },
    {
      path: "/profile",
      element: <><Navbar /><Profile /></>
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

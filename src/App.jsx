import { useState, useEffect } from 'react'
import { Home } from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { useNavigate } from 'react-router-dom';


function App() {

  

  const [token, setToken] = useState(localStorage.getItem('token'));

  // just a basic authentication using local storage (not checking token)




  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <div><Home /></div> : <Login/>,
    },
    {
      path: "/login",
      element: token ? <div><Home /></div>  : <div><Login token={token}/></div>,
    },
    {
      path: "/signup",
      element: token ? <div><Home /></div> : <div><Signup token={token}/></div>,
    },

  ]);


  return (
    <div className='font-sora relative'>
      <RouterProvider router={router} />
    </div>
  )
}


export default App
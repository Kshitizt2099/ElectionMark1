import React from 'react'
import { Link } from 'react-router-dom' 
import Register from "../WorkAroundFiles/Register.png"
import Login from "../WorkAroundFiles/Login.png"
const Home = () => {
  return (
    <div className='flex  h-screen w-screen'>
      <div className='w-[50%] h-[100%] bg-gradient-to-tr from-green-400 to-green-700 border-r-4 border-black flex items-center justify-center'>
       <div className='cursor-pointer'>
        <Link to="/Register"><img src={Register} alt='Register' className='h-20 w-56 hover:w-72 hover:h-28 rounded-xl' />
</Link>
       </div>
      
      </div>
      <div className='w-[50%] h-[100%] bg-green-300 border-r-4 border-black flex items-center justify-center'>
      <Link to="/LoginChoice"><img src={Login} alt='Register' className='h-20 w-30 hover:w-36 hover:h-28 rounded-xl' /></Link>
      </div>
      
     


    </div>
  )
}

export default Home
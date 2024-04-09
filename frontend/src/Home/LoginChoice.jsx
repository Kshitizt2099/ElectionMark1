import React from 'react'
import { Link } from 'react-router-dom'
import User from '../WorkAroundFiles/836.jpg'
import Admin from '../WorkAroundFiles/5883.jpg'
const LoginChoice = () => {
 


  return (
    <div>
       <div className='flex  h-screen w-screen'>
      <div className='w-[50%] h-[100%] bg-gradient-to-tr from-green-400 to-green-700 border-r-4 border-black flex items-center justify-center'>
       <div className='cursor-pointer'>
        <Link to="/AdminLogin"><img src={Admin} alt='Register' className='h-24 w-40 hover:w-44 hover:h-28 rounded-xl' />
</Link>
       </div>
      
      </div>
      <div className='w-[50%] h-[100%] bg-green-300 border-r-4 border-black flex items-center justify-center'>
      <Link to="/Login"><img src={User} alt='Register' className='h-20 w-30 hover:w-36 hover:h-28 rounded-xl' /></Link>
      </div>
      
     


    </div>
      

    </div>
  )
}

export default LoginChoice
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StopElection from '../../WorkAroundFiles/StopElection.png';
import CreateElection from '../../WorkAroundFiles/CreateElection.png';
import axios from 'axios';
import { AuthAdmin } from '../../WorkAroundFiles/SetUsers';
// import StopElection from "./WorkAroundFiles/StopElection.png";
// import CreateElection from "./WorkAroundFiles/CreateElection.png";
const Welcome = () => {
  const {admin}=AuthAdmin();
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
      navigate("/AdminLogin");

  }
  
  

  return (
     admin && <div >
      <div className='w-screen h-16 bg-black text-white p-3 flex justify-between'>
       <div>
       welcome {admin.email}
       </div >
          
       <div>
       <button onClick={logout}>Logout</button>
       </div>
      

      </div>
      <div className='flex h-[calc(100vh - 64px)] w-screen justify-center items-center p-5'>
      <Link to="/CreateElection">
    <div className='h-[200px] w-[200px] bg-blue-300 rounded-xl p-3 m-6 cursor-pointer hover:h-[250px] hover:w-[250px]'>
     <img src={CreateElection} className='h-[100%] w-[100%]'/>
    
    </div></Link>
 
 <Link to="/Status"><div className='h-[200px] w-[200px] bg-gradient-to-tr from-purple-700 to-orange-600 rounded-xl p-3 m-6 cursor-pointer hover:h-[250px] hover:w-[250px]'>
     <img src={StopElection} className='h-[100%] w-[100%]'/>
    
    </div></Link>

      </div>

 


</div>
    
  )
}

export default Welcome
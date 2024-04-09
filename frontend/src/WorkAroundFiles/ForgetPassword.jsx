import React, { useState } from 'react'
import axios from "axios";
import "./fp.css";
const ForgetPassword = () => {
  const[msg,setmsg]=useState("");
  const proceed=()=>{

      axios.patch("http://localhost:4500/forgetPassword",{email}).then((res)=>{
           localStorage.setItem("temptoken",res.data.token)
           setmsg(`Mail has been to ${email}`);
      }).catch((err)=>{console.log(err.response.data)})
  }
  const[email,setEmail]=useState("");
  return (
   <div>
     <div className='bg-blue-500 h-screen w-screen flex justify-center items-center'>
      <div className='h-[fitcontent] w-[fitcontent] bg-slate-300'>
        
      <div className=' triangle'>

</div>
 <div className='bg-red-500 h-[400px] w-[400px] '>
 <div className='bg-gray-500 circle'>

</div>
 </div>


      </div>
      <div class="relative w-40 h-40 overflow-hidden">
  <div class="absolute inset-0 rounded-full bg-red-500"></div>
  <div class="absolute inset-0 clip-triangle-rounded"></div>
</div>

       
     

       <div className='h-[40%] w-[40%] bg-white flex flex-col  p-5 items-center justify-center'> 
          <input className={`bg-gray-400 w-[400px] rounded-xl mb-4`} type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
          <button  className="bg-red-400" onClick={proceed}>ResetPassword</button>
          {msg&&<div className=" h-12 flex items-center justify-center alert alert-danger" role="alert">
           {msg.toString()}
</div>}
       </div>
     </div>
   </div>
  )
}

export default ForgetPassword
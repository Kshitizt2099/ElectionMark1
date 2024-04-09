import React, { useState,useEffect } from 'react'
import axios from 'axios';
const ResetPassword = () => {
    const[err,seterr]=useState("");
    const[msg,setmsg]=useState("");
    const[btn,setbtn]=useState(true);
    const[pass,setpass]=useState("");
    const reset=()=>{
       axios.patch("http://localhost:4500/resetP",{password:pass},{
        headers:{
          Authorization:localStorage.getItem("temptoken")
        }
       }).then((res)=>{setmsg("Password has been reset");  setbtn(false)}).catch((err)=>{
           seterr(err.response.data.error);
        
       })
    }
    
  return (
    <div>
       

     <div>
         <label>New Password</label>
          <input type='password' onChange={(e)=>{setpass(e.target.value)}} className='border-black w-56 h=5'/>
          <label>Confirm Password</label>
          <input type='password' onChange={(e)=>{                
               if(e.target.value!==pass)
                {
                  
                  seterr("Passwords do not match");
                }
                else{
                  console.log(e.target.value)
                  seterr("")
                  setmsg("Passwords matched perfectly")
                }
                
            
            
            }} className='border-black w-56 h=5'/>
          {err&&<div className=" h-12 w-56 flex items-center justify-center alert alert-danger" role="alert">
           {err.toString()}
</div>}
         {
          msg &&
          <div>
              <div className=" h-12 w-56 flex items-center justify-center alert alert-success" role="alert">
          {msg.toString()}
          
</div>
             {btn&&<button className='bg-blue-400 rounded-2xl w-56' onClick={reset}>Reset</button>}
            </div>
          
          }
         
      </div>
    </div>
  )
}

export default ResetPassword

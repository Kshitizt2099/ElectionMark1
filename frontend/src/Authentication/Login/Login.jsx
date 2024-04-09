import React, { useState } from 'react'
 
import lock from '../../WorkAroundFiles/lock.png'
import  user  from '../../WorkAroundFiles/user.png'
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const[email,setEmail]=useState("");
  const [error,setError]=useState("");
  const[password,setpass]=useState("");
  const navigate=useNavigate();
  const handleSumbit=async(e)=>{
    e.preventDefault();
    
    
    const newuser={email,password,type:"User"};
    const result=await fetch("http://localhost:4500/Login",{
      method:"POST",
      body:JSON.stringify(newuser),
      headers:{                            //cors se bachane ke liye
          "content-Type":"application/json"
      }
      
    })

    const response=await result.json();
    
    if(!result.ok)
    {
      // result.ok returns boolean
      setError(response.error);
    }
    else{
      
      const token=response.token;
      localStorage.setItem("token",token);
      setError("");
      setEmail("");
      setpass("");
      navigate("/userHome")
      
    
      
    }
  }

  return (
    
    <div className="h-screen w-screen bg-gradient-to-t from-green-300 via-green-900 to-black flex justify-center items-center">
    <div className="bg-white h-[95vh] w-[30vw] flex flex-col rounded-3xl shadow-2xl ">
         <div className="h-[50%] w-[100%] bg-gradient-to-tr from-green-900 via-green-400 to-red-900 rounded-t-3xl">

         </div>
         <form onSubmit={handleSumbit}>
         <div className="h-[50%] w-[100%] flex flex-col p-4">
             <div  className="ml-[150px] my-4">
                 <h1 className="text-[25px] text-green-800">User Login </h1>
             </div>
             <div className="flex ml-14 mb-3 w-[100%]">
                 <div className="bg-green-400 rounded-l-xl h-[40px] w-[10%]">
                     <img src={user} className="w-7 m-2"/>
                   </div>
                   <input type='email' value={email} className='bg-green-400  w-[70%] rounded-r-xl' onChange={(e)=>{setEmail(e.target.value)}} required/>  
             </div>

             <div className="flex ml-14 mb-3 w-[100%]">
                 <div className="bg-green-400 rounded-l-xl h-[40px] w-[10%]">
                     <img src={lock} className="w-7 m-2"/>
                   </div>
                   <input type='password' value={password} className='bg-green-400  w-[70%] rounded-r-xl' onChange={(e)=>{setpass(e.target.value)}}required/>
   
             </div>

             <div className="flex flex-col w-[100%]  items-center justify-center p-3">
                  <div className="flex justify-around p-3 ml-20">
                     <Link to="/Register"><p className="ml-[-200px] mt-[-2px] mb-2 cursor-pointer">Create Account</p></Link> 
                     <Link to="/forgetPassword"><p className="mr-[-210px] mt-[-2px] mb-2 cursor-pointer">Forget Password</p></Link>     
                      
                  </div>

                 <button className="bg-blue-950 text-white rounded-xl h-8 w-40 mt-4" type='submit'>login</button>


                 <Link to="/LoginWithPhone"><p className="mr-[-210px] mt-[-2px] mb-2 cursor-pointer"> <button className="bg-blue-950 text-white rounded-xl h-8 w-40 mt-4 mr-52
                 " type='submit'>Login with Phone</button></p></Link>
             </div>
  
           
             
         </div>
          
         </form>
        
     </div>

    </div>
     

  )
}

export default Login
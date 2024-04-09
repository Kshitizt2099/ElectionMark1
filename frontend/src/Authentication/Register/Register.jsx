import React, { useState } from 'react'

const Register = () => {
    const[email,setEmail]=useState("");
    const[name,setname]=useState("");
    const[Aadhar,setAadhar]=useState("");
    const[password,setpass]=useState("");
    const[Error,setError]=useState("");
    const[created,setcreated]=useState("");
    const[phone,setphone]=useState("");
    const handleSumbit=async(e)=>{
        e.preventDefault();
        
        
        const newuser={name,email,password,Aadhar,phone};
        const result=await fetch("http://localhost:4500/register",{
          method:"POST",
          body:JSON.stringify(newuser),
          headers:{                            //cors se bachane ke liye
              "content-Type":"application/json"
          }
          
        })
    
        const response=await result.json();
        console.log(response);
        if(!result.ok)
        {
          // result.ok returns boolean
          setError(response.error);
        }
        else{
          
         
          setError("");
           setcreated(response.error);
          setname("");
          setAadhar("");
          setEmail("");
          setpass("");
          
        
          
        }
      }

  return (
    <div className='bg-gradient-to-br from-blue-500 to-blue-200 h-screen w-screen flex justify-center items-center '>
 <div className='bg-white w-[40%] p-3 rounded-xl'>
 <form onSubmit={handleSumbit}>
<div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}}class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required placeholder='Enter the name'/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Email Id of the user</label>
    <input type="" value={email} onChange={(e)=>{setEmail(e.target.value)}} class="form-control"  required placeholder='Enter   Email'/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Enter Aadhar Number</label>
    <input type="text" value={Aadhar} onChange={(e)=>{setAadhar(e.target.value)}} class="form-control"  required placeholder='Enter Aadhar'/>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Enter Password</label>
    <input type="password" value={password} onChange={(e)=>{setpass(e.target.value)}} class="form-control" required placeholder='Enter Password'/>
  </div>


  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Enter Phone number</label>
    <input type="text" value={phone} onChange={(e)=>{setphone(e.target.value)}} class="form-control" required placeholder='Enter Password'/>
  </div>
   <button type="submit" class="btn btn-primary ml-60 mt-4">Sign In</button>
</form>

{Error && <div className="alert alert-danger mt-4" >
           {Error}
</div>}

{created && <div className="alert alert-success mt-4" >
           {created}
</div>}

 </div>
        
    </div>


  )
    
}

export default Register
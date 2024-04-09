import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const ElectionForm = ({userslist,candidatelist}) => {
  const [Symbol,SetSymbol]=useState("");
  const[name,setName]=useState("");
  const[Error,setError]=useState("");
  const navigate=useNavigate();
  
  const handleSumbit=async(e)=>{
    e.preventDefault();
    const Candidates=candidatelist;
    const formData = new FormData();
    formData.append('image', Symbol);
    formData.append('name', name);
    formData.append('userslist',JSON.stringify(userslist));
    formData.append('Candidates',JSON.stringify(Candidates));
   
    try {
      const response = await axios.post("http://localhost:4500/ElectionCreator", formData, {
        headers: {
          "Authorization":localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
          
        }
      });
      const data = response.data;
      console.log(data); // Log the response data after a successful upload
      // You might want to update the image preview here if needed
      if(data)
      {
        navigate("/Admin");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
    
    //const newuser={name,Symbol,userslist,Candidates};
       // const result=await fetch("http://localhost:4500/ElectionCreator",{
    //   method:"POST",
    //   body:JSON.stringify(newuser),
    //   headers:{           
    //       "Authorization":localStorage.getItem("token"),                 //cors se bachane ke liye
    //       "content-Type":"multipart/form-data"
    //   }
      
    // })

    // const response=await result.json();
    // if(!result.ok)
    // {
    //         setError(response.error);
    // }
    // else{
    //   console.log(response)
    //   navigate("/Admin");
      
      
      
    // }

  }
  const handleChangle=(e)=>{
    console.log(e.target.files[0]);
    SetSymbol(e.target.files[0]);
  }
  return (
    <div className="flex items-center justify-center ml-64">

      <form onSubmit={handleSumbit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name of Election</label>
    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}className="form-control"  aria-describedby="emailHelp" required placeholder='Enter the name of election'/>
    <input type="file" onChange={(e)=>{handleChangle(e)}} className="form-control" aria-describedby="emailHelp" required />
  </div>
     <button type="submit" class="btn btn-primary">Create the Election</button>
</form>

{Error && <div className="alert alert-danger" >
           {Error}
</div>}
    </div>
    
  )
}

export default ElectionForm
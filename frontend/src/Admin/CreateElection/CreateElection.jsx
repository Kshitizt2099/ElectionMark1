import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../App'
import ElectionForm from '../ElectionForm/ElectionForm';
import { Candidatelist } from './Candidates/Candidateslist'; 
import AddUsers from "../../WorkAroundFiles/Add users.png"
import AddCandi from "../../WorkAroundFiles/AddCandi.png"
const CreateElection = () => {
  const navigate=useNavigate();
  async function xyz()

  {
      const result=await fetch("http://localhost:4500/AdminDetails",{
      method:"GET",
     
      headers:{                            //cors se bachane ke liye
          "content-Type":"application/JSON",
          "authorization":localStorage.getItem("token")
      }
    })  
    const response=await result.json();
    if(!result.ok)
{
navigate("/")


}
  }
  useEffect(()=>{
    xyz();
  },[])
  const {Eusers,setEusers}=useContext(userContext);
  return (
    <div className='bg-gradient-to-tr from-red-600  via-white via-yellow-200 h-screen w-screen flex items-center justify-center'>
       <div className='bg-white h-[50%] w-[50%] flex rounded-xl'>
      
 
             
       {Eusers.length===0?<div className='flex'>
        <Link to="/Userslist">
    <div className='h-[200px] w-[200px] bg-white rounded-xl p-3 m-6 cursor-pointer hover:h-[250px] hover:w-[250px] border border-orange-400 '>
     <img src={AddUsers} className='h-[100%] w-[100%]'/>
    
    </div></Link>
    <Link to="/CandidatesList">
    <div className='h-[200px] w-[200px] bg-green-500 rounded-xl p-3 m-6 cursor-pointer hover:h-[250px] hover:w-[250px]'>
     <img src={AddCandi} className='h-[100%] w-[100%]'/>
    
    </div></Link>


       </div>:<ElectionForm  userslist={Eusers} candidatelist={Candidatelist}/>}

    </div>
    </div>
    
  )
}

export default CreateElection
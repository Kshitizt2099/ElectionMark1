import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ViewElection = () => {
    const [result,setresults]=useState([]);
    const[name,setname]=useState("");
    const[Symbol,SetSymbol]=useState("");
    const {id}=useParams();
    const getresults=()=>{
        console.log(id);
       axios.get(`http://localhost:4500/viewElection?_id=${id}`,{
          headers:{
            Authorization:localStorage.getItem("token")
          }
       }).then((res)=>{
        
           setresults(res.data.result.Candidates.sort((a, b) => b.votes - a.votes));
           setname(res.data.result.name);
           SetSymbol(res.data.result.Symbol);
       }).catch((err)=>{console.log(err);})
    }
  useEffect(()=>{
    getresults();
  },[])
  
  
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-white via-purple-400 via-blue-400 to-amber-300'>
      <div className='h-[50%] w-[50%] bg-white   rounded-xl flex '>
      <div className='h-[100%] w-[50%] flex flex-col items-center justify-center'>
        
        <div>
        <p className='font-medium'>Result of </p>
        {name}
        <img src={Symbol}  className='h-36 w-36' />
        </div>
      
      </div>
      <div className='h-[100%] w-[50%] flex flex-col items-center justify-center border-l-4 border-black'>
        <div>
          <h1 className='text-2xl font-bold'>Summary</h1>

        </div>
  <div className='overflow-y-scroll  w-[100%] '>
    {
      result.map((i, index) => {
        console.log(i);
        return(
          <div key={index} className='flex p-3 bg-blue-300 m-3 w-[90%] rounded-xl justify-around'>
          <div className='flex'>
            <img src={i.img} className='h-10 w-10 rounded-md mr-4'/>
          <p>{i.name}</p>
            </div>
         
          <p className='ml-3'>{i.votes}</p>
        </div>

        )
        
})
    }
  </div>
</div>

 
      </div>

    
         
      </div>
     
    
   
  )
}

export default ViewElection
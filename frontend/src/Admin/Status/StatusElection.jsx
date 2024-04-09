import React, { useEffect, useState } from 'react'
import { GetAllelections } from '../../WorkAroundFiles/SetUsers'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import stop from '../../WorkAroundFiles/stop.jpg'
import  view  from '../../WorkAroundFiles/View.jpg'
const StatusElection = () => {
  
  const[elections,setElections]=useState([]);
  const navigate=useNavigate();
  const[setStop,setswitch]=useState(0);
  const getDetails=async()=>{
    const token=localStorage.getItem("token");
    

    axios.get("http://localhost:4500/getElections",{
        headers:{
         Authorization:token
        }
      }).then(res=>{ setElections(res.data.allelections)}).catch((err)=>{
           seterr('Unable to get elections');
      })
   
    
    

}

useEffect(()=>{
 getDetails();



},[setStop])

 
  console.log(elections);
  const[err,seterr]=useState("");
  const proceed=async(_id)=>{
          
    
    axios.put(`http://localhost:4500/stopElection?_id=${_id}`,{},{
       headers:{
         Authorization:localStorage.getItem("token"),
     
       }

    }).then((res)=>{setswitch(setStop+1)}).catch((err)=>{ seterr(err.response.data.error)});
}


const View=async(_id)=>{
       
       navigate(`/viewElection/${_id}`);   
  
}
/**/

  return (
    <div className='flex flex-col'>
     {elections && elections.map((ele,index)=><div className='flex w-screen border h-[64px] border-black'>
      <div key={index}  className={`flex  p-3 w-[300px] h-[60px]  ${ele.Status!=="Completed"?"bg-green-400":"bg-red-500"} cursor-pointer`}>
<span>{ele.name}</span>
</div>
{ele.Status!=="Completed"? <button className="ml-20 " onClick={()=>{proceed(ele._id)}}><img src={stop} className='h-[60px] w-24'/></button>:""}
 {ele.Status==="Completed"? <button className="ml-20" onClick={()=>{View(ele._id)}}><img src={view} className='h-[60px] w-24'/></button>:""}

</div>
)}
{err&&<div className=" h-12 flex items-center justify-center alert alert-danger" role="alert">
           {err.toString()}
</div>}
    
    </div>
 
  )
}

export default StatusElection
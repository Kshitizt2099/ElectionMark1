import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const Vote = () => {
  const[curr_election,set_ce]=useState("");
  const{id,vid}=useParams();
  const[msg,setmsg]=useState("");
  const[done,setvoted]=useState(false);
  const _id=id.slice(4);
  const  adr=vid.slice(4);
  const navigate=useNavigate();

  useEffect(()=>{
    
    axios.get(`http://localhost:4500/voting?_id=${_id}&adr=${adr}`,{
      headers:{
         Authorization:localStorage.getItem("token")
      }
    }).then((res)=>{set_ce(res.data.details)}).catch((err)=>{console.log(err.data)});


  },[])
  
  const voted=(name)=>{
     setvoted(true);
     axios.put("http://localhost:4500/givenvote",{
          party:name,
          adr
     },{
          headers:{
            Authorization:localStorage.getItem("token"),
            
          }
     }).then((res)=>{
      setmsg("You have given your Vote");
      setTimeout(()=>{ navigate("/userHome")},2000);
    }).catch((err)=>{console.log(err)});
  }
  //{curr_election!==undefined && curr_election.Candidates.map((i)=><h4>{i.name}</h4>)}
  return (
    <div className='h-screen w-screen bg-gradient-to-tr from-orange-400 via-white to-green-300 relative'>
       <div className='absolute top-40 left-56 h-[70%] w-[70%]  bg-white  rounded-3xl'>
      <p className='text-center font-bold'>{curr_election.name}
</p>       

  <div className='text-center'>
        <p>Candidate list</p>
                
      </div>
      <div className='flex'>
      { !done && curr_election &&  curr_election.Candidates.map((i,index)=><div key={index} className='cursor-pointer m-4 flex rounded-xl h-20 w-[300px] bg-blue-400' onClick={()=>{voted(i.name)}}><div className='flex m-3'>
          <img src={i.img} className='w-10 h-10 rounded-xl mr-2'/>
          <p className='mt-2'>{i.name}</p>
        </div></div>)}

      </div>
    
     
        
        
        </div>  
      
      
       {msg && <div className=" h-12 flex items-center justify-center alert alert-danger" role="alert">
           {msg.toString()}
        
        </div>}
    </div>
  )
}

export default Vote
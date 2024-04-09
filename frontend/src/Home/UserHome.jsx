import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import axios from "axios";
const curr_choice={};
const UserHome = () => {
    const [user,setUser]=useState("");
    const [elections,setElections]=useState([]);
    const[err,seterr]=useState("");
    const navigate=useNavigate();
    const proceed=async(_id)=>{
          
     
           axios.get(`http://localhost:4500/isEligible?_id=${_id}&adr=${user.Aadhar}`,{
              headers:{
                Authorization:localStorage.getItem("token"),
            
              }

           }).then((res)=>{navigate(`/Vote/aw23${_id}/ff7r${user.Aadhar}`)}).catch((err)=>{ seterr(err.response.data.error)});
    }
    const getDetails=async()=>{
        const token=localStorage.getItem("token");
        // const response=await axios.get("http://localhost:4500/Details",{
        //   headers:{
        //    Authorization:token
        //   }
        // });
        // const result=response.data;
        // console.log(result);
        // setUser(result.User);
        axios.get("http://localhost:4500/Details",{
            headers:{
             Authorization:token
            }
          }).then(res=>{ setUser(res.data.User)}).catch((err)=>{
               navigate("/");
          })


        axios.get("http://localhost:4500/getElections",{
            headers:{
             Authorization:token
            }
          }).then(res=>{ setElections(res.data.allelections)}).catch((err)=>{
               console.log('Unable to get elections');
          })
       
        
        

    }

    useEffect(()=>{
     getDetails();



    },[])
    const logout=()=>{
      localStorage.removeItem("token");
        navigate("/Login");
  
    }
    curr_choice[user]=user;
  return (
    
    <div>
       
      <div className='w-screen h-16 bg-black text-white p-3 flex justify-between'>
       <div>
       welcome {user.name}
       </div >
         <div>
         <button onClick={logout}>Logout</button>     
         </div>

       
      </div>
     
      <div className='flex p-5 '>
      {elections && elections.map((ele,index)=><div key={index} onClick={()=>{proceed(ele._id)}} className='w-96 h-96 bg-blue-400 m-5 cursor-pointer rounded-xl flex flex-col'>
              <div className='w-[100%] h-[calc(100%-50px)] '>
                <img src={ele.Symbol} className='w-[100%] h-[100%] rounded-xl'/>
                </div>
                <div className='text-center mt-2'>
                {ele.name}
                  </div>
             
      </div>)}
       
        {err&&<div className=" h-12 flex items-center justify-center alert alert-danger" role="alert">
           {err.toString()}
</div>}
      </div>
      
    
    </div>
  )
}

export default UserHome

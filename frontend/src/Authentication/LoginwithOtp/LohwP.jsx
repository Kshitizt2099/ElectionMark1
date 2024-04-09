import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from './PhoneInput';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const LohwP = () => {
    const[otp,setotp]=useState(new Array(6).fill(""));
    const[sent,setsent]=useState(false);
    const[scc,setsucc]=useState("");
     const navigate=useNavigate();
      const inputRefs=useRef([]);
     useEffect(()=>{
      if(inputRefs.current[0])
      {
         inputRefs.current[0].focus() 
      }
     },[])
     const handleotp=(phone)=>{
        console.log(phone);
        axios.post("http://localhost:4500/sendOtp",{phone}).then((res=>{console.log(res.data.otp)})).catch(err=>{console.log(err)})
     }
    
     const verify=()=>{
      axios.post(`http://localhost:4500/verify?code=${otp.join('')}`).then((res=>{localStorage.setItem("token",res.data.token);
      navigate("/userHome");
    
    })).catch(err=>{console.log(err)}) 
     }
     const handlechange=(e,index)=>{
      const value=e.target.value;
      
      console.log("tc",e.target.value);
      if(value.length==0)
      {
        if(index==0)
        {
          const newotp=[...otp];
          newotp[index]=value.substring(value.length-1);
          setotp(newotp);
          return    
        }
        if(index>0 && inputRefs.current[index-1])
        {
          
          const newotp=[...otp];
          newotp[index]=value.substring(value.length-1);
          setotp(newotp);
            inputRefs.current[index-1].focus()
        
            return
        }
      }
      if(isNaN(value) || value.length==0)
      {
        
       
        return;
      }
      const newotp=[...otp];
      newotp[index]=value.substring(value.length-1);
      setotp(newotp);
      if(index+1<otp.length)
      {
        console.log("i am",otp[index],)
        inputRefs.current[index+1].focus()
      }
       }
       const hassent=(ph)=>{
        setsent(true); 
        handleotp(ph)
       }
     
      return (
        <div className='h-screen w-screen bg-gradient-to-tr from-blue-400 via-purple-400 via-purple-600 flex items-start justify-center'>
          {!sent&& <PhoneInput hassend={hassent}/>} 
          {sent&&<div className='bg-white m-6 h-[50%] w-[50%] mt-60 flex  flex-col justify-center items-center p-3 mt-36 rounded-xl '><div className='flex'>{otp.map((ele,i)=><div key={i}><input  className=' text-center h-10 w-10 m-5 bg-slate-400' value={ele} ref={(ref)=>{inputRefs.current[i]=ref}} onChange={(e)=>handlechange(e,i)}/> </div>)}</div>
           <button className='bg-gradient-to-tr from-blue-400 via-purple-400 via-purple-600 rounded-xl h-14 w-40 rounded-xl text-white' onClick={verify} >Verify</button>
          </div>
          
          
          
          
          }
          {scc&&<div>{scc.toString()}</div>}
        
        </div>
      )
    
}

export default LohwP

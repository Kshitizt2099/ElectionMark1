import React, { useState } from 'react'

const PhoneInput = ({hassend}) => {
     const[number,setnumber]=useState("")
    return (
        <div className='bg-white m-6 h-[50%] w-[50%] mt-52 flex flex-col justify-center items-center p-3  rounded-xl '>
           <input type='text' className='h-10 w-60 border-black rounded-xl bg-slate-200 p-3' onChange={(e)=>{setnumber(e.target.value)}}/>
           <button className='h-10 w-40 bg-gradient-to-tr from-blue-400 via-purple-400 via-purple-600 rounded-xl ml-4 mt-4 text-white' onClick={()=>{hassend(number)}}>Send Otp</button>
        </div>
      )
}

export default PhoneInput
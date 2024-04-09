import React, { useContext, useEffect, useState } from 'react'
import UserCard from './UserCard/UserCard';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const[Users,setUsers]=useState([]);
    const [selected,setadded]=useState(false);
    
    useEffect(() => {
fetch("http://localhost:4500/AllUsers").then((e)=>(e.json())).then((res)=>{
  setUsers(res);
}).catch((err)=>{
  console.error(err);

})
  
    
      return () => {
        
      }
    }, [])
   const Added =(added)=>{
      if(added)
      {
         setadded(true);
         setTimeout(()=>{setadded(false)},2000);
      }
 
       
   }
  return (
    <div>
      <Link to="/CreateElection">Back</Link>
        {Users.map((i)=><UserCard name={i.name} Aadhar={i.Aadhar} email={i.email} added={Added}/>)}
      {selected&&<div class="alert alert-danger" role="alert">
        User has been added
</div>}
      
    </div>
  )
}

export default UsersList
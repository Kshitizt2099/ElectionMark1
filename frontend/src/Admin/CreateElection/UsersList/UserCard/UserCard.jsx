import React, { useContext } from 'react'
import './UserCard.css'
import { userContext } from '../../../../App';


const UserCard = ({name,Aadhar,email,added}) => {
  const {Eusers,SetEusers}=useContext(userContext);
  return (
    <div className='Card'>
       <div>{name}</div>
       
       <div>{Aadhar}</div>

       <div>
         <button onClick={()=>{

            const dataFormat={
              name,
              Aadhar,
              email,
              Voted:false
            }
            added(true);
            SetEusers([...Eusers,dataFormat]);


         }}>
           Add the User
         </button>

       </div>
    </div>
  )
}

export default UserCard
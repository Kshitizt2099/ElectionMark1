// useAuth.js
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthAdmin = () => {
    
  const [admin, setAdmin] = useState(null);
  const navigate=useNavigate();
    const auth=()=>{
        
        const token=localStorage.getItem("token");
   

    axios.get("http://localhost:4500/AdminDetails", {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      const result = response.data;
      console.log(result);
      setAdmin(result.Admin);
    })
    .catch(error => {
     
      if (error.response && error.response.status === 401) {
        navigate("/AdminLogin");
      }
    });
    }
  useEffect(() => {
      auth();
  }, [navigate]);

  return {admin};
};


const GetAllelections=()=>{
  const [elections,setElections]=useState([]);
   const asynccall=async()=>{
   
    await axios.get("http://localhost:4500/getElections",{
            headers:{
             Authorization:localStorage.getItem("token")
            }
          }).then(res=>{ setElections(res.data.allelections)}).catch((err)=>{
               console.log('Unable to get elections');
          })
  
   }   
   
   useEffect(()=>{
    asynccall();
   },[elections])
   return {elections}
}

export {AuthAdmin,GetAllelections};


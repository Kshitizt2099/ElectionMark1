
const jwt=require("jsonwebtoken");
const {AdminModel}=require('../config/mongoose');

exports.CreateAdmin=async(req,res)=>{
    const {email,password}=req.body;
     
    const Admin=await AdminModel.findOne({email,password});
    if(Admin)
    {
        return res.status(401).send({error:"Admin Already exists"});
    }
    await AdminModel.create({email,password});
    return res.status(201).send({error:"Admin Created Mr.Stark"});



}

exports.adlogin=async(req,res)=>{
    const{email,password,type}=req.body;
    const Admin=await AdminModel.findOne({email,password});
    
    if(!Admin)
    {
            
        return res.status(404).send({error:"Admin Does not exist"});
    
    
    }

            const token=jwt.sign( {
            
                email,
                type
              },
              'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
              {
                expiresIn: '1h',
              }
    )
            return res.status(201).send({token});
    
  
}

exports.AdminDetails=async(req,res)=>{
    const payload=req.payload;
    delete req.payload

    const Admin=await AdminModel.findOne({email:payload.email}).lean();
   
    if(!Admin)
    {
        return res.status(401).send({error:"No User has been detected"});
    }
    delete Admin.password
    
    return res.status(201).send({Admin});


}
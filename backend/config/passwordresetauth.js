
const jwt=require("jsonwebtoken");

exports.passAuth=(req,res,next)=>{
    //1. getting the Token
    
    let token=req.headers['authorization'];
    //2.Token does not exist
    
    token=token==='null'||undefined?null:token;
    if(!token )
    {
        
        return res.status(401).send({error:'Token does not exist '});
    }
    //3.Verifying the token details
     //getting payload
     try {
        const payload=jwt.verify(token,'ssWpfIh6MM')
       req.payload=payload;
        
        
        
     } catch (error) {
        //4. Token coulde be invalid , token could be expired , or modified
        
       return res.status(401).send({error:'Token Issue has come'});
     }
   
   
   
    //if everything is fine
    res.status(201).send({msg:"All good"});
    next();
    
}
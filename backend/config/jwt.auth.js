
const jwt=require("jsonwebtoken");

exports.jwtAuth=(req,res,next)=>{
    //1. getting the Token
    
    let token=req.headers['authorization'];
    //2.Token does not exist
    
    token=token==='null'||undefined?null:token;
    if(!token )
    { 
       
        return res.status(401).send({error:'Unauthorized Users access from jwt Auth'});
    }
    //3.Verifying the token details
     //getting payload
     try {
        const payload=jwt.verify(token,'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz')
        req.payload=payload;
        
        
        
     } catch (error) {
        //4. Token coulde be invalid , token could be expired , or modified
        
       return res.status(401).send({error:'Wrong User'});
     }
   
   
   
    //if everything is fine
    next();
    
}
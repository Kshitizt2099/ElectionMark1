exports.checkCuser=(req,res,next)=>{
  if(req.payload.type==="User")
  {
     return res.status(401).send({error:"Unauthirized Admin access"})
  }
 
  next();
}
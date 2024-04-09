exports.checkCAdmin=(req,res,next)=>{
    if(req.payload.type==="Admin")
    {
       return res.status(401).send({error:"Unauthirized User access"})
    }
    next();
  }
const {ElectionModel}=require('../config/mongoose');
const nodemailer = require("nodemailer");

let target=[];
exports.CreateElection=async(req,res)=>{
    let {name,Candidates,userslist}=req.body;
    
    // Candidates=JSON.parse(Candidates);
    // userslist=JSON.parse(userslist);

    if (!req.file) {
      return res.status(400).send('No images were uploaded.');
    }
    const{filename}=req.file;
    const Symbol=`http://localhost:4500/uploads/${filename}`;
    Candidates=JSON.parse(Candidates);
    userslist=JSON.parse(userslist);
   
    const Election=await ElectionModel.findOne({name,Candidates,userslist,Symbol});
    
    if(Election)
    {
        return res.status(401).send({error:"Election Already exists"});
    }
    await ElectionModel.create({name,Candidates,userslist,Symbol,Status:"Going On"});
    return res.status(201).send({msg:"Election Created Mr.Stark"});
    

}

exports.getElections=async(req,res)=>{
   const allelections=await ElectionModel.find({});
   if(!allelections || allelections.length==0)
   {
     return res.status(201).send("no Elections Found");
   }
    (allelections)
   return res.status(201).send({allelections})
  }


exports.isEligible=async(req,res,next)=>{
  const{_id,adr}=req.query;
  console.log(_id);
  const targetelection=await ElectionModel.findOne({_id});
  if(!targetelection)
  {
    return res.status(401).send({error:"Election Not Found"});

  }
  console.log(targetelection)
  const index=targetelection.userslist.findIndex((user)=>user.Aadhar===adr);
  
  if(index==-1 || targetelection.userslist[index].Voted==true ||targetelection.Status==="Completed")
  {
    if(index==-1)
    {
      return res.status(401).send({error:"You are  Not Eligible for this election"});
    }
   
   
    if(targetelection.userslist[index].Voted==true)
    {
      return res.status(401).send({error:"You have already given a vote"});

    }
    if(targetelection.Status==="Completed")
    {
      return res.status(401).send({error:"This Election Has been Completed"});

    }
    

  }
  

  
   target=targetelection;
  return res.status(201).send({msg:"You are Eligible",adr});
 

}

exports.voting=(req,res)=>{
  
  res.status(201).send({details:target});

}


exports.givenvote=async(req,res)=>
{
  
  let updatedul=target.userslist;
  const adr=req.body.adr;
  let candidates=target.Candidates;
  const index=updatedul.findIndex((user)=>user.Aadhar===adr)
  const v_index=candidates.findIndex((cand)=>cand.name===req.body.party)
if(index!==-1 && v_index!==-1)
{


      const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "kshitijtawra2098@gmail.com",
      pass: "ofkopfedpdzawhvj",
    },
  });
  const date=new Date();
  const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();


  const output=`Thanks for voting for ${req.body.party} party at ${day+"/"+month+"/"+year+" at "+hours+":"+minutes}`
  const email=updatedul[index].email;
 
  const MailOptions=
  {
      // sender address
      from:{
        name:"AlanWake",
        address:"kshitijtawra2098@gmail.com"
      },
      
      to:[email], // list of receivers
      subject: "Voting Receipt", // Subject line
      text: "Voting", // plain text body
      html:output , // html body
     
       
  
      
    
  
      
     }
    
    
  updatedul[index].Voted=true;
  candidates[v_index].votes+=1;
const result=await ElectionModel.findByIdAndUpdate({_id:target._id},{$set:{userslist:updatedul,Candidates:candidates}},{new:true})
if(result)
{
  console.log(target.Candidates);
  transporter.sendMail(MailOptions); 
res.status(201).send({msg:"Email has been sent"})
}

  
}

}  
    

exports.stopElection=async(req,res)=>{
  
   const{_id}=req.query
   const result=await ElectionModel.findByIdAndUpdate({_id},{$set:{Status:"Completed"}},{new:true});
   if(result)
   {
    return res.status(201).send({msg:"Election has been stopped"})
   }
  return  res.status(401).send({error:"Election could not be stopped"})


}
exports.viewElection=async(req,res)=>{
  
  const{_id}=req.query
  
  const result= await ElectionModel.findOne({_id});
  if(result)
  {
   return res.status(201).send({result})
  }
  return res.status(401).send({error:"Election could not be deleted"})


}

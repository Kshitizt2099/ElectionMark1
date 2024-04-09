const {UserModel}=require('../config/mongoose');
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken");
let otpnum="";
exports.CreateUser=async(req,res)=>{
    const {name,email,password,Aadhar,phone}=req.body;
    
    const User=await UserModel.findOne({name,email,password,Aadhar,phone});
    if(User)
    {
        return res.status(401).send({error:"User Already exists"});
    }
    const newUser=await UserModel.create({name,email,password,Aadhar,phone});
    return res.status(201).send({error:"User Created Mr.Stark"});



}
exports.Login=async(req,res)=>{
    const {email,password,type}=req.body;
    const User=await UserModel.findOne({email,password});
    if(User)
    {
        const token = jwt.sign(
            {
            
              email: req.body.email,
              type
            },
            'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
            {
              expiresIn: '1h',
            }
          )

       return  res.status(201).send({token});
    
    }
    return res.status(404).send({error:"User does not exist"});


}
exports.userDetails=async(req,res)=>{
    const payload=req.payload;
    delete req.payload
    const User=await UserModel.findOne({email:payload.email}).lean();
    delete User.password
          return res.status(201).send({User});


}
exports.AllUsers=async(req,res)=>{
    
    
    const Users=await UserModel.find({});
       
    if(!Users || Users.length==0)
    {
        return res.status(401).send("No Users Found"); 
    }
    return res.status(201).send(Users);
    



}

exports.forgetPassword=async(req,res)=>{
   const {email}=req.body;
   try {
    const exist=await UserModel.findOne({email});
    if(!exist)
    {
        return res.status(404).json({err:"User Does not exist"});
    }
    const transporter=nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "kshitijtawra2098@gmail.com",
          pass: "ofkopfedpdzawhvj",
        },
      });
      const output="http://localhost:3000/Reset_Password <br/> Click on this to reset your password"  ;
      const MailOptions=
      {
          // sender address
          from:{
            name:"AlanWake",
            address:"PhoenixElectionPortal@gamil.com"
          },
          
          to:email, // list of receivers
          subject: "Forget Password", // Subject line
          text: "Reset your password", // plain text body
          html:output , // html body
         
           
      
          
        
      
          
         }

         const temp_token = jwt.sign(
            {
            
              email: req.body.email,
              
            },
            'ssWpfIh6MM',
            {
              expiresIn: '5m',
            }
          )
       transporter.sendMail(MailOptions);
       return  res.status(201).send({token:temp_token,msg:"Mail has been sent"});
      
    
   } catch (error) {
      console.log(error);
       return res.status(500).json({err:"Server Issue has come"});
   }
  
}

exports.ResetPassword=async(req,res)=>{
    
    const{email}=req.payload
    const {password}=req.body;
    const User=await UserModel.findOne({email});
       
    if(!User)
    {
        return res.status(401).send("No Users Found"); 
    }
    try {
      await UserModel.findOneAndUpdate({email},{$set:{password}});

      
    } catch (error) {
      return res.status(500).send({error:"Server has come"});   
    }
    
    



}
exports.ResetPasswordpatch=async(req,res)=>{
    
    
  
  const Users=await UserModel.find({});
     
  if(!Users || Users.length==0)
  {
      return res.status(401).send("No Users Found"); 
  }
  return res.status(201).send(Users);
  



}

exports.sendOtp=async(req,res)=>{
  const phone=req.body.phone;

  const phonedata=await UserModel.findOne({phone});
  if(!phonedata)
  {
    return res.status(401).json({err:"User Does not exist"})
  }



  const sendOTP = async (recipient) => {
    const accountSid = "AC8acc43c88cf2dcb66864a0103cec833d";
const authToken = "3eb2ca83e56fdea289a14eb531d5edb9";
const verifySid = "VA51ac6f2cfed099139443d0b7f32623b5";
const client = require("twilio")(accountSid, authToken);
    try {
      client.verify.v2
    .services(verifySid)
    .verifications.create({ to: recipient, channel: "sms" })
    .then((verification) => console.log(verification))
     
    } catch (error) {
      console.error('Error sending OTP');
    }
  };
  
  // Usage
  const recipientNumber = '+91'+phone; // Recipient's phone number
  otpnum=phone;
  
  sendOTP(recipientNumber);
  

}

exports.verifyOtp=async(req,res)=>{
  
  const accountSid = "AC8acc43c88cf2dcb66864a0103cec833d";
  const authToken = "3eb2ca83e56fdea289a14eb531d5edb9";
  const verifySid = "VA51ac6f2cfed099139443d0b7f32623b5";
  const client = require("twilio")(accountSid, authToken);
const {code}=req.query;    
console.log(code)
const getVerificationCode = async () => {
try {
  const verification = await client.verify.v2
  .services(verifySid)
    .verificationChecks
    .create({ code: code, to: '+919667616063'});
  console.log('Verification status:', verification.status);

  if (verification.status === 'approved') {
    console.log("jai ho mere otp wala goat");
    const User=await UserModel.findOne({phone:otpnum});
    console.log(otpnum)
    if(User)
    {
        const token = jwt.sign(
            {
            
              email: User.email,
              type:"User"
            },
            'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
            {
              expiresIn: '1h',
            }
          )

       return  res.status(201).send({token});
    
    }
    return res.status(404).send({error:"User does not exist"});

    } else {
      return res.status(401).send({msg:"Not Good"})
  }
} catch (error) {
  return res.status(500).send({msg:"Server Issue"})

}
}
getVerificationCode();
}
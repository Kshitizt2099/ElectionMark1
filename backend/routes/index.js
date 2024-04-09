const express=require('express');
const router=express.Router();
const {CreateUser,AllUsers, Login, userDetails, forgetPassword, ResetPassword, sendOtp, verifyOtp}=require('../controllers/UserController')
const {CreateElection,getElections,isEligible,voting, givenvote, stopElection,delElection, viewElection}=require('../controllers/ElectionController');
const {adlogin,CreateAdmin,AdminDetails}=require('../controllers/AdminController')
const { jwtAuth } = require('../config/jwt.auth');
const { checkCuser } = require('../config/userType');
const { checkCAdmin } = require('../config/Admintype');
const{passAuth}=require('../config/passwordresetauth');
const {upload}=require('../config/multer');

router.get("/",(req,res)=>{
    res.send("working Mr.Stark");
})
//UserControllers
router.get("/AllUsers",AllUsers)
router.post("/register",CreateUser);
router.post("/Login",Login);
router.patch("/forgetPassword",forgetPassword);
router.post("/sendOtp",sendOtp);
router.post("/verify",verifyOtp);
router.patch("/resetP",passAuth,ResetPassword);
router.get("/Details",jwtAuth,checkCAdmin,userDetails);
//Elections Controller
router.post("/ElectionCreator",jwtAuth,checkCuser,upload.single('image'),CreateElection);
router.get("/getElections",jwtAuth,getElections);
router.get("/iseligible",jwtAuth,checkCAdmin,isEligible);
router.get("/voting",jwtAuth,checkCAdmin,voting);
router.put("/givenvote",jwtAuth,checkCAdmin,givenvote);
router.put("/stopElection",jwtAuth,checkCuser,stopElection);
router.get("/viewElection",jwtAuth,checkCuser,viewElection);

//Admin
router.post("/Adlogin",adlogin);
router.post("/CreateAdmin",jwtAuth,checkCuser,CreateAdmin);
router.get("/AdminDetails",jwtAuth,checkCuser,AdminDetails);


module.exports=router
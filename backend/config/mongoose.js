const mongoose=require("mongoose");
const url=`mongodb://127.0.0.1:27017/Electionsmk83`
exports.connectoddb=()=>{
    mongoose.connect(url).
    then((e)=>{
        console.log(`connected to ${e.connection.host}`)  
    }).catch((err)=>{
        console.log(err);
    })
}


const UserSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true,


    },
    Aadhar:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        require:true
    },
    password:String

    

})

const AdminScehema=new mongoose.Schema({
    email: {
        type: String,
        unique: true // Ensure uniqueness for email field
    },
    password:String
})

exports.AdminModel=new mongoose.model("Admin",AdminScehema);

exports.UserModel=new mongoose.model("Users",UserSchema);

const ElectionSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    Candidates:[],
    userslist:[],
    Symbol:String,
    Status:String,
   

})

exports.ElectionModel=new mongoose.model("Elections",ElectionSchema);


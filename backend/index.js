const express=require('express');
const server=express();
const {connectoddb}=require('./config/mongoose')
const cors=require('cors');
//to get the data from the form
//for the cors

server.use(cors());
server.use(express.json());
server.use("/uploads",express.static('./config/storage/uploads'));
//server.use(express.urlencoded({extended:true}));
//server.use(express.json())

server.use(require('./routes'));

server.listen(4500,()=>{
    connectoddb();
    console.log("it is working at http://localhost:4500/");
})

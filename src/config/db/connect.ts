import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


// if(!process.env.MONGO_URL){
//     throw new Error("No connection between database ")
// }


let connect= process.env.MONGO_URL||"mongodb://mongodb-service:27017/Al-Midan"

//"mongodb://localhost:27017/Al-Midan"
const connectDb =  mongoose.connect(connect)
.then(()=>console.log("Mongodb Conencted Successfully"))
.catch((e)=>console.log("Mongodb Connection Failed",e));

export default connectDb;


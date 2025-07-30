import mongoose from "mongoose"
const ConnectDb=async()=>{
    mongoose.connection.on("connected",()=>{
        console.log("database connected succesfully")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}

export default ConnectDb;
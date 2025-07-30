import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDb from "./configs/database.js"
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT=process.env.PORT || 4000;
const app=express();
app.use(express.json());
app.use(cors())
await ConnectDb()
app.use("/user",userRouter)
app.use("/image",imageRouter)


 
    app.listen(PORT, () => {
      console.log("server connected succesfully on "+ PORT);
    });
  
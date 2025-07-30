import axios from "axios"
import userModel from "../models/userModel.js"
import FormData from "form-data"


export const generateImage=async(req,res)=>{
    try {
       const { prompt } = req.body;
const userid = req.userId;

        const user=await userModel.findById(userid)
        if(!user || !prompt){
            return res.json({success:false,message:"Missing Details"})
        }
        if(user.CreditBalance===0 || userModel.CreditBalance<0){
            return res.json({success:false,message:"No Credit Balance",CreditBalance:user.CreditBalance})
        }

        const formdata=new FormData()
        formdata.append("prompt",prompt)
      const {data}=  await axios.post("https://clipdrop-api.co/text-to-image/v1",formdata,{
            headers: {
    'x-api-key': process.env.CLIPDROP_API
  },
  responseType:"arraybuffer"
        })
        const base64Image=Buffer.from(data,"binary").toString("base64")
        const resultImage= `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{CreditBalance:user.CreditBalance-1})
        res.json({success:true,message:"Image Generated",CreditBalance:user.CreditBalance-1,resultImage})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
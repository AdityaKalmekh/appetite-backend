import express from "express"
import cors from "cors"
import tiffin from "./api/tiffin.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/Tiffin",tiffin)
app.use("*",(req,res)=>res.status(404).json({error:"not found"})) 

export default app
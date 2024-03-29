import e from "express";
import SignupDAO from "../dao/signupDAO.js";

export default class SignupController {
    static async apiAddUser(req,res,next){
        try {
            const response = await SignupDAO.addUser(req.body)
            if (response.insertedId){
                res.json(response.insertedId)
            }else{
                res.json(response)
            }
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }

    static async apicheckUserExistance(req,res,next){
        try {
            const response = await SignupDAO.checkUserExistance(req.body)
            console.log(response);
            res.json(response)
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }
}
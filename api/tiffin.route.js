import express from "express"
import SignupController from "../controllers/signup.controller.js";

const router = express.Router();
router.route("/addUser").post(SignupController.apiAddUser)
router.route("/checkUser").post(SignupController.apicheckUserExistance)

export default router 
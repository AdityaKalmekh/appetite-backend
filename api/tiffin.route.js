import express from "express"
import SignupController from "../controllers/signup.controller.js";
import SupplierController from "../controllers/supplier.controller.js";
import PaymentController from "../controllers/payment.controller.js";
import MenuController from "../controllers/menu.controller.js";

const router = express.Router();
router.route("/addUser").post(SignupController.apiAddUser)
router.route("/verifyUser").post(SignupController.apicheckUserExistance)

router.route("/addSupplierDetail").post(SupplierController.apiAddDetail)
router.route("/getSupplierDetails").get(SupplierController.apiGetDetails)

router.route("/payment").post(PaymentController.apiPayment)
router.route("/paymentverification").post(PaymentController.apiPaymentVerification)

router.route("/addMenu").post(MenuController.apiAddMenu)
router.route("/getMenu").get(MenuController.apiGetMenu)
router.route("/editMenu").put(MenuController.apiEditMenu)

export default router 
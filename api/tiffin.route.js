import express from "express"
import SignupController from "../controllers/signup.controller.js";
import SupplierController from "../controllers/supplier.controller.js";
import PaymentController from "../controllers/payment.controller.js";
import MenuController from "../controllers/menu.controller.js";
import LocationController from "../controllers/location.controller.js";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();
router.route("/addUser").post(SignupController.apiAddUser)
router.route("/verifyUser").post(SignupController.apicheckUserExistance)

router.route("/addSupplierDetail").post(SupplierController.apiAddDetail);
router.route("/getSupplierDetails").get(SupplierController.apiGetDetails);
router.route("/getSupplierDetails/:id").get(SupplierController.apiGetById);
router.route("/updateSupplierDetails").put(SupplierController.apiUpdateDetails);

router.route("/payment").post(PaymentController.apiPayment)
router.route("/paymentverification").post(PaymentController.apiPaymentVerification)

router.route("/addMenu").post(MenuController.apiAddMenu)
router.route("/getMenu").get(MenuController.apiGetMenu)
router.route("/editMenu").put(MenuController.apiEditMenu)
router.route("/deleteMenu").delete(MenuController.apiDeleteMenu)
router.route("/getMenu/:id").get(MenuController.apiGetMenuId)

router.route("/addLocation").post(LocationController.apiAddLocation);
router.route("/getLocation/:id").get(LocationController.apiGetLocation);
router.route("/getByCurrentLocation/:log/:lat").get(LocationController.apiGetSupplierByCurrentLocation);
router.route("/updateLocation").put(LocationController.apiUpdateLocation);

router.route("/addOrder").post(OrderController.apiAddOrder);

export default router 
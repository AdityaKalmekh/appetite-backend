import Razorpay from "razorpay";
import crypto from "crypto"
let amount;
import PaymentDao from "../dao/paymentDAO.js";
import OrderDAO from "../dao/orderDAO.js";
import { log } from "console";

export default class PaymentController {
    static async apiPayment(req,res,next) {
        amount = parseInt(req.body.amount);
        try{
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_API_KEY,
                key_secret: process.env.RAZORPAY_API_SECRET
            });
            const options = {
                amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
                currency: "INR",
            };
            const order = await instance.orders.create(options)
            res.json({
                success : true,
                order
            })
        } catch (error) {
           console.log(error); 
        }
    }

    static async apiPaymentVerification(req,res,next) {
        try{
            const {razorpay_payment_id,razorpay_order_id,razorpay_signature,
                    supplierId,quantity,userId,total,menuList} = req.body;


            let body = razorpay_order_id + "|" + razorpay_payment_id;

            var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                    .update(body.toString())
                                    .digest('hex');

            const isAuthentic = expectedSignature === razorpay_signature;
            
            if (isAuthentic){
                const response = await PaymentDao.addPayment({amount,razorpay_order_id,razorpay_payment_id})
                const orderAck = await OrderDAO.addOrder({supplierId,quantity,userId,total,menuList})
                if (response.acknowledged && orderAck.acknowledged){
                    // res.redirect(
                    //     `http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`
                    // )
                    res.json({success : true})
                }
                else{
                    res.status(400).json({
                        success : false
                    })
                }
            }else{
                res.status(400).json({
                    success : false
                })
            }
            console.log(req.body);
        } catch (error) {
           console.log(error); 
        }
    }
}
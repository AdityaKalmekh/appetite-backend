import OrderDAO from "../dao/orderDAO.js";

export default class OrderController {
    static async apiAddOrder(req,res,next){
        try {
            const response = await OrderDAO.addOrder(req.body);
            res.json(response.acknowledged)
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }
}
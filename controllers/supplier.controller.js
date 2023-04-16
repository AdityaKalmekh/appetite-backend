import SupplierDAO from "../dao/supplierDAO.js";

export default class SupplierController {
    static async apiAddDetail(req,res,next){
        try {
            const response = await SupplierDAO.addDetails(req.body)
            res.json(response.acknowledged)
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetDetails(req,res,next){
        try {
            const data = await SupplierDAO.getDetails();
            console.log(data);
            // let response = {
            //     data
            // }    
            res.json(data)
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }
}
import SupplierDAO from "../dao/supplierDAO.js";

export default class SupplierController {
    static async apiAddDetail(req,res,next){
        try {
            const response = await SupplierDAO.addDetails(req.body);
            res.json(response.acknowledged);
        } catch (error) {
            res.status(500).json({error:e.message});
        }
    }
    static async apiGetDetails(req,res,next){
        try {
            const data = await SupplierDAO.getDetails();
            res.json(data);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }

    static async apiGetById(req,res,next){
        // console.log(req.params.id);
        const supplierId = req.params.id;
        try {
            const response = await SupplierDAO.getById(supplierId);
            res.json(response);        
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }

    static async apiUpdateDetails(req,res,next){
        try {
            const response = await SupplierDAO.updateDetails(req.body);
            res.json(response.acknowledged);    
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }
}
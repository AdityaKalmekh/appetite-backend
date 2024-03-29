import LocationDAO from "../dao/locationDAO.js";

export default class LocationController {
    static async apiAddLocation(req,res,next){
        try {
            const response = await LocationDAO.addLocation(req.body);
            res.json(response)
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    }

    static async apiGetLocation(req,res,next){
        try {
            const response = await LocationDAO.getLocation(req.params.id);
            res.json(response);
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    static async apiUpdateLocation(req,res,next){
        // console.log(req.body);
        try {
            const response = await LocationDAO.updateLocation(req.body);
            res.json(response.acknowledged);
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    static async apiGetSupplierByCurrentLocation(req,res,next){
        const longitude = parseFloat(req.params.log);
        const latitude = parseFloat(req.params.lat);
        try {
            const response = await LocationDAO.getSupplierByCurrentLocation(longitude,latitude);
            res.json(response);
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}
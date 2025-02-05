import MenuDAO from "../dao/menuDAO.js";

export default class MenuController {
    static async apiAddMenu(req,res,next){
        try {
            const response = await MenuDAO.addMenu(req.body)
            res.json(response.insertedId)
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }

    static async apiGetMenu(req,res,next){
        try {
            const response = await MenuDAO.getMenu()
            res.json(response)
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }

    static async apiEditMenu(req,res,next){
        try {
            // console.log(req.body);
            const response = await MenuDAO.editMenu(req.body);
            res.json(response.acknowledged);
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }

    static async apiDeleteMenu(req,res,next){
        // console.log(req.query.id);
        try {
            const response = await MenuDAO.deleteMenu(req.query.id);
            res.json(response.acknowledged);
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }

    static async apiGetMenuId(req,res,next) {
        try {
            const response = await MenuDAO.getMenuById(req.params.id);
            res.json(response);
        } catch (error) {
            res.status(500).json({error:e.message})
        }
    }
}
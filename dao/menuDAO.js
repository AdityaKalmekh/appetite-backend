import mongodb from "mongodb"
let menu;
const ObjectId = mongodb.ObjectId

export default class MenuDAO {
    static async injectDB(conn){
        if (menu){
            return 
        }else{
            try {
                menu = await conn.db(process.env.RESTREVIEWS_NS).collection("Menu_Collection")
            }
            catch(e){
                console.error(`Unable to establish a collection handle in menuDAO: ${e}`);
            }
        }
    }

    static async addMenu(data){
        try {
            return await menu.insertOne(data);
        } catch (error) {
            console.error(`Unable to add data: ${error}`);
            return {error: error};
        }
    }

    static async getMenu(){
        let cursor;
        try {
            cursor = await menu.find();
        } catch (error) {
            console.error(`Unable to get data: ${error}`);
            return {error: error};
        }

        try {
            const menuData = cursor.toArray();
            return menuData;
        } catch (error) {
            console.error(`Unable to convert to array ${error}`);
        }
        return {menuData:[]};
    }
    
    static async editMenu(data) {
        try {
            return await menu.updateOne(
                {_id : new ObjectId(data._id)},
                {
                    $set : {foodtypes:data.foodtypes,foodoption:data.foodoption,
                    tifinprice:data.tifinprice,packagingcharge:data.packagingcharge,
                    foodtime:data.foodtime,tifindescription:data.tifindescription}
                })
        } catch (error) {
            console.error(`Unable to edit data: ${error}`);
            return {error: error};
        }
    }

    static async deleteMenu(data){
        try {
            return await menu.deleteOne({_id : new ObjectId()})
        } catch (error) {
            console.error(`Unable to delete data: ${error}`);
            return {error: error};
        }
    }
}
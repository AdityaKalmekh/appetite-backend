import { ObjectId } from "mongodb";

let supplier;
export default class SupplierDAO {
    static async injectDB(conn){
        if (supplier){
            return 
        }else{
            try {
                supplier = await conn.db(process.env.RESTREVIEWS_NS).collection("Supplier_Collection")
            }
            catch(e){
                console.error(`Unable to establish a collection handle in studentDAO: ${e}`);
            }
        }
    }

    static async addDetails(data){
        try {
            return await supplier.insertOne({...data,supplier_id:new ObjectId(data.supplier_id) })
        } catch (error) {
            console.error(`Unable to add data: ${error}`);
            return {error: error};
        }
    }

    static async getDetails(){
        let cursor;
        try {
            cursor = await supplier.find()
        } catch (error) {
            console.error(`Unable to get supplier data,${error}`);
        return { supplier:[]};
        }

        try{
            const supplier = await cursor.toArray();
            return supplier;
        }catch(e){
            console.error(`Unable to convert to array ${e}`);
        }
        return {data:[]};
    }

    static async getById(supplierId){
        let cursor;
        try {
            cursor = await supplier.find({supplier_id: new ObjectId(supplierId)})
            try {
                const suppliertData = Object.assign({},await cursor.toArray());
                return suppliertData[0];
                // return suppliertData;
            } catch (error) {
                console.error(`Unable to convert to array ${error}`);
            }
        } catch (error) {
            console.error(`Unable to get supplier data,${error}`);
            return { supplierData:[]};
        }
    }

    static async updateDetails(data){

       const id = data._id;
       delete data._id;
       data.supplier_id =  new ObjectId(data.supplier_id);
    //    delete data.supplier_id;
        try {
            return await supplier.updateOne(
                {_id : new ObjectId(id)},
                {
                    $set : data
                }
            )
        } catch (error) {
            console.error(`Unable to edit data: ${error}`);
            return {error: error};
        }
    }
}
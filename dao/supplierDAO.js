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
            return await supplier.insertOne(data)
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
            return supplier
        }catch(e){
            console.error(`Unable to convert to array ${e}`);
        }
        return {data:[]};
    }
}
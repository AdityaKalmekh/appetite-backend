let order;

export default class OrderDAO {
    static async injectDB(conn){
        if (order){
            return 
        }else{
            try {
                order = await conn.db(process.env.RESTREVIEWS_NS).collection("Orders_collection");
            }
            catch(e){
                console.error(`Unable to establish a collection handle in studentDAO: ${e}`);
            }
        }
    }

    static async addOrder(data){
        try {
            return await order.insertOne(data); 
        } catch (error) {
            console.error(`Unable to add order data: ${error}`);
            return error;
        }
    }
}
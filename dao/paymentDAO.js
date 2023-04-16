let payment

export default class PaymentDao {
    static async injectDB(conn){
        if (payment){
            return 
        }else{
            try {
                payment = await conn.db(process.env.RESTREVIEWS_NS).collection("Payment_Collection")
            }
            catch(e){
                console.error(`Unable to establish a collection handle in studentDAO: ${e}`);
            }
        }
    }
    static async addPayment(data){
        // console.log(data);
        try {
            return await payment.insertOne(data)
        } catch (error) {
            console.error(`Unable to add data: ${error}`);
            return {error: error};
        }
    } 
}
import mongodb from "mongodb"
let location;
let supplier;
const ObjectId = mongodb.ObjectId

export default class LocationDAO {
    static async injectDB(conn){
        if (location){
            return 
        }else{
            try {
                location = await conn.db(process.env.RESTREVIEWS_NS).collection("Location_Collection");
                supplier = await conn.db(process.env.RESTREVIEWS_NS).collection("Supplier_Collection");
            }
            catch(e){
                console.error(`Unable to establish a collection handle in studentDAO: ${e}`);
            }
        }
    }

    static async addLocation(data){
        try {
            return await location.insertOne({...data,supplier_id:new ObjectId(data.supplier_id)});
        } catch (error) {
            console.error(`Unable to add data: ${error}`);[]
            return {error: error};
        }
    }

    static async getLocation(supplierId){
        let cursor;
        try {
            cursor = await location.find({supplier_id : new ObjectId(supplierId)});
            try {
                const locationData = Object.assign({},await cursor.toArray());
                return locationData[0];
            } catch (error) {
                console.error(`Unable to convert to array ${error}`);
            }
        } catch (error) {
            console.error(`Unable to fetch location data,${error}`);
            return {locationData:[]};
        }
    }

    static async updateLocation(data){
        console.log({data});
        const id = data._id;
        delete data._id;
        data.supplier_id =  new ObjectId(data.supplier_id);
        return await location.updateOne(
            {_id : new ObjectId(id)},
            {
                $set : data
            }
        )
    }

    static async getSupplierByCurrentLocation(longitude,latitude){
        const pipline = [
            {
                $geoNear: {
                    near: {type:"Point",coordinates:[longitude,latitude]},
                    distanceField: 'distance',
                    maxDistance : 2000,
                    spherical : true,
                }
            },
            {
                $group : {
                    _id : null,
                    id : {$push : "$supplier_id"}
                }
            },
            {
                $project : {
                    _id : 0
                }
            }
        ]

        const supplierIds = await location.aggregate(pipline).next();
        if (supplierIds.id.length > 0){
            const supplierData = await supplier.find({supplier_id : {$in : supplierIds.id}}).toArray();
            return supplierData; 
        }else {
            return [];
        }
        // return supplierIds.id;   
    }
}
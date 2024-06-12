import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import SignupDAO from "./dao/signupDAO.js"
import SupplierDAO from "./dao/supplierDAO.js"
import PaymentDao from "./dao/paymentDAO.js"
import MenuDAO from "./dao/menuDAO.js"
import LocationDAO from "./dao/locationDAO.js"
import OrderDAO from "./dao/orderDAO.js"
import ReviewDAO from "./dao/ReviewDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        wtimeoutMS: 5000,
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1)
    })
    .then(async client => {
        OrderDAO.injectDB(client);
        LocationDAO.injectDB(client);
        SignupDAO.injectDB(client);
        SupplierDAO.injectDB(client);
        PaymentDao.injectDB(client);
        MenuDAO.injectDB(client);
        ReviewDAO.injectDB(client);
        app.listen(port, ()=> {
            console.log(`listening on port ${port}`);
        })
    })
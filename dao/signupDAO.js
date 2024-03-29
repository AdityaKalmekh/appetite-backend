let signup;
const accountSid = 'AC4a123edfa2432fc081932ed4f50040a2'; // Your Account SID from www.twilio.com/console
const authToken = 'c78b4a4677577f64df1f997e510b338f'; // Your Auth Token from www.twilio.com/console
import twilio from "twilio"

export default class SignupDAO{
    
    static async injectDB(conn){
        if (signup){
            return 
        }else{
            try {
                signup = await conn.db(process.env.RESTREVIEWS_NS).collection("Signup")
            }
            catch(e){
                console.error(`Unable to establish a collection handle in studentDAO: ${e}`);
            }
        }
    }

    static async addUser(data){
        console.log(data);
        try {
            return await signup.insertOne({"phonenumber":data.values.phonenumber,
                                           "name":data.values.username,
                                           "email":data.values.email,
                                           "role": data.values.role})
        } catch (error) {
            console.error(`Unable to add data: ${error}`);
            return {error: error};
        }
    }


    static async checkUserExistance(data){
        console.log(data);
        // const cursor = await signup.find({email : data.email, phoneNo: data.phoneNo}).limit(1).hasNext();
        const client = twilio(accountSid, authToken);
        // const cursor = await signup.find({ phonenumber: data.phonenumber}).limit(1).hasNext();
        const cursor = await signup.find({ phonenumber: data.phonenumber}).project({_id : 1,role:1}).limit(1).toArray();
        // console.log(cursor[0]._id);

        if ((cursor.length > 0 && data.for === "login") || (cursor <= 0 && data.for === "signup")){
            let otp = Math.floor(Math.random() * 900000) + 100000;
            if (data.phonenumber === 7984064532){
                client.messages
                .create({
                    body: `${otp} is the OTP to login to your Tiffin Service account.`, 
                    to: `+91${data.phonenumber}`, // Text this number
                    from: '+12708187942', // From a valid Twilio number
                })
                .then(() => {return otp},(e) => {console.error("THat's not work",e)})
                .catch(error => console.log(error))
            }
            // return otp
            return cursor.length<=0 ? otp : [otp,cursor[0]._id,cursor[0].role];
        }else{
            return false;
        }
    }

    static async verifyUserLogin(data){

    }

    static async 
}
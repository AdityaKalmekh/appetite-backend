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
        console.log({data});
        
        const cursor = await signup.find({email : data.email}).limit(1).hasNext();
        
        if (cursor){
            return cursor
        }else{
            try {
                return await signup.insertOne(data)
            } catch (error) {
                console.error(`Unable to delete data: ${error}`);
                return {error: error};
            }
        }
    }

    static async returnOtp(otp){
        console.log(otp);
        // return otp
    }

    static async checkUserExistance(data){
        const cursor = await signup.find({email : data.email, phoneNo: data.phoneNo}).limit(1).hasNext();
        const client = twilio('AC4a123edfa2432fc081932ed4f50040a2', 'c78b4a4677577f64df1f997e510b338f');
        if (cursor){
            return cursor
        }else{
            let otp = Math.floor(Math.random() * 900000) + 100000;
            client.messages
            .create({
                body: `${otp} is the OTP to login to your Tiffin Service account.`, 
                to: `+91${data.phoneNo}`, // Text this number
                from: '+12708187942', // From a valid Twilio number
            })
            .then((message) => {if (message.sid){
                return otp
            }},(err) => {console.log(err)})
            .catch(error => console.log(error))
    
            return otp
        }
    }
}
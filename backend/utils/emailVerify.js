import config from '../config/config.js';
import axios from 'axios';

export default async function emailVerify({email}) {
        
        if(!email){
          throw new Error("Email is required"); // throw error if email is not given
        }

        // send api request to verify email address
        const response = await axios.get('http://apilayer.net/api/check',{
          params: {
            access_key: config.email_verify_api,
            email: email,
          }

        })
        
        const data = response.data; // store json response in data

        // check whether email is verified or not
        if(data.smtp_check){
          return true;  // if true return true
        }

        return false; // else false
}
import config from '../config/config.js';
import axios from 'axios';

export default async function emailVerify({email}) {
    
        if(!email){
            throw new Error("Email is required");
        }

        const response = await axios.get('https://api.emaillistverify.com/api/verifyEmail', {
            params: {
              email: email,
              secret:config.email_verify_api
            }
            
          });

          const data = response.data;

          if(data==="ok"){
            return true;
          }

          return false;
          
}
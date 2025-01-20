import config from '../config/config.js';
import axios from 'axios';

export default async function emailVerify({email}) {
    
        if(!email){
            throw new Error("Email is required");
        }

        const response = await axios.get('https://api.emaillistverify.com/v1/api/verify', {
            params: {
              email: email,
            },
            headers: {
              'x-api-key': config.email_verify_api, // Include the API key in the header
            },
          });

          const data = response.data;
          return data;
          
    
}
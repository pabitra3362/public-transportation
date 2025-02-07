import { jwtDecode } from 'jwt-decode'
import { getUser } from '../services/auth/userAuth.service';
import { getDriver } from '../services/auth/driverAuth.service';
async function getProfileData ({token}) {

    if(!token.length > 0) return {}
    
    const data = jwtDecode(token)

    try {
        if(data.role == 'user'){
            const user = await getUser({token})
            return {user,token};
        }
        const driver = await getDriver({token})
        return {driver,token}
        
    } catch (error) {
        return {}
        
    }

}


export default getProfileData;
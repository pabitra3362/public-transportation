export const setUserToken = (token, tokenExpiryInHours) => {
  const now = new Date();
  
  const item = {
    token,
    expiry: now.getTime() + tokenExpiryInHours * 60 * 60 * 1000
  }

  localStorage.setItem('userToken',JSON.stringify(item));

}


export const getUserToken = ()=>{
    const itemStr = localStorage.getItem('userToken');

    if(!itemStr) return "";

    const item = JSON.parse(itemStr)

    const now = new Date();

    if(now.getTime() > item.expiry ){
        localStorage.removeItem('token')
        return "";
    }
    

    return item.token
}


export const setDriverToken = (token, tokenExpiryInHours) => {
  const now = new Date();
  
  const item = {
    token,
    expiry: now.getTime() + tokenExpiryInHours * 60 * 60 * 1000
  }

  localStorage.setItem('driverToken',JSON.stringify(item));

}


export const getDriverToken = ()=>{
    const itemStr = localStorage.getItem('driverToken');

    if(!itemStr) return "";

    const item = JSON.parse(itemStr)

    const now = new Date();

    if(now.getTime() > item.expiry ){
        localStorage.removeItem('token')
        return "";
    }
    

    return item.token
}


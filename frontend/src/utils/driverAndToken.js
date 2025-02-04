

// set driver and token to localstorage
export const setDriverAndToken = (driver, tokenExpiryInHours) => {
    const now = new Date();
  
    const item = {
      driver,
      expiry: now.getTime() + tokenExpiryInHours * 60 * 60 * 1000
    }
  
    localStorage.setItem('driver',JSON.stringify(item));
  
}


// get driver and token from localstorage
export const getDriverAndToken = ()=>{
    const itemStr = localStorage.getItem('driver');

    if(!itemStr) return {};

    const item = JSON.parse(itemStr)

    const now = new Date();

    if(now.getTime() > item.expiry ){
        localStorage.removeItem('driver')
        return {}
    }
    

    return item.driver
}

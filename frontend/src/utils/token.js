export const setToken = (token, tokenExpiryInHours) => {
  const now = new Date();
  
  const item = {
    token,
    expiry: now.getTime() + tokenExpiryInHours * 60 * 60 * 1000
  }

  localStorage.setItem('token',JSON.stringify(item));

}


export const getToken = ()=>{
    const itemStr = localStorage.getItem('token');

    if(!itemStr) return "";

    const item = JSON.parse(itemStr)

    const now = new Date();

    if(now.getTime() > item.expiry ){
        localStorage.removeItem('token')
        return "";
    }
    

    return item.token
}

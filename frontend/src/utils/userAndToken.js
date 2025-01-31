export const setUserAndToken = (user, tokenExpiryInHours) => {
  const now = new Date();
  // pura user add kar bhai
  const item = {
    user,
    expiry: now.getTime() + tokenExpiryInHours * 60 * 60 * 1000
  }

  localStorage.setItem('user',JSON.stringify(item));

}


export const getUserAndToken = ()=>{
    const itemStr = localStorage.getItem('user');

    if(!itemStr) return {};

    const item = JSON.parse(itemStr)

    const now = new Date();

    if(now.getTime() > item.expiry ){
        localStorage.removeItem('user')
        return {}
    }
    

    return item.user
}

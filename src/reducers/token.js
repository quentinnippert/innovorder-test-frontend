
export default function(token= '', action) {
    if(action.type === 'GET_TOKEN') {
        const newToken = action.payload
        return newToken;
    } else if (action.type ==='LOGOUT') {
        return token = '';
    } else {
        return token;
    }
   }
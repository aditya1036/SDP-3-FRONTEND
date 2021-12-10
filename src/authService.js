import jwt_decode from "jwt-decode";
export function getUserPayload(token){
                
    if (token) {
        try {
            const userPayload = jwt_decode(token)
            return userPayload;

        }
        catch(E) {
            return null;
        }
    }
    else {
    return null;
    }
}

export function isLoggedin(token){
const userPayload = getUserPayload(token);
if (userPayload) {
return userPayload.exp > Date.now() / 1000
}
else {
localStorage.clear();
return false;
}
}


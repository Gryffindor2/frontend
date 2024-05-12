export function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
}

export function getToken(){
    return localStorage.getItem("token");
}

export function authenticated(){
    var token = localStorage.getItem("token");
    return token? true: false;
}
export function login(){
    localStorage.setItem("tocken", "123456789");
}

export function logout(){
    localStorage.removeItem("tocken");
}

export function authenticated(){
    var tocken = localStorage.getItem("tocken");
    return tocken? true: false;
}
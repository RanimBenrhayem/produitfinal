export const retrieveTokenFromLocalStorage=()=> {

    let token = localStorage.getItem("branper_auth_token")
    if (token) {
        return JSON.parse(token)
    }
    return ""
}

export const setTokenIntoLocalStorage = (token)=>{
    localStorage.setItem("branper_auth_token" , JSON.stringify(token))
}
export const retrieveRoleFromLocalStorage=()=> {

    let token = localStorage.getItem("branper_auth_role")
    if (token) {
        return JSON.parse(token)
    }
    return ""
}
export const setRoleIntoLocalStorage = (token)=>{
    localStorage.setItem("branper_auth_role" , JSON.stringify(token))
}
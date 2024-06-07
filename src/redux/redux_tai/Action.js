export const registerError = (data) =>{
    return{
        type: 'register/error',
        payload: data
    }
}
export const loginError = (data) =>{
    return{
        type: 'login/error',
        payload: data
    }
}
export const changePassError = (data) =>{
    return{
        type: 'changePass/error',
        payload: data
    }
}
export const forgotPassError = (data) =>{
    return{
        type: 'forgotPass/error',
        payload: data
    }
}
export const verifyPassError = (data) =>{
    return{
        type: 'verifyPass/error',
        payload: data
    }
}
export const profileError = (data) =>{
    return{
        type: 'profile/error',
        payload: data
    }
}
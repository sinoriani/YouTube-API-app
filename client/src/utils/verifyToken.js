
export const getStoredToken = (redirect=true) => {
    if(!localStorage.getItem('token')){
        if(redirect){
            console.log(window.location.href)
            if(window.location.pathname !== "/login"){
                window.location.href ='/login'
            }
        }
        return undefined
    }else{
        return JSON.parse(localStorage.getItem('token'));
    }
};
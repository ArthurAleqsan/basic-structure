export function createCookie(name,value,expiresIn,expName) {
    let expires = "";
    if (expiresIn) {
        let date = 0;
        if (expiresIn === 'never'){
            const _3years = 3*365*24*60*60*1000;
            date = new Date();
            date.setTime(date.getTime() + _3years);
        }else {
            date = new Date(expiresIn);
        }
        expires = "; expires="+date.toGMTString();
        if(expName){
            localStorage.setItem(expName,expiresIn)
        }
    }

    document.cookie = name+"="+value+expires+"; path=/";
}

export function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function isCookieExpired(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function eraseCookie(name) {
    createCookie(name,"",-1);
}
export default {
    readCookie,
    createCookie,
    eraseCookie,
}
const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
}

const getToken = () => {
    let token = window.localStorage.getItem('user');
    token = JSON.parse(token);
    token = token.token;

    return token;
}


export const commonService = { checkStatus, getToken };
import { commonService } from './CommonService';
const API_URL = 'http://localhost:3001';
const userKey = { key: 'user' };

const login = (name, password) => {

    const url = `${API_URL}/auth/login`;

    const loginBody = {
        name: name,
        password: password
    };

    let myHeaders = {'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'http://localhost:3000'
    };

    const fetchData = {
        body: JSON.stringify(loginBody),
        mode: 'cors',
        headers: myHeaders,
        method: 'POST',
        redirect: 'follow'
    };

    return fetch(url, fetchData)
        .then(response => commonService.checkStatus(response))
        .then(response => response.text()).then(response => console.log(response))
        .then(response => JSON.parse(response))
        .catch(error => {
            return {success: false, status: error.message}
        });
};

const logout = () => {
    localStorage.removeItem(userKey.key);
}

const isAuthenticated = () => {
    const userData = window.localStorage.getItem(userKey.key);
    return userData ? JSON.parse(userData) : null;

}

const authenticateUser = (user) => {
    window.localStorage.setItem(userKey.key, JSON.stringify(user));
}


const register = (addUser) => {
    const url = `${API_URL}/auth/register`;

    let myHeaders = {'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'http://localhost:3000'
};

    let fetchData = {
       body: JSON.stringify(addUser),
        mode: 'cors',
        headers: myHeaders,
        method: 'POST',
        redirect: 'follow'
    };

    return fetch(url, fetchData)
        .then(response => commonService.checkStatus(response))
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .catch(error => {
            return {success: false, status: error.message}
        });
}

export const authService = { login, logout, isAuthenticated, authenticateUser, register };

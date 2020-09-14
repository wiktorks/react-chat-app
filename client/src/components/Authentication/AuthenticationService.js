import { commonService } from './CommonService';
const API_URL = process.env.REACT_APP_API_URL;
const userKey = { key: 'user' };

const login = (name, password) => {
    const url = `${API_URL}/login`;
    const loginBody = {
        name: name,
        password: password
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(loginBody);

    const fetchData = {
        method: 'POST',
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(url, fetchData)
        .then(response => commonService.checkStatus(response))
        .then(response => response.text())
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
    const url = `${API_URL}/users`;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(addUser);

    let fetchData = {
        method: 'POST',
        mode: "cors",
        headers: myHeaders,
        body: raw,
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

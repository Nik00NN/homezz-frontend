import {API_URL} from "../config.js";
import axios from "axios";

export const login = async (userName, password) => {
    const response = await axios.post(`${API_URL}/api/authentication/login`, {
        username: userName,
        password: password
    })
    console.log(response.data)
    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('tokenType', response.data.tokenType)
    console.log(localStorage.getItem('accessToken'))
    console.log(localStorage.getItem('tokenType'))
    return response.data;
}
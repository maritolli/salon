import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const employeeLogin = async (Login, Password) => {
    const {data} = await $host.post('api/employee/login', {Login, Password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const employeeCheck = async () => {
    const {data} = await $authHost.get('api/employee/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (Fname, Login, Password) => {
    const {data} = await $host.post('api/client/registration', {Fname, Login, Password})
    return jwtDecode(data.token)
}

export const login = async (Login, Password) => {
    const {data} = await $host.post('api/client/login', {Login, Password})
    return jwtDecode(data.token)
}

export const check = async () => {
    const response = await $host.get('api/client/auth')
    return response
}
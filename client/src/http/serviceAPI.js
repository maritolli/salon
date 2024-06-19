import {$authHost, $host} from "./index";

export const fetchAllServices = async () => {
    const {data} = await $host.get('api/service')
    return data
}
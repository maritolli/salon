import {$authHost} from "./index";


export const fetchClientOrders = async (id)=>{
    const {data} = await $authHost.get('api/client/orders/'+id)
    console.log(data)
    return data
}
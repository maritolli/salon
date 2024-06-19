import {$authHost} from "./index";


export const fetchClientOrders = async (id)=>{
    const {data} = await $authHost.get('api/client/orders/'+id)
    return data
}
export const fetchEmployeeOrders = async (id)=>{
    const {data} = await $authHost.get('api/employee/orders/'+id)
    return data
}
export const fetchAdminClients = async()=>{
    const {data} = await $authHost.get('api/employee/clients')
    return data
}
export const fetchAdminEmployees = async ()=>{
    const {data} = await $authHost.get('api/employee/best')
    return data
}
export const createOrder = async(Id_client, Id_service, Id_employee, Order_date)=>{
    const {data} = await $authHost.post('api/order/', {Id_client, Id_service, Id_employee, Order_date})
    return data
}
import React, {useContext, useEffect} from 'react';
import './HistoryEmployeeComponent.css'

import ExitButtonComponent from '../../pagesComponents/ExitButtonComponent/ExitButtonComponent'
import EmployeeOrdersComponent from "./EmployeeOrdersComponent/EmployeeOrdersComponent";
import HistoryExitButtonComponent from "../HistoryExitButtonComponent/HistoryExitButtonComponent";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchEmployeeOrders} from "../../../http/orderAPI";
import {Context} from "../../../index";

const HistoryEmployeeComponent = observer((props) =>{
    const {id} =useParams()
    const {orders} = useContext(Context)

    if(id){
        useEffect(() => {
            fetchEmployeeOrders(id).then(data=>orders.setEmployeeOrders(data))
        }, []);
    }
    console.log(orders.EmployeeOrders)
    return(
        <div className="main-container">

            <ExitButtonComponent/>

            <div className="history-employee-words">
                <p className="history-employee-words-header"> это <span
                    style={{color: "var(--main-enter-color)"}}>твои</span> клиенты</p>
            </div>


            <table className="history-employee-table">

                <tr>
                    <th>Имя</th>
                    <th>Список услуг</th>
                    <th>Дата последнего посещения</th>
                </tr>
                {orders.EmployeeOrders.map((order)=><EmployeeOrdersComponent
                    name={order.Client.Fname}
                    services ={order.Positions}
                    date = {order.order_date}
                />)}
                {/*<EmployeeOrdersComponent name = {"иванова анна"}*/}
                {/*                         services={["маникюр", "педикюр", "мытье волос", "окрашивание сложное"]}*/}
                {/*                         date = {"02.05.2024"}*/}
                {/*/>*/}
                {/*<EmployeeOrdersComponent name = {"петров пётр"}*/}
                {/*                         services={["стрижка короткие"]}*/}
                {/*                         date = {"01.01.2009"}*/}
                {/*/>*/}
                {/*<EmployeeOrdersComponent name = {"расимов абдул"}*/}
                {/*                         services={["окрашивание"]}*/}
                {/*                         date = {"29.05.2025"}*/}
                {/*/>*/}

            </table>

            <HistoryExitButtonComponent handleExitAccount={props.handleExitAccount}/>

        </div>
)
})
export default HistoryEmployeeComponent;
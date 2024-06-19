import React, {useContext, useState} from 'react';
import './HistoryClientComponent.css'
import ExitButtonComponent from "../ExitButtonComponent/ExitButtonComponent";
import ModalClientOrderDecline from "../../modals/ModalClientOrderDecline/ModalClientOrderDecline";
import ClientOrdersComponent from "./ClientOrdersComponent/ClientOrdersComponent";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import HistoryExitButtonComponent from "../HistoryExitButtonComponent/HistoryExitButtonComponent";

const HistoryClientComponent=observer((props) =>{
    const [orderDecline, setOrderDecline] = useState(false);
    const [chosenOrder, setChosenOrder] = useState();
    const {orders} = useContext(Context)
    const handleOrderDecline = (event) => {
        event.preventDefault();
        setChosenOrder(event.target.id)
        setOrderDecline(true)
    }
    console.log(orders.ClientOrders)
    return (
        <div className="main-container">

            <ExitButtonComponent/>

            <p className="client-orders-header">это <span style={{color: "var(--main-enter-color"}}>твоя</span> история
            </p>

            <table className="client-orders-table">

                <tr>
                    <th>Дата</th>
                    <th>Список услуг</th>
                    <th>К оплате</th>
                    <th>Отменить?</th>
                </tr>

                {orders.ClientOrders.map(data =>
                    <ClientOrdersComponent id_ord={data.id_order}
                                            date ={data.order_date}
                                            services ={data.Positions}
                                            cost ={data.total_sum}
                                            key={data.id_order}
                                            handleOrderDecline={handleOrderDecline}
                    />)}
                {/*{userHistory.map((order) => (<ClientOrdersComponent date={order.date} services={order.services} cost ={order.cost}  handleOrderDecline={handleOrderDecline}/>))}*/}
                {/*<ClientOrdersComponent date ={test_var} services={test_var} cost ={test_var} handleOrderDecline={handleOrderDecline}/>*/}
                {/*<ClientOrdersComponent date ={"02.02.2024"} services={["маникюр","педикюр","обновляем длинные волосы"]} cost ={"7200 рублей"} handleOrderDecline={handleOrderDecline}/>*/}


            </table>

            <ModalClientOrderDecline
                chosenOrder = {chosenOrder}
                orderDecline={orderDecline}
                setOrderDecline={setOrderDecline}/>
            <HistoryExitButtonComponent handleExitAccount={props.handleExitAccount}/>
        </div>
    )
})
export default HistoryClientComponent
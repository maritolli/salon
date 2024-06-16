import React, {useContext} from 'react';
import './HistoryClientComponent.css'
import ExitButtonComponent from "../ExitButtonComponent/ExitButtonComponent";
import ModalClientOrderDecline from "../../modals/ModalClientOrderDecline/ModalClientOrderDecline";
import ClientOrdersComponent from "./ClientOrdersComponent/ClientOrdersComponent";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const HistoryClientComponent=observer(() =>{
    const [orderDecline, setOrderDecline] = React.useState(false);
    const {orders} = useContext(Context)
    const handleOrderDecline = (event) => {
        event.preventDefault();
        setOrderDecline(true)
    }

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
                    <ClientOrdersComponent date ={data.order_date}
                                            services ={data.services}
                                            cost ={data.total_sum}
                                            key={data.id_order}
                                            handleOrderDecline={handleOrderDecline}
                    />)}
                {/*{userHistory.map((order) => (<ClientOrdersComponent date={order.date} services={order.services} cost ={order.cost}  handleOrderDecline={handleOrderDecline}/>))}*/}
                {/*<ClientOrdersComponent date ={test_var} services={test_var} cost ={test_var} handleOrderDecline={handleOrderDecline}/>*/}
                {/*<ClientOrdersComponent date ={"02.02.2024"} services={["маникюр","педикюр","обновляем длинные волосы"]} cost ={"7200 рублей"} handleOrderDecline={handleOrderDecline}/>*/}


            </table>

            <ModalClientOrderDecline orderDecline={orderDecline} setOrderDecline={setOrderDecline}/>

        </div>
    )
})
export default HistoryClientComponent
import React from 'react';
import './HistoryClientComponent.css'
import ExitButtonComponent from "../ExitButtonComponent/ExitButtonComponent";
import ModalClientOrderDecline from "../../modals/ModalClientOrderDecline/ModalClientOrderDecline";
import ClientOrdersComponent from "./ClientOrdersComponent/ClientOrdersComponent";

export default function HistoryClientComponent() {
    const [orderDecline, setOrderDecline] = React.useState(false);

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
                <ClientOrdersComponent date ={"20.06.2024"} services={["маникюр"]} cost ={"1200 рублей"} handleOrderDecline={handleOrderDecline}/>
                <ClientOrdersComponent date ={"02.02.2024"} services={["маникюр","педикюр","обновляем длинные волосы"]} cost ={"7200 рублей"} handleOrderDecline={handleOrderDecline}/>


            </table>

            <ModalClientOrderDecline orderDecline={orderDecline} setOrderDecline={setOrderDecline}/>

        </div>
    )
}
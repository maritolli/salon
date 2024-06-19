import React from 'react';
import './ModalClientOrderDecline.css'
import {deleteOrder} from "../../../http/clientAPI";

export default function ModalClientOrderDecline({chosenOrder,orderDecline, setOrderDecline}) {
    const handleOrderDecline = async(event) => {
        event.preventDefault();
        console.log(`Deleted order: ${chosenOrder}`);
        const data = deleteOrder(chosenOrder)
        console.log(data)
        setOrderDecline(false);
    }
     const handleNotOrderDecline = (event)=>{
        event.stopPropagation();
         setOrderDecline(false);
     }
    return (
        <div className={orderDecline ? "modal-client-order-decline active-order-decline": "modal-client-order-decline"}>
            <div className="client-orders-decline">

                <p className="client-orders-decline-question">точно отменяем?</p>

                <div className="client-orders-decline-container">
                    <button className="client-orders-decline-button" type="button" onClick={handleNotOrderDecline}>нет
                    </button>
                    <button className="client-orders-decline-button" type="button" onClick={handleOrderDecline}>да
                    </button>
                </div>

            </div>
        </div>
    )
}
import React from 'react';
import './ModalClientOrderDecline.css'

export default function ModalClientOrderDecline({orderDecline, setOrderDecline}) {
    const handleOrderDecline = (event) => {
        event.preventDefault();
        setOrderDecline(false);
    }

    return (
        <div className={orderDecline ? "modal-client-order-decline active-order-decline": "modal-client-order-decline"}>
            <div className="client-orders-decline">

                <p className="client-orders-decline-question">точно отменяем?</p>

                <div className="client-orders-decline-container">
                    <button className="client-orders-decline-button" type="button" onClick={handleOrderDecline}>нет
                    </button>
                    <button className="client-orders-decline-button" type="button" onClick={handleOrderDecline}>да
                    </button>
                </div>

            </div>
        </div>
    )
}
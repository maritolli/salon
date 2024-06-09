import React from 'react';
import './ClientOrdersComponent.css'

export default function ClientOrdersComponent(props) {
    const my_date = props.date

    const isPastDate=()=>{
        let [day, month, year] = my_date.split('.');
        return(new Date(year, month-1, day) < new Date())
    }

    return (
        <tr>
            <td>{my_date}</td>
            <td>{props.services.map(service => <p>{service}</p>)}</td>
                <td>{props.cost}</td>
            <td>
                <button type="submit"
                        className="client-orders-table-agreement-button"
                        onClick={props.handleOrderDecline}
                        style ={isPastDate() ? {color: "var(--client-decline-order-impossible)"}:{}}
                        disabled={isPastDate()}
                >да</button>
            </td>
        </tr>
    )
}
import React from 'react';
import './ClientOrdersComponent.css'
import services from "../../../../pages/Services/Services";

export default function ClientOrdersComponent(props) {
    const my_date = props.date
    let [year, month, day] = my_date.split('-');
    const printed_date = ""+day+"/"+month+"/"+year;
    const isPastDate=()=>{
        return(new Date(year, month-1, day) < new Date())
    }

    return (
        <tr>
            <td>{printed_date}</td>
            <td>{services.length>1 ? props.services.map(service => <p>{service}</p>):<p>{services}</p>}</td>
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
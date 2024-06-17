import React from 'react';
import './ClientOrdersComponent.css'


export default function ClientOrdersComponent(props) {
    const my_date = props.date
    let [year, month, day] = my_date.split('-');
    const positions = props.services;
    const printed_date = ""+day+"/"+month+"/"+year;
    const isPastDate=()=>{
        return(new Date(year, month-1, day) < new Date())
    }

    return (
        <tr>
            <td>{printed_date}</td>
            <td>{positions.length===1 ? <p>{positions[0].Service.service_name}</p>: positions.map((service)=><p>{service.Service.service_name}</p>) }</td>
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
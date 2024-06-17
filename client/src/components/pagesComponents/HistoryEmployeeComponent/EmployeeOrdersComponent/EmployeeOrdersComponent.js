import React from 'react';
import './EmployeeOrdersComponent.css'

export default function EmployeeOrdersComponent(props) {
    const positions = props.services;
    let [year, month, day] = props.date.split('-');
    const printed_date = ""+day+"/"+month+"/"+year;
    return (
        <tr>
            <td>{props.name}</td>
            <td>{positions.length===1 ? <p>{positions[0].Service.service_name}</p>: positions.map((service)=><p>{service.Service.service_name}</p>) }</td>
            <td>{printed_date}</td>
        </tr>
    )
}
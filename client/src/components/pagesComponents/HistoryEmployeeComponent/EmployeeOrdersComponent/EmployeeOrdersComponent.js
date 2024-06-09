import React from 'react';
import './EmployeeOrdersComponent.css'

export default function EmployeeOrdersComponent(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.services.map(service=><p>{service}</p>)}</td>
            <td>{props.date}</td>
        </tr>
    )
}
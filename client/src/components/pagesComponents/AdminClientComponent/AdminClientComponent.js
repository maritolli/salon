import React from 'react';
import './AdminClientComponent.css'

export default function AdminClientComponent(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.activity}</td>
            <td>{props.date}</td>
        </tr>
    )
}
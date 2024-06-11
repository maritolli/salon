import React from 'react';
import './AdminEmployeeComponent.css'

export default function AdminEmployeeComponent(props) {
    const handleGiveBonus = (event)=>{
        event.preventDefault();
        props.setGiveBonusActive(!props.giveBonusActive)
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.activity}</td>
            <td>
                <button type="button" className="employee-table-bonus-button" onClick={handleGiveBonus}> {props.bonus}
                </button>
            </td>

        </tr>
    )
}
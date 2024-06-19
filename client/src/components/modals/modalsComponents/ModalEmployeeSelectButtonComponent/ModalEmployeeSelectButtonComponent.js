import React from 'react';

import './ModalEmployeeSelectButtonComponent.css'

export default function ModalEmployeeSelectButtonComponent(props) {
    const name = props.name;
    const specialization = props.specialization;
    const id_employee = props.id_imp;

    return (
        <button type="submit" className="selected-employee-container"
                onClick={event=>props.handleSelectEmployee({id_employee, name,specialization},event)}
        >
            <p className="selected-employee">{name}</p>
            <p className="selected-employee-specialization">{specialization}</p>
        </button>
    )
}
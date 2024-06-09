import React from 'react';

import './ModalEmployeeSelectButtonComponent.css'

export default function ModalEmployeeSelectButtonComponent(props) {
    const name = props.name;
    const specialization = props.specialization;

    return (
        <button type="submit" className="selected-employee-container"
                onClick={event=>props.handleSelectEmployee({name,specialization},event)}
        >
            <p className="selected-employee">{name}</p>
            <p className="selected-employee-specialization">{specialization}</p>
        </button>
    )
}
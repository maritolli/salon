import React from 'react';

import './ModalDateSelectButtonComponent.css'

export default function ModalDateSelectButtonComponent(props) {
    return (
        <button type="submit" className="date-day-button"
                                                          value={props.value} onClick={props.handleButtonSubmit} >
            <time>{props.value}</time>
        </button>
    )
}
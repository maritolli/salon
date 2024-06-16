import React from 'react';
import './HistoryExitButtonComponent.css'

export default function HistoryExitButtonComponent(props) {
    return(
        <button
            className="history-exit-button-component"
            onClick={props.handleExitAccount}
        >
            Выйти
        </button>
    )
}
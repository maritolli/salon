import React from 'react';
import exit_button from '../../../images/Кнопка выхода.svg'
import './ExitButtonComponent.css'
import {MAIN_ROUTE} from "../../../utils/consts";

export default function exitButtonComponent() {
    return (
        <a className="exit-button" href={MAIN_ROUTE}><img alt="noIMG" src={exit_button}/></a>
    )
}

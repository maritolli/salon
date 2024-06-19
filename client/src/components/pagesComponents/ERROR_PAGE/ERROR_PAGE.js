import React from "react";
import './ERROR_PAGE.css'
import {useNavigate} from "react-router-dom";
import ExitButtonComponent from "../ExitButtonComponent/ExitButtonComponent";


export default function ERROR_PAGE() {
    const navigate = useNavigate();
    return(
        <div className="main-container">
            <p className="error-page-header"> ошибка! вернитесь назад </p>
            <ExitButtonComponent/>
        </div>
    )
}
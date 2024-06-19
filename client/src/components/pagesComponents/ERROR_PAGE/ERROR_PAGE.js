import React from "react";
import './ERROR_PAGE.css'
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../../utils/consts";

const handleClickOnExit =(navi)=>{

}

export default function ERROR_PAGE() {
    const navigate = useNavigate();
    return(
        <div className="main-container">
            <p className="error-page-header"> ОШИБКА</p>
            <button
                className="error-page-button"
                onClick={handleClickOnExit}
            >HUI</button>
        </div>
    )
}
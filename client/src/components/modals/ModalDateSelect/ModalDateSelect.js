import React, {useContext, useState} from 'react';

import './ModalDateSelect.css'
import {Context} from "../../../index";
import ModalDateSelectButtonComponent
    from "../modalsComponents/ModalDateSelectButtonComponent/ModalDateSelectButtonComponent";


export default function ModalDateSelect({activeSelf, setActiveSelf, activeEmployee, setActiveEmployee, selectedDate, setSelectedDate}) {
    const{current_date} = useContext(Context)

    const[disableContinueButton, setDisableContinueButton] = useState(true)

    const handleSubmit=(event)=>{
        event.preventDefault()
        setActiveEmployee(true)

        console.log("Selected date: "+selectedDate)
    }
    const handleButtonSubmit = (event)=>{
        event.preventDefault()
        setDisableContinueButton(false)
        let my_date = event.target.textContent;
        let [day,month] = my_date.split('.');
        my_date = month+'/'+day+'/2024';
        setSelectedDate(my_date)
    }


    return (
        <div className = {activeSelf? "modal-date-select active":"modal-date-select" }>
            <div className="date-container">

                <div className="date-select-header">

                <p className="header-step">шаг 1</p>
                <p className="header-choose">выбери дату своего визита</p>
            </div>

                <div className="date-days-container">

                    {current_date.Date.map(value =>
                        <ModalDateSelectButtonComponent value ={value.name} handleButtonSubmit = {handleButtonSubmit}/>
                    )}

                </div>

                <form onSubmit={handleSubmit}>
                    <button
                        className="continue-button order-create-button"
                        type="submit"
                        onClick = {()=>setActiveSelf(false)}
                        disabled={disableContinueButton}
                    >
                    далее
                    </button>
                </form>

                <button className="backwards-button order-create-button" type="submit"
                        onClick = {()=>setActiveSelf(false)}>назад
                </button>

            </div>
        </div>
    )
}
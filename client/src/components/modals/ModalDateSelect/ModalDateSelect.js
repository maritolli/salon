import React, {useContext} from 'react';

import './ModalDateSelect.css'
import {Context} from "../../../index";


export default function ModalDateSelect({active, setActive}) {
    const{current_date} = useContext(Context)

    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log(current_date.Date)
    }

    return (
        <div className = {active? "modal-date-select active":"modal-date-select" }>
            <div className="date-container">

                <div className="date-select-header">

                <p className="header-step">шаг 1</p>
                <p className="header-choose">выбери дату своего визита</p>
            </div>

                <div className="date-days-container">

                <button className="date-day-button">
                    <time>1.05</time>
                </button>

                <button className="date-day-button">
                    <time>2.05</time>
                </button>
                <button className="date-day-button">
                    <time>3.05</time>
                </button>
                <button className="date-day-button">
                    <time>4.05</time>
                </button>
                <button className="date-day-button">
                    <time>5.05</time>
                </button>
                <button className="date-day-button">
                    <time>6.05</time>
                </button>
                <button className="date-day-button">
                    <time>7.05</time>
                </button>
                <button className="date-day-button">
                    <time>8.05</time>
                </button>
                <button className="date-day-button">
                    <time>9.05</time>
                </button>
                <button className="date-day-button">
                    <time>10.05</time>
                </button>
                <button className="date-day-button">
                    <time>11.05</time>
                </button>
                <button className="date-day-button">
                    <time>12.05</time>
                </button>
                <button className="date-day-button">
                    <time>13.05</time>
                </button>
                <button className="date-day-button">
                    <time>14.05</time>
                </button>
                <button className="date-day-button">
                    <time>15.05</time>
                </button>
                <button className="date-day-button">
                    <time>16.05</time>
                </button>
                <button className="date-day-button">
                    <time>17.05</time>
                </button>
                <button className="date-day-button">
                    <time>18.05</time>
                </button>
                <button className="date-day-button">
                    <time>19.05</time>
                </button>
                <button className="date-day-button">
                    <time>20.05</time>
                </button>
                <button className="date-day-button">
                    <time>21.05</time>
                </button>
                <button className="date-day-button">
                    <time>22.05</time>
                </button>
                <button className="date-day-button">
                    <time>23.05</time>
                </button>
                <button className="date-day-button">
                    <time>24.05</time>
                </button>
                <button className="date-day-button">
                    <time>25.05</time>
                </button>
                <button className="date-day-button">
                    <time>26.05</time>
                </button>
                <button className="date-day-button">
                    <time>27.05</time>
                </button>
                <button className="date-day-button">
                    <time>28.05</time>
                </button>
                <button className="date-day-button">
                    <time>29.05</time>
                </button>
                <button className="date-day-button">
                    <time>30.05</time>
                </button>


            </div>

                <form onSubmit={handleSubmit}><button className="continue-button order-create-button" type="submit"
                onClick={()=>setActive(false)}>
                    далее
                </button></form>
                <button className="backwards-button order-create-button" type="submit"
                        onClick="location.href='../all_services/index.html'">назад
                </button>

            </div>
        </div>
    )
}
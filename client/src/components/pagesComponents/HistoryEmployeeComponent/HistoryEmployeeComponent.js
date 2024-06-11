import React from 'react';
import './HistoryEmployeeComponent.css'

import ExitButtonComponent from '../../pagesComponents/ExitButtonComponent/ExitButtonComponent'
import EmployeeOrdersComponent from "./EmployeeOrdersComponent/EmployeeOrdersComponent";

export default function HistoryEmployeeComponent() {
    return(
        <div className="main-container">

            <ExitButtonComponent/>

            <div className="history-employee-words">
                <p className="history-employee-words-header"> это <span
                    style={{color: "var(--main-enter-color)"}}>твои</span> клиенты</p>
            </div>


            <table className="history-employee-table">

                <tr>
                    <th>Имя</th>
                    <th>Список услуг</th>
                    <th>Дата последнего посещения</th>
                </tr>
                <EmployeeOrdersComponent name = {"иванова анна"}
                                         services={["маникюр", "педикюр", "мытье волос", "окрашивание сложное"]}
                                         date = {"02.05.2024"}
                />
                <EmployeeOrdersComponent name = {"петров пётр"}
                                         services={["стрижка короткие"]}
                                         date = {"01.01.2009"}
                />
                <EmployeeOrdersComponent name = {"расимов абдул"}
                                         services={["окрашивание"]}
                                         date = {"29.05.2025"}
                />

            </table>

        </div>
)
}
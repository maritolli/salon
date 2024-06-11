import React, {useState} from 'react';

import './HistoryPage.css'
import '../ImportantStyles/colors.css'
import '../ImportantStyles/font.css'
import '../ImportantStyles/common.css'
import '../ImportantStyles/reset.css'

import ExitButtonComponent from '../../components/pagesComponents/ExitButtonComponent/ExitButtonComponent'
import AdminEmployeeComponent from "../../components/pagesComponents/AdminEmployeeComponent/AdminEmployeeComponent";
import ModalAdminEmployee from "../../components/modals/ModalAdminEmployee/ModalAdminEmployee";
import AdminClientComponent from "../../components/pagesComponents/AdminClientComponent/AdminClientComponent";

import HistoryClientComponent from "../../components/pagesComponents/HistoryClientComponent/HistoryClientComponent";
import HistoryEmployeeComponent
    from "../../components/pagesComponents/HistoryEmployeeComponent/HistoryEmployeeComponent";

const HistoryPage = () => {
    const [giveBonusActive, setGiveBonusActive] = useState(false);
    const [employeeHistory, setEmployeeHistory] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(1);//костыль для переключения по страницам историй

    const handleChangeHistory = (event)=>{
        event.preventDefault();
        if(!employeeHistory){setEmployeeHistory(true)}
        else{setEmployeeHistory(false)}
    }

    switch(currentUserId){
        case 1:
            return (
                <div className="main-container">

                    <ExitButtonComponent/>

                    <div className="admin_employee-client-buttons">

                        <button type="button" className={employeeHistory ? "all-employee-button" : "all-employee-button clients-employee-inactive-button"}
                                onClick={handleChangeHistory}>это <span
                            style={employeeHistory?{color: "var(--main-enter-color)"}:{color: "var(--main-enter-inactive-color)"}}>твои</span> сотрудники
                        </button>
                        <button type="button" className={employeeHistory? "all-clients-button clients-employee-inactive-button":"all-clients-button"}
                                onClick={handleChangeHistory}>это <span
                            style={!employeeHistory?{color: "var(--main-enter-color)"}:{color: "var(--main-enter-inactive-color)"}}>твои</span> клиенты
                        </button>

                    </div>

                    {employeeHistory? <table className="admin-employee-table">
                            <tr>
                                <th>Имя</th>
                                <th>Активность</th>
                                <th>Премия</th>
                            </tr>
                            <AdminEmployeeComponent name = {"иванова анна"}
                                                    activity = {2}
                                                    bonus ={"7200 рублей"}
                                                    giveBonusActive={giveBonusActive}
                                                    setGiveBonusActive={setGiveBonusActive}
                            />
                            <AdminEmployeeComponent name = {"петров пётр"}
                                                    activity = {1000}
                                                    bonus ={"71200 рублей"}
                                                    giveBonusActive={giveBonusActive}
                                                    setGiveBonusActive={setGiveBonusActive}
                            />
                            <AdminEmployeeComponent name = {"расимов абдул"}
                                                    activity = {0}
                                                    bonus ={"0 рублей"}
                                                    giveBonusActive={giveBonusActive}
                                                    setGiveBonusActive={setGiveBonusActive}
                            />

                        </table>
                        : <table className="admin-client-table">
                            <tr>
                                <th>Имя</th>
                                <th>Количество посещений</th>
                                <th>Дата последнего посещения</th>
                            </tr>
                            <AdminClientComponent name = {"смирнов валерий"} activity ={4} date ={"02.05.2024"}/>
                            <AdminClientComponent name = {"зазуля олег"} activity ={1} date ={"21.02.2024"}/>
                            <AdminClientComponent name = {"криштиану рональдо"} activity ={1000} date ={"21.06.2024"}/>
                        </table>
                    }

                    <ModalAdminEmployee giveBonusActive={giveBonusActive} setGiveBonusActive={setGiveBonusActive}/>

                </div>
            )
        case 2:
            return(
                <HistoryClientComponent/>
            )
        case 3:
            return(
                <HistoryEmployeeComponent/>
            )
        default:
            return (<div>ЕГОР ПЕЙДЖ</div>)
    }

};

export default HistoryPage;
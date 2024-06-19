import React, {useContext, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {useParams} from 'react-router-dom';

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
import HistoryExitButtonComponent
    from "../../components/pagesComponents/HistoryExitButtonComponent/HistoryExitButtonComponent";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, MAIN_ROUTE} from "../../utils/consts";
import {fetchAdminClients, fetchAdminEmployees, fetchClientOrders} from "../../http/orderAPI";
import ERROR_PAGE from "../../components/pagesComponents/ERROR_PAGE/ERROR_PAGE";

const HistoryPage = observer(() => {
    const {user, orders}= useContext(Context)
    const navigate = useNavigate()
    const [giveBonusActive, setGiveBonusActive] = useState(false);
    const [employeeHistory, setEmployeeHistory] = useState(true);
    const [employeeIdBonus, setEmployeeIdBonus] = useState()
    const {id} = useParams()

    const cur_user = jwtDecode(localStorage.getItem('token'))

    if(id){
        useEffect(() => {
            fetchClientOrders(id).then(data=> orders.setClientOrders(data))
        });
    }
    if(cur_user.role==="ADMIN"){
        useEffect(()=>{
            fetchAdminClients().then(data=> orders.setAdminClients(data))
        })
        useEffect(() => {
            fetchAdminEmployees().then(data=> orders.setAdminEmployees(data))
        }, []);
    }
    const handleChangeHistory = (event)=>{
        event.preventDefault();
        if(!employeeHistory){setEmployeeHistory(true)}
        else{setEmployeeHistory(false)}
    }

    const handleExitAccount =(event)=>{
        event.preventDefault();
        user.setUser({})
        user.setIsAuth(false)

        navigate(AUTH_ROUTE)
    }

    switch(cur_user.role){
        case "ADMIN":
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
                            {orders._adminEmployees.map(data=>
                                <AdminEmployeeComponent
                                    setEmployeeIdBonus ={setEmployeeIdBonus}
                                    id_emp ={data.EmployeeIdEmployee}
                                    name={data.Employee.fname}
                                    activity ={data.orders_count}
                                    bonus ={data.Employee.bonus}
                                    giveBonusActive={giveBonusActive}
                                    setGiveBonusActive={setGiveBonusActive}
                                />
                            )}
                            {/*<AdminEmployeeComponent name = {"иванова анна"}*/}
                            {/*                        activity = {2}*/}
                            {/*                        bonus ={"7200 рублей"}*/}
                            {/*                        giveBonusActive={giveBonusActive}*/}
                            {/*                        setGiveBonusActive={setGiveBonusActive}*/}
                            {/*/>*/}
                            {/*<AdminEmployeeComponent name = {"петров пётр"}*/}
                            {/*                        activity = {1000}*/}
                            {/*                        bonus ={"71200 рублей"}*/}
                            {/*                        giveBonusActive={giveBonusActive}*/}
                            {/*                        setGiveBonusActive={setGiveBonusActive}*/}
                            {/*/>*/}
                            {/*<AdminEmployeeComponent name = {"расимов абдул"}*/}
                            {/*                        activity = {0}*/}
                            {/*                        bonus ={"0 рублей"}*/}
                            {/*                        giveBonusActive={giveBonusActive}*/}
                            {/*                        setGiveBonusActive={setGiveBonusActive}*/}
                            {/*/>*/}

                        </table>
                        : <table className="admin-client-table">
                            <tr>
                                <th>Имя</th>
                                <th>Количество посещений</th>
                                <th>Дата последнего посещения</th>
                            </tr>
                            {orders._adminClents.map(data =>
                                <AdminClientComponent
                                name = {data.Client.Fname}
                                activity = {data.visits_count}
                                date = {data.max_count}

                            />)}
                            {/*<AdminClientComponent name = {"смирнов валерий"} activity ={4} date ={"02.05.2024"}/>*/}
                            {/*<AdminClientComponent name = {"зазуля олег"} activity ={1} date ={"21.02.2024"}/>*/}
                            {/*<AdminClientComponent name = {"криштиану рональдо"} activity ={1000} date ={"21.06.2024"}/>*/}
                        </table>
                    }

                    <ModalAdminEmployee
                        employeeIdBonus={employeeIdBonus}
                        giveBonusActive={giveBonusActive}
                        setGiveBonusActive={setGiveBonusActive}/>

                    <HistoryExitButtonComponent handleExitAccount={handleExitAccount}/>

                </div>
            )
        case "EMPLOYEE":
            if(cur_user.id ==id){
            return(
                <HistoryEmployeeComponent handleExitAccount={handleExitAccount}/>

            )}
            return <ERROR_PAGE/>
        case undefined:
            if(cur_user.id ==id){
                return(
                    <HistoryClientComponent handleExitAccount={handleExitAccount}/>
                )
            }

            return <ERROR_PAGE/>
        default:

            return <ERROR_PAGE/>
    }

});

export default HistoryPage;
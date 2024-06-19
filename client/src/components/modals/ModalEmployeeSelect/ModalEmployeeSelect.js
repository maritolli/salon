import React, {useContext, useEffect, useState} from 'react';

import './ModalEmployeeSelect.css'
import {Context} from "../../../index";
import ModalEmployeeSelectButtonComponent
    from "../modalsComponents/ModalEmployeeSelectButtonComponent/ModalEmployeeSelectButtonComponent";
import {observer} from "mobx-react-lite";
import {specialEmployee} from "../../../http/employeeAPI";
import {jwtDecode} from "jwt-decode";
import {createOrder} from "../../../http/orderAPI";
import {HISTORY_ROUTE} from "../../../utils/consts";
import {useNavigate} from "react-router-dom";



const ModalEmployeeSelect =observer (({activeEmployee, setActiveEmployee, activeDate, setActiveDate, renderCount, setRenderCount, myService, selectedDate}) =>{

    const{employee} = useContext(Context)
    const navigate = useNavigate()
    const[selectedMoreEmployee, setSelectedMoreEmployee] = useState([])
    const[disableOrderButton, setDisableOrderButton] = useState(true)


    const handleBackClick =()=>{
        setActiveEmployee(false)
        setActiveDate(true)
    }

    const handleSelectEmployee =(param, event)=>{//Клик по специалисту
        event.preventDefault()

        setSelectedMoreEmployee([...selectedMoreEmployee, param])
        setDisableOrderButton(false)
    }

    const handleContinueButtonClick=(event)=>{//Далее к выбору ещё специалиста
        event.preventDefault()

        setRenderCount(renderCount-1)
        setDisableOrderButton(true)
    }
    const handleOrderButtonClick =async(event)=>{//Оформить заказ
        event.preventDefault()

        const my_mas=[]
        selectedMoreEmployee.map((employee)=>{my_mas.push(employee.id_employee)})
        console.log(my_mas)
        let my_id = jwtDecode(localStorage.getItem('token')).id;
        let data = createOrder(my_id, myService, my_mas, selectedDate)
        console.log(data)
        navigate(HISTORY_ROUTE + '/' + my_id);
        setActiveEmployee(false)
    }
    if(activeEmployee){
    return(
        <div className={ activeEmployee ?"modal-employee-select active-employee" :"modal-employee-select"}>
            <div className="employee-select-container">

                <div className="employee-select-header">
                    <p className="header-step">шаг 2</p>
                    <p className="header-choose">выбери своего специалиста</p>
                </div>

                {employee.Employees.length? <div className="list-selected-employee">

                    {employee.Employees.map((employee) =>
                        <ModalEmployeeSelectButtonComponent
                            key={employee.EmployeeIdEmployee}
                            id_imp ={employee.EmployeeIdEmployee}
                            name={employee.Employee.fname}
                            specialization = {employee.Employee.specialization}
                            handleSelectEmployee = {handleSelectEmployee}
                        />
                    )}

                </div>
                :
                <div className="employee-select-error">
                    <p>Упс! кажется, свободных мастеров нет! попробуй другую дату </p>
                </div>}

                <button className="continue-button order-create-button" type="submit"
                        onClick={renderCount > 1? handleContinueButtonClick : handleOrderButtonClick}
                        disabled={disableOrderButton}
                >{renderCount>1? "далее" :"оформить"}
                </button>
                <button className="backwards-button order-create-button" type="submit"
                        onClick={handleBackClick}>назад
                </button>

            </div>
        </div>
    )}
    else{
        return 0
    }
})

export default ModalEmployeeSelect
import React, {useContext, useState} from 'react';

import './ModalEmployeeSelect.css'
import {Context} from "../../../index";
import ModalEmployeeSelectButtonComponent
    from "../modalsComponents/ModalEmployeeSelectButtonComponent/ModalEmployeeSelectButtonComponent";



export default function ModalEmployeeSelect({activeEmployee, setActiveEmployee, activeDate, setActiveDate}) {
    const[renderCount, setRenderCount] = useState(2);

    const{employee} = useContext(Context)

    const[selectedMoreEmployee, setSelectedMoreEmployee] = useState([])
    const[disableOrderButton, setDisableOrderButton] = useState(true)

    const handleBackClick =()=>{
        setActiveEmployee(false)
        setActiveDate(true)
    }

    const handleSelectEmployee =(param, event)=>{//Клик по специалисту
        event.preventDefault()
        selectedMoreEmployee.some(element=>{
            if(element.specialization === param.specialization){
                setSelectedMoreEmployee(selectedMoreEmployee.filter((ss)=>ss!==element))
            }
            return 0
        })
        setSelectedMoreEmployee([selectedMoreEmployee, param])
        setDisableOrderButton(false)
    }

    const handleContinueButtonClick=(event)=>{//Далее к выбору ещё специалиста
        event.preventDefault()

        setRenderCount(renderCount-1)
        setDisableOrderButton(true)
    }
    const handleOrderButtonClick =(event)=>{//Оформить заказ
        event.preventDefault()

        console.log(selectedMoreEmployee)
        setActiveEmployee(false)
    }
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
                            key={employee.id}
                            name={employee.name}
                            specialization = {employee.specialization}
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
    )
}
import React, {useState} from 'react';
import './ModalAdminEmployee.css'
import {giveBonusEmployee} from "../../../http/employeeAPI";

export default function ModalAdminEmployee({employeeIdBonus, giveBonusActive, setGiveBonusActive}) {
    const[bonusForEmployee, setBonusForEmployee] = useState()

    const handleAssignBonus = async(event)=>{
        event.preventDefault()
        try{
            const data = giveBonusEmployee(employeeIdBonus, bonusForEmployee)
            console.log(data)
        }catch(error){
            alert(error.response.data.message)
        }

        setGiveBonusActive(false)
    }

    const handleNotAssignBonus=async(event)=>{
        event.preventDefault()
        setGiveBonusActive(false)
    }
    const handleGiveIdBonus=(event)=>{

    }
    return (
        <div className={giveBonusActive ? "modal-admin-employee active-employee":"modal-admin-employee"}>

            <div className="give-bonus-container">

                <p className="give-bonus-header">назначьте премию</p>
                <form onSubmit={handleGiveIdBonus}>
                    <div className="give-bonus-input">

                        <input
                            type="number"
                            value={bonusForEmployee}
                            onChange={event=>setBonusForEmployee(event.target.value)}
                        />

                    </div>

                    <div className="give-bonus-decline-container">
                        <button className="give-bonus-decline-button" type="button"
                                onClick={handleNotAssignBonus}>нет</button>
                        <button className="give-bonus-decline-button" type="submit"
                                onClick={handleAssignBonus}>да</button>
                    </div>
                </form>

            </div>

        </div>
    )
}
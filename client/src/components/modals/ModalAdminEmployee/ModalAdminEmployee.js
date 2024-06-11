import React from 'react';
import './ModalAdminEmployee.css'

export default function ModalAdminEmployee({giveBonusActive, setGiveBonusActive}) {
    const handleAssignBonus = (event)=>{
        event.preventDefault()
        setGiveBonusActive(false)
    }

    return (
        <div className={giveBonusActive ? "modal-admin-employee active-employee":"modal-admin-employee"}>

            <div className="give-bonus-container">

                <p className="give-bonus-header">назначьте премию</p>
                <form>
                    <div className="give-bonus-input">

                        <input type="text"/>

                    </div>

                    <div className="give-bonus-decline-container">
                        <button className="give-bonus-decline-button" type="button"
                                onClick={handleAssignBonus}>нет</button>
                        <button className="give-bonus-decline-button" type="button"
                                onClick={handleAssignBonus}>да</button>
                    </div>
                </form>

            </div>

        </div>
    )
}
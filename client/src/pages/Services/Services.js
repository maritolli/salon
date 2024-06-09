import React, {useContext, useState} from 'react';

import '../ImportantStyles/colors.css'
import '../ImportantStyles/font.css'
import '../ImportantStyles/common.css'
import '../ImportantStyles/reset.css'
import './Services.css'

import ExitButtonComponent from '../../components/pagesComponents/ExitButtonComponent/ExitButtonComponent'
import ServiceComponent from "../../components/pagesComponents/ServiceComponent/ServiceComponent";
import ModalDateSelect from "../../components/modals/ModalDateSelect/ModalDateSelect";

import {Context} from "../../index";
import ModalEmployeeSelect from "../../components/modals/ModalEmployeeSelect/ModalEmployeeSelect";

const Services = () => {
    const {service} = useContext(Context)
    const [activeDate, setActiveDate] = useState(false)
    const [myService, setMyService] = useState([])
    const [activeEmployee, setActiveEmployee] = useState(false )

    const handleCheckBoxChange =(event)=>{
        const value = event.target.value;
        if(event.target.checked){
            setMyService([...myService,value]);
        }
        else{
            setMyService(myService.filter((ss)=>ss!==value));
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Selected services:', myService);
    };
    return (
        <div className="main-container">
            <ExitButtonComponent/>

            <div className="all-services-header">

                <p className="services-header-upgrade">Выбери апргрейд:</p>

                <p className="services-header-cost">А что по ценам?</p>

                <p className="services-header-check">Добавим?</p>

            </div>

            <div className="all-services-container">

                <table className="all-services-table">

                    {service.Services.map(service =>
                        <ServiceComponent
                            name = {service.name}
                            cost = {service.cost}
                            id_service = {service.id}
                            handleCheckBoxChange = {handleCheckBoxChange}
                        />
                    )}

                </table>

                <form onSubmit={handleSubmit}>
                <button className="all-services-create-button" type="submit" onClick={()=>setActiveDate(true)} >
                    Оформить заказ
                </button></form>

            </div>

            <ModalDateSelect
                activeSelf = {activeDate}
                setActiveSelf={setActiveDate}
                activeEmployee={activeEmployee}
                setActiveEmployee={setActiveEmployee}
            />

            <ModalEmployeeSelect
                activeEmployee={activeEmployee}
                setActiveEmployee={setActiveEmployee}
                activeDate={activeDate}
                setActiveDate={setActiveDate}
            />

        </div>
    );
};

export default Services;
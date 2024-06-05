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

const Services = () => {
    const {service} = useContext(Context)
    const [modalActive, setModalActive] = useState(false)

    let all_services=[]
    let index
    function setServices(id_service) {
        index = all_services.indexOf(id_service);
        if(index !== -1){
            all_services.splice(index, 1);
        }
        else{
            all_services.push(id_service);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Selected services:', all_services.sort());
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
                            setServices = {setServices}
                        />
                    )}

                </table>

                <form onSubmit={handleSubmit}>
                <button className="all-services-create-button" type="submit" onClick={()=>setModalActive(true)} >
                    Оформить заказ
                </button></form>

            </div>

            <ModalDateSelect active = {modalActive} setActive={setModalActive}/>

        </div>
    );
};

export default Services;
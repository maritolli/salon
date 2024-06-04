import React from 'react';

import './MainPage.css'
import '../ImportantStyles/colors.css'
import '../ImportantStyles/font.css'
import '../ImportantStyles/common.css'
import '../ImportantStyles/reset.css'

import hair from '../../images/волосы1.svg'
import manicure from '../../images/маник1.svg'
import spa from '../../images/спа1.svg'

import {AUTH_ROUTE, SERVICES_ROUTE} from "../../utils/consts";

import MainLogoComponent from "../../components/pagesComponents/MainLogoComponent/MainLogoComponent";

const MainPage = () => {
    return (
        <div className="main-container">
            {/*//  Кнопка входа*/}
            {/*// <a class="main-enter-logo-link" href=""><div class="main-enter-logo">*/}
            {/*//*/}
            {/*//     <img src ="../../images/Вход.svg" />*/}
            {/*//*/}
            {/*// </div></a> */}

            <a href={AUTH_ROUTE} className= "main-enter-logo-link">
                <svg className="main-enter-logo-rectangle" width="54.000000" height="58.000000" viewBox="0 0 54 58"
                     fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <defs/>
                    <path d="M16 0L54 0L54 3L16 3L16 0Z" fill="currentColor" fill-opacity="1.000000"
                          fill-rule="evenodd"/>
                    <path d="M16 55L54 55L54 58L16 58L16 55Z" fill="currentColor" fill-opacity="1.000000"
                          fill-rule="evenodd"/>
                    <path d="M54 0L54 58L50 58L50 0L54 0Z" fill="currentColor" fill-opacity="1.000000"
                          fill-rule="evenodd"/>
                    <path d="M22.5 38.54L34.52 26.51L37.34 29.34L25.32 41.36L22.5 38.54Z" fill="currentColor"
                          fill-opacity="1.000000" fill-rule="evenodd"/>
                    <path d="M0 27L35 27L35 31L0 31L0 27Z" fill="currentColor" fill-opacity="1.000000"
                          fill-rule="evenodd"/>
                    <path d="M25 17L37.02 29.02L34.19 31.84L22.17 19.82L25 17Z" fill="currentColor"
                          fill-opacity="1.000000" fill-rule="evenodd"/>
                </svg>
            </a>

            <MainLogoComponent/>

            {/*Тоже текст но с помощью тега span я могу задать какому-то конкретного слову(предложению, абзацу и т.д.) конкретный стиль*/}
            <div className="main-question">
                <p className="main-question-text">что ты <span
                    style={{color: "var(--main-enter-color)" }}>апгрейдишь</span> сегодня?</p>
            </div>

            <div className="main-pictures">
                {/*Кликабельные картинки с подсветкой*/}
                <a className="test-test " href={SERVICES_ROUTE}>
                    <img alt="noIMG" className="main-image" src={hair}/>
                </a>

                <a className="test-test " href={SERVICES_ROUTE}>
                    <img alt="noIMG" className="main-image" src={manicure}/>
                </a>

                <a className="test-test " href={SERVICES_ROUTE}>
                    <img alt="noIMG" className="main-image" src={spa}/>
                </a>
            </div>

            <div className="main-little-words">
                <p className="first-phrase">обнови волосы</p>
                <p className="second-phrase">обнови ногти</p>
                <p className="third-phrase">обнови тело</p>
            </div>

        </div>
    );
};

export default MainPage;